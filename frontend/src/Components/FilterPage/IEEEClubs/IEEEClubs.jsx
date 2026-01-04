import React from "react";
import { useNavigate } from "react-router-dom";
import { IEEEClubsData } from "./IEEEClubsData";
import CardButton from "../CardButton";

function IEEEClubs() {
  const navigate = useNavigate();

  return (
    <div className="container  mt-5 pt-5 mb-5">
      <div className="row">
        {IEEEClubsData.map((item, index) => (
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

export default IEEEClubs;
