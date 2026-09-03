import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import axios from "axios";
import "./AIChat.css";
import Header from "./Header";
import ChatBody from "./ChatBody";
import ChatInput from "./ChatInput";

function AIChat({ showAI, onClose }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth < 1024
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const chatWindow = (
    <div className="ai-chat-window shadow-lg">
      <Header
        onClose={() => (isMobile ? setOpen(false) : onClose())}
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
  );

  const floatingBtn = (
    <button
      className="ai-floating-btn"
      onClick={() => setOpen(true)}
      aria-label="Open AI Assistant"
    >
      🤖
    </button>
  );

  // On mobile (<1024px), portal the floating button and/or fullscreen chat
  // window to document.body. The floating button's `open` state controls
  // visibility — tapping it opens the chat, closing returns to the button.
  if (isMobile) {
    return createPortal(
      <>
        {!open && floatingBtn}
        {open && chatWindow}
      </>,
      document.body
    );
  }

  // On desktop (>=1024px), the floating button is hidden via CSS and the
  // chat window is shown ONLY when showAI (App.jsx/Navbar) is true.
  if (!showAI) return null;
  return chatWindow;
}

export default AIChat;