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
      console.error("AI request failed:", {
        message: err.message,
        code: err.code,
        status: err.response?.status,
        responseHeaders: err.response?.headers,
        responseData: err.response?.data,
        requestUrl: err.config?.url,
        requestBaseURL: err.config?.baseURL,
        stack: err.stack,
      });

      const backendError =
        err.response?.data?.error ||
        err.response?.data?.message ||
        err.message ||
        "Unable to contact AI server.";

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: `❌ ${backendError}`,
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
  if (isMobile) {
    return createPortal(
      <>
        {!open && floatingBtn}
        {open && chatWindow}
      </>,
      document.body
    );
  }
  if (!showAI) return null;
  return chatWindow;
}

export default AIChat;
