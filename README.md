# Trajecta - Personalized Career Roadmap AI

Trajecta is a high-end educational platform that uses AI to generate personalized career roadmaps, perform skills gap analysis, and suggest priority focus areas.

## Deployment Instructions

### 1. GitHub Configuration

- Push the repository to GitHub.
- Ensure all source files are included.

### 2. Vercel Deployment

When deploying to Vercel, you need to configure your Environment Variables:

1. Go to your **Project Settings** in the Vercel Dashboard.
2. Select **Environment Variables**.
3. Add the following key:
   - **Key**: `VITE_GEMINI_API_KEY` (The `VITE_` prefix is required for client-side access in Vite-based apps)
   - **Value**: Your Google Gemini API Key.
4. **Redeploy** your project to apply the changes.

### 3. Local Development

To run the project locally:

1. Clone the repository.
2. Install dependencies: `npm install`.
3. Create a `.env` file based on `.env.example` and add your `GEMINI_API_KEY`.
4. Start the development server: `npm run dev`.

## Responsiveness

The application is designed to be fully responsive:
- **Mobile**: Optimized for touch interaction and quick progress tracking.
- **Tablet**: Expanded layouts with sidebars and larger cards.
- **Computer**: Full bento-box grid layouts for deep career analysis.

## Features

- **AI Roadmap Generation**: Custom-built paths based on your specific goals.
- **Skills Gap Analysis**: Intelligent assessment of your current strengths and weaknesses.
- **Social Network**: Connect with mentors and see community progress.
- **High-End Aesthetic**: Designed to match professional presentation standards with grainy gradients and glassmorphism.
