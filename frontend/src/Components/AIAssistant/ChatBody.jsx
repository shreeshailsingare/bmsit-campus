import Message from "./Message";
import Typing from "./Typing";
// import "./ChatBody.css";

function ChatBody({ messages, loading }) {
  return (
    <div className="ai-body">
      {messages.map((msg, i) => (
        <Message key={i} sender={msg.sender} text={msg.text} />
      ))}
      {loading && <Typing />}
    </div>
  );
}

export default ChatBody;