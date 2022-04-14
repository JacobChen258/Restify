import "./App.css";
import RestifyNavbar from "./components/Navbar/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchPage from "./components/Search/Index";
import SearchResult from "./components/SearchResult/Index";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import Restaurant from "./components/Restaurant/Restaurant";
import Blogs from "./components/Restaurant/Blog/Blogs";
import Image from "./components/Restaurant/Image/Image";
import Comment from "./components/Restaurant/Comment/Comment";
import Menu from "./components/Restaurant/Menu/Menu";
function App() {
  return (
    <div>
      <Router>
        <RestifyNavbar/>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup/test" element={<RestifyNavbar />}>
            {/* Components that need navbar go here */}
            <Route path="/signup/test/2" element={<Signup />} />
          </Route>
          <Route index element={<SearchPage/>}></Route>
          <Route path="/search/:method/:field/" element={<SearchResult/>}></Route>
          <Route path="/restaurant/:id/" element={<Restaurant/>}>
            <Route index element={<Menu/>}></Route>
            <Route path="/restaurant/:id/blog/" element={<Blogs/>}></Route>
            <Route path="/restaurant/:id/comment/" element={<Comment/>}></Route>
            <Route path="/restaurant/:id/menu/" element={<Menu/>}></Route>
            <Route path="/restaurant/:id/image/" element={<Image/>}></Route>
            <Route path="/restaurant/:id/*" element={<PageNotFound />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
