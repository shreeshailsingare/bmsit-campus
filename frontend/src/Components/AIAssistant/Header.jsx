import "./Header.css";

function Header({ onClose, onNewChat }) {
  return (
    <div className="ai-header">
      <div className="ai-header-left">
        <span className="ai-header-icon">🤖</span>
        <div>
          <div className="ai-header-title">BMSIT Campus AI</div>
          <div className="ai-header-status">Online</div>
        </div>
      </div>
      <div className="ai-header-right">
        {/* <button className="ai-header-btn" onClick={onNewChat} title="New Chat">
          ✏️
        </button> */}
        <button className="ai-header-btn" onClick={onClose} title="Close">
          ✕
        </button>
      </div>
    </div>
  );
}

export default Header;