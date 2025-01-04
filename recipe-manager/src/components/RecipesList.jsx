import React from "react";
import { useNavigate } from "react-router-dom";
import "./RecipesList.css";

const RecipesList = ({ recipes, handleDeleteRecipe }) => {
  const navigate = useNavigate();

  return (
    <div className="recipe-list-container">
      <div className="recipe-grid-container">
        {recipes.length === 0 ? (
          <p className="no-recipes-message">
            No recipes found. Try adjusting your search or filters.
          </p>
        ) : (
          recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="recipe-card-link"
              onClick={() => navigate(`/recipe/${recipe.id}`)}
            >
              <div
                className="recipe-card"
                style={{
                  backgroundImage: `url(${recipe.image || "default-placeholder.jpg"})`,
                }}
              >
                {/* Hover buttons (Edit + Delete) */}
                <div className="card-buttons">
                  <button
                    className="edit-button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation(); // Prevent navigation
                      navigate(`/recipe/${recipe.id}/edit`, { state: { recipe } });
                    }}
                  >
                    ✏️
                  </button>
                  <button
                    className="delete-button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation(); // Prevent navigation
                      handleDeleteRecipe(recipe.id);
                    }}
                  >
                    🗑️
                  </button>
                </div>

                {/* Title + Description */}
                <div className="recipe-card-content">
                  <h3 className="recipe-card-title">{recipe.title}</h3>
                  <p className="recipe-card-description">{recipe.description}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecipesList;
