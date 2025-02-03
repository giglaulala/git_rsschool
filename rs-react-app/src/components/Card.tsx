import React, { Component } from "react";
import "./card.css"; // Import the CSS file

interface CardProps {
  name: string;
  description: string;
}

class Card extends Component<CardProps> {
  render() {
    const { name, description } = this.props;
    return (
      <div className="card">
        <h3>{name}</h3>
        <p>{description}</p>
        <a href="#">View More</a>
      </div>
    );
  }
}

export default Card;
