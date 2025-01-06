import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainProtectWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const { captain, setCaptain } = useContext(CaptainDataContext);

  useEffect(() => {
    if (!token) {
      navigate("/captain-login", { replace: true });
      return;
    }

    axios
      .get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setCaptain(response.data.captain);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("Profile fetch failed:", error);
        localStorage.removeItem("token");
        navigate("/captain-login", { replace: true });
      });
  }, [token, navigate, setCaptain]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return token ? <>{children}</> : null;
};

export default CaptainProtectWrapper;

