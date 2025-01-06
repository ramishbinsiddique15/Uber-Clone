import React, { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import RidePopup from "../components/RidePopup";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopup from "../components/ConfirmRidePopup";

const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(true);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const ridePopupRef = useRef(null);
  const confirmRideRef = useRef(null);

  useGSAP(() => {
    gsap.to(ridePopupRef.current, {
      transform: ridePopupPanel ? "translateY(0)" : "translateY(100%)",
      duration: 0.5,
    });
  }, [ridePopupPanel]);

  useGSAP(() => {
    gsap.to(confirmRideRef.current, {
      transform: confirmRidePanel ? "translateY(0)" : "translateY(100%)",
      duration: 0.5,
    });
  }, [confirmRidePanel]);
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
      <div className="h-3/5">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:6068/1*4kI1Hl7acOf-BXuK7gZVeQ.png"
          alt=""
        />
      </div>
      <div className="h-2/5 p-4">
        <CaptainDetails />
      </div>

      <div>
        <RidePopup
          ridePopupRef={ridePopupRef}
          setRidePopupPanel={setRidePopupPanel}
          setConfirmRidePanel={setConfirmRidePanel}
        />
      </div>

      <div>
        <ConfirmRidePopup 
        confirmRideRef={confirmRideRef}
        setConfirmRidePanel={setConfirmRidePanel}  
        />
      </div>
    </div>
  );
};

export default CaptainHome;
