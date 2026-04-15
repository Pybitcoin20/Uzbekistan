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

export async function generateItinerary(days: number, interests: string[]) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are a world-class travel architect for Uzbekistan. 
      Create a high-end, efficient ${days}-day travel itinerary focusing on: ${interests.join(", ")}.
      
      CRITICAL CONSTRAINTS:
      1. Logistics: Account for travel time between cities (e.g., Afrosiyob high-speed train).
      2. Authenticity: Include at least one 'hidden gem' per city.
      3. Timing: Suggest optimal times for photography (Golden Hour at Registan).
      4. Format: Return ONLY a JSON array of objects.
      
      JSON Structure:
      [
        {
          "day": number,
          "title": "City Name: Theme of the Day",
          "activities": ["Activity 1 with 1-sentence description", "Activity 2..."]
        }
      ]`,
      config: {
        systemInstruction: "You are a premium travel concierge for Uzbekistan. You provide highly detailed, efficient, and culturally rich itineraries.",
        responseMimeType: "application/json"
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Itinerary Error:", error);
    return null; // Let the backend handle the fallback
  }
}

export async function getSmartRecommendation(currentLocation: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `The user is currently at ${currentLocation}. Suggest the absolute best next place to visit within walking distance or a short taxi ride. Explain why in one sentence.`,
      config: {
        systemInstruction: "You are a smart local guide in Uzbekistan. You know the hidden gems and the best logistics."
      }
    });
    return response.text;
  } catch (error) {
    console.error("Recommendation Error:", error);
    return "Head to the nearest local bazaar for some fresh tea and sweets.";
  }
}
