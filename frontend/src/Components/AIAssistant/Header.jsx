import "./Header.css";

function Header({ onClose, onNewChat, onMinimize }) {
  const handleMinimize = onMinimize || (() => {});
  const handleNewChat = onNewChat || (() => {});
  return (
    <div className="ai-header">
      <div className="ai-header-left">
        <div className="ai-avatar" aria-hidden="true">
          🤖
        </div>
        <div className="ai-header-text">
          <div className="ai-header-title">BMSIT Campus AI</div>
          
        </div>
        <div className="ai-header-status">
          <span className="ai-status-dot" /> Online
        </div>
      </div>
      <div className="ai-header-right">
        <button className="ai-header-icon-btn" onClick={onClose} title="Close">
          ✕
        </button>
      </div>
    </div>
  );
}

export default Header;