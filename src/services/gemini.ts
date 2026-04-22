import { GoogleGenAI, Type } from "@google/genai";
import { OnboardingData, UserRoadmap } from "../types";

const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: apiKey || "" });

export async function generateRoadmap(data: OnboardingData): Promise<UserRoadmap> {
  const prompt = `
    Generate a detailed career roadmap for a user with the following goal and background:
    Goal: ${data.goal}
    Current Skill Level: ${data.skillLevel}
    Interests: ${data.interests.join(", ")}
    Available Hours per Week: ${data.hoursPerWeek}
    Timeline: ${data.timeline}
    Motivation: ${data.motivation}
    CV/Profile Info: ${data.cvUrl || data.linkedInUrl || "Not provided"}

    CRITICAL: The goal name should be a professional title (e.g., "Professional Consultant" instead of "Become a professional consultant").
    
    The roadmap should be structured into 4 phases.
    Each phase should have 2-3 modules.
    Each module should have 3-4 daily actions (15-30 mins each).
    Include 4 relevant skill tracks.
    Calculate an initial career readiness score (0-100).

    ALSO: Perform a skills gap analysis based on the provided CV/Profile info (or general knowledge if not provided). 
    Identify 3 strengths and 3 specific gaps.

    Return the roadmap in JSON format matching the UserRoadmap interface.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
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
                status: { type: Type.STRING, enum: ["completed", "in_progress", "locked"] },
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
                      tasks: {
                        type: Type.ARRAY,
                        items: {
                          type: Type.OBJECT,
                          properties: {
                            id: { type: Type.STRING },
                            title: { type: Type.STRING },
                            description: { type: Type.STRING },
                            duration: { type: Type.STRING },
                            type: { type: Type.STRING, enum: ["lesson", "exercise", "simulation", "quiz", "action"] },
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
                type: { type: Type.STRING, enum: ["technical", "soft_skill", "foundation"] }
              }
            }
          }
        }
      }
    }
  });

  const roadmap = JSON.parse(response.text || "{}") as UserRoadmap;
  
  // Ensure we have some default badges if none generated
  if (!roadmap.badges || roadmap.badges.length === 0) {
    roadmap.badges = [
      { id: "b1", label: "Foundations", description: "Completed basic orientation", unlocked: true, type: "foundation" },
      { id: "b2", label: "Early Adopter", description: "Signed up for Trajecta", unlocked: true, type: "foundation" },
      { id: "b3", label: "Skill Builder", description: "Reached Level 2 in any skill", unlocked: false, type: "technical" },
    ];
  }
  
  // Initialize streak
  roadmap.streak = {
    current: 0,
    best: 0,
    lastCompletedDate: null,
    milestonesReached: []
  };

  return roadmap;
}
