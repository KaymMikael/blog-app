import React from "react";
import { Link } from "react-router-dom";

const PostNotFound = () => {
  return (
    <>
      <h2>Post Not Found</h2>
      <p>Well, that's disappointing</p>
      <p>
        <Link to={"/"}>Visit Our Homepage</Link>
      </p>
    </>
  );
};

export default PostNotFound;
