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
        var url;
        if ('field' in params){
            url = `/restaurant/search/${params.method}/${params.field}/`;
        }else{
            url = `/restaurant/search/${params.method}/`;
        }
        axios.get(url)
        .then((res)=>{
            console.log(res);
            if (res.data.count > 0){
                setHasResult(true);
                setRestaurants(res.data.results);
            }
        })
        .catch((e)=>{
            alert(e);
        })
    },[params.method,params.field,params])
    return (
        <div className="justify-content-center index_container bg_color">
            <div className = "pt-5 mb-5">
            <SearchBar/>
            </div>
            <hr/>
            {
                hasResult?<RestaurantResult Restaurants={restaurants}/>:<h1 className="text-center mt-5">No Result Found</h1>
            }
        </div>
    )
}

export default SearchResult;