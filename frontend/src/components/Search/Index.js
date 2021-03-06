import React from "react";
import logo from "../../images/restify_logo.png";
import SearchBar from "./SearchBar/Index";
import "./Index.css";

const SearchPage = () => {
  return (
    <div className="w-100 bg_color">
      <div className="d-flex justify-content-center">
        <img src={logo} className="w-20 h-20 search-logo" alt=""></img>
      </div>
      <SearchBar />
    </div>
  );
};

export default SearchPage;
