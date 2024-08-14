import React from "react";
import { Link } from "react-router-dom";

const Header = ({ title, width }) => {
  return (
    <header className="header">
      <p>{title}</p>
      <ul className="nav-list">
        <li className="nav-link">
          <Link to={"/"}>Home</Link>
        </li>
        <li className="nav-link">
          <Link to={"/about"}>About</Link>
        </li>
        <li className="nav-link">
          <Link to={"/post"}>Post</Link>
        </li>
        {/* <li><Link to={"/post/:id"}>New Post</Link></li> */}
      </ul>
    </header>
  );
};

export default Header;
