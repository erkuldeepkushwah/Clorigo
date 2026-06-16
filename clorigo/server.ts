```ts
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

/*
=========================================
Cloudflare Secret

Name:
GEMINI_API_KEY

Value:
Your Gemini API Key

Cloudflare:
Pages → Settings → Variables and Secrets
=========================================
*/

const apiKey = process.env.GEMINI_API_KEY || "";

console.log(
  "GEMINI_API_KEY:",
  apiKey ? "FOUND ✅" : "MISSING ❌"
);

const ai = new GoogleGenAI({
  apiKey,
});

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        error: "Message is required",
      });
    }

    if (!apiKey) {
      return res.status(500).json({
        error: "GEMINI_API_KEY not configured",
      });
    }

    const chat = ai.chats.create({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: `
You are CloriBot, the official AI assistant of Clorigo Infotech.

Services:
- Web Development
- Mobile App Development
- UI/UX Design
- Digital Marketing
- E-Commerce
- Cyber Security
- Machine Learning
- Agentic AI
- Generative AI

Contact:
clorigoindia@gmail.com

Keep responses short and professional.
        `,
      },
    });

    const result = await chat.sendMessage({
      message,
    });

    return res.json({
      text: result.text || "No response generated.",
    });
  } catch (error: any) {
    console.error("Gemini Error:", error);

    return res.status(500).json({
      error: error?.message || "Internal Server Error",
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
      },
      appType: "spa",
    });

    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");

    app.use(express.static(distPath));

    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
  });
}

startServer();
```
