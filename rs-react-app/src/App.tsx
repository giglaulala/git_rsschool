import React, { useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import {
  useGetPokemonListQuery,
  useGetPokemonByNameQuery,
} from "./services/pokemonApi"; // Import RTK hooks
import Search from "./components/Search";
import CardList from "./components/CardList";
import ErrorBoundary from "./components/ErrorBoundary";
import Details from "./components/Details";
import Flyout from "./components/Flyout";
import "./App.css";
interface Item {
  name: string;
  url: string;
}

const handleThrowError = () => {
  throw new Error("This is a test error.");
};

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>(
    localStorage.getItem("searchTerm") || ""
  );
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch Pokémon list
  const {
    data: listData,
    isLoading: isListLoading,
    error: listError,
  } = useGetPokemonListQuery(
    { limit: 5, offset },
    { skip: !!searchTerm } // Skip if searching by name
  );

  // Fetch Pokémon by search term
  const {
    data: searchData,
    isLoading: isSearchLoading,
    error: searchError,
  } = useGetPokemonByNameQuery(searchTerm.toLowerCase(), { skip: !searchTerm });

  const isLoading = isListLoading || isSearchLoading;
  const error = searchError || listError;
  const items: Item[] = searchTerm
    ? searchData
      ? [
          {
            name: searchData.name,
            url: `https://pokeapi.co/api/v2/pokemon/${searchData.id}`,
          },
        ]
      : []
    : listData?.results || [];
  const { theme } = useTheme();

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
      <div className={`app ${theme}`}>
        <h1>Welcome to My App</h1>
        <p>This app uses a {theme} theme.</p>
        <Search onSearch={handleSearch} />
        {error ? (
          <div>
            Error:{" "}
            {error instanceof Error ? error.message : "An error occurred"}
          </div>
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
        <Flyout />
      </div>
    </ErrorBoundary>
  );
};

export default App;
