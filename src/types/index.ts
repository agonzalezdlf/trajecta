export interface RoadmapTask {
  id: string;
  title: string;
  description: string;
  duration: string; // e.g. "15-30 mins"
  type: "lesson" | "exercise" | "simulation" | "quiz" | "action";
  completed: boolean;
}

export interface RoadmapModule {
  id: string;
  title: string;
  description: string;
  tasks: RoadmapTask[];
  completed: boolean;
  progress: number; // 0-100
}

export interface RoadmapPhase {
  id: string;
  title: string;
  description: string;
  modules: RoadmapModule[];
  milestone: string;
  status: "completed" | "in_progress" | "locked";
}

export interface SkillTrack {
  id: string;
  title: string;
  level: number;
  progress: number;
}

export interface SkillGap {
  skill: string;
  isStrength: boolean;
  description: string;
}

export interface SkillGapAnalysis {
  strengths: SkillGap[];
  gaps: SkillGap[];
  summary: string;
}

export interface StreakInfo {
  current: number;
  best: number;
  lastCompletedDate: string | null; // ISO date string
  milestonesReached: number[]; // e.g. [7, 14]
}

export type SubscriptionTier = "free" | "premium";

export interface Badge {
  id: string;
  label: string;
  description: string;
  unlocked: boolean;
  type: "technical" | "soft_skill" | "foundation";
}

export interface UserRoadmap {
  goal: string;
  phases: RoadmapPhase[];
  skillTracks: SkillTrack[];
  careerReadinessScore: number;
  skillGapAnalysis?: SkillGapAnalysis;
  streak?: StreakInfo;
  badges?: Badge[];
}

export interface User {
  email: string;
  subscription: SubscriptionTier;
  goals: string[]; // Support multiple goals for premium
  joinedAt: string;
}

export interface OnboardingData {
  goal: string;
  skillLevel: string;
  interests: string[];
  hoursPerWeek: string;
  timeline: string;
  motivation: string;
  cvUrl?: string;
  linkedInUrl?: string;
}
