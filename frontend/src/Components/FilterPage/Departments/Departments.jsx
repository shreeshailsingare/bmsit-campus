import React from "react";
import { useNavigate } from "react-router-dom";
import { DepartmentData } from "./DepartmentData";
import CardButton from "../CardButton";

function Departments() {
  const navigate = useNavigate();

  return (
    <div className="container  pt-3 pb-5">
      <div className="row ">
        {DepartmentData.map((item, index) => (
          <CardButton
            key={index}
            title={item.title}
            icon={item.icon}
            onClick={() => navigate(`/filter/admin/${item.slug}`)}
          />
        ))}
      </div>
    </div>
  );
}

export default Departments;
