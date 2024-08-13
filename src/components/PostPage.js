import React from "react";
import { Link, useParams } from "react-router-dom";
import PostNotFound from "./Post/PostNotFound";

const PostPage = ({ posts, handleDelete }) => {
  const { id } = useParams();
  const post = posts.find((post) => post.id.toString() === id);

  return (
    <div className="post-page">
      <article className="post">
        {post ? (
          <>
            <h2 className="post-title">{post.title}</h2>
            <p className="post-date">{post.datetime}</p>
            <p className="post-body">{post.body}</p>
            <Link to={`/edit/${post.id}`}>
              <button className="button-edit-post">Edit post</button>
            </Link>
            <button
              onClick={() => handleDelete(post.id)}
              className="button-delete-post"
            >
              Delete post
            </button>
          </>
        ) : (
          <PostNotFound />
        )}
      </article>
    </div>
  );
};

export default PostPage;
