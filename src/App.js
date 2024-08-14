import Header from "./components/Header";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import Home from "./components/Home";
import NewPost from "./components/NewPost";
import PostPage from "./components/PostPage";
import EditPost from "./components/Post/EditPost";
import Missing from "./components/Missing";
import About from "./components/About";
import { Routes, Route } from "react-router-dom";
import { DataProvider } from "./context/DataContext";

const App = () => {
  return (
    <div className="App">
      <DataProvider>
        <Header title={"React Blog App"} />
        <Nav />
        <main className="main">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/post" element={<NewPost />} />
            <Route path="/edit/:id" element={<EditPost />} />
            <Route path="/post/:id" element={<PostPage />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Missing />} />
          </Routes>
        </main>
        <Footer />
      </DataProvider>
    </div>
  );
};

export default App;
