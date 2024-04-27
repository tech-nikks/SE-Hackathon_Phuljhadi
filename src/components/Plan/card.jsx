import React, { useState } from "react";
import "./Plan.css";
import Button from "@mui/material/Button";
import axios from "axios";
import LinearIndeterminate from "./loading.jsx";

const Card = ({ meal, dish, calories, recipeLink }) => {
  // State to store the recipe data
  const [recipeData, setRecipeData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch recipe data
  const fetchRecipe = async () => {
    try {
      // Set loading state
      setIsLoading(true);
      // Make axios request to the recipe endpoint, sending dish name as a parameter
      const response = await axios.get("http://localhost:8000/recipe", {
        params: { dishName: dish },
      });
      // Set recipe data
      setRecipeData(response.data);
      // Reset loading and error states
      setIsLoading(false);
      setError(null);
    } catch (error) {
      // Handle errors
      setIsLoading(false);
      setError("Error fetching recipe. Please try again later.");
    }
  };

  // Function to determine color based on calorie value
  const getCaloriesColor = () => {
    if (calories < 500) {
      return "green";
    } else if (calories >= 500 && calories <= 1500) {
      return "orange";
    } else {
      return "red";
    }
  };

  return (
    <div>
      <div className="card">
        <p className="bold">{meal}</p>
        <p>{dish}</p>
        <p style={{ color: getCaloriesColor() }}>{calories} cal</p>
        <Button variant="contained" onClick={fetchRecipe}>
          View Recipe
        </Button>
      </div>
      {/* Display recipe data if available */}
      {isLoading && <LinearIndeterminate />}
      {error && <p>{error}</p>}
      {recipeData && (
        <div>
          <p>Recipe:</p>
          <p>{recipeData}</p>
        </div>
      )}
    </div>
  );
};

export default Card;
