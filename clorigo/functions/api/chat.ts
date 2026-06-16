// Cloudflare Pages Function for CloriBot AI Chat
// Handles POST requests at /api/chat

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

export async function onRequestPost(context: { env: Record<string, string>; request: Request }) {
  try {
    const { request, env } = context;
    const apiKey = env.GEMINI_API_KEY || env.API_KEY || "";

    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "Gemini API Key is not configured on your Cloudflare environment. Please add GEMINI_API_KEY in your Pages environment variables." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Parse the JSON body from the inbound frontend request
    const body: any = await request.json().catch(() => ({}));
    const { message, history } = body;

    if (!message) {
      return new Response(
        JSON.stringify({ error: "Message is required." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Prepare previous history as a single prompt
    const contextParts: string[] = [];
    if (Array.isArray(history)) {
      const recentHistory = history.slice(-8);
      for (const msg of recentHistory) {
        contextParts.push(`${msg.role === 'user' ? 'User' : 'CloriBot'}: ${msg.text}`);
      }
    }
    contextParts.push(`User: ${message}`);
    const fullPrompt = contextParts.join("\n\n");

    // Attempt model list starting with gemini-2.5-flash
    const modelsToTry = [
      "gemini-2.5-flash", 
      "gemini-3.5-flash", 
      "gemini-3.1-flash-lite", 
      "gemini-3.1-pro-preview", 
      "gemini-flash-latest"
    ];

    let lastError: any = null;
    let responseText = "";

    // Try models iteratively via direct fetch
    for (const modelName of modelsToTry) {
      try {
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;
        
        const payload = {
          contents: [
            {
              role: "user",
              parts: [{ text: fullPrompt }]
            }
          ],
          systemInstruction: {
            parts: [{ text: SYSTEM_INSTRUCTION }]
          }
        };

        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const errBody = await response.text();
          throw new Error(`REST call failed (status ${response.status}): ${errBody}`);
        }

        const data: any = await response.json();
        const textVal = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        
        if (textVal) {
          responseText = textVal;
          break;
        }
      } catch (err: any) {
        lastError = err;
        console.warn(`Failed fetching via ${modelName}:`, err.message || err);
      }
    }

    if (!responseText) {
      throw lastError || new Error("Failed to generate response with all attempted models.");
    }

    return new Response(
      JSON.stringify({ text: responseText }),
      { headers: { "Content-Type": "application/json" } }
    );

  } catch (error: any) {
    console.error("Cloudflare Pages Function direct fetch error:", error);
    return new Response(
      JSON.stringify({ error: error?.message || "Internal Server Error in Pages function" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
