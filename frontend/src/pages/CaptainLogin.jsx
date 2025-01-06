import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";

const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captainData, setCaptainData] = useState({});

  const { captain, setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    const captain = { email: email, password: password }

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/captains/login`, captain
    )

    if (response.status === 200) {
      setCaptainData(response.data);
      setCaptain(response.data.captain);
      localStorage.setItem("token", response.data.token);
      navigate("/captain-home");
    }

    setEmail("");
    setPassword("");
  };
  return (
    <div className="p-7 flex flex-col justify-between h-screen">
      <div>
        <img
          className="w-20 mb-2"
          src="https://www.svgrepo.com/show/505031/uber-driver.svg"
          alt=""
        />
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="email"
            name=""
            
            required
            placeholder="email@example.com"
          />
          <h3 className="text-lg font-medium mb-2">Enter password</h3>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            name=""
            
            required
            placeholder="******"
          />
          <button className="bg-[#111] text-white font-semibold mb-4 rounded px-4 py-2  w-full text-lg placeholder:text-base">
            Login
          </button>
          <div className="flex gap-2 items-center justify-center">
            <p className="text-center">Join a fleet? </p>
            <NavLink to={"/captain-signup"} className="text-blue-500">
              Register as a Captain
            </NavLink>
          </div>
        </form>
      </div>
      <div>
        <NavLink
          to={"/login"}
          className="bg-[#d5622d] flex items-center justify-center text-white font-semibold  rounded px-4 py-2  w-full text-lg placeholder:text-base"
        >
          Sign in as User
        </NavLink>
      </div>
    </div>
  );
};

export default CaptainLogin;
