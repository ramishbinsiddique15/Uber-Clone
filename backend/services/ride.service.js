const rideModel = require("../models/ride.model");
const mapsService = require("./maps.service");
const crypto = require("crypto");
const { SendMessageToSocketId } = require("../sockets/socket");

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
    return Math.round(
      baseFare[vehicleType] +
        (perKmRate[vehicleType] * distance.value) / 1000 +
        (perMinuteRate[vehicleType] * duration.value) / 60
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

module.exports.confirmRide = async ({ rideId, captain }) => {
  if (!rideId) {
    throw new Error("Ride ID is required");
  }

  await rideModel.findOneAndUpdate(
    { _id: rideId },
    {
      status: "accepted",
      captain: captain._id,
    }
  );

  const ride = await rideModel
    .findOne({ _id: rideId })
    .populate("user")
    .populate("captain")
    .select("+otp");

  if (!ride) {
    throw new Error("Ride not found");
  }

  return ride;
};

module.exports.startRide = async ({ rideId, otp, captain }) => {
  if (!rideId || !otp) {
    throw new Error("Ride ID and OTP are required");
  }

  const ride = await rideModel
    .findOne({ _id: rideId })
    .populate("user")
    .populate("captain")
    .select("+otp");
  if (!ride) {
    throw new Error("Ride not found");
  }

  if (ride.status !== "accepted") {
    throw new Error("Ride is not accepted");
  }
  if (ride.otp !== otp) {
    throw new Error("Invalid OTP");
  }

  await rideModel.findOneAndUpdate(
    { _id: rideId },
    {
      status: "ongoing",
    }
  );

  SendMessageToSocketId(ride.user.socketId, {
    event: "ride-started",
    data: ride,
  });

  return ride;
};

module.exports.endRide = async ({ rideId, captain }) => {
  if (!rideId) {
    throw new Error("Ride ID is required");
  }

  const ride = await rideModel
    .findOne({ _id: rideId })
    .populate("user")
    .populate("captain")
    .select("+otp");
  if (!ride) {
    throw new Error("Ride not found");
  }

  if (ride.status !== "ongoing") {
    throw new Error("Ride is not ongoing");
  }

  await rideModel.findOneAndUpdate(
    { _id: rideId, captain: captain._id },
    {
      status: "completed",
    }
  );

  return ride;
};
