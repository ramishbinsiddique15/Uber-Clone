import React from "react";

const LookingForDriver = (props) => {
  return (
    <div
      ref={props.lookingForDriverRef}
      className="fixed z-10 bottom-0 translate-y-full w-full bg-white p-3 py-6"
    >
      <h5
        className="p-3 absolute top-0  right-2"
        onClick={() => props.setLookingForDriverOpen(false)}
      >
        <i className="ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Looking for a Captain</h3>
      <div className="flex gap-5 flex-col justify-between items-center">
        <img
          className="h-28"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1569012915/assets/4f/599c47-7f5c-4544-a5d2-926babc8e113/original/Lux.png"
          alt=""
        />
        <div className="w-full">
          <div className="flex items-center gap-5 p-3 border-b-2 border-[#111]">
            <i className="ri-map-pin-line text-lg"></i>
            <div>
              <h3 className="text-lg font-semibold">
                24 B, Near Shopping Complex SCS{" "}
              </h3>
              <p className="text-base font-medium text-gray-600">
                {" "}
                Gulberg III, Lahore
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2 border-[#111]">
            <i className="text-lg ri-map-pin-fill"></i>
            <div>
              <h3 className="text-lg font-semibold">
                22 Sunrise Avenue, Johar Town{" "}
              </h3>
              <p className="text-base font-medium text-gray-600">
                {" "}
                Gulberg III, Lahore
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 ">
            <i className="text-lg ri-money-dollar-circle-line"></i>
            <div>
              <h3 className="text-lg font-semibold">Rs. 156/-</h3>
              <p className="text-base font-medium text-gray-600"> Cash Cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LookingForDriver;
