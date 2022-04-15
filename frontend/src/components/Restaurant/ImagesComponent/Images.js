import React,{useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Image from "./ImageComponent/image";

const Images = (props) =>{
    const params = useParams();
    const [images,setImages] = useState([]);
    useEffect(()=>{
        axios.get(`/restaurant/${params.id}/images`)
        .then((res)=>{
            setImages(res.data.results);
        })
        .catch((e)=>{
            alert(e);
        })
    },[params.id])
    return (
        <div>
            <h1>Image</h1>
            <div className="d-flex flex-wrap w-100 ps-5">
                {
                    images.map((image)=>(
                        <Image key={image.id} Image={image.image}></Image>
                    ))
                }
            </div>
        </div>
    )
}
export default Images;