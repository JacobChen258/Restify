import React, {useState,useEffect} from 'react';
import "./RestaurantInfo.css";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {AiFillHeart, AiOutlineHeart} from 'react-icons/ai';
const RestaurantInfo = ()=>{
    const params = useParams();
    const [resInfo,setResInfo] = useState({});
    const [liked, setLiked] = useState(false);
    const [following,setFollowing] = useState(false);
    useEffect(()=>{
        axios.get(`/restaurant/${params.id}`)
        .then((res)=>{
            setResInfo(res.data)
        })
        .catch((e)=>{
            alert(e)
        })
    },[params.id])

    const LikeIcon = ()=>{
        if (liked){
            return <AiFillHeart/>
        }
        return <AiOutlineHeart/>
    }
    const handleLike = ()=>{

    }
    const handleUnlike = ()=>{
        
    }
    const handleFollow = ()=>{

    }
    const handleUnfollow = ()=>{
        
    }
    const FollowBtn = ()=>{
        if (following){
            return (<button className='btn_bg btn_border p-1'> Unfollow </button>)
        }
        return (<button className='btn_bg btn_border p-1'> Follow </button>)
    }
    //['id','name', 'address', 'logo', 'email', 'postal_code', 'phone_num', 'num_followers', 'num_likes']
    return (
        <div className='d-flex flex-row'>
            <img src={resInfo.logo} alt='' className=" img_size img_border img_fit"></img>
            <div className='d-flex flex-column ms-5'>
                <h2>{resInfo.name}</h2>
                <div className='ps-3'>
                    <div>Address: {resInfo.address}</div>
                    <div>Postal Code: {resInfo.postal_code}</div>
                </div>
                <div className='mt-3'>
                    <h5>Contact Information</h5>
                    <div className='ps-3'>
                        <div>Email: {resInfo.email}</div>
                        <div>Phone Number: {resInfo.phone_num}</div>
                    </div>
                </div>
                <div className='mt-auto d-flex flex-row text-center'>
                    <button className='btn_bg btn_border me-5 d-flex p-1'><div><LikeIcon/></div> <span className='ms-2 text-center me-1'>{resInfo.num_likes}</span></button>
                    <div className='mt-auto mb-auto pe-2'> Followers {resInfo.num_followers} </div>
                    <FollowBtn/>
                </div>
            </div>
        </div>
    )
}

export default RestaurantInfo;