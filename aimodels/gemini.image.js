
const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function imageGeneration(imageData) {
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
    const prompt = "List top 3 common colors in this";

    const imageParts = [{
        inlineData: {
            data: imageData,
            mimeType: "image/jpeg", // Adjust the mimeType as per your requirement
        },
    }];

    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = response.text();
    return text;
}

module.exports = imageGeneration;
