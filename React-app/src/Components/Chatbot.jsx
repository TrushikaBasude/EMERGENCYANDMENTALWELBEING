import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Components/Chatbot.css";



const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [apiKey, setApiKey] = useState("");

    // Load API key from .env file
    useEffect(() => {
        const key = import.meta.env.VITE_OPENAI_API_KEY;
        console.log("Loaded API Key:", key); // 👈 This will print the API key
        setApiKey(key);
    }, []);
    

    const fetchBotResponse = async (userMessage) => {
        if (!apiKey) {
            return "API key is missing. Please check your .env file.";
        }

        try {
            const response = await axios.post(
                "https://api.openai.com/v1/chat/completions",
                {
                    model: "gpt-3.5-turbo",
                    messages: [
                        { role: "system", content: "You are a helpful AI assistant." },
                        { role: "user", content: userMessage }
                    ],
                    max_tokens: 100,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${apiKey}`,
                    },
                }
            );

            return response.data.choices?.[0]?.message?.content || "No response.";
        } catch (error) {
            console.error("API Error:", error);
            return "Error connecting to AI. Check your API key and network.";
        }
    };

    const handleSendMessage = async () => {
        if (input.trim() === "") return;

        const userMessage = { text: input, sender: "user" };
        setMessages((prev) => [...prev, userMessage]);

        const botReplyText = await fetchBotResponse(input);
        const botReply = { text: botReplyText, sender: "bot" };

        setMessages((prev) => [...prev, botReply]);
        setInput("");
    };

    return (
        <div className="chatbot-container">
            <div className="chatbot-header">Chat with AI 🤖</div>
            <div className="chatbox">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender}`}>
                        {msg.text}
                    </div>
                ))}
            </div>
            <div className="input-area">
                <input 
                    type="text" 
                    value={input} 
                    onChange={(e) => setInput(e.target.value)} 
                    placeholder="Ask me anything..." 
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Chatbot;
