import React from "react";

const VehiclePanel = (props) => {
  return (
    <div
      ref={props.vehiclePanelRef}
      className="fixed z-10 bottom-0 translate-y-full w-full bg-white p-3 py-6"
    >
      <h5
        className="p-3 absolute top-0  right-2"
        onClick={() => props.setVehiclePanelOpen(false)}
      >
        <i className="ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Choose a Vehicle</h3>
      <div
        onClick={() => {
          props.setVehiclePanelOpen(false);
          props.setConfirmRideOpen(true);
        }}
        className="flex gap-2 items-center border-2 active:border-black mb-2 rounded-xl p-3 gap-y-3"
      >
        <img
          className="h-12"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1569012915/assets/4f/599c47-7f5c-4544-a5d2-926babc8e113/original/Lux.png"
          alt=""
        />
        <div className="">
          <h4 className="font-medium text-lg">
            UberGo <i className="ri-user-3-fill"></i> 4
          </h4>
          <h5 className="text-md">10 mins away</h5>
          <p className="font-normal text-xs text-gray-600">
            Affordable, compact rides
          </p>
        </div>
        <h2 className="text-xl font-semibold">Rs. 230/-</h2>
      </div>

      <div
        onClick={() => {
          props.setVehiclePanelOpen(false);
          props.setConfirmRideOpen(true);
        }}
        className="flex gap-2 items-center border-2 active:border-black mb-2 rounded-xl p-3 gap-y-3"
      >
        <img
          className="h-12"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
          alt=""
        />
        <div className="">
          <h4 className="font-medium text-lg">
            Moto <i className="ri-user-3-fill"></i> 1
          </h4>
          <h5 className="text-md">3 mins away</h5>
          <p className="font-normal text-xs text-gray-600">
            Affordable, Motorbike rides
          </p>
        </div>
        <h2 className="text-xl font-semibold">Rs. 150/-</h2>
      </div>

      <div
        onClick={() => {
          props.setVehiclePanelOpen(false);
          props.setConfirmRideOpen(true);
        }}
        className="flex gap-2 items-center border-2 active:border-black mb-2 rounded-xl p-3 gap-y-3"
      >
        <img
          className="h-12"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
          alt=""
        />
        <div className="">
          <h4 className="font-medium text-lg">
            UberAuto <i className="ri-user-3-fill"></i> 3
          </h4>
          <h5 className="text-md">5 mins away</h5>
          <p className="font-normal text-xs text-gray-600">
            Affordable, Motorbike rides
          </p>
        </div>
        <h2 className="text-xl font-semibold">Rs. 180/-</h2>
      </div>
    </div>
  );
};

export default VehiclePanel;
