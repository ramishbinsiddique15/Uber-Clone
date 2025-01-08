import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const ConfirmRidePopup = (props) => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();

    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/rides/start-ride`,
      {
        params: {
          rideId: props.ride._id,
          otp: otp,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.status === 200) {
      props.setConfirmRidePanel(false);
      navigate("/captain-riding", { state: { ride: props.ride } });
    }
  };

  return (
    <div
      ref={props.confirmRideRef}
      className="fixed z-10 h-screen bottom-0 translate-y-full w-full bg-white p-3 py-6"
    >
      <h5
        className="p-3 absolute top-0  right-2"
        onClick={() => props.setConfirmRidePanel(false)}
      >
        <i className="ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">
        Confirm this Ride to Start
      </h3>
      <div className="flex items-center justify-between w-full bg-[#eee] p-3 rounded">
        <div className="flex items-center gap-3 ">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQHjUiEsl2poMRjLwrb3SvehTjx1BXqCf91Q&s"
            alt=""
          />
          <h2 className="text-lg font-medium capitalize">
            {props.ride?.user.fullname.firstname}{" "}
            {props.ride?.user.fullname.lastname}
          </h2>
        </div>
        <h5 className="text-xl font-semibold">2.2 KM</h5>
      </div>
      <div className="flex gap-5 flex-col justify-between items-center">
        <div className="w-full">
          <div className="flex items-center gap-5 p-3 border-b-2 border-[#111]">
            <i className="ri-map-pin-line text-lg"></i>
            <div>
              {/* <h3 className="text-lg font-semibold">
                24 B, Near Shopping Complex SCS{" "}
              </h3> */}
              <p className="text-base font-medium "> {props.ride?.pickup}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2 border-[#111]">
            <i className="text-lg ri-map-pin-fill"></i>
            <div>
              {/* <h3 className="text-lg font-semibold">
                22 Sunrise Avenue, Johar Town{" "}
              </h3> */}
              <p className="text-base font-medium ">
                {" "}
                {props.ride?.destination}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 ">
            <i className="text-lg ri-money-dollar-circle-line"></i>
            <div>
              <h3 className="text-lg font-semibold">
                Rs. {props.ride?.fare}/-
              </h3>
              {/* <p className="text-base font-medium text-gray-600"> Cash Cash</p> */}
            </div>
          </div>
        </div>
        <form
          className="w-full"
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <input
            value={otp}
            onChange={(e) => {
              setOtp(e.target.value);
            }}
            type="number"
            placeholder="Enter OTP"
            className="text-center font-mono bg-[#eee] w-full p-3 rounded border-none"
          />
          <div className="w-full mt-5">
            <button className="bg-[#111] flex items-center justify-center  text-white font-semibold mb-2 rounded px-4 py-2  w-full text-lg ">
              Confirm
            </button>
            <button
              onClick={() => props.setConfirmRidePanel(false)}
              className="bg-red-600 text-white font-semibold rounded px-4 py-2  w-full text-lg placeholder:text-base"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConfirmRidePopup;
