import { useState } from "react";
import axios from "axios";
import "./AIChat.css";
import Header from "./Header";
import ChatBody from "./ChatBody";
import ChatInput from "./ChatInput";

function AIChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text:
        "👋 Welcome to BMSIT Campus AI\n\n" +
        "I'm your campus copilot.\n\n" +
        "I can help you with:\n\n" +
        "• Campus updates\n" +
        "• Placements\n" +
        "• Internships\n" +
        "• Clubs\n" +
        "• Hackathons\n" +
        "• Sports\n" +
        "• Library resources\n" +
        "• Many more...\n",
    },
  ]);

  const sendMessage = async (messageText = input) => {
    if (!messageText.trim()) return;

    const userMessage = {
      sender: "user",
      text: messageText,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("/ai/chat", {
        message: messageText,
        history: messages,
      });

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: res.data.reply,
        },
      ]);
    } catch (err) {
      console.error(err);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "❌ Unable to contact AI server.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleNewChat = () => {
    setMessages([
      {
        sender: "ai",
        text:
          "👋 Welcome to BMSIT Campus AI.\n\n" +
          "I'm your campus copilot.\n\n" +
          "I can help you with:\n\n" +
          "• Campus updates\n" +
          "• Placements\n" +
          "• Internships\n" +
          "• Clubs\n" +
          "• Hackathons\n" +
          "• Sports\n" +
          "• Library resources\n" +
          "• Many more..\n",
      },
    ]);
  };

  return (
    <>
      {/* Floating AI Chat button (all devices) */}
      {!open && (
        <button
          className="ai-floating-btn"
          onClick={() => setOpen(true)}
        >
          🤖
        </button>
      )}

      {open && (
        <div className="ai-chat-window shadow-lg">

          <Header
            onClose={() => setOpen(false)}
            onNewChat={handleNewChat}
          />

          <ChatBody
            messages={messages}
            loading={loading}
            onSend={sendMessage}
          />

          <ChatInput
            input={input}
            setInput={setInput}
            loading={loading}
            onSend={sendMessage}
          />

        </div>
      )}
    </>
  );
}

export default AIChat;