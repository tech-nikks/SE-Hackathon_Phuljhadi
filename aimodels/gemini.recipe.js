const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function specificRecipe(recipe) {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Get me a complete detailed recipe of ${recipe}`;


    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    return text;
}

module.exports = specificRecipe;
