import React, { useEffect, useState } from "react";
import axios from "axios";
import "./details.css";

interface DetailsProps {
  onClose: () => void;
}

const Details: React.FC<DetailsProps> = ({ onClose }) => {
  const [details, setDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const itemName = urlParams.get("details");
      if (itemName) {
        try {
          const response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${itemName}`
          );
          setDetails(response.data);
        } catch (error) {
          console.error("Error fetching details:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchDetails();
  }, []);

  return (
    <div className="details-section">
      <button onClick={onClose} className="btn">
        Close
      </button>
      {isLoading ? (
        <div>Loading....</div>
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
