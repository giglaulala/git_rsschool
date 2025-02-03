import React, { Component } from "react";
import "./search.css";

interface SearchProps {
  onSearch: (searchTerm: string) => void;
}

interface SearchState {
  searchTerm: string;
}

class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    const savedSearchTerm = localStorage.getItem("searchTerm") || "";
    this.state = { searchTerm: savedSearchTerm };
  }

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: e.target.value });
  };

  handleSearch = () => {
    const { searchTerm } = this.state;
    const trimmedTerm = searchTerm.trim();
    localStorage.setItem("searchTerm", trimmedTerm);
    this.props.onSearch(trimmedTerm);
  };

  render() {
    return (
      <div>
        <input
          className="search"
          type="text"
          value={this.state.searchTerm}
          onChange={this.handleInputChange}
          placeholder="Search..."
        />
        <button className="btn" onClick={this.handleSearch}>
          🔍
        </button>
      </div>
    );
  }
}

export default Search;
