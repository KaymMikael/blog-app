import React from "react";
import Feed from "./Feed/Feed";

const Home = ({ posts }) => {
  return (
    <div className="home">
      {posts.length ? (
        <Feed posts={posts} />
      ) : (
        <p style={{ marginTop: "2rem" }}>No posts to display</p>
      )}
    </div>
  );
};

export default Home;
