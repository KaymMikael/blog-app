import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Post } from "../data/Post";
import postRequest from "../api/PostRequest";
import useWindowSize from "../hooks/useWindowSize";
import useAxiosFetch from "../hooks/useAxios";
import { format } from "date-fns";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const navigate = useNavigate();
  const { width } = useWindowSize();

  const { data, fetchError, isLoading } = useAxiosFetch(
    "http://localhost:3500/posts"
  );

  useEffect(() => {
    setPosts(data.map((data) => new Post(data)));
  }, [data]);

  useEffect(() => {
    const filteredResults = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResult(filteredResults);
  }, [posts, search]);

  return (
    <DataContext.Provider
      value={{
        width,
        postRequest,
        format,
        navigate,
        posts,
        setPosts,
        search,
        setSearch,
        searchResult,
        fetchError,
        isLoading,
        postTitle,
        setPostTitle,
        postBody,
        setPostBody,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
