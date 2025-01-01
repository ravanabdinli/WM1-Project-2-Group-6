import React from "react";
import { Link } from "react-router-dom";

const RecipesList = ({ recipes }) => {
  return (
    <div>
      <h2>All Recipes</h2>
      <ul>
        {recipes.length === 0 ? (
          <p>No recipes found. Try adjusting your search or filters.</p>
        ) : (
          recipes.map((recipe) => (
            <li key={recipe.id} style={{ marginBottom: "20px" }}>
              <img
                src={recipe.image || "default-placeholder.jpg"}
                alt={recipe.title}
                style={{
                  width: "100px",
                  height: "100px",
                  marginRight: "10px",
                  objectFit: "cover",
                }}
              />
              <Link to={`/recipe/${recipe.id}`}>
                <h3>{recipe.title}</h3>
              </Link>
              <p>{recipe.description}</p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default RecipesList;
