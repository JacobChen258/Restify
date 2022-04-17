import React,{useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Blog from "./Blog/Blog";
import InfiniteScroll from 'react-infinite-scroll-component';
const Blogs = (props) =>{
    const params = useParams();
    const [blogs,setBlogs] = useState([]);
    const [next,setNext] = useState('')
    useEffect(()=>{
        axios.get(`/blog/restaurant/${params.id}/`)
        .then((res)=>{
            setBlogs(res.data.results);
            let next_url = res.data.next;
            next_url = next_url.split('http://127.0.0.1:8000')[1];
            setNext(res.data.next);
        })
        .catch((e)=>{
            alert(e);
        })
    },[params.id])
    const fetchData = ()=>{
        if (next != null){
            let headers = {
                "Content-Type": 'application/x-www-form-urlencoded',
                'X-Requested-With': 'XMLHttpRequest'   
            }
            axios.get(next,{headers:headers})
            .then((res)=>{
                console.log(res)
                setBlogs(blogs.concat(res.data.results));
                setNext(res.data.next);
            })
            .catch((e)=>{
                alert(e);
            })
        }
    }
    return (
        <div>
            <h1>Blog</h1>
            <div className="d-flex flex-wrap w-100 justify-content-center">
            <InfiniteScroll
                dataLength={blogs.length} //This is important field to render the next data
                next={fetchData}
                hasMore={(next !== null)}
                loader={<h4>Loading...</h4>}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                    <b>Yay! You have seen it all</b>
                    </p>
                }
                >
                {
                    blogs.map((blog)=>(
                        <Blog key={blog.id} Blog={blog}></Blog>
                    ))
                }
            </InfiniteScroll>

            </div>
        </div>
    )
}
export default Blogs;