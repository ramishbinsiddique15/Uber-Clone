const axios = require("axios");
const captainModel = require("../models/captain.model");

module.exports.getAddressCoordinate = async (address) => {
  try {
    const apiKey = process.env.GOOGLE_MAPS_API; // Replace with your actual API key
    const url = `https://maps.gomaps.pro/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${apiKey}`;

    const response = await axios.get(url);

    // Ensure the response has results and location data
    if (
      response.data.status === "OK" &&
      response.data.results &&
      response.data.results.length > 0
    ) {
      const location = response.data.results[0].geometry.location;
      return {
        ltd: location.lat,
        lng: location.lng,
      };
    } else {
      throw new Error("No results found for the given address.");
    }
  } catch (error) {
    console.error(
      "Error fetching coordinates:",
      error.response?.data || error.message
    );
    throw error;
  }
};

module.exports.getDistanceTime = async (origin, destination) => {
  if (!origin || !destination) {
    throw new Error("Origin and destination are required.");
  }

  const apiKey = process.env.GOOGLE_MAPS_API;

  const url = `https://maps.gomaps.pro/maps/api/distancematrix/json?origins=${encodeURIComponent(
    origin
  )}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

  try {
    const response = await axios.get(url);

    if (
      response.data.status === "OK" &&
      response.data.rows &&
      response.data.rows.length > 0 &&
      response.data.rows[0].elements &&
      response.data.rows[0].elements.length > 0
    ) {
      const data = response.data.rows[0].elements[0];
      return data;
    } else {
      throw new Error("No results found for the given origin and destination.");
    }
  } catch (error) {
    console.error(
      "Error fetching distance and time:",
      error.response?.data || error.message
    );
    throw error;
  }
};

module.exports.getSuggestions = async (input) => {
  if (!input) {
    throw new Error("Input is required.");
  }

  const apiKey = process.env.GOOGLE_MAPS_API;

  const url = `https://maps.gomaps.pro/maps/api/place/autocomplete/json?input=${encodeURIComponent(
    input
  )}&key=${apiKey}`;

  try {
    const response = await axios.get(url);

    if (response.data.status === "OK" && response.data.predictions) {
      return response.data.predictions;
    } else {
      throw new Error("No suggestions found for the given input.");
    }
  } catch (error) {
    console.error(
      "Error fetching suggestions:",
      error.response?.data || error.message
    );
    throw error;
  }
};

module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {
  if (
    !ltd || !lng || !radius ||
    ltd < -90 || ltd > 90 ||
    lng < -180 || lng > 180
  ) {
    throw new Error("Invalid latitude, longitude, or radius");
  }

  try {
    console.log(ltd, lng, radius)
    const captains = await captainModel.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [lng, ltd] // longitude first, then latitude
          },
          $maxDistance: radius * 1000 // Convert km to meters
        }
      }
    });

    return captains;
  } catch (error) {
    throw new Error(`Error fetching captains: ${error.message}`);
  }
};

