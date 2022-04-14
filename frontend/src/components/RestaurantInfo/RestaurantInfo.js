import React, {useState,useEffect} from 'react';
import "./RestaurantInfo.css";
import { useParams } from 'react-router-dom';
import axios from 'axios';

const RestaurantInfo = ()=>{
    const params = useParams();
    const [resInfo,setResInfo] = useState({});
    useEffect(()=>{
        axios.get(`/restaurant/${params.id}`)
        .then((res)=>{
            setResInfo(res.data)
        })
        .catch((e)=>{
            alert(e)
        })
    },[params.id])
    return (
        <></>
    )
}

export default RestaurantInfo;