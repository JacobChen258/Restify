import React from "react";
import "./image.css"
const Image = (props)=>{
    return (
        <img src={props.Image} alt="" className="res_img_size res_img_border res_img_fit"></img>
    )
}
export default Image;