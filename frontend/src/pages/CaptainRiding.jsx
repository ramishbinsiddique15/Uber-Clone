import React, { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import FinishRide from "../components/FinishRide";
import { useLocation } from "react-router-dom";
import LiveTracking from "../components/LiveTracking";

const CaptainRiding = () => {
  const finishRideRef = useRef(null);
  const [finishRide, setFinishRide] = useState(false);

  const location = useLocation();
  const rideData = location.state?.ride;
  useGSAP(() => {
    gsap.to(finishRideRef.current, {
      transform: finishRide ? "translateY(0)" : "translateY(100%)",
      duration: 0.5,
    });
  }, [finishRide]);
  return (
    <div className="h-screen">
      <div className="fixed p-3 top-0 flex items-center justify-between w-full">
        <img
          className="w-20 "
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <NavLink
          to={"/captain/logout"}
          className=" h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <i className="ri-logout-box-r-line text-xl font-semibold"></i>
        </NavLink>
      </div>
      <div className="h-4/5">
        <LiveTracking/>
      </div>
      <div
        className="h-1/5 p-4 relative flex items-center justify-between"
        onClick={() => setFinishRide(true)}
      >
        <h5
          className="p-3 absolute top-0  right-2"
          // onClick={() => props.setConfirmRideOpen(false)}
        >
          <i className="ri-arrow-up-wide-line"></i>
        </h5>
        <h4 className="text-xl font-semibold">4 KM away</h4>
        <button className="bg-[#111]  text-white font-semibold rounded px-12 py-2 text-lg">
          Complete Ride
        </button>
      </div>
      <div>
        <FinishRide
          rideData={rideData}
          finishRideRef={finishRideRef}
          setFinishRide={setFinishRide}
        />
      </div>
    </div>
  );
};

export default CaptainRiding;
