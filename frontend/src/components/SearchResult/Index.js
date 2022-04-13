import React ,{useState, useEffect}from "react";
import { useParams } from "react-router-dom";
import SearchBar from "../Search/SearchBar/Index";
import axios from "axios";
import "./Index.css";
import RestaurantResult from "./RestaurantResult/RestaurantResult";
import logo from "../../images/test_logo_2.png";

const sample = [
    {
        'id' : 1,
        'name': "restaurant",
        'logo': logo,
        'num_likes': 200
    },
    {
        'id' : 2,
        'name': "restaurant",
        'logo': logo,
        'num_likes': 200
    },
    {
        'id' : 3,
        'name': "restaurant",
        'logo': logo,
        'num_likes': 200
    },
    {
        'id' : 4,
        'name': "restaurant",
        'logo': logo,
        'num_likes': 200
    },
    {
        'id' : 5,
        'name': "restaurant",
        'logo': logo,
        'num_likes': 200
    }
]
const SearchResult = ()=>{
    const params= useParams();
    const [hasResult,setHasResult] = useState(true);
    const [restaurants,setRestaurants] = useState(sample);
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
        <div className="justify-content-center index_container">
            <div className = "mt-5 mb-5">
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