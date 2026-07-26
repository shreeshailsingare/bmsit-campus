const flashStyles = {
  info: { background: "#0dcaf0", color: "#052c33" },
  warning: { background: "#ffc107", color: "#332701" },
  danger: { background: "#dc3545", color: "#fff" },
  error: { background: "#dc3545", color: "#fff" },
  success: { background: "#198754", color: "#fff" },
};

function FlashMessage({ flash, clearFlash }) {
  if (!flash.message) return null;

  const style = flashStyles[flash.type] || flashStyles.info;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 16,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 2000,
        ...style,
        padding: "10px 20px",
        borderRadius: 8,
        fontSize: 14,
        fontWeight: 500,
        display: "flex",
        alignItems: "center",
        gap: 12,
        boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
        cursor: "pointer",
        whiteSpace: "nowrap",
      }}
      onClick={clearFlash}
    >
      <span>{flash.message}</span>
      <span style={{ fontSize: 18, lineHeight: 1, opacity: 0.8 }}>✕</span>
    </div>
  );
}

export default FlashMessage;