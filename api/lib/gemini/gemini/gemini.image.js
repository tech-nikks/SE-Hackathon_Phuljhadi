import dotenv from "dotenv";

dotenv.config();

import * as fs from "fs";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

function fileToGenerativePath(path ,mimeType){
    return {
        inlineData: {
            data: Buffer.from(fs.readFileSync(path)).toString("base64"),
            mimeType,
        },
    };
}

async function run(){
    const model = genAI.getGenerativeModel({model:"gemini-pro-vision"});
    const prompt = "List top 3 common colors in this";

    const imageParts = [fileToGenerativePath("recipe.jpg","image/jpeg")];

    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = response.text();
    console.log(text);
}

run();
