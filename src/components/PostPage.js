import { Link, useParams } from "react-router-dom";
import PostNotFound from "./Post/PostNotFound";
import { useContext } from "react";
import DataContext from "../context/DataContext";
import postRequest from "../api/PostRequest";

const PostPage = () => {
  const { posts, setPosts, navigate} = useContext(DataContext);

  const { id } = useParams();
  const post = posts.find((post) => post.id.toString() === id);

  const handleDelete = async (id) => {
    try {
      await postRequest.deletePost(id);
      const postList = posts.filter((post) => post.id !== id);
      setPosts(postList);
      navigate("/");
    } catch (e) {
      console.error(e.message);
    }
  };

  return (
    <div className="post-page">
      <article className="post">
        {post ? (
          <>
            {post.showInfo()}
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
