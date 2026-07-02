function FlashMessage({ flash, clearFlash }) {
  if (!flash.message) return null;

  const flashStyles = {
    info: {
      backgroundColor: "#0dcaf0",
      color: "#052c33",
    },
    warning: {
      backgroundColor: "#ffc107",
      color: "#332701",
    },
    error: {
      backgroundColor: "#dc3545",
      color: "#ffffff",
    },
    danger: {
      backgroundColor: "#dc3545",
      color: "#ffffff",
    },
    success: {
      backgroundColor: "#198754",
      color: "#ffffff",
    },
  };

  const alertType = flash.type === "error" ? "danger" : flash.type || "info";
  const style = flashStyles[flash.type] || flashStyles.info;
  const isDarkClose = style.color === "#ffffff";

  return (
    <div
      className="position-fixed top-0 start-50 translate-middle-x mt-3"
      style={{ zIndex: 2000, width: "90%", maxWidth: "600px " }}
    >
      <div
        className={`alert alert-${alertType} alert-dismissible fade show`}
        style={{
          ...style,
          borderRadius: "10px",
          textAlign: "center",
          border: "none",
        }}
        role="alert"
      >
        {flash.message}
        <button
          type="button"
          className={`btn-close ${isDarkClose ? "btn-close-white" : ""}`}
          onClick={clearFlash}
        ></button>
      </div>
    </div>
  );
}

export default FlashMessage;
