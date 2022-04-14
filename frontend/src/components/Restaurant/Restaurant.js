import React from "react";
import {Outlet} from "react-router-dom";
import "./Restaurant.css"
import SideBar from "./SideBar/SideBar";
import RestaurantInfo from "../RestaurantInfo/RestaurantInfo";

//['id','name', 'address', 'logo', 'email', 'postal_code', 'phone_num', 'num_followers', 'num_likes']
const Restaurant = () =>{
    return (
        <div className="bg_color d-flex flex-row" id = "restaurant_main">
            <SideBar/>
            <div className="d-flex flex-column">
                <RestaurantInfo></RestaurantInfo>
                <Outlet></Outlet>
            </div>
        </div>
    )
}
export default Restaurant;