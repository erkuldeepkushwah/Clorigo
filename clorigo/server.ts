```ts
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();

// Cloudflare/Server port
const PORT = process.env.PORT || 3000;

app.use(express.json());

/*
  Gemini API Key

  Cloudflare Pages:
  Settings → Variables and Secrets

  Name:
  GEMINI_API_KEY

  Value:
  AIzaSyALWzpiveot5UBYuNRTuzAs3jzILA0wiVM
*/
const apiKey = process.env.GEMINI_API_KEY || "";

console.log(
  "GEMINI_API_KEY =",
  apiKey ? "FOUND" : "MISSING"
);

// Gemini Client
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
        error: "GEMINI_API_KEY not found",
      });
    }

    const chat = ai.chats.create({
      model: "gemini-2.5-flash",
    });

    const result = await chat.sendMessage({
      message,
    });

    res.json({
      text: result.text,
    });
  } catch (error: any) {
    console.error(error);

    res.status(500).json({
      error: error.message,
    });
  }
});

// Frontend
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

    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  // Start server
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
```
