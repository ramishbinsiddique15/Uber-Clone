import React, { useContext } from "react";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainDetails = () => {
  const { captain } = useContext(CaptainDataContext);
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQHjUiEsl2poMRjLwrb3SvehTjx1BXqCf91Q&s"
            alt=""
          />
          <h4 className="text-lg font-medium capitalize">
            {captain.fullname.firstname} {captain.fullname.lastname}
          </h4>
        </div>
        <div>
          <h4 className="text-xl font-semibold">Rs. 295/-</h4>
          <p className="text-sm font-medium text-gray-600">Earned</p>
        </div>
      </div>
      <div className="flex w-full bg-[#eee] rounded justify-between my-5 p-3">
        <div className="text-center">
          <i className="text-3xl font-thin ri-timer-2-line"></i>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
        <div className="text-center">
          <i className="text-3xl font-thin ri-speed-up-line"></i>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
        <div className="text-center">
          <i className="text-3xl font-thin ri-sticky-note-line"></i>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
      </div>
    </>
  );
};

export default CaptainDetails;
