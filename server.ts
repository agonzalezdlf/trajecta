import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import generateRoadmapHandler from "./api/gemini/generate-roadmap";
import suggestFocusAreasHandler from "./api/gemini/suggest-focus-areas";
import generateModuleContentHandler from "./api/gemini/generate-module-content";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes - These match the routes the frontend expects
  app.post("/api/gemini/generate-roadmap", generateRoadmapHandler);
  app.post("/api/gemini/suggest-focus-areas", suggestFocusAreasHandler);
  app.post("/api/gemini/generate-module-content", generateModuleContentHandler);

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
