import React, { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";

import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRideRef = useRef(null);
  const lookingForDriverRef = useRef(null);
  const waitingForDriverRef = useRef(null);
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  const [confirmRideOpen, setConfirmRideOpen] = useState(false);
  const [lookingForDriverOpen, setLookingForDriverOpen] = useState(false);
  const [WaitingForDriverOpen, setWaitingForDriverOpen] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useGSAP(() => {
    gsap.to(panelRef.current, {
      height: panelOpen ? "70%" : 0,
      paddingTop: panelOpen ? 0 : 0,
      paddingRight: panelOpen ? "1.25rem" : 0,
      paddingBottom: panelOpen ? "1.25rem" : 0,
      paddingLeft: panelOpen ? "1.25rem" : 0,
      duration: 0.5,
    });
    gsap.to(panelCloseRef.current, {
      opacity: panelOpen ? 1 : 0,
      duration: 0.5,
    });
  }, [panelOpen]);

  useGSAP(() => {
    gsap.to(vehiclePanelRef.current, {
      transform: vehiclePanelOpen ? "translateY(0)" : "translateY(100%)",
      duration: 0.5,
    });
  }, [vehiclePanelOpen]);

  useGSAP(() => {
    gsap.to(confirmRideRef.current, {
      transform: confirmRideOpen ? "translateY(0)" : "translateY(100%)",
      duration: 0.5,
    });
  }, [confirmRideOpen]);

  useGSAP(() => {
    gsap.to(lookingForDriverRef.current, {
      transform: lookingForDriverOpen ? "translateY(0)" : "translateY(100%)",
      duration: 0.5,
    });
  }, [lookingForDriverOpen]);

  useGSAP(() => {
    gsap.to(waitingForDriverRef.current, {
      transform: WaitingForDriverOpen ? "translateY(0)" : "translateY(100%)",
      duration: 0.5,
    });
  }, [WaitingForDriverOpen]);

  return (
    <div className="h-screen relative">
      <img
        className="w-20 absolute left-5 top-5"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt=""
      />
      <div className="h-screen w-full">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:6068/1*4kI1Hl7acOf-BXuK7gZVeQ.png"
          alt=""
        />
      </div>

      <div className="h-screen flex flex-col justify-end absolute top-0 w-full">
        <div className="h-[30%] bg-white p-5 relative">
          <h5
            ref={panelCloseRef}
            className="absolute top-3 right-2 text-xl opacity-0"
            onClick={() => setPanelOpen(false)}
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="font-semibold text-3xl">Find a trip</h4>
          <form onSubmit={(e) => submitHandler(e)}>
            <div className="line absolute h-16 w-1 top-[45%] left-10 bg-[#111] rounded-full"></div>
            <input
              onClick={() => setPanelOpen(true)}
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full my-3"
              type="text"
              placeholder="Add a pickup location"
            />
            <input
              onClick={() => setPanelOpen(true)}
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full"
              type="text"
              placeholder="Enter your destination"
            />
          </form>
        </div>
        <div ref={panelRef} className="bg-white h-0 overflow-y-auto">
          <LocationSearchPanel
            setVehiclePanelOpen={setVehiclePanelOpen}
            setPanelOpen={setPanelOpen}
          />
        </div>
      </div>
      <div>
        <VehiclePanel
          vehiclePanelRef={vehiclePanelRef}
          setVehiclePanelOpen={setVehiclePanelOpen}
          setConfirmRideOpen={setConfirmRideOpen}
        />
      </div>
      <div>
        <ConfirmRide
          confirmRideRef={confirmRideRef}
          setConfirmRideOpen={setConfirmRideOpen}
          setLookingForDriverOpen={setLookingForDriverOpen}
        />
      </div>

      <div>
        <LookingForDriver
          lookingForDriverRef={lookingForDriverRef}
          setLookingForDriverOpen={setLookingForDriverOpen}
        />
      </div>

      <div>
        <WaitingForDriver 
        waitingForDriverRef={waitingForDriverRef}
        setWaitingForDriverOpen={setWaitingForDriverOpen}
        />
      </div>
    </div>
  );
};

export default Home;
