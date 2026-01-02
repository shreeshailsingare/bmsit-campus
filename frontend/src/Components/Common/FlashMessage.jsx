function FlashMessage({ flash, clearFlash }) {
  if (!flash.message) return null;

  return (
    <div
      className="position-fixed top-0 start-50 translate-middle-x mt-3"
      style={{ zIndex: 2000, width: "90%", maxWidth: "600px" }}
    >
      <div className={`alert alert-${flash.type} alert-dismissible fade show`}>
        {flash.message}
        <button
          type="button"
          className="btn-close"
          onClick={clearFlash}
        ></button>
      </div>
    </div>
  );
}

export default FlashMessage;
