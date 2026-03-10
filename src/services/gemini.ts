import { GoogleGenAI, Type } from "@google/genai";

let aiInstance: GoogleGenAI | null = null;

function getAI() {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // We don't throw here to avoid crashing the whole quote flow, 
      // we'll handle it in the service call.
      return null;
    }
    aiInstance = new GoogleGenAI({ apiKey });
  }
  return aiInstance;
}

export async function getHistoricalQuotes() {
  try {
    const ai = getAI();
    if (!ai) {
      console.warn("Gemini API key is not configured. Using fallback quotes.");
      return getFallbackQuotes();
    }
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Generate a list of 20 highly motivational historical quotes from famous figures (philosophers, leaders, scientists) who lived and spoke before 1900 CE. Do not include any quotes from the 20th or 21st centuries. Include the author and their historical context. Format as JSON array of objects with 'text', 'author', and 'context' fields.",
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
      return JSON.parse(response.text || "[]");
    } catch (parseError) {
      console.error("Failed to parse Gemini response as JSON", parseError);
      return getFallbackQuotes();
    }
  } catch (e) {
    console.error("Failed to fetch quotes", e);
    return getFallbackQuotes();
  }
}

function getFallbackQuotes() {
  return [
    {
      text: "The only way to do great work is to love what you do.",
      author: "Marcus Aurelius",
      context: "Roman Emperor and Stoic philosopher (121-180 CE)"
    },
    {
      text: "It does not matter how slowly you go as long as you do not stop.",
      author: "Confucius",
      context: "Chinese philosopher (551-479 BCE)"
    },
    {
      text: "Knowing yourself is the beginning of all wisdom.",
      author: "Aristotle",
      context: "Ancient Greek philosopher (384-322 BCE)"
    },
    {
      text: "In the middle of difficulty lies opportunity.",
      author: "Leonardo da Vinci",
      context: "Italian polymath of the High Renaissance (1452-1519)"
    }
  ];
}
