import React from "react";
import Card from "./Card";
import "./cardlist.css";

interface Item {
  name: string;
  url: string;
}

interface CardListProps {
  items: Item[];
  isLoading: boolean;
  onItemClick: (item: Item) => void;
}

const CardList: React.FC<CardListProps> = ({
  items,
  isLoading,
  onItemClick,
}) => {
  return (
    <div className="card-list">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        items.map((item) => (
          <Card key={item.name} item={item} onClick={() => onItemClick(item)} />
        ))
      )}
    </div>
  );
};

export default CardList;
