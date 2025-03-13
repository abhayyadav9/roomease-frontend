import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import BASEURL from "../../utils/BaseUrl";
import { io } from "socket.io-client";
import {
  setNotifications,
  markAsRead,
  addNotification,
} from "../../redux/slice/notificationSlice";

export const useNotifications = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { notifications, unreadCount } = useSelector((state) => state.notifications);

  // Fetch initial notifications from the backend
  const fetchNotifications = async () => {
    if (!user) return;
    try {
      const response = await axios.get(
        `${BASEURL}/api/v5/get-notifications/${user.id}`,
        { withCredentials: true }
      );
      // Assuming notifications are returned in response.data.notifications
      dispatch(setNotifications(response.data.notifications));
      console.log("Fetched notifications:", response.data.notifications);
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
      console.error("Failed to mark notification as read:", error);
    }
  };

  useEffect(() => {
    if (!user) return;

    // Fetch initial notifications once the user is available
    fetchNotifications();

    // Initialize socket connection for notifications using the same BASEURL as your backend.
    const socket = io(BASEURL, {
      query: { userId: user.id },
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      console.log("Connected to notifications socket", socket.id);
    });

    // Listen for new notifications from the backend.
    socket.on("new_notification", (notification) => {
      console.log("New notification received:", notification);
      dispatch(addNotification(notification));
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from notifications socket");
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
