const rideService = require("../services/ride.service");
const mapsService = require("../services/maps.service");
const { validationResult } = require("express-validator");
const { SendMessageToSocketId } = require("../sockets/socket");
const rideModel = require("../models/ride.model");
module.exports.createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { pickup, destination, vehicleType } = req.body;

  try {
    const ride = await rideService.createRide({
      user: req.user._id,
      pickup,
      destination,
      vehicleType,
    });

    res.status(201).json(ride);

    const pickupCoordinates = await mapsService.getAddressCoordinate(pickup);
    console.log(pickupCoordinates);

    const captainsInRadius = await mapsService.getCaptainsInTheRadius(
      pickupCoordinates.ltd,
      pickupCoordinates.lng,
      50
    );

    ride.otp = "";
    const rideWithUser = await rideModel
      .findOne({ _id: ride._id })
      .populate("user");

    captainsInRadius.map((captain) => {
      console.log(captain, ride);
      SendMessageToSocketId(captain.socketId, {
        event: "new-ride",
        data: rideWithUser,
      });
    });

    // console.log(captainsInRadius);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getFare = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { pickup, destination } = req.query;

  try {
    const fare = await rideService.getFare(pickup, destination);
    return res.status(200).json(fare);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports.confirmRide = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rideId } = req.body;

  try {
    const ride = await rideService.confirmRide({
      rideId,
      captain: req.captain,
    });

    SendMessageToSocketId(ride.user.socketId, {
      event: "ride-confirmed",
      data: ride,
    });

    res.status(200).json(ride);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.startRide = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rideId, otp } = req.query;

  try {
    const ride = await rideService.startRide({
      rideId,
      otp,
      captain: req.captain,
    });
    SendMessageToSocketId(ride.user.socketId, {
      event: "ride-started",
      data: ride,
    });

    res.status(200).json(ride);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.endRide = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rideId } = req.body;

  try {
    const ride = await rideService.endRide({ rideId, captain: req.captain });
    SendMessageToSocketId(ride.user.socketId, {
      event: "ride-ended",
      data: ride,
    });

    res.status(200).json(ride);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
