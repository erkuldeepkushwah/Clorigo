```ts
import { GoogleGenAI } from "@google/genai";

export async function onRequestPost(context: any) {
  try {
    const { message } = await context.request.json();

    const apiKey = context.env.GEMINI_API_KEY;

    if (!apiKey) {
      return Response.json(
        { error: "GEMINI_API_KEY not found" },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });

    const chat = ai.chats.create({
      model: "gemini-2.5-flash",
    });

    const result = await chat.sendMessage({
      message,
    });

    return Response.json({
      text: result.text,
    });
  } catch (error: any) {
    return Response.json(
      {
        error: error?.message || "Server Error",
      },
      {
        status: 500,
      }
    );
  }
}
```

