import React from "react";
import RestaurantCard from "../RestaurantCard/RestaurantCard";
import './RestaurantResult.css';

const RestaurantResult = (restaurants)=>{
    return (
        <div>
            {
                restaurants.map((res)=>(
                    <div key={res.id}>
                        <RestaurantCard restaurant={res}/>
                    </div>
                ))
            }
        </div>
    )
}

export default RestaurantResult;