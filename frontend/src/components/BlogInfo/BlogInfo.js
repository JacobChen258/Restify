import { React, useState, useEffect, useContext } from "react";
import "./BlogInfo.css";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import AuthContext from "../Context/AuthContext";
import { Toast, ToastContainer } from "react-bootstrap";
import { FcLike } from "react-icons/fc";
import { IoMdHeartDislike } from "react-icons/io";

const BlogInfo = () => {
  const params = useParams();
  const [blog, setBlog] = useState([]);
  const { authTokens } = useContext(AuthContext);

  useEffect(() => {
    const headers = {
      headers: {
        Authorization: "Bearer " + authTokens?.access,
      },
    };

    axios.get(`/blog/${params.id}/`, headers).then((response) => {
      setBlog(response.data);
    });
    // eslint-disable-next-line
  }, [params.id]);

  const likeBlog = async (e) => {
    let likes = parseInt(
      e.target.parentElement.parentElement.nextSibling.nextSibling.lastChild
        .innerHTML
    );

    const bid = e.target.parentElement.parentElement.getAttribute("blog-id");
    const body = {
      blog: bid,
    };
    const headers = {
      headers: {
        Authorization: "Bearer " + authTokens?.access,
      },
    };
    axios.post("/blog/like/", body, headers).then((res) => {
      e.target.parentElement.parentElement.nextSibling.nextSibling.lastChild.innerHTML =
        likes + 1;
    }).catch((e)=>{
      if (e.status===409){
        return;
      }
    });
  };

  const unlikeBlog = async (e) => {
    let likes = parseInt(
      e.target.parentElement.parentElement.nextSibling.lastChild.innerHTML
    );
    const bid = e.target.parentElement.parentElement.getAttribute("blog-id");

    const headers = {
      headers: {
        Authorization: "Bearer " + authTokens?.access,
      },
      data: { id: bid },
    };
    axios.delete("/blog/like/", headers).then((res) => {
      e.target.parentElement.parentElement.nextSibling.lastChild.innerHTML =
        likes -= 1;
    })
    .catch((e)=>{
      if (e.status === 404){
        return;
      }
    });
  };

  return (
    <div className="w-100 bg_color">
      <section className="text-dark p-5">
        <div className="container text-center toast-container">
          <ToastContainer className="mt-5 text-center" position="bottom-center">
            <Toast
              style={{ width: "700px", margin: "auto" }}
              key={blog.id}
              className="mt-5 text-center"
            >
              <Toast.Header closeButton={false}>
                <strong className="me-auto blog-title">
                  {blog.title}
                  <span>
                    <Link
                      className="res-link"
                      to={`/restaurant/${blog.restaurant}/`}
                    >
                      {blog.res_name}
                    </Link>
                  </span>
                </strong>
                <br></br>

                <button
                  onClick={likeBlog}
                  blog-id={blog.id}
                  className="feed-like"
                >
                  <FcLike size={20} />
                </button>
                <button
                  onClick={unlikeBlog}
                  blog-id={blog.id}
                  className="feed-like"
                >
                  <IoMdHeartDislike size={20} />
                </button>
                <small>
                  Likes <b>{blog.num_likes}</b>
                </small>
              </Toast.Header>
              <Toast.Body className="blog-content">{blog.content}</Toast.Body>
            </Toast>
          </ToastContainer>

          {/* <div id="user_feed" className="col text-center"></div> */}
        </div>
      </section>
    </div>
  );
};

export default BlogInfo;
