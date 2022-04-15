import React,{useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Item from "./Item/Item";
const Menu = (props) =>{
    const params = useParams();
    const [items,setItems] = useState([]);
    useEffect(()=>{
        axios.get(`/menu_item/restaurant/${params.id}/`)
        .then((res)=>{
            setItems(res.data.results);
        })
        .catch((e)=>{
            alert(e);
        })
    },[params.id])
    return (
        <div>
            <h1>Menu</h1>
            <div className="d-flex flex-wrap w-100 ps-5">
                {
                    items.map((item)=>(
                        <Item key={item.id} Item={item}></Item>
                    ))
                }
            </div>
        </div>
    )
}
export default Menu;