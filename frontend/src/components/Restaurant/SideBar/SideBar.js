import React , {useRef, useLayoutEffect}from "react";
import { Link, useParams } from "react-router-dom";
import './SideBar.css'
const SideBar = (props) =>{
    const sidebar = useRef(null);
    const blocker = useRef(null);
    const params = useParams();

    useLayoutEffect(()=>{
        blocker.current.style.width = `${sidebar.current.offsetWidth}px`;
    },[])
    return (
        <div className="h-100 me-5" ref={blocker}>
            <div className={`d-flex flex-column sidebar_pos`}
            id = "sidebar" ref={sidebar}>
                <Link to={`/restaurant/${params.id}/menu/`} className="ps-5">Menu</Link>
                <Link to={`/restaurant/${params.id}/image/`} className="ps-5">Image</Link>
                <Link to={`/restaurant/${params.id}/blog/`} className="ps-5">Blog</Link>
                <Link to={`/restaurant/${params.id}/comment/`} className="ps-5">Comment</Link>   
            </div>
        </div>
    )
}
export default SideBar;