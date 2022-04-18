import React, { useState,useContext,useEffect } from "react";
import UserNavbar from "../UserNav/UserNav";
import AnonNavbar from "../AnonNav/AnonNav";
import AuthContext from "../../Context/AuthContext";

const RestifyNav = (props) => {
  const { user,tempRes } = useContext(AuthContext);
  const [myRes,setMyRes] = useState(null);
  useEffect(()=>{
    setMyRes(tempRes);
  },[tempRes])
  return user ? <UserNavbar MyRes={myRes} SetAvatar={props.SetAvatar} Avatar={props.Avatar}/> : <AnonNavbar />;
};

export default RestifyNav;
