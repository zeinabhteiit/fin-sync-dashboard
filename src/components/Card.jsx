import React from "react";
import "../styles/card.css"; // Make sure the CSS file is linked

const Card = ({ title, value, icon }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h3>{title}</h3>
     
        <div className="card-icon">{icon}</div>
      </div>
      <div className="card-body">
        <p>{value}</p>
      </div>
    </div>
  );
};

export default Card;
