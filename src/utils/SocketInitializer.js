// SocketInitializer.js
import { useEffect } from "react";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { setSocket } from "../redux/slice/socketSlice";

const SocketInitializer = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth?.user?.id)
  useEffect(() => {
    // Use your backend URL here. If your backend runs on port 5000:
    const socket = io("http://localhost:3000", {
      query: { userId },
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
      dispatch(setSocket({ socket, isConnected: true }));
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
      dispatch(setSocket({ socket: null, isConnected: false }));
    });

    return () => {
      socket.disconnect();
    };
  }, [dispatch, userId]);

  return null;
};

export default SocketInitializer;
