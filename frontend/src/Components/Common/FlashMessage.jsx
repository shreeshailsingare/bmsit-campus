function FlashMessage({ flash, clearFlash }) {
  if (!flash.message) return null;

  return (
    <div
      className="position-fixed top-0 start-50 translate-middle-x mt-3"
      style={{ zIndex: 2000, width: "90%", maxWidth: "600px " }}
    >
      <div className={`alert alert-${flash.type} alert-dismissible fade show` }  style={{backgroundColor:"#000000",borderRadius:"25px",textAlign:"center",color:"white",border:"none"}} role="alert">
        {flash.message}
        <button
          type="button"
          className="btn-close  btn-close-white"
          onClick={clearFlash}
        ></button>
      </div>
    </div>
  );
}

export default FlashMessage;
