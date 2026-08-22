import { GoogleGenAI } from "@google/genai";
import { buildResumePrompt } from "../prompts/resumePrompt";
import { buildHrMatchPrompt } from "../prompts/hrMatchPrompt";
import { parseGeminiResponse } from "../utils/jsonParser";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY!
});

export async function analyzeResume(resumeText: string) {

    const prompt = buildResumePrompt(resumeText);

    const response = await ai.models.generateContent({
        model: "models/gemini-3.6-flash",
        contents: prompt
    });

    const result = parseGeminiResponse(response.text!);

    return result;
}

export async function matchResumeToRequirements(
    resumeText: string,
    requirements: string
) {

    const prompt = buildHrMatchPrompt(resumeText, requirements);

    const response = await ai.models.generateContent({
        model: "models/gemini-3.6-flash",
        contents: prompt
    });

    const result = parseGeminiResponse(response.text!);

    return result;
}