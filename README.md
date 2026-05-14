<div align="center">

# 🗺️ Trajecta

### AI-Powered Career Roadmap Platform

[![Live Demo](https://img.shields.io/badge/Live%20Demo-000000?style=flat-square&logo=vercel&logoColor=white)](https://trajecta-six.vercel.app)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google%20Gemini-8E75B2?style=flat-square&logo=google&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000?style=flat-square&logo=vercel)

</div>

---

Trajecta is a high-end career development platform that uses Google Gemini AI to generate personalized career roadmaps tailored to each user's goals and current skill set. It identifies skills gaps, prioritizes what to learn next, and connects users with mentors — turning career ambiguity into a clear, actionable path.

---

## ✨ Features

**AI Roadmap Generation** — Gemini-powered career paths built around your specific goals, experience level, and target role.

**Skills Gap Analysis** — Intelligent assessment of strengths and blind spots, with prioritized learning recommendations.

**Mentor Social Network** — Connect with professionals further along your target path and track community progress.

**Responsive Design** — Fully optimized for mobile, tablet, and desktop with a premium bento-grid layout, glassmorphism cards, and grainy gradient aesthetics.

**Secure API Proxy** — The Gemini API key is handled server-side, keeping credentials out of the browser.

---

## 🏗️ Project Structure

```
trajecta/
├── src/                  # Frontend TypeScript source
│   ├── components/       # UI components (cards, roadmap, skills grid)
│   ├── services/         # Gemini AI integration & API calls
│   └── types/            # Shared TypeScript interfaces
├── server.ts             # Express server — secure Gemini API proxy
├── vite.config.ts        # Vite bundler configuration
├── tsconfig.json         # TypeScript compiler settings
├── index.html            # App entry point
├── .env.example          # Environment variable template
└── package.json          # Dependencies & scripts
```

---

## 🚀 Local Setup

```bash
# 1. Clone the repository
git clone https://github.com/agonzalezdlf/trajecta.git
cd trajecta

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env
# Add your GEMINI_API_KEY to .env

# 4. Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## ☁️ Deployment (Vercel)

1. Push the repository to GitHub.
2. Import the project in your [Vercel Dashboard](https://vercel.com/dashboard).
3. Under **Project Settings → Environment Variables**, add:
   - `GEMINI_API_KEY` → your Google Gemini API key
4. Deploy — Vercel handles the rest.

---

<div align="center">

Built with TypeScript · Vite · Node.js · Google Gemini AI

[trajecta-six.vercel.app](https://trajecta-six.vercel.app)

</div>