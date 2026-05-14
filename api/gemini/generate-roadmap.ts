import { GoogleGenAI, Type } from "@google/genai";

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { data } = req.body;
    const prompt = `
      Create a career roadmap for: "${data.goal}".
      Current Level: ${data.skillLevel}. Motivation: ${data.motivation}.
      
      Requirements:
      - 3 phases, 2 modules per phase.
      - Each module: type (video/reading/quiz/practice), 2 short tasks.
      - Career readiness score (0-100).
      - Brief skill gap analysis (2 strengths, 2 gaps).
      - 3 skill tracks.
      - CONCISE descriptions (max 10 words).
      
      Return JSON matching UserRoadmap interface.
    `;

    const response = await genAI.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            goal: { type: Type.STRING },
            careerReadinessScore: { type: Type.NUMBER },
            skillGapAnalysis: {
              type: Type.OBJECT,
              properties: {
                summary: { type: Type.STRING },
                strengths: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      skill: { type: Type.STRING },
                      isStrength: { type: Type.BOOLEAN },
                      description: { type: Type.STRING }
                    }
                  }
                },
                gaps: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      skill: { type: Type.STRING },
                      isStrength: { type: Type.BOOLEAN },
                      description: { type: Type.STRING }
                    }
                  }
                }
              }
            },
            phases: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  status: { type: Type.STRING },
                  milestone: { type: Type.STRING },
                  modules: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        id: { type: Type.STRING },
                        title: { type: Type.STRING },
                        description: { type: Type.STRING },
                        progress: { type: Type.NUMBER },
                        completed: { type: Type.BOOLEAN },
                        type: { type: Type.STRING },
                        tasks: {
                          type: Type.ARRAY,
                          items: {
                            type: Type.OBJECT,
                            properties: {
                              id: { type: Type.STRING },
                              title: { type: Type.STRING },
                              description: { type: Type.STRING },
                              duration: { type: Type.STRING },
                              type: { type: Type.STRING },
                              completed: { type: Type.BOOLEAN }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            skillTracks: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  title: { type: Type.STRING },
                  level: { type: Type.NUMBER },
                  progress: { type: Type.NUMBER }
                }
              }
            },
            badges: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  label: { type: Type.STRING },
                  description: { type: Type.STRING },
                  unlocked: { type: Type.BOOLEAN },
                  type: { type: Type.STRING }
                }
              }
            }
          }
        }
      }
    });

    const roadmap = JSON.parse(response.text);
    res.status(200).json(roadmap);
  } catch (error: any) {
    console.error("API Error (generateRoadmap):", error);
    res.status(500).json({ error: error.message });
  }
}
