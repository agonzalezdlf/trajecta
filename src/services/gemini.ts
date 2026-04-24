import { OnboardingData, UserRoadmap } from "../types";

export async function generateRoadmap(data: OnboardingData): Promise<UserRoadmap> {
  try {
    const response = await fetch("/api/gemini/generate-roadmap", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to generate roadmap server-side");
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
    console.error("Client proxy Error (generateRoadmap):", error);
    throw error;
  }
}

export async function suggestFocusAreas(goal: string, motivation: string): Promise<string[]> {
  try {
    const response = await fetch("/api/gemini/suggest-focus-areas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ goal, motivation }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to suggest focus areas server-side");
    }

    return await response.json() as string[];
  } catch (error) {
    console.error("Client proxy Error (suggestFocusAreas):", error);
    throw error;
  }
}
