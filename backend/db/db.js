const mongoose = require("mongoose");

const connectToDB = () => {
  // Replace 'your_connection_string' with your MongoDB connection string
  mongoose
    .connect(process.env.DB_CONNECT)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error(`Error connecting to MongoDB: ${err}`));
};

module.exports = connectToDB;