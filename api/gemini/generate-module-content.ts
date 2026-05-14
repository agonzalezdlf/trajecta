import { GoogleGenAI, Type } from "@google/genai";

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { moduleTitle, moduleDesc, goal } = req.body;
    const prompt = `
      The user is following a roadmap for the goal: "${goal}".
      Generate educational content for the specific module: "${moduleTitle}" (${moduleDesc}).
      
      Generate either a "lesson" or a "quiz" depending on what fits best.
      If it's a lesson, provide a high-quality, actionable reading in markdown.
      If it's a quiz, provide 3-5 multiple choice questions.
      
      Return as JSON matching the specified schema.
    `;

    const response = await genAI.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            type: { type: Type.STRING, description: "lesson or quiz" },
            body: { type: Type.STRING, description: "Markdown content for lesson (optional)" },
            quiz: {
              type: Type.ARRAY,
              optional: true,
              items: {
                type: Type.OBJECT,
                properties: {
                  question: { type: Type.STRING },
                  options: { type: Type.ARRAY, items: { type: Type.STRING } },
                  correctAnswer: { type: Type.NUMBER, description: "Index of correct option" },
                  explanation: { type: Type.STRING }
                }
              }
            }
          }
        }
      }
    });

    const content = JSON.parse(response.text);
    res.status(200).json(content);
  } catch (error: any) {
    console.error("API Error (generateModuleContent):", error);
    res.status(500).json({ error: error.message });
  }
}
