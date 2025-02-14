import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';

const Contact = () => {
//   const [notifications, setNotifications] = useState([]);
//   const [socket, setSocket] = useState(null);
//   const [isConnected, setIsConnected] = useState(false);

//   const user= useSelector(state=>state.auth.user);
  
//   // Get this PROPERLY from your authentication context

//   useEffect(() => {
//     const newSocket = io("http://localhost:3000", {
//       autoConnect: true, // Change to auto-connect for production
//       reconnection: true,
//       transports: ["websocket", "polling"],
//       auth: {
//         token: "YOUR_AUTH_TOKEN" // Add authentication if implemented
//       }
//     });

//     // Debugging listeners
//     newSocket.onAny((event, ...args) => {
//       console.log("Socket event:", event, args);
//     });

//     // Connection handlers
//     newSocket.on("connect", () => {
//       setIsConnected(true);
//       console.log("Connected ID:", newSocket.id);
//       newSocket.emit("joinRoom", user.Id);
//     });

//     newSocket.on("disconnect", (reason) => {
//       setIsConnected(false);
//       console.log("Disconnect reason:", reason);
//     });

//     // Notification handler (modified)
//     newSocket.on("receiveNotification", (message) => {
//       console.log("Raw notification received:", message);
//       setNotifications(prev => [{
//         message: message || "New notification",
//         timestamp: new Date().toISOString()
//       }, ...prev]);
//     });

//     setSocket(newSocket);

//     return () => {
//       newSocket.offAny();
//       newSocket.disconnect();
//     };
//   }, [user.Id]);

  // Remove manual connect/disconnect buttons if using autoConnect

  return (
    <div className='mt-20'>
      {/* <div>Connection status: {isConnected ? "✅ Connected" : "❌ Disconnected"}</div>
      
      <h3>Notifications</h3>
      messagw::::
      {notifications.map((notification, index) => (
        <div key={index} style={{border: "1px solid #ccc", padding: "10px", margin: "5px"}}>
          <strong>{notification.timestamp}</strong>
          <p>message:::::{notification.message}</p>
        </div>
      ))} */}
    </div>
  );
};

export default Contact;