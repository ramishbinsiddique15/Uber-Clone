import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import {UserDataContext} from "../context/UserContext";
const UserSignup = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});

  const {user, setUser} = useContext(UserDataContext);

  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    const newUser = {
      fullname: { firstname: firstname, lastname: lastname },
      email: email,
      password: password,
    };
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/register`,
      newUser
    );
    if (response.status === 201) {
      const data= response.data;
      localStorage.setItem("token", data.token);
      setUser(data.user);
      navigate("/home");
    }
    setFirstname("");
    setLastname("");
    setEmail("");
    setPassword("");
  };
  return (
    <div className="p-7 flex flex-col justify-between h-screen">
      <div>
        <img
          className="w-20 mb-5"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h3 className="text-lg font-medium mb-2">What's your name</h3>
          <div className="flex w-full gap-2">
            <input
              value={firstname}
              onChange={(e) => {
                setFirstname(e.target.value);
              }}
              className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
              type="text"
              name=""
              placeholder="First name"
            />
            <input
              value={lastname}
              onChange={(e) => {
                setLastname(e.target.value);
              }}
              className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
              type="text"
              name=""
              placeholder="Last name"
            />
          </div>
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
            Create Account
          </button>
          <div className="flex gap-2 items-center justify-center">
            <p className="text-center">Already registered? </p>
            <NavLink to={"/login"} className="text-blue-500">
              Login
            </NavLink>
          </div>
        </form>
      </div>
      <div>
        <p className="text-[10px] leading-tight text-justify">
          By proceeding, you consent to get emails, including by automated
          means, from Uber and it affiliates to the email provided
        </p>
      </div>
    </div>
  );
};

export default UserSignup;
