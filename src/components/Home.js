import React from "react";
import Feed from "./Feed/Feed";
import { useContext } from "react";
import DataContext from "../context/DataContext";
const Home = () => {
  const {searchResult, fetchError, isLoading} = useContext(DataContext);
  return (
    <div className="home">
     {isLoading && <p className="status-message">Loading posts...</p>}
     {fetchError && !isLoading && <p className="status-message" style={{color:'red'}}>{fetchError}</p>}
     {!isLoading && !fetchError && (searchResult.length ? <Feed posts={searchResult}></Feed> : <p className="status-message">No post to display.</p>)}
    </div>
  );
};

export default Home;
