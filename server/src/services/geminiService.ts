import { GoogleGenAI } from "@google/genai";
import { buildPrompt } from "../prompts/qaPrompt";
import { parseGeminiResponse } from "../utils/jsonParser";



const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY!
});

console.log("API Key:", process.env.GEMINI_API_KEY?.substring(0, 10));
console.log("Model:", process.env.GEMINI_MODEL);

export async function generateTestCases(requirement: string) {

    const prompt = buildPrompt(requirement);

    const response = await ai.models.generateContent({
    model: "models/gemini-3.6-flash",
    contents: prompt
});

    const result = parseGeminiResponse(response.text!);

    return result;
}