import React, { useEffect, useContext,  useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { UserDataContext } from "../context/UserContext";
const UserProtectWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  
    const { user, setUser } = useContext(UserDataContext);

  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
    }
    axios
    .get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response =>{
      if(response.status === 200){
        setUser(response.data)
        setIsLoading(false);
      }
    })
    .catch((error) => {
      console.error(error);
      localStorage.removeItem("token");
      navigate("/login", { replace: true });
    });
  }, [token]); // Runs the effect whenever `token` or `navigate` changes.

  // Render the children only if the token exists.
  return token ? <>{children}</> : null;
};

export default UserProtectWrapper;
