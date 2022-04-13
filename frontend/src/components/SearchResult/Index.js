import React ,{useState, useEffect}from "react";
import { useParams } from "react-router-dom";
import SearchBar from "../Search/SearchBar/Index";
import axios from "axios";
import "./Index.css";
import RestaurantResult from "./RestaurantResult/RestaurantResult";

const SearchResult = ()=>{
    const params= useParams();
    const [hasResult,setHasResult] = useState(false);
    const [restaurants,setRestaurants] = useState({});
    useEffect(()=>{
        /**
        axios.get(`/search/${params.method}/${params.field}/`)
        .then((res)=>{
            console.log(res);
            if (res.count > 0){
                setHasResult(true);
                setRestaurants(res.results);
            }
        })
        .catch((e)=>{
            alert(e);
        })
        */
    },[])
    return (
        <div className="justify-content-center a">
            <div className = "mt-5 mb-5">
            <SearchBar/>
            </div>
            <hr/>
            {
                hasResult?<RestaurantResult restaurants={restaurants}/>:<h1 className="text-center mt-5">No Result Found</h1>
            }
        </div>
    )
}

export default SearchResult;