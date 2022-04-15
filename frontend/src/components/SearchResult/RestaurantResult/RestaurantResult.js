import React from "react";
import RestaurantCard from "../RestaurantCard/RestaurantCard";
import './RestaurantResult.css';

const RestaurantResult = (props)=>{
    return (
        <div className="result_container d-flex flex-wrap justify-content-center">
        {console.log(props.Restaurants)}
            {
                props.Restaurants.map((res)=>(
                    <div key={res.id}>
                        <RestaurantCard Restaurant={res}/>
                    </div>
                ))
            }
        </div>
    )
}

export default RestaurantResult;