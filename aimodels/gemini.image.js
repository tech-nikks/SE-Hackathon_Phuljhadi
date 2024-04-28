const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const path = require('path');
const meow = "../backend-iskimaaka/routes/image.jpg";

dotenv.config();


const genAI = new GoogleGenerativeAI("AIzaSyBWr5Y2wVDvBYIsAoXpz9_pl2KYoBXPXbo");

function fileToGenerativePath(filePath, mimeType){
    return {
        inlineData: {
            data: Buffer.from(fs.readFileSync(filePath)).toString("base64"),
            mimeType,
        },
    };
}

async function run(){
    const model = genAI.getGenerativeModel({model:"gemini-pro-vision"});
    const prompt = "List out the ingredients from the  image provided and then prepare a detailed recipe out of it"; // Add an equal sign after 'prompt'

    const imageParts = [fileToGenerativePath(meow,"image/jpeg")]; // Replace "image.jpg" with the correct image file path
    console.log(imageParts);

    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    return response.text();
}

module.exports = { run };
