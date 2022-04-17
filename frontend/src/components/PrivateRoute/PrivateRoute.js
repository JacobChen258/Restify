import React, { useContext } from "react";
import { Navigate, useParams } from "react-router-dom";
import AuthContext from "../Context/AuthContext";

// const useAuth = () => {
//   return authenticated;
// };
function PrivateRoute({ children }) {
  const params = useParams();
  const { user } = useContext(AuthContext);

  if (user) {
    return !params.id || params.id == user.restaurant ? (
      children
    ) : (
      <Navigate to="/" />
    );
  } else {
    return <Navigate to="/login" />;
  }
}

export default PrivateRoute;
