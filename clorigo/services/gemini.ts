export const generateChatResponse = async (
  message: string, 
  history: { role: string; text: string }[]
): Promise<string> => {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, history }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error ${response.status}`);
    }

    const data = await response.json();
    return data.text || "I apologize, I could not generate a response.";
  } catch (error: any) {
    console.error("Clorigo AI Chat Error:", error);
    return "I'm currently having trouble connecting to Clorigo AI. Please make sure your API key is configured or try again later.";
  }
};