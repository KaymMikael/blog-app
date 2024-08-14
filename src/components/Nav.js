import React from "react";
import { useContext } from "react";
import DataContext from "../context/DataContext";

const Nav = () => {
  const {search, setSearch} = useContext(DataContext);
  return (
    <nav className="nav">
      <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="search">Search Posts</label>
        <input
        autoComplete="off"
          type="text"
          id="search"
          placeholder="Search Post"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
    </nav>
  );
};

export default Nav;
