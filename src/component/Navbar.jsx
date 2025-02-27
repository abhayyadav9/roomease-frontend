import {
  Avatar,
  Button,
  notification,
  Popover,
  Switch,
  Menu,
  Drawer,
  Badge,
} from "antd";
import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  HomeFilled,
  SearchOutlined,
  FormOutlined,
  UserOutlined,
  MenuOutlined,
  CloseOutlined,
  BellOutlined,
  MailOutlined,
  ContactsOutlined,
  LogoutOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { logout as logoutAction } from "../redux/slice/authSlice";
import BASEURL from "../utils/BaseUrl";
import socketService from "../utils/socket";
import { addNotification } from "../redux/slice/notificationSlice";
import { toggleTheme } from "../redux/slice/themeSlice";
import { motion } from "framer-motion";
import "./Navbar";
import loh from "../../public/loh.jpg"

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
  const theme = useSelector((state) => state.theme.theme);

  const count = notifications.filter(
    (notification) =>
      lastSeen === null || new Date(notification.createdAt) > lastSeen
  ).length;

  const menuItems = [
    {
      key: "home",
      label: <NavLink to="/">Home</NavLink>,
      icon: <HomeFilled className="text-lg" />,
    },
    {
      key: "find-room",
      label: <NavLink to="/all-rooms">Find Room</NavLink>,
      icon: <SearchOutlined className="text-lg" />,
    },
    {
      key: "requirements",
      label: <NavLink to="/all-requirement">Requirements</NavLink>,
      icon: <FormOutlined className="text-lg" />,
    },
    // {
    //   key: "profile",
    //   label: <NavLink to={`/${user?.role}-profile`}>Profile</NavLink>,
    //   icon: <UserOutlined className="text-lg" />,
    // },
    {
      key: "contact",
      label: <NavLink to="/contact">Contact</NavLink>,
      icon: <ContactsOutlined className="text-lg" />,
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

  const profileContent = (
    <div className="flex flex-col gap-2 p-2 w-64">
      <div className="flex items-center gap-4 border-b pb-4">
        <Avatar
          src={owner?.ownerPic}
          icon={<UserOutlined />}
          className="border-2 border-blue-500 hover:scale-105 transition-transform"
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            {user?.name || "Guest"}
          </h3>
          <p className="text-xs text-gray-500">{user?.email}</p>
        </div>
      </div>

      <NavLink
        to="/owner-profile"
        className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <UserOutlined className="text-lg text-blue-500" />
        <span className="text-gray-700">View Profile</span>
      </NavLink>

      <NavLink
        to="/update-detail"
        className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <EditOutlined className="text-lg text-green-500" />
        <span className="text-gray-700">Edit Profile</span>
      </NavLink>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600"
      >
        <LogoutOutlined className="text-lg" />
        <span>Logout</span>
      </button>

      <div>
        {/* Theme Toggle */}
        <Switch
          checked={theme === "dark"}
          onChange={() => dispatch(toggleTheme())}
          checkedChildren="🌙"
          unCheckedChildren="☀️"
          className="bg-gray-200 dark:bg-gray-600"
        />
        <span>Theme</span>
      </div>
    </div>
  );

  const notificationContent = (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-3 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-4"
    >
      {notifications.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 py-2">
          No New Notifications
        </p>
      ) : (
        notifications.map((notification) => (
          <motion.div
            key={notification._id}
            whileHover={{ scale: 1.02 }}
            className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer"
            onClick={() => {
              navigate(`/room/${notification?.roomId}`);
              handleClick();
            }}
          >
            <div className="flex items-center gap-3">
              <Avatar size="small" src={notification.userAvatar} />
              <div>
                <p className="font-medium text-gray-800 dark:text-white">
                  {notification.userName}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Applied for {notification.houseName}
                </p>
              </div>
            </div>
            <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              {new Date(notification.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}{" "}
              •{" "}
              {new Date(notification.createdAt).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
              })}
            </div>
          </motion.div>
        ))
      )}
    </motion.div>
  );

  return (
    <nav className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 shadow-lg fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <NavLink
            to="/"
            className="flex items-center gap-2 text-xl font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-colors"
          >
            <img
              src={loh}
              alt="Room Ease Logo"
              className="h-8 w-auto object-contain"
            />

            <h1 className="text-2xl font-bold text-gray-800">
              Room<span className="text-[#F83002]">Ease</span>
            </h1>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {menuItems.map((item) => (
              <NavLink
                key={item.key}
                to={item.key === "home" ? "/" : `/${item.key}`}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                    isActive
                      ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`
                }
              >
                {item.icon}
                {item.label}
              </NavLink>
            ))}

            {/* Notifications */}
            {user?.role === "owner" && (
              <Popover content={notificationContent} trigger="click">
                <Button
                  type="text"
                  className="flex items-center gap-1 h-10 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  <Badge count={count} color="#2563eb">
                    <BellOutlined className="text-lg text-gray-700 dark:text-gray-300" />
                  </Badge>
                </Button>
              </Popover>
            )}

            {/* Profile */}
            {user ? (
              <Popover
                content={profileContent}
                trigger="click"
                placement="bottomRight"
                overlayClassName="profile-popover"
              >
                <Button
                  type="text"
                  className="flex items-center gap-2 h-10 hover:bg-gray-100 rounded-lg"
                >
                  <Avatar
                    src={owner?.ownerPic}
                    icon={<UserOutlined />}
                    className="border-2 border-blue-500"
                  />
                  <span className="text-gray-700">
                    {user?.name?.split(" ")[0]}
                  </span>
                </Button>
              </Popover>
            ) : (
              <NavLink
                to="/login"
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                Login
              </NavLink>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleSidebar}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {isOpen ? (
              <CloseOutlined className="text-xl text-gray-700 dark:text-gray-300" />
            ) : (
              <MenuOutlined className="text-xl text-gray-700 dark:text-gray-300" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <Drawer
        title={
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Logo" className="h-6 w-6" />
            <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
              RoomEase
            </span>
          </div>
        }
        placement="right"
        closable={false}
        onClose={toggleSidebar}
        open={isOpen}
        width="280px"
        className="dark:bg-gray-800"
      >
        <Menu
          mode="inline"
          selectedKeys={[]}
          className="border-0 dark:bg-gray-800"
          items={menuItems.map((item) => ({
            key: item.key,
            icon: item.icon,
            label: item.label,
            className:
              "hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg my-1",
          }))}
        />

        <div className="mt-4 px-4 border-t pt-4 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-700 dark:text-gray-300">Dark Mode</span>
            <Switch
              checked={theme === "dark"}
              onChange={() => dispatch(toggleTheme())}
              className="bg-gray-200 dark:bg-gray-600"
            />
          </div>

          {user && (
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors text-red-600 dark:text-red-400"
            >
              <LogoutOutlined className="text-lg" />
              <span>Logout</span>
            </button>
          )}
        </div>
      </Drawer>
    </nav>
  );
};

export default Navbar;
