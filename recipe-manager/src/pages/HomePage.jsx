import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./HomePage.css"; // Import the dedicated CSS file for the homepage

const HomePage = () => {
  const [featuredRecipes, setFeaturedRecipes] = useState([]);

  useEffect(() => {
    // Fetch recipes and select three as featured recipes
    axios
      .get("http://localhost:3001/recipes")
      .then((response) => {
        const recipes = response.data;
        if (recipes.length > 0) {
          // Shuffle and take the first three recipes
          const shuffledRecipes = recipes.sort(() => 0.5 - Math.random());
          setFeaturedRecipes(shuffledRecipes.slice(0, 3));
        }
      })
      .catch((err) => console.error("Failed to fetch recipes:", err));
  }, []);

  return (
    <div className="homepage-container">
      {/* Welcoming Message */}
      <div className="welcome-section">
        <h1>Welcome to Recipe Manager</h1>
        <p>Your ultimate app for managing and exploring delicious recipes!</p>
      </div>

      {/* Featured Recipes Section */}
      <div className="featured-section">
        <h2>Featured Recipes</h2>
        <div className="recipe-cards-container">
          {featuredRecipes.length > 0 ? (
            featuredRecipes.map((recipe) => (
              <div key={recipe.id} className="recipe-card">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="recipe-card-image"
                />
                <div className="recipe-card-content">
                  <h3>{recipe.title}</h3>
                  <p>{recipe.description.substring(0, 100)}...</p>
                  <Link
                    to={`/recipe/${recipe.id}`}
                    className="view-recipe-link"
                  >
                    View Full Recipe
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p>Loading featured recipes...</p>
          )}
        </div>
      </div>

      {/* Projects Section (Placeholder) */}
      <div className="projects-section">
        <h2>My Web and Mobile 1 Projects</h2>
        <p>(This section will list all projects with external links.)</p>
      </div>
    </div>
  );
};

export default HomePage;
