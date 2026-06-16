/**
 * Cloudflare Worker for Clorigo AI Chat Integration
 * 
 * Features:
 * 1. Exposes a POST endpoint at '/chat'
 * 2. Securely handles GEMINI_API_KEY from Cloudflare Environmental Secrets (env.GEMINI_API_KEY)
 * 3. Formats inbound messages for the Gemini API using system instructions for CLORIGO INDIA PVT. LTD.
 * 4. Proxies requests to Google Gemini without exposing credentials to client logs or responses
 * 5. Supports CORS configuration so the client-side app can connect safely
 */

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

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // 1. CORS Preflight Request Handling
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Max-Age": "86400",
        },
      });
    }

    // 2. Routing checks: Exposes POST endpoint `/chat` (or handles root POST requests)
    if (url.pathname !== "/chat") {
      return new Response(
        JSON.stringify({ error: "Not Found. Use POST /chat to interact with Clorigo AI." }),
        { 
          status: 404, 
          headers: { 
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          } 
        }
      );
    }

    if (request.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Method not allowed. Only POST requests are allowed on /chat." }),
        { 
          status: 405, 
          headers: { 
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          } 
        }
      );
    }

    try {
      // 3. KEY ACCESS POINT: Reading API Key from Cloudflare secrets environment
      // Accessed securely here as: env.GEMINI_API_KEY
      const apiKey = env.GEMINI_API_KEY;

      if (!apiKey) {
        console.error("Authentication Error: env.GEMINI_API_KEY variable is empty or undefined in Cloudflare.");
        return new Response(
          JSON.stringify({ 
            error: "Gemini API Key is not configured in your Cloudflare environmental variables/secrets. Please add GEMINI_API_KEY using wrangler secrets put GEMINI_API_KEY or the Cloudflare dashboard." 
          }),
          { 
            status: 500, 
            headers: { 
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*"
            } 
          }
        );
      }

      // 4. Client Request Parsing
      const body = await request.json().catch(() => ({}));
      const { message, history } = body;

      if (!message) {
        return new Response(
          JSON.stringify({ error: "JSON field 'message' is required." }),
          { 
            status: 400, 
            headers: { 
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*"
            } 
          }
        );
      }

      // 5. Structure Conversation Context/History gracefully
      const contextParts = [];
      if (Array.isArray(history)) {
        // Limit history size to avoid massive token usage in prompt
        const recentHistory = history.slice(-8);
        for (const msg of recentHistory) {
          contextParts.push(`${msg.role === 'user' ? 'User' : 'Clorigo AI'}: ${msg.text}`);
        }
      }
      contextParts.push(`User: ${message}`);
      const fullPrompt = contextParts.join("\n\n");

      // 6. Connect to Google Gemini API
      // We will default to the robust 'gemini-2.5-flash' model
      const modelName = "gemini-2.5-flash";
      const geminiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent`;

      // Build payload matching Google Generative AI Schema
      const payload = {
        contents: [
          {
            parts: [{ text: fullPrompt }]
          }
        ],
        systemInstruction: {
          parts: [{ text: SYSTEM_INSTRUCTION }]
        }
      };

      console.log(`Forwarding chat prompt to Gemini via model: ${modelName}`);

      const geminiResponse = await fetch(geminiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": apiKey // Using X-goog-api-key header securely to keep URL cleaner
        },
        body: JSON.stringify(payload)
      });

      // Handle downstream failures
      if (!geminiResponse.ok) {
        const errorText = await geminiResponse.text();
        console.error(`Gemini API responded with status ${geminiResponse.status}: ${errorText}`);
        
        // Return a clean error instead of exposing inner raw Gemini keys/errors directly to client
        return new Response(
          JSON.stringify({ 
            error: "An error occurred while communicating with the AI service. If the error persists, please verify your API limits." 
          }),
          { 
            status: 502, 
            headers: { 
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*"
            } 
          }
        );
      }

      // Parse and extract the generated text
      const data = await geminiResponse.json();
      const responseText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!responseText) {
        return new Response(
          JSON.stringify({ error: "Empty or unexpected response format received from AI model." }),
          { 
            status: 500, 
            headers: { 
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*"
            } 
          }
        );
      }

      // 7. Success Response returning generated text securely
      return new Response(
        JSON.stringify({ text: responseText }),
        { 
          status: 200, 
          headers: { 
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          } 
        }
      );

    } catch (err) {
      console.error("Worker Execution Error:", err);
      return new Response(
        JSON.stringify({ error: "An unexpected error occurred inside the Cloudflare Worker." }),
        { 
          status: 500, 
          headers: { 
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          } 
        }
      );
    }
  }
};
