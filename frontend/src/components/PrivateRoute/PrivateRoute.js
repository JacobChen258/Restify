import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../Context/AuthContext";

// const useAuth = () => {
//   return authenticated;
// };
function PrivateRoute({ children }) {
  console.log("hello");
  console.log(useContext(AuthContext));
  const { user } = useContext(AuthContext);

  return user ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
