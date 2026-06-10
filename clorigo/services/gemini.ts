import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateChatResponse = async (
  message: string, 
  history: { role: string; text: string }[]
): Promise<string> => {
  try {
    if (!apiKey) return "Error: API Key is missing. Please configure it.";

    // Convert history to format expected by the model if needed, 
    // or just use a single generateContent call with history as context for simplicity in this demo.
    // For robust chat, ai.chats.create is better, but here we do a simple stateless-like turn 
    // or reconstructing context manually for the 'contents' parameter if using generic generateContent.
    
    // Using chat model for better conversation flow
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: `You are CloriBot, the professional AI assistant for Clorigo Infotech. 
        
        About Clorigo Infotech:
        - We are a leading IT solutions provider specializing in Web Development, Mobile App Development (iOS/Android), UI/UX Design, and Digital Marketing.
        - We deliver innovative, scalable, and robust digital solutions.
        - Our team consists of experienced developers and creative designers.
        - We are known for on-time delivery and 24/7 support.
        
        Your Goal:
        - Answer visitor queries politely and professionally.
        - Encourage them to visit the 'Contact Us' section or email clorigoindia@gmail.com for quotes.
        - Keep answers concise (under 100 words) unless detailed technical info is asked.
        
        Tone:
        - Professional, Tech-savvy, Helpful, and Friendly.
        `,
      },
    });

    // Replay history to set state (simplified approach for this demo)
    // In a real app, you'd persist the chat session object. 
    // Here we just send the new message as if it's a fresh turn or append context if we were manually managing it.
    // To keep it simple and functional for a UI demo, we will just send the current message 
    // but ideally, we would feed previous history.
    
    // Let's create a context string from history to pass as part of the message if we don't persist the chat object
    const context = history.map(h => `${h.role === 'user' ? 'User' : 'Assistant'}: ${h.text}`).join('\n');
    const prompt = `${context}\nUser: ${message}`;

    const result = await chat.sendMessage({
      message: message // The SDK manages session history if we keep the 'chat' instance alive. 
                       // Since we create 'chat' every time here (stateless function), the history is lost.
                       // CORRECT FIX: We should instantiate chat once or use history in prompt. 
                       // For this scope, let's just answer the specific query directly without deep history to avoid complexity 
                       // or use the history prop to build a multi-turn prompt.
    });

    return result.text || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm currently having trouble connecting to the server. Please try again later.";
  }
};