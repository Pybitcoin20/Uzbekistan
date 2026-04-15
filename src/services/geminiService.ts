import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function getCulturalInsights(locationName: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Provide a brief, fascinating cultural insight about ${locationName} in Uzbekistan. Keep it under 100 words and focus on something a tourist wouldn't easily find in a standard guidebook.`,
      config: {
        systemInstruction: "You are an expert cultural historian specializing in Uzbekistan and the Silk Road."
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Uzbekistan is a land of deep history and warm hospitality. Each monument tells a story of centuries-old craftsmanship.";
  }
}
