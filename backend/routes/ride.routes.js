const express = require("express");
const router = express.Router();
const rideController = require("../controllers/ride.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const { body, query } = require("express-validator");

router.post(
  "/create",
  authMiddleware.authUser,
  body("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid pickup address"),
  body("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid destination address"),
  body("vehicleType")
    .isString()
    .isIn(["car", "bike", "auto"])
    .withMessage("Invalid vehicle type"),
  rideController.createRide
);

router.get(
  "/get-fare",
  authMiddleware.authUser,
  query("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Please select a valid pickup address"),
  query("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Please select a valid destination address"),
  rideController.getFare
);

module.exports = router;
