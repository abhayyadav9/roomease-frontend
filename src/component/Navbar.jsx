import { Avatar, Button, notification, Popover } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppstoreOutlined,
  HomeFilled,
  MailOutlined,
  ProfileOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu, Drawer } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { LiaUserEditSolid } from "react-icons/lia";
import { CiLogout } from "react-icons/ci";
import axios from "axios";
import { logout as logoutAction } from "../redux/slice/authSlice";
import BASEURL from "../utils/BaseUrl";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import socketService from "../utils/socket"; // ✅ Import Socket Service
import { addNotification } from "../redux/slice/notificationSlice";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [lastSeen, setLastSeen] = useState(null);
  const owner = useSelector((state) => state.owner.data?.data);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notifications = useSelector(
    (state) => state.notification.notifications
  );

  const count = notifications.filter((notification) => {
    if (lastSeen === null) return true;
    return new Date(notification.createdAt).getTime() > lastSeen;
  }).length;

  const items = [
    {
      key: "13",
      icon: <HomeFilled />,
      label: <Link to="/">Home</Link>,
    },
    {
      key: "sub1",
      label: <Link to="/all-rooms">Find Room</Link>,
      icon: <MailOutlined />,
    },
    {
      key: "sub2",
      label: <Link to="/all-requirement">All Requiremnt</Link>,
      icon: <AppstoreOutlined />,
    },
    {
      type: "divider",
    },
    {
      key: "sub4",
      label: <Link to={`/${user.role}-profile`}>Profle</Link>,
      icon: <ProfileOutlined />,
    },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        `${BASEURL}/api/v1/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(logoutAction());

      window.location.href = "/login"; // Redirect to login page
    } catch (error) {
      console.error(error);
      alert("An error occurred while logging out");
    }
  };

  const content = (
    <div className="flex flex-col gap-5 bg-gray-200">
      {/* Profile Section */}
      <Link to="/owner-profile">
        <div className="flex items-center gap-4">
          <Avatar
            src={owner?.ownerPic || "path_to_default_avatar.jpg"}
            size={35}
            icon={<UserOutlined />}
          />
          <span className="text-lg font-medium">
            <span>Hey, </span>
            {user?.name || "Guest"}
          </span>
        </div>
      </Link>

      {/* Menu Options */}
      <div className="flex flex-col gap-2">
        {/* Edit Profile */}
        <Link
          to="/update-detail"
          className="flex items-center justify-between w-full px-2 py-1 hover:text-green-900 rounded"
        >
          <div className="flex items-center gap-3">
            <LiaUserEditSolid size={24} />
            <span className="text-md">Edit</span>
          </div>
        </Link>

        {/* Logout */}
        <div
          onClick={handleLogout}
          className="flex items-center justify-between w-full px-2 py-1 hover:text-red-900 rounded"
        >
          <div className="flex items-center gap-3">
            <CiLogout size={24} />
            <span className="text-md">Logout</span>
          </div>
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    if (user) {
      socketService.connect(user.id);

      // Listen for real-time notifications
      socketService.listenForNotifications((receiveNotification) => {
        notification.info({
          message: "New Notification",
          description: receiveNotification,
          placement: "topRight",
        });

        // Dispatch notification to the Redux store
        dispatch(addNotification(receiveNotification));
      });

      return () => {
        socketService.disconnect();
      };
    }
  }, [user, dispatch]);

  const handleClick = () => {
    setLastSeen(Date.now());
  };

  // Updated notification content popover
  const notificationContent = (
    <div className="flex flex-col gap-5 bg-gray-200 rounded-lg">
      {notifications.length === 0
        ? "No notifications"
        : notifications.map((notification) => (
            <div
              key={notification._id}
              className="flex flex-auto items-center gap-3 p-3 bg-white rounded shadow-sm"
              onClick={() => {
                navigate(`/room/${notification?.roomId}`);
                handleClick();
              }}
            >

<span className="font-medium text-blue-600">
                  {notification.userName}{" "}
                  {/* Corrected from userName to name */}
                </span>
                <span className="text-gray-600">
                  has applied for your room:
                </span>
                <p className="text-gray-600 flex-1">{notification.houseName}</p>
                <div className="text-sm text-gray-400">
                  Time: {new Date(notification.createdAt).toLocaleDateString()}{" "}
                  {/* Added space after colon */}
                </div>
              {/* Notification content remains the same */}
            </div>
          ))}
    </div>
  );

  return (
    <div>
      <nav className="bg-[#bfb8b8] shadow-md fixed top-0 left-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-gray-800">
                RoomEase
              </Link>
            </div>
            <div className="hidden md:flex md:items-center md:space-x-4">
              <Link
                to="/"
                className="text-gray-800 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </Link>
              <Link
                to="/all-rooms"
                className="text-gray-800 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium"
              >
                Find Room
              </Link>
              <Link
                to="/all-requirement"
                className="text-gray-800 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium"
              >
                Find Requiremnt
              </Link>

              {user ? (
                <Popover content={content} title="Profile">
                  <Button type=" " className=" hover">
                    Profile
                  </Button>
                </Popover>
              ) : (
                <Link
                  to="/login"
                  className="text-gray-800 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
              )}

              {user.role === "owner" ? (
                <Popover content={notificationContent} title="notification">
                  <Button type=" " className=" hover">
                    <Badge badgeContent={count} color="error">
                      <NotificationsIcon
                        className="text-gray-800 dark:text-white cursor-pointer"
                        onClick={handleClick}
                      />
                    </Badge>
                  </Button>
                </Popover>
              ) : (
                ""
              )}

              <Link
                to="/contact"
                className="text-gray-800 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium"
              >
                Contact
              </Link>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={toggleSidebar}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-blue-500 focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
      <Drawer
        title="Menu"
        placement="left"
        closable={true}
        onClose={toggleSidebar}
        visible={isOpen}
        width="50%" // Set the width of the Drawer to 50% of the screen width
      >
        <Menu
          onClick={toggleSidebar}
          style={{ width: "100%" }}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          items={items}
        />
      </Drawer>
    </div>
  );
};

export default Navbar;
