const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const mapController = require("../controllers/maps.controller");
const { query } = require("express-validator");

router.get(
  "/get-coordinates",
  query("address").isString().isLength({ min: 3 }), // Corrected key and method chaining
  authMiddleware.authUser,
  mapController.getCoordinates // Properly referenced the controller method
);

router.get(
  "/get-distance-time",
  query("origin").isString().isLength({ min: 3 }),
  query("destination").isString().isLength({ min: 3 }),
  authMiddleware.authUser,
  mapController.getDistanceTime
);

router.get("/get-suggestions",
  query("input").isString().isLength({ min: 1 }),
  authMiddleware.authUser,
  mapController.getSuggestions
)

module.exports = router;
