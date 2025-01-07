const rideModel = require("../models/ride.model");
const mapsService = require("./maps.service");
const crypto = require("crypto");

const getFare = async (pickup, destination) => {
  if (!pickup || !destination) {
    throw new Error("Pickup and Destination are required");
  }

  const distanceTime = await mapsService.getDistanceTime(pickup, destination);

  const baseFare = {
    auto: 20,
    car: 50,
    bike: 10,
  };

  const perKmRate = {
    auto: 18,
    car: 30,
    bike: 15,
  };

  const perMinuteRate = {
    auto: 2,
    car: 3,
    bike: 1,
  };

  const { distance, duration } = distanceTime;

  const calculateFare = (vehicleType) => {
    return (
      Math.round(baseFare[vehicleType] +
      (perKmRate[vehicleType] * distance.value) / 1000 +
      (perMinuteRate[vehicleType] * duration.value) / 60)
    );
  };

  return {
    auto: calculateFare("auto"),
    car: calculateFare("car"),
    bike: calculateFare("bike"),
  };
};

module.exports.getFare = getFare;

const getOTP = async (num) => {
  const otp = crypto
    .randomInt(0, Math.pow(10, num))
    .toString()
    .padStart(num, "0");

  return otp;
};

module.exports.createRide = async ({
  user,
  pickup,
  destination,
  vehicleType,
}) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error("User, Pickup, Destination, and Vehicle Type are required");
  }
  const fare = await getFare(pickup, destination);
  const otp = await getOTP(6);

  const ride = rideModel.create({
    user,
    pickup,
    destination,
    otp: otp,
    fare: fare[vehicleType],
  });

  return ride;
};
