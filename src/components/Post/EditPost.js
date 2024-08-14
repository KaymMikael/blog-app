import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostNotFound from "./PostNotFound";
import { useContext } from "react";
import DataContext from "../../context/DataContext";
import { Post } from "../../data/Post";

const EditPost = () => {
  const { posts, format, postRequest, setPosts, navigate } =
    useContext(DataContext);
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");

  const { id } = useParams();

  const post = posts.find((post) => post.id === id);

  useEffect(() => {
    if (post) {
      setEditTitle(post.title);
      setEditBody(post.body);
    }
  }, [post, setEditTitle, setEditBody]);

  const handleEdit = async (id) => {
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const updatedPost = {
      id,
      title: editTitle,
      datetime,
      body: editBody,
    };
    try {
      const response = await postRequest.editPost(id, updatedPost);
      setPosts(
        posts.map((post) => (post.id === id ? new Post(response.data) : post))
      );
      setEditTitle("");
      setEditBody("");
      navigate("/");
    } catch (e) {
      console.error(e.message);
    }
  };

  return (
    <div className="edit-post">
      {editTitle && (
        <>
          <h2>Edit Post</h2>
          <form className="edit-post-form" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="edit-post-title">Title:</label>
            <input
              type="text"
              id="edit-post-title"
              required
              value={editTitle}
              autoComplete="off"
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <label htmlFor="edit-post-body">Post:</label>
            <textarea
              name="edit-post-body"
              autoComplete="off"
              id="edit-post-body"
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
      {!editTitle && <PostNotFound />}
    </div>
  );
};

export default EditPost;
