import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [featuredRecipe, setFeaturedRecipe] = useState(null);

  useEffect(() => {
    // Fetch recipes and select one as the featured recipe
    axios
      .get("http://localhost:3001/recipes")
      .then((response) => {
        const recipes = response.data;
        if (recipes.length > 0) {
          // Randomly select a recipe to feature
          const randomIndex = Math.floor(Math.random() * recipes.length);
          setFeaturedRecipe(recipes[randomIndex]);
        }
      })
      .catch((err) => console.error("Failed to fetch recipes:", err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      {/* Welcoming Message */}
      <h1>Welcome to Recipe Manager</h1>
      <p>Your ultimate app for managing and exploring delicious recipes!</p>

      {/* Featured Recipe Section */}
      <div style={{ marginTop: "30px" }}>
        <h2>Featured Recipe</h2>
        {featuredRecipe ? (
          <div
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "15px",
              background: "#f9f9f9",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            <h3>{featuredRecipe.title}</h3>
            <p>{featuredRecipe.description}</p>
            <Link
              to={`/recipe/${featuredRecipe.id}`}
              style={{ color: "#007BFF", textDecoration: "none" }}
            >
              View Full Recipe
            </Link>
          </div>
        ) : (
          <p>Loading featured recipe...</p>
        )}
      </div>

      {/* Projects Section (Placeholder) */}
      <div style={{ marginTop: "30px" }}>
        <h2>My Web and Mobile 1 Projects</h2>
        <p>(This section will list all projects with external links.)</p>
      </div>
    </div>
  );
};

export default HomePage;
