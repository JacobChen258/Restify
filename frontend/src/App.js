import "./App.css";
import RestifyNavbar from "./components/Navbar/RestifyNav/RestifyNav";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchPage from "./components/Search/Index";
import SearchResult from "./components/SearchResult/Index";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import Restaurant from "./components/Restaurant/Restaurant";
import Blogs from "./components/Restaurant/Blog/Blogs";
import Images from "./components/Restaurant/ImagesComponent/Images";
import Comments from "./components/Restaurant/Comments/Comments";
import Menu from "./components/Restaurant/Menu/Menu";
import AddBlog from "./components/AddBlog/AddBlog";
import Feed from "./components/Feed/Feed";
import CreateRestaurant from "./components/CreateRestaurant/CreateRestaurant";
import { AuthProvider } from "./components/Context/AuthContext";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import EditRestaurant from "./components/Restaurant/RestaurantInfo/EditRestaurant/EditRestaurant";
import EditProfile from "./components/EditProfile/EditProfile";
import AddEditMenu from "./components/AddEditMenu/AddEditMenu";

function App() {
  return (
    <div>
      <AuthProvider>
        <Router>
          <RestifyNavbar />
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route index element={<SearchPage />}></Route>

            {/* Components that need navbar go here */}
            {/* <Route path="/signup/test/2" element={<Signup />} /> */}
            {/* </Route> */}

            <Route
              path="/create/restaurant/"
              element={
                <PrivateRoute>
                  <CreateRestaurant />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="/edit/restaurant/"
              element={
                <PrivateRoute>
                  <EditRestaurant />
                </PrivateRoute>
              }
            ></Route>

            <Route
              path="/profile/edit"
              element={
                <PrivateRoute>
                  <EditProfile />
                </PrivateRoute>
              }
            />

            <Route
              path="/restaurant/:id/menu/add"
              element={
                <PrivateRoute>
                  <AddEditMenu />
                </PrivateRoute>
              }
            />
            <Route
              path="/restaurant/:id/blog/add"
              element={
                <PrivateRoute>
                  <AddBlog />
                </PrivateRoute>
              }
            />

            <Route
              path="/restaurant/feed"
              element={
                <PrivateRoute>
                  <Feed />
                </PrivateRoute>
              }
            />

            <Route
              path="/search/:method/:field/"
              element={<SearchResult />}
            ></Route>
            <Route path="/search/:method/" element={<SearchResult />}></Route>
            <Route path="/restaurant/:id/" element={<Restaurant />}>
              <Route path="/restaurant/:id/blog/" element={<Blogs />}></Route>
              <Route
                path="/restaurant/:id/comment/"
                element={<Comments />}
              ></Route>
              <Route path="/restaurant/:id/menu/" element={<Menu />}></Route>
              <Route path="/restaurant/:id/image/" element={<Images />}></Route>
              <Route path="/restaurant/:id/*" element={<PageNotFound />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
