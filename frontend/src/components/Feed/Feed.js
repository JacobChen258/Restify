import { React, useState, useEffect } from "react";
import "./Feed.css";
import { Col, Row, Container } from "react-bootstrap";

const Feed = () => {

    const [feed, setFeed] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/user/feed/')
            .then(res => res.json())
            .then(json => setFeed(json.data))
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
                    <div id="blogposts" className="col text-center">
                        {feed.map(post => (
                            <div key={post.id} className="row">
                                <p className="lead">{post.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Feed;