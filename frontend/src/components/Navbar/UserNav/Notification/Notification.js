import React, { useState,useEffect,useContext } from "react";
import "./Notification.css";
import { NavDropdown,Button } from "react-bootstrap";
import axios from "axios";
import AuthContext from "../../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const Notifications = ()=>{
    const nav = useNavigate();
    const [notifications,setNotifications] = useState([]);
    const [curPage,setCurPage] = useState(null);
    const [prev,setPrev] = useState(null);
    const [pageNum,setPageNum] = useState(1);
    const [next, setNext] = useState(null);
    const {user,authTokens} = useContext(AuthContext);
    useEffect(()=>{
        if (user !== null){
            let header = {Authorization: "Bearer " + String(authTokens.access)}
            let pageUrl = "/notification/";
            if (curPage !== null){
                pageUrl=curPage;
            }
            axios.get(pageUrl,{headers:header})
            .then((res)=>{
                console.log(res.data)
                setNext(res.data.next);
                setPrev(res.data.previous)
                setNotifications(res.data.results);
            })
            .catch((e)=>{
                alert(e)
            })
        }
    },[curPage,])
    const [fetch,setFetch] = useState(false);
    useEffect(()=>{
        if(fetch){
            let header = {Authorization: "Bearer " + String(authTokens.access)}
            axios.get(curPage,{headers:header})
            .then((res)=>{
                setNext(res.data.next);
                setPrev(res.data.previous)
                setNotifications(res.data.results);
                setFetch(false);
            })
            .catch((e)=>{
                alert(e)
            })
        }
    },[fetch])
    const handleClick=(e)=>{
        e.preventDefault();
        var id = e.target.id;
        let header = {Authorization: "Bearer " + String(authTokens.access)}
        axios.delete("/notification/",{headers:header,data:{'notif_id':id}})
        .then((res)=>{
            setFetch(true);
        })
        .catch((e)=>{
            alert(e);
        })
    }
    const handleNext = ()=>{
        let header = {Authorization: "Bearer " + String(authTokens.access)}
        if (next === null){
            alert("no more notifications");
            return;
        }
        setPageNum(pageNum+1);
        setCurPage(next);
    }
    const handlePrev = ()=>{
        let header = {Authorization: "Bearer " + String(authTokens.access)}
        if (prev === null){
            alert("no more notifications");
            return;
        }
        setPageNum(pageNum-1);
        setCurPage(prev);
    }
    const navToLogin = ()=>{
        nav("/login/");
    }
    const handleDeleteAll=()=>{
        let header = {Authorization: "Bearer " + String(authTokens.access)};
        axios.delete('/notification/delete_all/',{headers:header})
        .then((res)=>{
            setNotifications([]);
            setCurPage(null);
            setPrev(null);
            setNext(null);
        })
        .catch((e)=>{
            alert(e);
        })
    }
    return (
        <NavDropdown title="Notifications" id="dropdowns ">
        <div className = "dropdown-text">
        {
                (user === null)?(
                    <Button onClick={navToLogin}> Go to Login</Button>
                ):(notifications.length == 0)?<div className="ps-3">No Notifications</div>:
                <div>
                    <div className="d-flex">
                    <Button variant="danger" className='ms-auto me-3' onClick={handleDeleteAll}>Delete All</Button>
                    </div>
                    {
                        notifications.map((notification)=>(
                        <NavDropdown.Item key={notification.id} id={notification.id} className="notifi_size" onClick={handleClick}>
                        {notification.content}
                        </NavDropdown.Item>
                    ))}
                    <div className="d-flex flex-row">
                    <Button onClick={handlePrev} variant="secondary" className="ms-2">prev</Button>
                    <div className="ms-auto me-auto text-center">{pageNum}</div>
                    <Button onClick={handleNext} variant="secondary" className="me-2">next</Button>
                    </div>
                </div>
                
        }
        </div>
        </NavDropdown>
    )
}

export default Notifications