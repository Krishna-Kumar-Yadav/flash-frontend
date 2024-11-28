import { io } from "socket.io-client";

// Initialize the socket connection
const socket = io(import.meta.env.VITE_SOCKET_SERVER_URL, {
  withCredentials: true,
  transports: ["websocket"], // Ensures the use of WebSocket for better performance
  reconnectionAttempts: 5,    // Number of attempts to reconnect if connection fails
  timeout: 10000              // Connection timeout in milliseconds
});

// Event to handle successful connection
socket.on("connect", () => {
  console.log("Connected to server with socket ID:", socket.id);
});

// Event to handle disconnection
socket.on("disconnect", (reason) => {
  console.log("Disconnected from server:", reason);
});

// Handle connection errors
socket.on("connect_error", (error) => {
  console.error("Connection error:", error);
});

// Export the socket instance for use in other parts of the app
export default socket;
