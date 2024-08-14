import React from "react";
import Feed from "./Feed/Feed";

const Home = ({ posts, fetchError, isLoading }) => {
  return (
    <div className="home">
     {isLoading && <p className="status-message">Loading posts...</p>}
     {fetchError && !isLoading && <p className="status-message" style={{color:'red'}}>{fetchError}</p>}
     {!isLoading && !fetchError && (posts.length ? <Feed posts={posts}></Feed> : <p className="status-message">No post to display.</p>)}
    </div>
  );
};

export default Home;
