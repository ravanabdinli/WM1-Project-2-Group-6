import React from "react";
import CreateRecipe from "../components/CreateRecipe";
import "./CreateRecipePage.css"; // Ensure the CSS file is correctly linked

const CreateRecipePage = ({ onRecipeAdded }) => {
  return (
    <div className="create-recipe-page">
      <div className="create-recipe-container">
        <h1>Create a New Recipe</h1>
        {/* Pass down onRecipeAdded to CreateRecipe */}
        <CreateRecipe onRecipeAdded={onRecipeAdded} />
      </div>
    </div>
  );
};

export default CreateRecipePage;
