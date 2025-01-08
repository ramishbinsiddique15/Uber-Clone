import React, { useEffect, useState } from "react";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

function LiveTracking() {
  const [currentPosition, setCurrentPosition] = useState(null);
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setCurrentPosition({
        lat: latitude,
        lng: longitude,
      });
    });

    const watchId = navigator.geolocation.watchPosition((position) => {
      const { latitude, longitude } = position.coords;
      setCurrentPosition({
        lat: latitude,
        lng: longitude,
      });
    });

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);
  useEffect(() => {
    const updatePosition = () => {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;

        console.log("Position updated:", latitude, longitude);
        setCurrentPosition({
          lat: latitude,
          lng: longitude,
        });
      });
    };

    updatePosition(); // Initial position update

    const intervalId = setInterval(updatePosition, 1000); // Update every 10 seconds
  }, []);

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading Maps...</div>;
  }

  return (
    <div style={{ height: "100%", width: "100%" }} className="z-50">
      {currentPosition ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={currentPosition}
          zoom={15}
        >
          <Marker position={currentPosition} />
        </GoogleMap>
      ) : (
        <p>Fetching your location...</p>
      )}
    </div>
  );
}

export default LiveTracking;
