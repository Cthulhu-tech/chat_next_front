import { createContext } from "react";
import { Socket, io } from "socket.io-client";

export const socket = io(process.env.REACT_APP_WS_HOST || 'ws://localhost:3000/', {
    autoConnect: false,
});
export const SocketContext = createContext<Socket>(socket);