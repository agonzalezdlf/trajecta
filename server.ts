import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import Database from "better-sqlite3";
import fs from "fs";
import 'dotenv/config';
import { GoogleGenAI, Type } from "@google/genai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("trajecta.db");

// Initialize Gemini
const apiKey = process.env.GEMINI_API_KEY || "";
if (!apiKey) {
  console.warn("CRITICAL: GEMINI_API_KEY is not defined in server process.env");
} else {
  console.log("GEMINI_API_KEY is successfully loaded from environment.");
}
const genAI = new GoogleGenAI(apiKey);

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE,
    goal TEXT,
    onboarding_data TEXT,
    career_readiness_score INTEGER DEFAULT 0,
    streak INTEGER DEFAULT 0,
    last_active TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS roadmaps (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    goal TEXT,
    structure TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS progress (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT,
    module_id TEXT,
    task_id TEXT,
    status TEXT, -- 'completed', 'in_progress', 'locked'
    completed_at TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id)
  );
`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Gemini Integration Routes
  app.post("/api/gemini/generate-roadmap", async (req, res) => {
    if (!apiKey) {
      return res.status(500).json({ error: "GEMINI_API_KEY is not configured on the server." });
    }

    const { data } = req.body;
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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

    try {
      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
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

      let text = result.response.text();
      // Clean up potential markdown blocks
      if (text.includes("```")) {
        text = text.replace(/```json\n?|```/g, "").trim();
      }
      const roadmap = JSON.parse(text);
      res.json(roadmap);
    } catch (err) {
      console.error("Gemini Roadmap Error:", err);
      res.status(500).json({ error: (err as Error).message });
    }
  });

  app.post("/api/gemini/suggest-focus-areas", async (req, res) => {
    if (!apiKey) {
      return res.status(500).json({ error: "GEMINI_API_KEY is not configured on the server." });
    }

    const { goal, motivation } = req.body;
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      Based on the following career goal and motivation, suggest 8-10 specific focus areas or skills that the user should prioritize.
      Goal: ${goal}
      Motivation/Background: ${motivation}

      Return the result as a JSON array of strings.
      Example: ["Cloud Architecture", "Team Leadership", "Go Programming", "System Design"]
    `;

    try {
      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.STRING
            }
          }
        }
      });

      let text = result.response.text();
      if (text.includes("```")) {
        text = text.replace(/```json\n?|```/g, "").trim();
      }
      res.json(JSON.parse(text));
    } catch (err) {
      console.error("Gemini Suggest Areas Error:", err);
      res.status(500).json({ error: (err as Error).message });
    }
  });

  // Simple user persistence for the prototype
  app.post("/api/user/onboard", (req, res) => {
    const { userId, email, goal, onboardingData } = req.body;
    try {
      const stmt = db.prepare(`
        INSERT INTO users (id, email, goal, onboarding_data)
        VALUES (?, ?, ?, ?)
        ON CONFLICT(id) DO UPDATE SET
          goal = excluded.goal,
          onboarding_data = excluded.onboarding_data
      `);
      stmt.run(userId, email, goal, JSON.stringify(onboardingData));
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  });

  app.get("/api/user/:userId", (req, res) => {
    const { userId } = req.params;
    const user = db.prepare("SELECT * FROM users WHERE id = ?").get(userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
