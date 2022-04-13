import "./App.css";
import RestifyNavbar from "./components/Navbar/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchPage from "./components/Search/Index";
import SearchResult from "./components/SearchResult/Index";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <div>
      <RestifyNavbar />
      <Router>
        <Routes>
          <Route index element={<SearchPage/>}></Route>
          <Route path="search/:method/:field/" element={<SearchResult/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
