import React, { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);

  const sendPrompt = async () => {
    if (!input.trim()) return;
    try {
      // Send the prompt to your backend
      const response = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input })
      });
      const data = await response.json();
      // Save the chat history
      setChat([...chat, { user: input, bot: data.response }]);
    } catch (error) {
      setChat([...chat, { user: input, bot: "Error: " + error.message }]);
    }
    setInput("");
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h2>My Chat Assistant</h2>
      {chat.map((msg, idx) => (
        <div key={idx} style={{ marginBottom: 20 }}>
          <p><strong>You:</strong> {msg.user}</p>
          <p><strong>Bot:</strong> {msg.bot}</p>
          <hr />
        </div>
      ))}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
        style={{ width: "70%", padding: 10, fontSize: 16 }}
      />
      <button onClick={sendPrompt} style={{ padding: "10px 20px", marginLeft: 10, fontSize: 16 }}>
        Send
      </button>
    </div>
  );
}

export default App;
