import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import PostNotFound from "./PostNotFound";

const EditPost = ({
  posts,
  handleEdit,
  editBody,
  setEditBody,
  editTitle,
  setEditTitle,
}) => {
  const { id } = useParams();
  
  const post = posts.find(post => post.id === id);

  useEffect(() => {
    if (post) {
      setEditTitle(post.title);
      setEditBody(post.body);
    }
  }, [post, setEditTitle, setEditBody]);

  return (
    <div className="new-post">
      {editTitle && (
        <>
          <h2>Edit Post</h2>
          <form className="new-post-form" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="post-title">Title:</label>
            <input
              type="text"
              id="post-title"
              required
              value={editTitle}
              autoComplete="off"
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <label htmlFor="post-body">Post:</label>
            <textarea
              name="post-body"
              autoComplete="off"
              id="post-body"
              required
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
            ></textarea>
            <button
              type="submit"
              className="button-create-post"
              onClick={() => handleEdit(post.id)}
            >
              Submit
            </button>
          </form>
        </>
      )}
      {!editTitle && <PostNotFound/>}
    </div>
  );
};

export default EditPost;
