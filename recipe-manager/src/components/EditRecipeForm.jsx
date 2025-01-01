// EditRecipeForm.jsx
import React, { useState } from "react";
import axios from "axios";

const EditRecipeForm = ({ recipe, onEditComplete }) => {
  const [updatedRecipe, setUpdatedRecipe] = useState(recipe);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedRecipe((prevRecipe) => ({ ...prevRecipe, [name]: value }));
  };

  const handleSave = () => {
    const formattedRecipe = {
      ...updatedRecipe,
      ingredients: updatedRecipe.ingredients.split(",").map((item) => item.trim()),
      steps: updatedRecipe.steps.split(".").map((item) => item.trim()),
      tags: updatedRecipe.tags.split(",").map((item) => item.trim()),
      lastUpdated: new Date().toISOString(),
    };

    axios
      .put(`http://localhost:3001/recipes/${recipe.id}`, formattedRecipe)
      .then((response) => {
        onEditComplete(response.data);
      })
      .catch((error) => {
        console.error("Error updating recipe:", error);
        alert("An error occurred while updating the recipe. Please try again.");
      });
  };

  return (
    <div>
      <input
        type="text"
        name="title"
        value={updatedRecipe.title}
        onChange={handleInputChange}
      />
      <textarea
        name="description"
        value={updatedRecipe.description}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="ingredients"
        value={updatedRecipe.ingredients}
        onChange={handleInputChange}
      />
      <textarea
        name="steps"
        value={updatedRecipe.steps}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="tags"
        value={updatedRecipe.tags}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="image"
        value={updatedRecipe.image}
        onChange={handleInputChange}
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default EditRecipeForm;