import React, { useState, useEffect, useCallback } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Search from "./components/Search";
import CardList from "./components/CardList";
import ErrorBoundary from "./components/ErrorBoundary";
import Details from "./components/Details";

interface Item {
  name: string;
  url: string;
}

const handleThrowError = () => {
  throw new Error("This is a test error.");
};

const App: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const [searchTerm, setSearchTerm] = useState<string>(
    localStorage.getItem("searchTerm") || ""
  );
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();

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
    setCurrentPage(1);
  };

  const handleNextPage = () => {
    setOffset((prev) => prev + 5);
    setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (offset >= 5) {
      setOffset((prev) => prev - 5);
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleItemClick = (item: Item) => {
    navigate(`/?frontpage=${currentPage}&details=${item.name}`);
  };

  const handleCloseDetails = () => {
    navigate(`/?frontpage=${currentPage}`);
  };

  return (
    <ErrorBoundary>
      <div>
        <Search onSearch={handleSearch} />
        {error ? (
          <div>Error: {error}</div>
        ) : (
          <div className="split-view">
            <div className="left-section">
              <CardList
                items={items}
                isLoading={isLoading}
                onItemClick={handleItemClick}
              />
              {!searchTerm && (
                <div>
                  <button
                    className="btn previous"
                    onClick={handlePreviousPage}
                    disabled={isLoading || currentPage === 1}
                  >
                    Previous
                  </button>
                  <span>Page {currentPage}</span>
                  <button
                    className="btn next"
                    onClick={handleNextPage}
                    disabled={isLoading}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
            <div className="right-section">
              <Routes>
                <Route
                  path="/"
                  element={
                    location.search.includes("details") ? (
                      <Details onClose={handleCloseDetails} />
                    ) : null
                  }
                />
              </Routes>
            </div>
          </div>
        )}
        <button className="btn error" onClick={handleThrowError}>
          Throw Error
        </button>
      </div>
    </ErrorBoundary>
  );
};

export default App;
