import { OnboardingData, UserRoadmap } from "../types";

export interface ModuleContent {
  title: string;
  type: "lesson" | "quiz";
  body?: string;
  quiz?: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }[];
}

export async function generateRoadmap(data: OnboardingData): Promise<UserRoadmap> {
  try {
    const response = await fetch('/api/gemini/generate-roadmap', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data })
    });
    
    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.error || 'API request failed');
    }
    
    const roadmap = await response.json() as UserRoadmap;
    
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
  } catch (error) {
    console.error("Error (generateRoadmap):", error);
    throw error;
  }
}

export async function suggestFocusAreas(goal: string, motivation: string): Promise<string[]> {
  try {
    const response = await fetch('/api/gemini/suggest-focus-areas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ goal, motivation })
    });
    
    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.error || 'API request failed');
    }
    
    return await response.json() as string[];
  } catch (error) {
    console.error("Error (suggestFocusAreas):", error);
    throw error;
  }
}

export async function generateModuleContent(moduleTitle: string, moduleDesc: string, goal: string): Promise<ModuleContent | null> {
  try {
    const response = await fetch('/api/gemini/generate-module-content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ moduleTitle, moduleDesc, goal })
    });
    
    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.error || 'API request failed');
    }
    
    return await response.json() as ModuleContent;
  } catch (error) {
    console.error("Error (generateModuleContent):", error);
    return null;
  }
}
