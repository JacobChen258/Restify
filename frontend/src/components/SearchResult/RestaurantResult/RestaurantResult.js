import React from "react";
import RestaurantCard from "../RestaurantCard/RestaurantCard";
import './RestaurantResult.css';
import InfiniteScroll from 'react-infinite-scroll-component';
const RestaurantResult = (props)=>{
    return (
        <InfiniteScroll
                dataLength={props.Restaurants.length} //This is important field to render the next data
                next={props.FetchData}
                hasMore={(props.Next !== null)}
                className="result_container d-flex flex-wrap justify-content-center"
                >
                {
                props.Restaurants.map((res)=>(
                    <div key={res.id}>
                        <RestaurantCard Restaurant={res}/>
                    </div>
                ))
            }
        </InfiniteScroll>
    )
}

export default RestaurantResult;