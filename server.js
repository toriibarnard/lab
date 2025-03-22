require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3000;

// enable cors
app.use(cors());

// spoonacular api key from the env variable
const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY;
const SPOONACULAR_BASE_URL = 'https://api.spoonacular.com/recipes';

// func to fetch recipes from spoonacular
async function getRecipeRecommendations(diet, ingredients) {
  try {
    const response = await axios.get(`${SPOONACULAR_BASE_URL}/findByIngredients`, {
      params: {
        ingredients: ingredients.join(','),
        diet: diet,  // dietary restrictions
        number: 5,   // number of recipes to fetch
        apiKey: SPOONACULAR_API_KEY,
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching recipes", error);
    throw error;
  }
}

// api route for recommendations
app.get('/api/recommendations', async (req, res) => {
  const { diet, ingredients } = req.query; // get dietary restrictions and ingredients from query
  if (!diet || !ingredients) {
    return res.status(400).send('Diet and ingredients are required');
  }

  try {
    const ingredientsArray = ingredients.split(','); // convert comma seperated ingredients to array
    const recipes = await getRecipeRecommendations(diet, ingredientsArray);
    res.json(recipes);
  } catch (error) {
    res.status(500).send('Error fetching recipe recommendations');
  }
});

// start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
