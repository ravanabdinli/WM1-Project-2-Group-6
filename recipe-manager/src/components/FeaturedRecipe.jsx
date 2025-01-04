import React from "react";

const FeaturedRecipe = ({ recipe }) => {
  return (
    <div style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "8px", marginBottom: "20px" }}>
      <h2>Featured Recipe: {recipe.title}</h2>
      <img
        src={recipe.image || "default-placeholder.jpg"}
        alt={recipe.title}
        style={{ width: "100%", maxHeight: "300px", objectFit: "cover", marginBottom: "10px" }}
      />
      <p>
        <strong>Ingredients:</strong> {recipe.ingredients.join(", ")}
      </p>
      <p>
        <strong>Steps:</strong>
      </p>
      <ol>
        {recipe.steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
    </div>
  );
};

export default FeaturedRecipe;
