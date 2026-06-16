```ts
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

/*
=================================================
GEMINI API KEY

Cloudflare Pages
Settings → Variables and Secrets

Name:
GEMINI_API_KEY

Value:
Your Gemini API Key

Code automatically fetches:
process.env.GEMINI_API_KEY
=================================================
*/

const apiKey = process.env.GEMINI_API_KEY || "";

console.log(
  "GEMINI_API_KEY:",
  apiKey ? "FOUND ✅" : "MISSING ❌"
);

const ai = new GoogleGenAI({
  apiKey,
});

// Chat API
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
        error:
          "Gemini API Key not found. Check Cloudflare Secrets.",
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
- E-Commerce Solutions
- Cyber Security
- Machine Learning
- Agentic AI
- Generative AI

Contact:
clorigoindia@gmail.com

Rules:
- Keep answers short and professional.
- For pricing or quotations ask users to contact:
  clorigoindia@gmail.com
- Redirect unrelated questions politely.
        `,
      },
    });

    const result = await chat.sendMessage({
      message,
    });

    return res.json({
      text:
        result?.text ||
        "Sorry, I could not generate a response.",
    });
  } catch (error: any) {
    console.error("Gemini Error:", error);

    return res.status(500).json({
      error:
        error?.message || "Internal Server Error",
    });
  }
});

// Vite + Frontend
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
      res.sendFile(
        path.join(distPath, "index.html")
      );
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(
      `🚀 Server running on http://localhost:${PORT}`
    );
  });
}

startServer();
```
