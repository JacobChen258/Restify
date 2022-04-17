import { React, useState, useEffect } from "react";
import "./BlogInfo.css";
import { useParams } from "react-router-dom";
import axios from "axios";

const BlogInfo = () => {

    const params = useParams();
    const [blog, setBlog] = useState([]);

    useEffect(() => {
        axios.get(`blog/${params.id}/`)
            .then(response => {
                setBlog(response.data.results);
            })
            
    }, [params.id])

    return (
        <div className="w-100 bg_color">
            <section className="bg-secondary text-light py-3">
                <div className="container">
                    <div className="row">
                        <div className="col text-left">
                            <h2>Blog Posts</h2>
                            <br />
                            <p className="lead">Here you can read a restaurant's blog posts</p>
                        </div>
                    </div>
                </div>     
            </section>  
            <section className="text-dark p-5">
                <div className="container">
                    <div className="col text-center">
                        {blog.map((post) => (
                            <div key={post.id} className="row">
                                <h3 className="lead">{post.title}</h3>
                                <br />
                                <br />
                                <p className="lead">{post.content}</p>
                                <br />
                                <p>Likes: {post.num_likes}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default BlogInfo;