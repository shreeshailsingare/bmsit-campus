import ReactMarkdown from "react-markdown";
import "./Message.css";

function Message({ sender, text }) {
  const className = sender === "user" ? "user-message" : "ai-message";
  return (
    <div className={className}>
      <ReactMarkdown>{text}</ReactMarkdown>
    </div>
  );
}

export default Message;