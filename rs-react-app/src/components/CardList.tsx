import React, { Component } from "react";
import Card from "./Card";
import "./cardlist.css";

interface Item {
  name: string;
  url: string; // Matches the API response
}

interface CardListProps {
  items: Item[];
  isLoading: boolean;
}

class CardList extends Component<CardListProps> {
  render() {
    const { items, isLoading } = this.props;

    if (isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <div className="cardlist">
        {items.map((item, index) => (
          <Card
            key={index}
            name={item.name}
            description={`More info: ${item.url}`}
          />
        ))}
      </div>
    );
  }
}

export default CardList;
