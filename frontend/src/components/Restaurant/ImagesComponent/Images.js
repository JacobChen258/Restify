import React,{useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Image from "./ImageComponent/image";
import InfiniteScroll from 'react-infinite-scroll-component';

const Images = (props) =>{
    const params = useParams();
    const [images,setImages] = useState([]);
    useEffect(()=>{
        axios.get(`/restaurant/${params.id}/images`)
        .then((res)=>{
            setImages(res.data.results);
            setNext(res.data.next);
        })
        .catch((e)=>{
            alert(e);
        })
    },[params.id])
    const [next,setNext] = useState(null);
    const fetchData = ()=>{
        if (next != null){
            axios.get(next)
            .then((res)=>{
                console.log(res)
                setImages(images.concat(res.data.results));
                setNext(res.data.next);
            })
            .catch((e)=>{
                alert(e);
            })
        }
    }
    return (
        <div>
            <h1>Image</h1>
            <InfiniteScroll
                dataLength={images.length} //This is important field to render the next data
                next={fetchData}
                hasMore={(next !== null)}
                className="d-flex flex-wrap w-100 ps-5"
                >
                {
                    images.map((image)=>(
                        <Image key={image.id} Image={image.image}></Image>
                    ))
                }
            </InfiniteScroll>
        </div>
    )
}
export default Images;