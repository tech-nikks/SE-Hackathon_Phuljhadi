import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function generateRecipe(ingredients) {
    
    const parsedIngredients = parseIngredients(ingredients)
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Get me a recipe with ${ingredients} and some basic spices with rice`;

    if (!isValidRecipePrompt(prompt)) {
        throw new Error("Invalid prompt. Please provide a valid recipe request.");
    }

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();

        const [ingredientPart, recipePart] = text.split("Ingredients:");
        const formattedIngredients = ingredientPart.trim();
        const formattedRecipes = recipePart.trim();

        return { ingredients: formattedIngredients, recipes: formattedRecipes };
    } catch (error) {
        throw new Error("Error occurred while generating content:", error);
    }
}

function isValidRecipePrompt(prompt) {
    const keywords = ["recipe", "ingredients", "cooking", "prepare"];
    return keywords.some(keyword => prompt.toLowerCase().includes(keyword));
}

export default generateRecipe;
