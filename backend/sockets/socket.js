const { Server } = require("socket.io");
const userModel = require("../models/user.model");
const captainModel = require("../models/captain.model");

let io;

const InitializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`New client connected: ${socket.id}`);

    socket.on("join", async (data) => {
      const { userId, userType } = data;

      console.log(`User ${userId} joined as ${userType}`);

      if (userType === "user") {
        await userModel.findByIdAndUpdate(userId, {
          socketId: socket.id,
        });
      } else if (userType === "captain") {
        await captainModel.findByIdAndUpdate(userId, {
          socketId: socket.id,
        });
      }
    });

    socket.on("update-location-captain", async (data) => {
      try {
        const { userId, location } = data;
    
        // Ensure the required fields are present
        if (!location || !location.coordinates || location.coordinates.length !== 2) {
          return socket.emit("error", { message: "Invalid location data" });
        }
    
        // Update the user's location in the database
        await captainModel.findByIdAndUpdate(
          userId,
          { location }, // Update location directly
          { new: true }  // Return the updated document
        );
    
        // Optionally emit success to the client
        socket.emit("location-updated", { message: "Location updated successfully" });
      } catch (error) {
        console.error("Error updating location:", error);
        socket.emit("error", { message: "Failed to update location" });
      }
    });
    

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
};

const SendMessageToSocketId = (socketId,  messageObject) => {
  if (io) {
    io.to(socketId).emit(messageObject.event, messageObject.data);
  } else {
    console.log("socket.io is not initialized");
  }
};

module.exports = { InitializeSocket, SendMessageToSocketId };
