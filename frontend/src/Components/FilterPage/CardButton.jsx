function CardButton({ title, icon, onClick }) {
  return (
    <div className="col-6  mb-3 " >
      <div
        className="card text-center text-white  p-3 shadow-sm h-100"
        style={{ cursor: "pointer",backgroundColor:"#1e1e1e" }}
        onClick={onClick}
      >
        <i className={`${icon} fs-2 mb-2 `}></i>
        <h6 className="fw-bold">{title}</h6>
      </div>
    </div>
  );
}

export default CardButton;
