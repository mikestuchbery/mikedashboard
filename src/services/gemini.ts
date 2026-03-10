import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function getHistoricalQuotes() {
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

  try {
    return JSON.parse(response.text);
  } catch (e) {
    console.error("Failed to parse quotes", e);
    return [
      {
        text: "The only way to do great work is to love what you do.",
        author: "Steve Jobs",
        context: "Co-founder of Apple"
      }
    ];
  }
}
