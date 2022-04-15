import React,{useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Blog from "./Blog/Blog";
const Blogs = (props) =>{
    const params = useParams();
    const [blogs,setBlogs] = useState([]);
    useEffect(()=>{
        axios.get(`/blog/restaurant/${params.id}/`)
        .then((res)=>{
            setBlogs(res.data.results);
        })
        .catch((e)=>{
            alert(e);
        })
    },[params.id])
    return (
        <div>
            <h1>Blog</h1>
            <div className="d-flex flex-wrap w-100 justify-content-center">
                {
                    blogs.map((blog)=>(
                        <Blog key={blog.id} Blog={blog}></Blog>
                    ))
                }
                {
                    blogs.map((blog)=>(
                        <Blog key={blog.id} Blog={blog}></Blog>
                    ))
                }
                {
                    blogs.map((blog)=>(
                        <Blog key={blog.id} Blog={blog}></Blog>
                    ))
                }
            </div>
        </div>
    )
}
export default Blogs;