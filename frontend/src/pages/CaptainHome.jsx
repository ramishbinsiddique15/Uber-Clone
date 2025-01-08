import React, { useState, useRef, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import RidePopup from "../components/RidePopup";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopup from "../components/ConfirmRidePopup";
import { SocketContext } from "../context/SocketContext";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";
import LiveTracking from "../components/LiveTracking";

const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [ride, setRide] = useState(null);
  const ridePopupRef = useRef(null);
  const confirmRideRef = useRef(null);

  const { socket } = useContext(SocketContext);
  const { captain } = useContext(CaptainDataContext);

  useEffect(() => {
    if (socket) {
      socket.emit("join", { userType: "captain", userId: captain._id });
    }

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          // console.log(position.coords.latitude, position.coords.longitude, captain._id);
          socket.emit("update-location-captain", {
            userId: captain._id,
            location: {
              type: "Point",
              coordinates: [
                position.coords.longitude, // longitude first!
                position.coords.latitude,
              ],
            },
          });
        });
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    };

    const locationInterval = setInterval(updateLocation, 10000);
    updateLocation();
    // return ()=> clearInterval(locationInterval);
  }, [captain, socket]);

  socket.on("new-ride", (data) => {
    console.log("new-ride", data);
    setRide(data);
    setRidePopupPanel(true);
    console.log(ride);
  });

  const confirmRide = async () => {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
      { rideId: ride._id, captainId: captain._id },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  console.log(response.data);
  };

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
        <LiveTracking/>
      </div>
      <div className="h-2/5 p-4">
        <CaptainDetails />
      </div>

      <div>
        <RidePopup
          ride={ride}
          ridePopupRef={ridePopupRef}
          setRidePopupPanel={setRidePopupPanel}
          setConfirmRidePanel={setConfirmRidePanel}
          confirmRide={confirmRide}
        />
      </div>

      <div>
        <ConfirmRidePopup
        ride={ride}
          confirmRideRef={confirmRideRef}
          setConfirmRidePanel={setConfirmRidePanel}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
