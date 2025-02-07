import React from "react";
import "./card.css";

interface Item {
  name: string;
  url: string;
}

interface CardProps {
  item: Item;
  onClick: () => void; // Define the onClick prop
}

const Card: React.FC<CardProps> = ({ item, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
      <h3>{item.name}</h3>
    </div>
  );
};

export default Card;
