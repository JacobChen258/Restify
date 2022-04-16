import { useState, createContext, useEffect } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  let [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  let [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens"))
      : null
  );
  const [loading, setloading] = useState(true);

  const updateToken = async () => {
    console.log("updated token");
    axios
      .post("/user/token/refresh", { refresh: authTokens?.refresh })
      .then((res) => {
        localStorage.setItem("authTokens", JSON.stringify(res.data));
        setAuthTokens(res.data);
        setUser(jwt_decode(res.data.access));
      })
      .catch((err) => {
        console.log("hello");
        logoutUser();
      });

    if (loading) {
      setloading(false);
    }
  };

  useEffect(() => {
    if (loading) {
      updateToken();
    }

    let fiftyMinutes = 1000 * 60 * 50;

    let interval = setInterval(() => {
      if (authTokens) {
        updateToken();
      }
    }, fiftyMinutes);
    return () => clearInterval(interval);
  }, [authTokens, loading]);

  const logoutUser = () => {
    setUser(null);
    setAuthTokens(null);
    localStorage.removeItem("authTokens");
  };

  let contextData = {
    user: user,
    authTokens: authTokens,
    logoutUser: logoutUser,
    setUser: setUser,
    setAuthTokens: setAuthTokens,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
