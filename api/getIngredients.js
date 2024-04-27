import express from "express";
import generateRecipe from "./gemini.start.js";

const app = express();
const port = 3000;

app.use(express.json());

app.post("/getRecipe", async (req, res) => {
    const { ingredients } = req.body;

    try {
        const recipe = await generateRecipe(ingredients);
        res.json(recipe);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
