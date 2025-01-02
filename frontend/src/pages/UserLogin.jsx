import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});
  const submitHandler = (e) => {
    e.preventDefault();
    setUserData({ email: email, password: password });
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
            <p className="text-center">New here? </p>
            <NavLink to={"/signup"} className="text-blue-500">
              Create new account
            </NavLink>
          </div>
        </form>
      </div>
      <div>
        <NavLink to={"/captain-login"} className="bg-[#10b461] flex items-center justify-center text-white font-semibold  rounded px-4 py-2  w-full text-lg placeholder:text-base">
          Sign in as Captain
        </NavLink>
      </div>
    </div>
  );
};

export default UserLogin;
