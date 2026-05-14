import { GoogleGenAI, Type } from "@google/genai";

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { goal, motivation } = req.body;
    const prompt = `
      The user wants to achieve this goal: "${goal}".
      Their current situation/stoppers: "${motivation}".
      
      Based on this context, suggest exactly 8 personalized focus areas.
      
      CRITICAL: Each area MUST be:
      1. Very short (1-3 words maximum).
      2. Extremely clear and understandable (e.g., use "Talking to Customers" instead of "Stakeholder Management").
      3. Use simple language that a person with ZERO knowledge would understand.
      4. Tailored specifically to the goal and obstacles mentioned above.
      
      Return as a JSON array of strings.
    `;
    
    const response = await genAI.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });

    const suggested = JSON.parse(response.text);
    res.status(200).json(suggested);
  } catch (error: any) {
    console.error("API Error (suggestFocusAreas):", error);
    res.status(500).json({ error: error.message });
  }
}
