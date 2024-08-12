import React from "react";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
  return (
    <article className="post">
      <Link to={`/post/${post.id}`}>
        <h2 className="post-title">{post.title}</h2>
        <p className="post-date">{post.datetime}</p>
      </Link>
      <p className="post-body">{(post.body).length <= 25 ? post.body : `${(post.body).slice(0,25)}`}...</p>
    </article>
  );
};

export default Post;
