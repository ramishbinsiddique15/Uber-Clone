import React, { useEffect, useContext, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import axios from "axios";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../context/SocketContext";
import { UserDataContext } from "../context/UserContext";
import LiveTracking from "../components/LiveTracking";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const vehiclePanelRef = useRef(null);
  const confirmRideRef = useRef(null);
  const lookingForDriverRef = useRef(null);
  const waitingForDriverRef = useRef(null);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  const [confirmRideOpen, setConfirmRideOpen] = useState(false);
  const [lookingForDriverOpen, setLookingForDriverOpen] = useState(false);
  const [waitingForDriverOpen, setWaitingForDriverOpen] = useState(false);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState(null);
  const [ride, setRide] = useState(null);
  const navigate = useNavigate();

  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserDataContext);

  useEffect(() => {
      if (socket) {
          socket.emit("join", { userType: "user", userId: user._id });
      }
  }, [user, socket]);

  useEffect(() => {
    if (socket) {
      socket.on("ride-confirmed", ride => {
        setRide(ride);
        setLookingForDriverOpen(false);
        setWaitingForDriverOpen(true);
      });

      return () => {
        socket.off("ride-confirmed");
      };
    }
  }, [socket]);

  useEffect(() => {
    if (socket) {
      socket.on("ride-started", ride => {
        setWaitingForDriverOpen(false);
        navigate("/riding", { state: { ride: ride } });
      });

      return () => {
        socket.off("ride-started");
      };
    }
  }, [socket]);

  const handlePickupChange = async (e) => {
    setPickup(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setPickupSuggestions(response.data);
    } catch {
      // handle error
    }
  };

  const handleDestinationChange = async (e) => {
    setDestination(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setDestinationSuggestions(response.data);
    } catch {
      // handle error
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, {
          height: "70%",
          paddingLeft: 24,
          paddingRight: 24,
          paddingTop: 0,
          paddingBottom: 24,
          // opacity:1
        });
        gsap.to(panelCloseRef.current, {
          opacity: 1,
        });
      } else {
        gsap.to(panelRef.current, {
          height: "0%",
          padding: 0,
          // opacity:0
        });
        gsap.to(panelCloseRef.current, {
          opacity: 0,
        });
      }
    },
    [panelOpen]
  );

  useGSAP(
    function () {
      if (vehiclePanelOpen) {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehiclePanelOpen]
  );

  useGSAP(
    function () {
      if (confirmRideOpen) {
        gsap.to(confirmRideRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmRideRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRideOpen]
  );

  useGSAP(
    function () {
      if (lookingForDriverOpen) {
        gsap.to(lookingForDriverRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(lookingForDriverRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [lookingForDriverOpen]
  );

  useGSAP(
    function () {
      if (waitingForDriverOpen) {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [waitingForDriverOpen]
  );

  async function findTrip() {
    setVehiclePanelOpen(true);
    setPanelOpen(false);

    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
      {
        params: { pickup, destination },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    setFare(response.data);
  }

  async function createRide() {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/create`,
      {
        pickup,
        destination,
        vehicleType,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    console.log(response.data);
  }

  return (
    <div className="h-screen relative overflow-hidden">
      <img
        className="w-16 absolute left-5 top-5"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt=""
      />
      <div className="h-screen w-screen">
        {/* image for temporary use  */}{" "}
        {/* <LiveTracking/> */}
        <LiveTracking/>
      </div>
      <div className=" flex flex-col justify-end h-screen absolute top-0 w-full">
        <div className="h-[30%] p-6 bg-white relative">
          <h5
            ref={panelCloseRef}
            onClick={() => {
              setPanelOpen(false);
            }}
            className="absolute opacity-0 right-6 top-6 text-2xl"
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-2xl font-semibold">Find a trip</h4>
          <form
            className="relative py-3"
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <div className="line absolute h-16 w-1 top-[50%] -translate-y-1/2 left-5 bg-gray-700 rounded-full"></div>
            <input
              onClick={() => {
                setPanelOpen(true);
                setActiveField("pickup");
              }}
              value={pickup}
              onChange={handlePickupChange}
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full"
              type="text"
              placeholder="Add a pick-up location"
            />
            <input
              onClick={() => {
                setPanelOpen(true);
                setActiveField("destination");
              }}
              value={destination}
              onChange={handleDestinationChange}
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full  mt-3"
              type="text"
              placeholder="Enter your destination"
            />
          </form>
        </div>
        <div ref={panelRef} className="bg-white h-0 pt-0">
          <button
            onClick={findTrip}
            className="bg-[#111]  text-white font-semibold mb-4 rounded px-4 py-2  w-full text-lg"
          >
            Find trip
          </button>
          <LocationSearchPanel
            suggestions={
              activeField === "pickup"
                ? pickupSuggestions
                : destinationSuggestions
            }
            setPanelOpen={setPanelOpen}
            setVehiclePanelOpen={setVehiclePanelOpen}
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField}
          />
        </div>
      </div>
      <div>
        <VehiclePanel
          vehiclePanelRef={vehiclePanelRef}
          selectVehicle={setVehicleType}
          fare={fare}
          setConfirmRideOpen={setConfirmRideOpen}
          setVehiclePanelOpen={setVehiclePanelOpen}
        />
      </div>
      <div>
        <ConfirmRide
          confirmRideRef={confirmRideRef}
          createRide={createRide}
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          setConfirmRideOpen={setConfirmRideOpen}
          setLookingForDriverOpen={setLookingForDriverOpen}
        />
      </div>
      <div>
        <LookingForDriver
          lookingForDriverRef={lookingForDriverRef}
          createRide={createRide}
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          setLookingForDriverOpen={setLookingForDriverOpen}
        />
      </div>
      <div>
        <WaitingForDriver
          waitingForDriverRef={waitingForDriverRef}
          ride={ride}
          setLookingForDriverOpen={setLookingForDriverOpen}
          setWaitingForDriverOpen={setWaitingForDriverOpen}
          waitingForDriverOpen={waitingForDriverOpen}
        />
      </div>
    </div>
  );
};

export default Home;
