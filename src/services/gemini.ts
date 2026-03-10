import { GoogleGenAI, Type } from "@google/genai";

let aiInstance: GoogleGenAI | null = null;

function getAI() {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
      throw new Error("Gemini API key is not configured.");
    }
    aiInstance = new GoogleGenAI({ apiKey });
  }
  return aiInstance;
}

export async function getHistoricalQuotes() {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Generate a list of 20 highly motivational historical quotes from famous figures (philosophers, leaders, scientists). Include the author and their historical context. Format as JSON array of objects with 'text', 'author', and 'context' fields.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              text: { type: Type.STRING },
              author: { type: Type.STRING },
              context: { type: Type.STRING }
            },
            required: ["text", "author", "context"]
          }
        }
      }
    });

    return JSON.parse(response.text);
  } catch (e) {
    console.error("Failed to fetch quotes", e);
    // Return fallback quotes so the app doesn't crash
    return [
      {
        text: "The only way to do great work is to love what you do.",
        author: "Steve Jobs",
        context: "Co-founder of Apple"
      },
      {
        text: "It does not matter how slowly you go as long as you do not stop.",
        author: "Confucius",
        context: "Chinese philosopher"
      },
      {
        text: "The future belongs to those who believe in the beauty of their dreams.",
        author: "Eleanor Roosevelt",
        context: "Former First Lady of the US"
      }
    ];
  }
}
