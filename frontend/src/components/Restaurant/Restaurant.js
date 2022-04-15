import React from "react";
import {Outlet} from "react-router-dom";
import "./Restaurant.css"
import SideBar from "./SideBar/SideBar";
import RestaurantInfo from "./RestaurantInfo/RestaurantInfo";

//['id','name', 'address', 'logo', 'email', 'postal_code', 'phone_num', 'num_followers', 'num_likes']
const Restaurant = () =>{
    return (
        <div className="bg_color d-flex flex-row" id = "restaurant_main">
            <SideBar/>
            <div className="d-flex flex-column p-3 w-100">
                <h1>Restaurant Information</h1>
                <hr></hr>
                <RestaurantInfo></RestaurantInfo>
                <hr></hr>
                <Outlet></Outlet>
            </div>
        </div>
    )
}
export default Restaurant;