```ts
const sendMessage = async () => {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: userInput,
    }),
  });

  const data = await response.json();

  setMessages((prev) => [
    ...prev,
    {
      role: "bot",
      text: data.text,
    },
  ]);
};
```
