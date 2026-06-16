import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Chat Helpers
function getGeminiClient(): { ai: GoogleGenAI; error?: string } {
  const currentApiKey = process.env.GEMINI_API_KEY || process.env.API_KEY || "";
  if (!currentApiKey) {
    return { 
      ai: null as any, 
      error: "Gemini API Key is not configured on the server. Please check Settings (Gear icon) > Secrets." 
    };
  }

  const ai = new GoogleGenAI({
    apiKey: currentApiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
  return { ai };
}

// CloriBot Knowledge Base & System Instruction
const SYSTEM_INSTRUCTION = `You are CloriBot, the official intelligent assistant for Clorigo Infotech.
Your objective is to provide professional, polite, helpful, and concise answers to visitor queries based strictly on the following company information:

About Clorigo Infotech:
- Clorigo Infotech is a premier software development provider specializing in creating innovative, robust, and scalable digital solutions.
- Our tagline/motto is: "Redefining Innovation."
- We focus on increasing business success through technological digital transformation.

Our Services:
1. Web Development: Scalable front-end and back-end applications using modern technologies (React, Node.js).
2. Mobile App Development: Custom iOS and Android apps using native and cross-platform technologies (Flutter, React Native).
3. UI/UX Design: Sleek, responsive, and visually stunning digital user experiences.
4. Digital Marketing: Targeted SEO, SEM, and social media campaigns to drive ROI and online presence.
5. E-Commerce: High-performance online stores with secure checkout, payment integrations, and custom inventories.
6. Cyber Security: Protecting digital assets, databases, and application files through firewalls and regular security audits.
7. Machine Learning: Intelligent analytics, advanced models, and computer-vision systems.
8. Agentic AI: Autonomous agents designed to handle pipelines, workflows, and task execution with planning and reasoning.
9. Generative AI: Advanced LLMs and content generation systems implemented directly for enterprise enhancement.

Careers:
- We are always looking for passionate UI/UX designers, developers, and digital marketing experts.
- Candidates can contact us or email: clorigoindia@gmail.com

Contact Details:
- Official email for quotes, queries, and business support: clorigoindia@gmail.com
- Suggest visitors go to our "Connect / Free Consultation" form located in the footer or contact section of the page to submit their requests.

Rules for responding:
1. Be extremely helpful, tech-savvy, friendly, and brief. Keep answers below 80-100 words.
2. If requested to draft quotes, estimate pricing, or discuss recruitment details, always direct the user to email clorigoindia@gmail.com or fill out the Contact Form.
3. If asked questions unrelated to Clorigo Infotech or IT solutions, politely redirect them to how Clorigo Infotech can help their business. Use light and professional tone.
`;

// CloriBot API Endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      res.status(400).json({ error: "Message is required." });
      return;
    }

    const { ai, error } = getGeminiClient();
    if (error || !ai) {
      res.status(500).json({ error: error || "Gemini Client could not be initialized." });
      return;
    }

    // Prepare previous history as a single user prompt
    const contextParts = [];
    if (Array.isArray(history)) {
      const recentHistory = history.slice(-8);
      for (const msg of recentHistory) {
         contextParts.push(`${msg.role === 'user' ? 'User' : 'CloriBot'}: ${msg.text}`);
      }
    }
    contextParts.push(`User: ${message}`);
    const fullPrompt = contextParts.join("\n\n");

    const modelsToTry = ["gemini-2.5-flash", "gemini-3.5-flash", "gemini-3.1-flash-lite", "gemini-3.1-pro-preview", "gemini-flash-latest"];
    let lastError: any = null;
    let responseText = "";

    // Iterate over candidate models using the official standard SDK to generate content directly
    for (const modelName of modelsToTry) {
      try {
        console.log(`[SDK] Requesting model: ${modelName}`);
        const result = await ai.models.generateContent({
          model: modelName,
          contents: fullPrompt,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
          }
        });

        if (result && result.text) {
          responseText = result.text;
          console.log(`[Success] Got response via SDK using model: ${modelName}`);
          break;
        }
      } catch (err: any) {
        console.warn(`[Warning] SDK content generation failed for ${modelName}:`, err.message || err);
        lastError = err;
      }
    }

    if (!responseText) {
      throw lastError || new Error("Failed to generate response with all attempted models.");
    }

    res.json({ text: responseText });
  } catch (error: any) {
    console.error("Gemini server-side API error:", error);
    res.status(500).json({ error: error?.message || "Internal server error." });
  }
});

// Vite frontend serving logic
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}

startServer();
