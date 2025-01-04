import React, { useState, useEffect } from "react";
import axios from "axios";
import RecipesList from "../components/RecipesList";
import "./RecipesOverviewPage.css"; // Add a CSS file for styling

const RecipesOverviewPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDifficulty, setFilterDifficulty] = useState("");
  const [filterTags, setFilterTags] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const RECIPES_PER_PAGE = 12;

  useEffect(() => {
    // Fetch recipes from server
    axios
      .get("http://localhost:3001/recipes")
      .then((response) => {
        setRecipes(response.data);
      })
      .catch((err) => {
        console.error("Failed to fetch recipes:", err);
      });
  }, []);

  // Search function
  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
    setCurrentPage(1); // Reset to first page
  };

  // Filter by difficulty
  const handleFilterDifficulty = (e) => {
    setFilterDifficulty(e.target.value);
    setCurrentPage(1); // Reset to first page
  };

  // Filter by tags
  const handleFilterTags = (e) => {
    setFilterTags(e.target.value.toLowerCase());
    setCurrentPage(1); // Reset to first page
  };

  // Sort function
  const handleSort = (e) => {
    setSortOption(e.target.value);
    setCurrentPage(1); // Reset to first page
  };

  // Apply Search, Filter, and Sort
  const filteredRecipes = recipes
    .filter((recipe) => {
      const matchesSearch =
        recipe.title?.toLowerCase().includes(searchQuery) ||
        recipe.description?.toLowerCase().includes(searchQuery) ||
        recipe.ingredients?.some((ingredient) =>
          ingredient.toLowerCase().includes(searchQuery)
        );

      const matchesDifficulty =
        !filterDifficulty || recipe.difficulty === filterDifficulty;

      const matchesTags =
        !filterTags ||
        recipe.tags?.some((tag) => tag.toLowerCase().includes(filterTags));

      return matchesSearch && matchesDifficulty && matchesTags;
    })
    .sort((a, b) => {
      if (sortOption === "title") {
        return a.title.localeCompare(b.title);
      } else if (sortOption === "createTime") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      } else if (sortOption === "updateTime") {
        return new Date(b.lastUpdated) - new Date(a.lastUpdated);
      } else if (sortOption === "difficulty") {
        const difficultyLevels = { Easy: 1, Medium: 2, Hard: 3 };
        return difficultyLevels[a.difficulty] - difficultyLevels[b.difficulty];
      }
      return 0;
    });

  // Pagination logic
  const totalRecipes = filteredRecipes.length;
  const totalPages = Math.ceil(totalRecipes / RECIPES_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDeleteRecipe = (recipeId) => {
    axios
      .delete(`http://localhost:3001/recipes/${recipeId}`)
      .then(() => {
        setRecipes((prevRecipes) => {
          const updatedRecipes = prevRecipes.filter((recipe) => recipe.id !== recipeId);
          const newTotalPages = Math.ceil(updatedRecipes.length / RECIPES_PER_PAGE);
          // If the current page becomes invalid (e.g., no more recipes on the current page), move to the last valid page
          if (currentPage > newTotalPages) {
            setCurrentPage(newTotalPages);
          }
          return updatedRecipes;
        });
        alert("Recipe deleted successfully.");
      })
      .catch((error) => {
        console.error("Error deleting recipe:", error);
        alert("An error occurred while deleting the recipe. Please try again.");
      });
  };

  const paginatedRecipes = filteredRecipes.slice(
    (currentPage - 1) * RECIPES_PER_PAGE,
    currentPage * RECIPES_PER_PAGE
  );

  return (
    <div className="recipes-overview">
      <div className="recipes-header">
        <h1>🧾All Recipes🧾</h1> {/* Only this heading remains */}
        <p>Discover delicious recipes and get cooking!</p>
      </div>

      <div className="filters-container">
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchQuery}
          onChange={handleSearch}
          className="filter-input"
        />
        <select
          value={filterDifficulty}
          onChange={handleFilterDifficulty}
          className="filter-select"
        >
          <option value="">Filter by Difficulty</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
        <input
          type="text"
          placeholder="Filter by Tags"
          value={filterTags}
          onChange={handleFilterTags}
          className="filter-input"
        />
        <select
          value={sortOption}
          onChange={handleSort}
          className="filter-select"
        >
          <option value="">Sort by</option>
          <option value="title">Title</option>
          <option value="createTime">Create Time</option>
          <option value="updateTime">Last Updated</option>
          <option value="difficulty">Difficulty</option>
        </select>
      </div>

      {/* Recipe List */}
      <RecipesList recipes={paginatedRecipes} handleDeleteRecipe={handleDeleteRecipe} />

      {/* Pagination */}
      <div className="pagination-container">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`pagination-button ${currentPage === index + 1 ? "active" : ""
              }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );

};

export default RecipesOverviewPage;
