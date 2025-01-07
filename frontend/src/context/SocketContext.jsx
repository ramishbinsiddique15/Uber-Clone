import React, { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext(null);

const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const baseURL = import.meta.env.VITE_BASE_URL;
        if (!baseURL) {
            console.error("VITE_BASE_URL is not defined in environment variables.");
            return;
        }

        const newSocket = io(baseURL);

        newSocket.on("connect", () => {
            console.log("Connected to server");
        });

        newSocket.on("connect_error", (error) => {
            console.error("Connection Error:", error.message);
        });

        setSocket(newSocket);

        // Cleanup on unmount
        return () => {
            if (newSocket) {
                newSocket.disconnect();
                console.log("Disconnected from server");
            }
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;
