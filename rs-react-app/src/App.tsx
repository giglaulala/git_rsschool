import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Search from "./components/Search";
import CardList from "./components/CardList";
import ErrorBoundary from "./components/ErrorBoundary";

interface Item {
  name: string;
  url: string;
}

const App: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const [searchTerm, setSearchTerm] = useState<string>(
    localStorage.getItem("searchTerm") || ""
  );

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      let results: Item[] = [];

      if (searchTerm) {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon-species/${searchTerm.toLowerCase()}`
        );

        results = [
          {
            name: response.data.name,
            url: `https://pokeapi.co/api/v2/pokemon/${response.data.id}`,
          },
        ];
      } else {
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon", {
          params: { limit: 5, offset },
        });

        results = response.data.results;
      }

      setItems(results);
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
      setItems([]);
    } finally {
      setIsLoading(false);
    }
  }, [offset, searchTerm]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    localStorage.setItem("searchTerm", term);
    setOffset(0);
  };

  const handleThrowError = () => {
    throw new Error("This is a test error.");
  };
  return (
    <ErrorBoundary>
      <div>
        <Search onSearch={handleSearch} />
        {error ? (
          <div>Error: {error}</div>
        ) : (
          <CardList items={items} isLoading={isLoading} />
        )}
        {!searchTerm && (
          <button
            className="btn load"
            onClick={() => setOffset((prev) => prev + 5)}
            disabled={isLoading}
          >
            Next
          </button>
        )}
        <button className="btn error" onClick={handleThrowError}>
          Throw Error
        </button>
      </div>
    </ErrorBoundary>
  );
};

export default App;
