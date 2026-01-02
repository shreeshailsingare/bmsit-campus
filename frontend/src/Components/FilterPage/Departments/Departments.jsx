import React from "react";
import { useNavigate } from "react-router-dom";
import { DepartmentData } from "./DepartmentData";
import CardButton from "../CardButton";

function Departments() {
  const navigate = useNavigate();

  return (
    <div className="container bg-dark py-5">
      <div className="row mt-5">
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
