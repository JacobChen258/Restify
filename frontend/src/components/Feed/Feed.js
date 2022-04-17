import { React, useState, useEffect, useContext } from "react";
import "./Feed.css";
import axios from "axios";
import AuthContext from "../Context/AuthContext";

const Feed = () => {

    const { authTokens } = useContext(AuthContext);
    const [feed, setFeed] = useState([]);

    useEffect(() => {

        const headers = {
            headers: {
              Authorization: "Bearer " + authTokens?.access,
            },
          };

        axios.get('/user/feed/', headers)
            .then(response => {
                setFeed(response.data.results);
            })
    }, [])

    return (
        <div className="w-100 bg_color">
            <section className="bg-secondary text-light py-3">
                <div className="container">
                    <div className="row">
                        <div className="col text-left">
                            <h2>Your Feed</h2>
                            <br />
                            <p className="lead">Here you can browse your personal feed to see the blog posts of which restaurants you follow</p>
                        </div>
                    </div>
                </div>     
            </section>  
            <section className="text-dark p-5">
                <div className="container">
                    <div id="user_feed" className="col text-center">
                        {feed.map(post => (
                            <div key={post.id} className="row">
                                <p className="lead">{post.title}</p>
                                <br />
                                <p className="lead">{post.content}</p>
                                <br />
                                <p className="lead">Likes: {post.num_likes}</p>
                                <br />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Feed;