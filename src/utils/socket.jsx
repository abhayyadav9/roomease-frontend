// import { io } from "socket.io-client";
// import BASEURL from "../utils/BaseUrl";

// class SocketService {
//   constructor() {
//     this.socket = io(BASEURL, { transports: ["websocket"] });
//   }

//   connect(userId) {
//     if (userId) {
//       this.socket.emit("joinRoom", userId);
//     }
//   }

//   sendNotification(data) {
//     this.socket.emit("sendNotification", data);
//   }

//   listenForNotifications(data) {
//     this.socket.on("receiveNotification", data);
//   }

//   disconnect() {
//     this.socket.off("receiveNotification");
//   }
// }

// export default new SocketService();


// import { io } from "socket.io-client";
// import { useEffect } from "react";
// import useDispatch from "react-dom"
// import { setSocket } from "../redux/slice/socketSlice";
// import { addNotification } from "../redux/slice/notificationSlice";
// const SocketService =()=>{
//   const user = useSelector(state => state.auth?.user)
//   const dispatch = useDispatch()

  
//   useEffect(() => {
//     if (user) {
//       const socketio = io("https://grams.onrender.com", {
//         query: {
//           userId: user?._id,
//         },
//         transports: ["websocket"],
//       });

//       dispatch(setSocket(socketio));

//       // Listening to events
//       // socketio.on("getOnlineUsers", (onlineUsers) => {
//       //   dispatch(setOnlineUsers(onlineUsers));
//       // });

//       socketio.on("notification", (notifications) => {
//         dispatch(addNotification(notifications));
//       });

//       return () => {
//         socketio.off("getOnlineUsers"); // Cleanup event listener
//         socketio.close(); // Close the socket connection
//         dispatch(setSocket(null));
//       };
//     } else {
//       dispatch(setSocket(null));
//     }
//   }, [user, dispatch]);

// }

// export default SocketService;


import { io } from "socket.io-client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNotification } from "../redux/slice/notificationSlice";
import useNotification from "antd/es/notification/useNotification";
import BASEURL from "./BaseUrl";

const SocketService = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
 const fetchNotifications = useNotification()

//   useEffect(() => {
//     if (!user) return;



//     // Initialize socket with the token in the auth option
//     const socket = io(`${BASEURL}`, {
//       auth: {
//         userId: user.id, // or user._id, depending on your state shape
//     },
//       transports: ["websocket"],
//     });

//     socket.on("connect", () => {
//       console.log("Connected to notifications");
//       fetchNotifications();
//     });

//     socket.on("new_notification", (notification) => {
//       dispatch(addNotification(notification));
//     });

//     socket.on("disconnect", () => {
//       console.log("Disconnected from notifications");
//     });

//     // Cleanup on unmount
//     return () => {
//       socket.disconnect();
//     };
//   }, [user, dispatch]);

//   return null;
};

export default SocketService;
