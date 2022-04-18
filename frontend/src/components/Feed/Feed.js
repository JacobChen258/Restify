import {
  React,
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from "react";
import "./Feed.css";
import axios from "axios";
import AuthContext from "../Context/AuthContext";
import { Toast, ToastContainer } from "react-bootstrap";
// import { FcLike, IoMdHeartDislike } from "react-icons/ai";
import { FcLike } from "react-icons/fc";
import { IoMdHeartDislike } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
var next = null;

const Feed = () => {
  const nav = useNavigate();
  const { authTokens } = useContext(AuthContext);
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    const headers = {
      headers: {
        Authorization: "Bearer " + authTokens?.access,
      },
    };

    axios.get("/user/feed/", headers).then((res) => {
      setFeed(res.data.results);
      next = res.data.next ? res.data.next.replace("8000", "3000") : null;
    });
  }, []);

  const likeBlog = async (e) => {
    // console.log(e);
    let likes = parseInt(
      e.target.parentElement.parentElement.nextSibling.nextSibling.lastChild
        .innerHTML
    );

    const bid = e.target.parentElement.parentElement.getAttribute("blog-id");
    // console.log(likes);
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
      // setFeed((prev) => {
      //   return prev.map((b) => {
      //     if (b.id === bid) {
      //       return { ...b, num_likes: b.num_likes + 1 };
      //     }
      //     return b;
      //   });
      // });
      // console.log(feed);
    });
  };

  const [loading, setLoading] = useState(false);

  const getBlogItems = () => {
    setLoading(true);

    if (next) {
      const headers = {
        headers: {
          Authorization: "Bearer " + authTokens?.access,
        },
      };
      axios
        .get(next, headers)
        .then((res) => {
          setFeed((prev) => [...prev, ...res.data.results]);
          next = res.data.next ? res.data.next.replace("8000", "3000") : null;
        })
        .catch((err) => {
          if (err.response.status === 401) {
            nav("/login");
          }
        });
    }
    setLoading(false);
  };

  const observer = useRef();
  const infScrollRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          getBlogItems();
        }
      });
      if (node) observer.current.observe(node);
    }, // eslint-disable-next-line
    [loading]
  );

  const unlikeBlog = async (e) => {
    let likes = parseInt(
      e.target.parentElement.parentElement.nextSibling.lastChild.innerHTML
    );
    console.log(e);
    console.log(likes);
    const bid = e.target.parentElement.parentElement.getAttribute("blog-id");
    console.log(bid);
    const body = {
      id: bid,
    };
    console.log(body);
    const headers = {
      headers: {
        Authorization: "Bearer " + authTokens?.access,
      },
      data: { id: bid },
    };
    axios.delete("/blog/like/", headers).then((res) => {
      e.target.parentElement.parentElement.nextSibling.lastChild.innerHTML =
        likes -= 1;
      // setFeed((prev) => {
      //   return prev.map((b) => {
      //     if (b.id === bid) {
      //       return { ...b, num_likes: b.num_likes - 1 };
      //     }
      //     return b;
      //   });
      // });
      console.log(feed);
    });

    console.log(feed);
  };

  return (
    <div className="w-100 bg_color">
      <section className="bg-secondary text-light py-3">
        <div className="container">
          <div className="row">
            <div className="col text-left">
              <h2>Your Feed</h2>
              <br />
              <p className="lead">
                Here you can browse your personal feed to see the blog posts of
                which restaurants you follow
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="text-dark p-5">
        <div className="container text-center toast-container">
          <ToastContainer className="mt-5" position="bottom-center">
            {feed.map((post, index) => {
              console.log(post.num_likes);
              return (
                <Toast
                  style={{ width: "100%" }}
                  key={post.id}
                  className="mt-5"
                  ref={index === feed.length - 1 ? infScrollRef : null}
                >
                  <Toast.Header closeButton={false}>
                    <strong className="me-auto blog-title">
                      {post.title}
                      <span>
                        <Link
                          className="res-link"
                          to={`/restaurant/${post.restaurant}/`}
                        >
                          {post.res_name}
                        </Link>
                      </span>
                    </strong>
                    <br></br>

                    <button
                      onClick={likeBlog}
                      blog-id={post.id}
                      className="feed-like"
                    >
                      <FcLike size={20} />
                    </button>
                    <button
                      onClick={unlikeBlog}
                      blog-id={post.id}
                      className="feed-like"
                    >
                      <IoMdHeartDislike size={20} />
                    </button>
                    <small>
                      Likes: <b>{post.num_likes}</b>
                    </small>
                  </Toast.Header>
                  <Toast.Body>{post.content}</Toast.Body>
                </Toast>
              );
            })}
          </ToastContainer>

          {/* <div id="user_feed" className="col text-center"></div> */}
        </div>
      </section>
    </div>
  );
};

export default Feed;
