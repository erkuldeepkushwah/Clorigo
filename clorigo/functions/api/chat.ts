// Cloudflare Pages Function for Clorigo AI Chat
// Handles POST requests at /api/chat

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
        contextParts.push(`${msg.role === 'user' ? 'User' : 'Clorigo AI'}: ${msg.text}`);
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
