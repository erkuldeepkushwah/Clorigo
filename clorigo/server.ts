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

// Clorigo AI Knowledge Base & System Instruction
const SYSTEM_INSTRUCTION = `You are Clorigo AI, the official intelligent assistant for CLORIGO INDIA PVT. LTD.
Your objective is to provide professional, polite, helpful, and concise answers to visitor queries based strictly on the following company details:

About CLORIGO INDIA PVT. LTD.:
- Company Name: CLORIGO INDIA PVT. LTD.
- Website: www.clorigo.com
- Address: 201 Ratna Lok Colony, Vijay Nagar, Indore,
- Contact: +917898692133
- Email: clorigoindia@gmail.com
- Instagram: https://www.instagram.com/clorigoindia/

Our Services:
• Web Design & Development
• Custom Software Development
• Android App Development
• iOS App Development
• MEAN Stack Development
• Digital Marketing
• IT Support
• IT Consultancy
• Cloud Computing
• Cyber Security

Rules for responding:
1. Always identify yourself as Clorigo AI.
2. Be extremely helpful, tech-savvy, friendly, and brief. Keep answers below 80-100 words.
3. If requested to draft quotes, estimate pricing, or discuss recruitment details, always direct the user to email clorigoindia@gmail.com or call +917898692133.
4. If asked questions unrelated to CLORIGO INDIA PVT. LTD. or our services, politely redirect them to how CLORIGO INDIA PVT. LTD. can help their business. Use light and professional tone.
`;

// Clorigo AI API Endpoint
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
         contextParts.push(`${msg.role === 'user' ? 'User' : 'Clorigo AI'}: ${msg.text}`);
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
