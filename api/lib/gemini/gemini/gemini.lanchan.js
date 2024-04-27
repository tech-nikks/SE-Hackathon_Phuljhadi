import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function generateRecipe() {
    
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `I want you to recommend 6 restaurants names, 6 breakfast names, 5 dinner names, and 6 workout names, based on the following criteria:"
    "Person age: 18
    "Person gender: male
    "Person weight: 68
    "Person height: 182cm
    "Person veg_or_nonveg: veg
    "Person mealFrequency: thrice a day
    "Person mealSchedule: breakfast ,lunch ,dinner
    "Person date: 28 april ,do it in a format where it would be easier for me to convert in json format`;


     
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();
        console.log(text);
}

generateRecipe()

       

     
