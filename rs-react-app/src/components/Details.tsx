import React from "react";
import { useGetPokemonByNameQuery } from "../services/pokemonApi";
import "./details.css";

interface DetailsProps {
  onClose: () => void;
}

const Details: React.FC<DetailsProps> = ({ onClose }) => {
  const urlParams = new URLSearchParams(window.location.search);
  const itemName = urlParams.get("details");

  const {
    data: details,
    isLoading,
    error,
  } = useGetPokemonByNameQuery(itemName || "", {
    skip: !itemName,
  });

  return (
    <div className="details-section">
      <button onClick={onClose} className="btn">
        Close
      </button>
      {isLoading ? (
        <div>Loading....</div>
      ) : error ? (
        <div>Error fetching details</div>
      ) : (
        details && (
          <div>
            <h2>{details.name}</h2>
            <img src={details.sprites.front_default} alt={details.name} />
            <p>Height: {details.height}</p>
            <p>Weight: {details.weight}</p>
          </div>
        )
      )}
    </div>
  );
};

export default Details;
