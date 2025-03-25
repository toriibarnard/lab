import express from "express";
import serverless from "serverless-http";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const api = express();
const router = express.Router();

// Enable CORS for all routes
api.use(cors());

const API_KEY = process.env.SPOONACULAR_API_KEY;  // Your Spoonacular API key

// Endpoint to search recipes based on ingredients
router.get("/recipes", async (req, res) => {
  const ingredients = req.query.ingredients;
  if (!ingredients) {
    return res.status(400).json({ error: "Ingredients are required" });
  }

  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&apiKey=${API_KEY}`
    );
    const data = await response.json();

    if (data.length === 0) {
      return res.status(404).json({ error: "No recipes found" });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

api.use("/api/", router);

export const handler = serverless(api);
