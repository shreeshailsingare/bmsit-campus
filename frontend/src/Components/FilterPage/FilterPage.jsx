import React from "react";
import { useNavigate } from "react-router-dom";
import { homeCards } from "./CardsData";
import CardButton from "./CardButton";
function FilterPage() {
    const navigate = useNavigate();
    return(
    <div className="container   min-vh-100 " >
      <div className="row pt-3"  >
        {homeCards.map((item, index) => (
          <CardButton
            key={index}
            title={item.title}
            icon={item.icon}
            onClick={() => navigate(item.path)}
          />
        ))}
      </div>
    </div>
    )
}

export default FilterPage;