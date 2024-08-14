import React from "react";
import { Link } from "react-router-dom";
import { FaLaptop, FaTabletAlt, FaMobileAlt } from "react-icons/fa";
import { useContext } from "react";
import DataContext from "../context/DataContext";

const Header = ({ title }) => {
  const { width } = useContext(DataContext);

  return (
    <header className="header">
      <p>{title}</p>
      {width < 768 ? (
        <FaMobileAlt />
      ) : width < 992 ? (
        <FaTabletAlt />
      ) : (
        <FaLaptop />
      )}
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
