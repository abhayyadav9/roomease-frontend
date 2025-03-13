import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../../redux/slice/messageSlice";
import { addNotification } from "../../redux/slice/notificationSlice";

const useGetRTM = () => {
  const dispatch = useDispatch();
  const socket = useSelector((store) => store.socketio.socket);
  const isConnected = useSelector((store) => store.socketio.isConnected);

  useEffect(() => {
    if (!socket || !isConnected) {
      console.log("Socket is not connected yet.");
      return;
    }

    console.log("Socket is connected. Setting up newMessage listener.");

    const handleNewMessage = (newMessage) => {
      console.log("Received newMessage event:", newMessage);
      dispatch(addMessage(newMessage));
    }; 
    
    socket.on("new_notification", (notification) => {
          dispatch(addNotification(notification));
        });

    socket.on("newMessage", handleNewMessage);

    return () => {
      console.log("Cleaning up newMessage listener.");
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, isConnected, dispatch]);
};

export default useGetRTM;
