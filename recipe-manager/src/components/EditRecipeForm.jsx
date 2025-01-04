import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import './EditRecipeForm.css'; // Import the external CSS

const EditRecipeForm = ({ onEditComplete }) => {
  const { id } = useParams();
  const location = useLocation();
  const [updatedRecipe, setUpdatedRecipe] = useState(location.state?.recipe || null);

  useEffect(() => {
    // Fetch the recipe if it's not passed through location state
    if (!updatedRecipe) {
      axios
        .get(`http://localhost:3001/recipes/${id}`)
        .then((response) => {
          setUpdatedRecipe(response.data);
        })
        .catch((error) => {
          console.error("Error fetching recipe:", error);
          alert("Recipe not found. Please try again.");
        });
    }
  }, [id, updatedRecipe]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedRecipe((prevRecipe) => ({ ...prevRecipe, [name]: value }));
  };

  const handleArrayInputChange = (e, field) => {
    const value = e.target.value.split("\n").map((item) => item.trim());
    setUpdatedRecipe((prevRecipe) => ({ ...prevRecipe, [field]: value }));
  };

  const handleSave = async () => {
    if (!updatedRecipe.title || !updatedRecipe.ingredients || !updatedRecipe.steps) {
      alert("Title, ingredients, and steps are required fields!");
      return;
    }

    const formattedRecipe = {
      ...updatedRecipe,
      ingredients: Array.isArray(updatedRecipe.ingredients)
        ? updatedRecipe.ingredients
        : updatedRecipe.ingredients.split(",").map((item) => item.trim()),
      steps: Array.isArray(updatedRecipe.steps)
        ? updatedRecipe.steps
        : updatedRecipe.steps.split(".").map((item) => item.trim()),
      tags: Array.isArray(updatedRecipe.tags)
        ? updatedRecipe.tags
        : updatedRecipe.tags.split(",").map((item) => item.trim()),
      lastUpdated: new Date().toISOString(),
    };

    try {
      // Send the PUT request
      const response = await axios.put(`http://localhost:3001/recipes/${id}`, formattedRecipe);

      if (response.status === 200) {
        alert("Recipe updated successfully.");
        window.location.href = `/recipe/${id}`; // Navigate to the detailed recipe page
      }
    } catch (error) {
      console.error("Error updating recipe:", error);
      if (error.response && error.response.status !== 200) {
        alert("An error occurred while updating the recipe. Please try again.");
      }
    }
  };

  if (!updatedRecipe) return <p>Loading...</p>;

  return (
    <div className="edit-recipe-container">
      <h1>Edit Recipe</h1>
      <input
        type="text"
        name="title"
        value={updatedRecipe?.title || ""}
        onChange={handleInputChange}
        className="edit-recipe-input"
        placeholder="Enter recipe title"
      />
      <textarea
        name="description"
        value={updatedRecipe?.description || ""}
        onChange={handleInputChange}
        className="edit-recipe-textarea"
        placeholder="Enter recipe description"
      />
      <textarea
        name="ingredients"
        value={updatedRecipe?.ingredients?.join("\n") || ""}
        onChange={(e) => handleArrayInputChange(e, "ingredients")}
        className="edit-recipe-textarea"
        placeholder="Enter ingredients (one per line)"
      />
      <textarea
        name="steps"
        value={updatedRecipe?.steps?.join("\n") || ""}
        onChange={(e) => handleArrayInputChange(e, "steps")}
        className="edit-recipe-textarea"
        placeholder="Enter steps (one per line)"
      />
      <textarea
        name="tags"
        value={updatedRecipe?.tags?.join(", ") || ""}
        onChange={(e) => handleArrayInputChange(e, "tags")}
        className="edit-recipe-textarea"
        placeholder="Enter tags (comma-separated)"
      />
      <input
        type="text"
        name="image"
        value={updatedRecipe?.image || ""}
        onChange={handleInputChange}
        className="edit-recipe-input"
        placeholder="Enter image URL"
      />
      <select
        name="difficulty"
        value={updatedRecipe?.difficulty || "Easy"}
        onChange={handleInputChange}
        className="edit-recipe-select"
      >
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>
      <div className="edit-recipe-buttons">
        <button
          onClick={handleSave}
          className="save-button"
        >
          Save
        </button>
        <button
          onClick={() => window.history.back()}
          className="cancel-button"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditRecipeForm;
