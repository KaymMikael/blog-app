import React from "react";

const NewPost = ({
  postTitle,
  setPostTitle,
  postBody,
  setPostBody,
  handleSubmit,
}) => {
  return (
    <div className="new-post">
      <h2>New Post</h2>
      <form className="new-post-form" onSubmit={handleSubmit}>
        <label htmlFor="new-post-title">Title:</label>
        <input
          type="text"
          id="new-post-title"
          required
          value={postTitle}
          autoComplete="off"
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <label htmlFor="post-body">Post:</label>
        <textarea
          name="new-post-body"
          autoComplete="off"
          id="new-post-body"
          required
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
        ></textarea>
        <button type="submit" className="button-create-post">
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewPost;
