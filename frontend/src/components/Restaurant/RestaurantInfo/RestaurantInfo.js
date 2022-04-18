import React, { useState, useEffect, useContext } from "react";
import "./RestaurantInfo.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import AuthContext from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const RestaurantInfo = () => {
  const params = useParams();
  const nav = useNavigate();
  const { user, authTokens } = useContext(AuthContext);
  const [resInfo, setResInfo] = useState({});
  const [liked, setLiked] = useState(false);
  const [following, setFollowing] = useState(false);
  useEffect(() => {
    axios
      .get(`/restaurant/${params.id}`)
      .then((res) => {
        setResInfo(res.data);
      })
      .catch((e) => {
        alert("Restaurant does not exist");
        nav("/");
      });
    if (user !== null) {
      let header = { Authorization: "Bearer " + String(authTokens.access) };
      axios
        .get(`/restaurant/liked/${params.id}/`, { headers: header })
        .then((res) => {
          setLiked(res.data.liked);
        })
        .catch((e) => {
          alert(e);
          nav("/");
        });
      axios
        .get(`/user/followed/${params.id}/`, { headers: header })
        .then((res) => {
          setFollowing(res.data.followed);
        })
        .catch((e) => {
          alert(e);
          nav("/");
        });
    }
  }, [params.id]);

  const LikeIcon = () => {
    if (liked) {
      return (
        <button
          className="btn_bg btn_border me-5 d-flex p-1"
          onClick={handleUnlike}
        >
          <div>
            <AiFillHeart />
          </div>{" "}
          <span className="ms-2 text-center me-1">{resInfo.num_likes}</span>
        </button>
      );
    }
    return (
      <button
        className="btn_bg btn_border me-5 d-flex p-1"
        onClick={handleLike}
      >
        <div>
          <AiOutlineHeart />
        </div>{" "}
        <span className="ms-2 text-center me-1">{resInfo.num_likes}</span>
      </button>
    );
  };
  const FollowBtn = () => {
    if (following) {
      return (
        <button className="btn_bg btn_border p-1" onClick={handleUnfollow}>
          {" "}
          Unfollow{" "}
        </button>
      );
    }
    return (
      <button className="btn_bg btn_border p-1" onClick={handleFollow}>
        {" "}
        Follow{" "}
      </button>
    );
  };
  const EditBtn = () => {
    if (user !== null && user.restaurant !== null) {
      if (params.id === String(user.restaurant)) {
        return (
          <div className="ms-auto me-3 d-flex flex-column">
            <div>
              <Button
                className="btn_width mb-3"
                onClick={() => {
                  nav("/edit/restaurant/");
                }}
              >
                Edit Information
              </Button>
            </div>
            <div>
              <Button
                className="btn_width mb-3"
                onClick={() => {
                  nav(`/restaurant/${params.id}/menu/add/`);
                }}
              >
                Edit/Add Menu
              </Button>
            </div>
            <div>
              <Button
                className="btn_width mb-3"
                onClick={() => {
                  nav(`/restaurant/${params.id}/blog/add/`);
                }}
              >
                Add Blog
              </Button>
            </div>
            <div>
              <Button
                className="btn_width"
                onClick={() => {
                  nav(`/restaurant/${params.id}/image/add/`);
                }}
              >
                Add Image
              </Button>
            </div>
          </div>
        );
      }
    }
    return <></>;
  };
  const handleLike = () => {
    if (user !== null) {
      let header = { Authorization: "Bearer " + String(authTokens.access) };
      axios
        .post(
          "/restaurant/like/",
          { restaurant: params.id },
          { headers: header }
        )
        .then((res) => {
          setLiked(true);
          setResInfo({ ...resInfo, num_likes: resInfo.num_likes + 1 });
        })
        .catch((e) => {
          if (e.status == 409) {
            alert("You already liked this restaurant");
            setLiked(true);
          } else {
            alert(e);
          }
        });
    } else {
      alert("Please log in");
    }
  };
  const handleUnlike = () => {
    if (user !== null) {
      let header = { Authorization: "Bearer " + String(authTokens.access) };
      axios
        .delete("/restaurant/like/", {
          headers: header,
          data: { restaurant: params.id },
        })
        .then((res) => {
          setLiked(false);
          setResInfo({ ...resInfo, num_likes: resInfo.num_likes - 1 });
        })
        .catch((e) => {
          if (e.status == 404) {
            setLiked(false);
          } else {
            alert(e);
          }
        });
    } else {
      alert("please log in");
    }
  };
  const handleFollow = () => {
    if (user !== null) {
      let header = { Authorization: "Bearer " + String(authTokens.access) };
      axios
        .post("/user/follow/", { restaurant: params.id }, { headers: header })
        .then((res) => {
          setFollowing(true);
          setResInfo({ ...resInfo, num_followers: resInfo.num_followers + 1 });
        })
        .catch((e) => {
          if (e.status == 409) {
            alert("You already followed this restaurant");
            setFollowing(true);
          } else {
            alert(e);
          }
        });
    } else {
      alert("please log in");
    }
  };
  const handleUnfollow = () => {
    if (user !== null) {
      let header = { Authorization: "Bearer " + String(authTokens.access) };
      axios
        .delete("/user/follow/", {
          headers: header,
          data: { restaurant: params.id },
        })
        .then((res) => {
          setFollowing(false);
          setResInfo({ ...resInfo, num_followers: resInfo.num_followers - 1 });
        })
        .catch((e) => {
          if (e.status == 404) {
            setFollowing(false);
          } else {
            alert(e);
          }
        });
    } else {
      alert("please log in");
    }
  };
  return (
    <div className="d-flex flex-row">
      <img
        src={resInfo.logo}
        alt=""
        className=" img_size img_border img_fit"
      ></img>
      <div className="d-flex flex-column ms-5">
        <h2>{resInfo.name}</h2>
        <div className="ps-3">
          <div>Address: {resInfo.address}</div>
          <div>Postal Code: {resInfo.postal_code}</div>
        </div>
        <div className="mt-3">
          <h5>Contact Information</h5>
          <div className="ps-3">
            <div>Email: {resInfo.email}</div>
            <div>Phone Number: {resInfo.phone_num}</div>
          </div>
        </div>
        <div className="mt-auto d-flex flex-row text-center">
          <LikeIcon />
          <div className="mt-auto mb-auto pe-2">
            {" "}
            Followers {resInfo.num_followers}{" "}
          </div>
          <FollowBtn />
        </div>
      </div>
      <EditBtn />
    </div>
  );
};

export default RestaurantInfo;
