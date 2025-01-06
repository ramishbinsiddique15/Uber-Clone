import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";
const CaptainSignup = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [userData, setUserData] = useState({});

  const { captain, setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();

    const captainData = {
      fullname: { firstname: firstname, lastname: lastname },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType,
      },
    };
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/captains/register`, captainData
    )
    if (response.status === 201) {
      setUserData(response.data);
      setCaptain(response.data);
      localStorage.setItem("captain", response.data.token);
      navigate("/captain-home");
    }
    setFirstname("");
    setLastname("");
    setEmail("");
    setPassword("");
    setVehicleColor("");
    setVehiclePlate("");
    setVehicleCapacity("");
    setVehicleType("");
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
          <h3 className="text-lg font-medium mb-2">
            What's our Captain's name
          </h3>
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
          <h3 className="text-lg font-medium mb-2">
            What's our Captain's email
          </h3>
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
          <h3 className="text-lg font-medium mb-2">Vehicle Info</h3>
          <div className="flex w-full gap-2">
            <input
              value={vehicleColor}
              onChange={(e) => {
                setVehicleColor(e.target.value);
              }}
              className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
              type="text"
              placeholder="Vehicle Color"
            />
            <input
              value={vehiclePlate}
              onChange={(e) => {
                setVehiclePlate(e.target.value);
              }}
              className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
              type="text"
              placeholder="Vehicle Plate"
            />
          </div>
          <div className="flex w-full gap-2">
            <input
              value={vehicleCapacity}
              onChange={(e) => {
                setVehicleCapacity(e.target.value);
              }}
              className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
              type="number"
              placeholder="Vehicle Capacity"
            />
            <select
              value={vehicleType}
              onChange={(e) => {
                setVehicleType(e.target.value);
              }}
              className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            >
              <option value="" disabled>
                Select Vehicle Type
              </option>
              <option value="car">Car</option>
              <option value="bike">Bike</option>
              <option value="auto">Auto</option>
            </select>
          </div>
          <button className="bg-[#111] text-white font-semibold mb-4 rounded px-4 py-2  w-full text-lg placeholder:text-base">
            Create Captain Acccount
          </button>
          <div className="flex gap-2 items-center justify-center">
            <p className="text-center">Already registered? </p>
            <NavLink to={"/captain-login"} className="text-blue-500">
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

export default CaptainSignup;
