import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CaptainLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          localStorage.removeItem("token");
          navigate("/captain-login", { replace: true });
        })
        .catch((error) => {
          console.error("Logout failed:", error);
          // Optionally navigate to the login page even if the request fails.
          navigate("/captain-login", { replace: true });
        });
    } else {
      navigate("/captain-login", { replace: true });
    }
  }, [navigate]); // `navigate` is included in the dependency array.

  return <div>Logging out...</div>;
};

export default CaptainLogout;
