import express from "express";
import serverless from "serverless-http";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const router = express.Router();

const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY;

const DIET_CATEGORIES = [
    "Vegetarian",
    "Vegan",
    "Ketogenic",
    "Gluten Free",
    "Pescetarian",
    "Paleo",
    "Whole30"
];

router.get("/recommend-diet", async (req, res) => {
    const { diet } = req.query;
    if (!diet || !DIET_CATEGORIES.includes(diet)) {
        return res.status(400).json({ error: "Invalid or missing diet category" });
    }

    try {
        const url = `https://api.spoonacular.com/recipes/complexSearch?diet=${encodeURIComponent(diet)}&number=5&apiKey=${SPOONACULAR_API_KEY}`;
        console.log("Fetching:", url); 

        const response = await fetch(url);
        const data = await response.json();
        console.log("API Response:", data); 

        if (!data.results || data.results.length === 0) {
            return res.status(404).json({ error: "No recipes found for this diet" });
        }

        res.json({
            diet: diet,
            recipes: data.results.map(recipe => ({
                title: recipe.title,
                image: recipe.image
            }))
        });

    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

app.use("/api", router);
export const handler = serverless(app);
