import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Blog from "./Blog/Blog";
import InfiniteScroll from "react-infinite-scroll-component";
import AuthContext from "../../Context/AuthContext";

const Blogs = (props) => {
  const { user, authTokens } = useContext(AuthContext);
  const params = useParams();
  const [blogs, setBlogs] = useState([]);
  const [next, setNext] = useState(null);
  const [change, setChange] = useState(false);

  //   useEffect(() => {
  //     axios
  //       .get(`/blog/restaurant/${params.id}/`)
  //       .then((res) => {
  //         setBlogs(res.data.results);
  //         setNext(res.data.next);
  //       })
  //       .catch((e) => {
  //         alert(e);
  //       });
  //   }, [deleted]);

  useEffect(() => {
    console.log("use effect");
    setNext(null);
    axios
      .get(`/blog/restaurant/${params.id}/`)
      .then((res) => {
        setBlogs(res.data.results);
        setNext(res.data.next);
      })
      .catch((e) => {
        alert(e);
      });
    console.log(blogs);
    // eslint-disable-next-line
  }, [params.id, change]);

  const fetchData = () => {
    if (next != null) {
      axios
        .get(next)
        .then((res) => {
          console.log(res);
          setBlogs(blogs.concat(res.data.results));
          setNext(res.data.next);
        })
        .catch((e) => {
          alert(e);
        });
    }
  };

  const deleteBlog = (id) => {
    const headers = {
      headers: {
        Authorization: "Bearer " + authTokens?.access,
      },
    };

    axios
      .delete(`/blog/${id}/`, headers)
      .then(() => {
        setChange((prev) => !prev);
      })
      .catch((res) => {
        if (res.response.status === 404) {
          alert("blog does not exist");
        } else if (res.response.status === 401) {
          alert("you are not the owner");
        }
      });
  };

  return (
    <div>
      <h1>Blog</h1>
      <div className="d-flex flex-wrap w-100 justify-content-center">
        <InfiniteScroll
          dataLength={blogs.length} //This is important field to render the next data
          next={fetchData}
          hasMore={next !== null}
        >
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              Blog={blog}
              owner={
                user !== null &&
                user.restaurant !== null &&
                params.id === String(user.restaurant)
              }
              onChange={(id) => deleteBlog(id)}
            ></Blog>
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};
export default Blogs;
