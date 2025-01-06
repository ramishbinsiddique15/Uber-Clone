import React from "react";
import { NavLink } from "react-router-dom";

const Start = () => {
  return (
    <div>
      <div className="h-screen bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1598566665290-e59c95256dc3?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] pt-5 w-full flex justify-between flex-col ">
        <img
          className="w-20 ml-8 filter invert"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <div className="bg-white pb-7 py-4 px-4">
          <h2 className="text-3xl font-bold">Get Started with Uber</h2>
          <NavLink to={"/login"} className="w-full flex items-center justify-center text-lg bg-black mt-4 text-white py-3 rounded-md">
            Continue
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Start;
