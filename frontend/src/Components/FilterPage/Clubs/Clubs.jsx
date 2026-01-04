import React from "react";
import { useNavigate } from "react-router-dom";
import { ClubsData } from "./ClubsData";
import CardButton from "../CardButton";

function Clubs() {
  const navigate = useNavigate();

  return (
    <div className="container  mt-5 py-5 mb-5">
      <div className="row">
        {ClubsData.map((item, index) => (
          <CardButton
            key={index}
            title={item.title}
            icon={item.icon}
            onClick={() => navigate(`/filter/admin/${item.username}`)}
          />
        ))}
      </div>
    </div>
  );
}

export default Clubs;
