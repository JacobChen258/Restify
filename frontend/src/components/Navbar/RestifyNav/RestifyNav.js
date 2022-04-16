import React, { useContext } from "react";
import UserNavbar from "../UserNav/UserNav";
import AnonNavbar from "../AnonNav/AnonNav";
import AuthContext from "../../Context/AuthContext";

const RestifyNav = () => {
  const { user } = useContext(AuthContext);

  return user ? <UserNavbar /> : <AnonNavbar />;
};

export default RestifyNav;
