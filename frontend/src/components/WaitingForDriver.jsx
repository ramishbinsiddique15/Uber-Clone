import React from "react";

const WaitingForDriver = (props) => {
  return (
    <div
      ref={props.waitingForDriverRef}
      className="fixed z-10 bottom-0 w-full translate-y-full bg-white p-3 py-6"
    >
      <h5
        className="p-3 absolute top-0  right-2"
        onClick={() => props.setWaitingForDriverOpen(false)}
      >
        <i className="ri-arrow-down-wide-line"></i>
      </h5>
      <div className="flex gap-5 flex-col justify-between items-center">
        <div className="flex items-center w-full justify-between">
          <img
            className="h-12"
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1569012915/assets/4f/599c47-7f5c-4544-a5d2-926babc8e113/original/Lux.png"
            alt=""
          />
          <div className="text-right">
            <h2 className="text-lg font-medium capitalize">
              {props.ride?.captain.fullname.firstname}{" "}
              {props.ride?.captain.fullname.lastname}
            </h2>
            <h4 className="text-xl font-semibold -mt-1 -mb-1">
              {props.ride?.captain.vehicle.plate}
            </h4>
            <p className="text-xl font-semibold font-mono">OTP: {props.ride?.otp}</p>
          </div>
        </div>
        <div className="w-full">
          <div className="flex items-center gap-5 p-3 border-b-2 border-[#111]">
            <i className="ri-map-pin-line text-lg"></i>
            <div>
              {/* <h3 className="text-lg font-semibold">
                24 B, Near Shopping Complex SCS{" "}
              </h3> */}
              <p className="text-base font-medium ">
                {" "}
                {props.ride?.pickup}
              </p>
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
              <h3 className="text-lg font-semibold">Rs. {props.ride?.fare}/-</h3>
              {/* <p className="text-base font-medium text-gray-600"> Cash Cash</p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingForDriver;
