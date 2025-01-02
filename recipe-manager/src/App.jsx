import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RecipesOverviewPage from "./pages/RecipesOverviewPage";
import RecipePage from "./pages/RecipePage";
import CreateRecipe from "./components/CreateRecipe"; // Update this import
import ContactPage from "./pages/ContactPage";
import NavBar from "./components/NavBar";

const App = () => {
  const [recipes, setRecipes] = useState([]); // Add state for managing recipes

  const handleRecipeAdded = (newRecipe) => {
    // Update recipes state when a new recipe is added
    setRecipes((prevRecipes) => [...prevRecipes, newRecipe]);
  };

  return (
    <Router>
      <div style={{ display: "flex", height: "100vh" }}>
        {/* NavBar on the left */}
          <NavBar />

        {/* Main content on the right */}
        <div style={{ flex: 1, padding: "20px", overflowY: "auto" }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/recipes" element={<RecipesOverviewPage recipes={recipes} />} />
            <Route path="/recipe/:id" element={<RecipePage />} />
            <Route
              path="/create"
              element={<CreateRecipe onRecipeAdded={handleRecipeAdded} />}
            />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
