import React from "react";

const RidePopup = (props) => {
  return (
    <div
      ref={props.ridePopupRef}
      className="fixed z-10 bottom-0 translate-y-full w-full bg-white p-3 py-6"
    >
      <h5
        className="p-3 absolute top-0  right-2"
        onClick={() => props.setRidePopupPanel(false)}
      >
        <i className="ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">New Ride Available</h3>
      <div className="flex items-center justify-between w-full bg-[#eee] p-3 rounded-lg">
        <div className="flex items-center gap-3 ">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQHjUiEsl2poMRjLwrb3SvehTjx1BXqCf91Q&s"
            alt=""
          />
          <h2 className="text-lg font-medium">Baig Dogesh</h2>
        </div>
        <h5 className="text-xl font-semibold">2.2 KM</h5>
      </div>
      <div className="flex gap-5 flex-col justify-between items-center">
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
        <div className="w-full">
          <button
            onClick={() => {
              props.setRidePopupPanel(false);
              props.setConfirmRidePanel(true);
            }}
            className="bg-[#111]  text-white font-semibold mb-2 rounded px-4 py-2  w-full text-lg placeholder:text-base"
          >
            Accept
          </button>
          <button
            onClick={() => props.setRidePopupPanel(false)}
            className="bg-red-600 text-white font-semibold rounded px-4 py-2  w-full text-lg placeholder:text-base"
          >
            Ignore
          </button>
        </div>
      </div>
    </div>
  );
};

export default RidePopup;
