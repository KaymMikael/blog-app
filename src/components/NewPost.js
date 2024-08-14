import { useContext } from "react";
import DataContext from "../context/DataContext";
import { Post } from "../data/Post";
import postRequest from "../api/PostRequest";
const NewPost = () => {
  const {
    postTitle,
    format,
    setPostTitle,
    postBody,
    setPostBody,
    posts,
    setPosts,
    navigate,
  } = useContext(DataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? Number(posts[posts.length - 1].id) + 1 : 1;
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const newPost = {
      id: id.toString(),
      title: postTitle,
      datetime,
      body: postBody,
    };
    try {
      const response = await postRequest.createPost(newPost);
      const allPosts = [...posts, new Post(response.data)];
      setPosts(allPosts);
      setPostTitle("");
      setPostBody("");
      navigate("/");
    } catch (e) {
      console.error(e.message);
    }
  };

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
