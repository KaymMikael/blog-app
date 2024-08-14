import Header from "./components/Header";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import Home from "./components/Home";
import NewPost from "./components/NewPost";
import PostPage from "./components/PostPage";
import EditPost from "./components/Post/EditPost";
import Missing from "./components/Missing";
import About from "./components/About";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Post } from "./data/Post";
import postRequest from "./api/PostRequest";
import useWindowSize from "./hooks/useWindowSize";
import useAxiosFetch from "./hooks/useAxios";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [postTitle, setPostitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const navigate = useNavigate();
  const {width} = useWindowSize();;

  const {data, fetchError, isLoading} = useAxiosFetch('http://localhost:3500/posts');

  useEffect(() => {
    setPosts(data.map((data) => new Post(data)));
  }, [data])

  useEffect(() => {
    const filteredResults = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResult(filteredResults);
  }, [posts, search]);

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
      setPostitle("");
      setPostBody("");
      navigate("/");
    } catch (e) {
      console.error(e.message);
    }
  };

  return (
    <div className="App">
      <Header title={"React Blog App"} width={width}/>
      <Nav search={search} setSearch={setSearch} />
      <main className="main">
        <Routes>
          <Route exact path="/" element={<Home posts={searchResult} fetchError={fetchError} isLoading={isLoading} />} />
          <Route
            exact
            path="/post"
            element={
              <NewPost
                postTitle={postTitle}
                setPostTitle={setPostitle}
                postBody={postBody}
                setPostBody={setPostBody}
                handleSubmit={handleSubmit}
              />
            }
          />
          <Route
            path="/edit/:id"
            element={
              <EditPost
                posts={posts}
                handleEdit={handleEdit}
                editBody={editBody}
                editTitle={editTitle}
                setEditBody={setEditBody}
                setEditTitle={setEditTitle}
              />
            }
          />
          <Route
            path="/post/:id"
            element={<PostPage posts={posts} handleDelete={handleDelete} />}
          />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Missing />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
