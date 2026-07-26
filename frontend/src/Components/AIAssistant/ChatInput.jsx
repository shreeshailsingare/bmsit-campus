import "./ChatInput.css";

function ChatInput({ input, setInput, loading, onSend }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    onSend(input);
  };

  return (
    <form className="ai-input-area" onSubmit={handleSubmit}>
      <input
        className="ai-input"
        placeholder="Ask Campus AI..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={loading}
      />
      <button
        className="ai-send-btn"
        type="submit"
        disabled={loading || !input.trim()}
      >
        {loading ? "..." : "➤"}
      </button>
    </form>
  );
}

export default ChatInput;