import React from "react";
import "./Feed.css";
import { Col, Row, Container } from "react-bootstrap";

const Feed = () => {
    return (
        <div className="w-100 bg_color">
            <section class="bg-secondary text-light py-3">
                <div class="container">
                    <div class="row">
                        <div class="col text-left">
                            <h2>Your Feed</h2>
                            <br />
                            <p class="lead">Here you can browse your personal feed to see the blog posts of which restaurants you follow</p>
                        </div>
                    </div>
                </div>     
            </section>  
            <section class="text-dark p-5">
                <div class="container">
                    <div id="blogposts" class="col text-center">
                        
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Feed;