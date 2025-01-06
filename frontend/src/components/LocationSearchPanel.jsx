import React from "react";

const LocationSearchPanel = (props) => {
  const locations = [
    "24 B, Near Shopping Complex SCS, Gulberg III, Lahore, Pakistan",
    "123 A, Main Boulevard, DHA Phase 5, Karachi, Pakistan",
    "56 D, Sector D, Blue Area, Islamabad Capital Territory, Pakistan",
    "78 Green Street, University Town, Peshawar, Pakistan",
    "12 Canal View Road, Multan Cantt, Multan, Pakistan",
    "45 Gulberg Road, Industrial Estate, Faisalabad, Pakistan",
    "88 Park Lane, Clifton, Karachi, Pakistan",
    "22 Sunrise Avenue, Johar Town, Lahore, Pakistan",
  ];

  return (
    <div className="p-4">
      <div className="flex flex-col gap-4 border rounded-lg p-3">
        {locations.map((location, index) => (
          <div
          onClick={()=>{
            props.setVehiclePanelOpen(true)
            props.setPanelOpen(false)
          }}
            key={index}
            className="flex items-center border-2 border-[#eee] active:border-black rounded-xl justify-start gap-3 p-2"
          >
            {/* Circle Icon */}
              <i className="ri-map-pin-line text-lg"></i>
            

            {/* Location Text */}
            <h4 className="text-sm font-medium">{location}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationSearchPanel;
