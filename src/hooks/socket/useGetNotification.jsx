import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import BASEURL from "../../utils/BaseUrl";
import {
  setNotifications,
  markAsRead,
  addNotification,
} from "../../redux/slice/notificationSlice";
import { io } from "socket.io-client";
import { useEffect } from "react";

export const useNotifications = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { notifications, unreadCount } = useSelector(
    (state) => state.notifications
  );

  // Fetch initial notifications from the backend
  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        `${BASEURL}/api/v5/get-notifications`,
        { withCredentials: true }
      );
      // Assuming notifications are returned in response.data.notifications
      dispatch(setNotifications(response.data.notifications));
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  };

  // Mark a specific notification as read
  const handleMarkAsRead = async (notificationId) => {
    try {
      await axios.patch(
        `${BASEURL}/api/v5/notifications/${notificationId}/read`,
        {},
        { withCredentials: true }
      );
      dispatch(markAsRead(notificationId));
    } catch (error) {
      console.error("Failed to mark as read:", error);
    }
  };

  useEffect(() => {
    if (!user) return;

    // Initialize socket connection with user id in the handshake auth
    const socket = io(BASEURL, {
      auth: { userId: user.id }, // or use user._id depending on your state shape
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      console.log("Connected to notifications");
      fetchNotifications();
    });

    socket.on("new_notification", (notification) => {
      dispatch(addNotification(notification));
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from notifications");
    });

    // Cleanup socket connection on unmount
    return () => {
      socket.disconnect();
    };
  }, [user, dispatch]);

  return {
    notifications,
    unreadCount,
    markAsRead: handleMarkAsRead,
    fetchNotifications,
  };
};
