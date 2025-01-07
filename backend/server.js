const http = require("http");
const app = require("./app");
const port = process.env.PORT || 3000;
const { InitializeSocket } = require("./sockets/socket"); // Import InitializeSocket

const server = http.createServer(app);

InitializeSocket(server); // Initialize Socket.io

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
