import {
  Avatar,
  Button,
  Popover,
  Switch,
  Menu,
  Drawer,
  Badge,
  notification,
} from "antd";
import React, { useEffect, useState, useCallback } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  HomeFilled,
  SearchOutlined,
  FormOutlined,
  UserOutlined,
  BellOutlined,
  ContactsOutlined,
  LogoutOutlined,
  EditOutlined,
  CustomerServiceOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { logout as logoutAction } from "../../redux/slice/authSlice";
import BASEURL from "../../utils/BaseUrl";
import { toggleTheme } from "../../redux/slice/themeSlice";
import { motion } from "framer-motion";
import { markAllAsRead, markAsRead } from "../../redux/slice/notificationSlice";
import { FaUser } from "react-icons/fa";
import { MdDone } from "react-icons/md";

const OwnerNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const owner = useSelector((state) => state.owner.data?.data);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notifications = useSelector(
    (state) => state.notifications?.notifications
  );
  const unreadCount = useSelector((state) => state.notifications?.unreadCount);
  const theme = useSelector((state) => state.theme.theme);

  // Menu configuration
  const menuItems = [
    {
      key: "home",
      label: "Home",
      path: "/owner/home",
      icon: <HomeFilled className="text-xl" />,
    },
    {
      key: "my-rooms",
      label: "My Rooms",
      path: "/owner/my-rooms",
      icon: <SearchOutlined className="text-xl" />,
    },
    {
      key: "settlement",
      label: "Settlement",
      path: "/owner/settlement",
      icon: <MdDone className="text-xl" />,
    },
    {
      key: "message us",
      label: "Message us",
      path: "/owner/message",
      icon: <MessageOutlined className="text-xl" />,
    },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${BASEURL}/api/v1/logout`,
        {},
        { withCredentials: true }
      );
      dispatch(logoutAction());
      navigate("/login");
    } catch (error) {
      notification.error({
        message: "Logout Failed",
        description: error.response?.data?.message || "An error occurred",
      });
    }
  };

  const NotificationContent = ({ handleClose }) => {
    const allTenants = useSelector((state) => state.allTenant?.allTenantData);

    useEffect(() => {
      if (unreadCount > 0) dispatch(markAllAsRead());
    }, [dispatch, unreadCount]);

    return (
      <motion.div className="flex flex-col gap-3 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
        {notifications?.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 py-4">
            No new notifications
          </p>
        ) : (
          <div className="overflow-y-auto max-h-[70vh] scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
            {notifications?.map((notification) => (
              <motion.div
                key={notification?._id}
                className="p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                onClick={() => {
                  navigate(`/room/${notification?.relatedEntity}`);
                  if (!notification.read)
                    dispatch(markAsRead(notification?._id));
                  handleClose();
                }}
              >
                <div className="flex items-center gap-3">
                  <Avatar
                    size="small"
                    src={
                      allTenants?.find(
                        (t) => t?.user?._id === notification?.sender?._id
                      )?.tenantPic
                    }
                    icon={
                      <FaUser className="text-blue-500 dark:text-blue-400" />
                    }
                    className="border-2 border-blue-500/30"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-800 dark:text-white truncate">
                      {notification?.sender?.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                      {notification?.message}
                    </p>
                  </div>
                </div>
                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  {new Date(notification?.createdAt).toLocaleDateString()}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    );
  };

  const ProfileContent = (
    <div className="flex flex-col gap-2 p-2 w-64">
      <div className="flex items-center gap-4 pb-4 border-b border-gray-200 dark:border-gray-700">
        <Avatar
          size={64}
          src={owner?.ownerPic}
          icon={<UserOutlined />}
          className="border-2 border-blue-500 shadow-lg"
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            {user?.name || "Guest"}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {user?.email}
          </p>
        </div>
      </div>

      <NavLink
        to="/owner/owner-profile"
        className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        <UserOutlined className="text-lg text-blue-500" />
        <span className="text-gray-700 dark:text-gray-200">Profile</span>
      </NavLink>

      <NavLink
        to="/owner/update-detail"
        className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        <EditOutlined className="text-lg text-green-500" />
        <span className="text-gray-700 dark:text-gray-200">Edit Profile</span>
      </NavLink>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-red-600 dark:text-red-400"
      >
        <LogoutOutlined className="text-lg" />
        <span>Logout</span>
      </button>

      <div className="flex items-center justify-between p-2 mt-4 border-t border-gray-200 dark:border-gray-700">
        <span className="text-gray-700 dark:text-gray-300">Dark Mode</span>
        <Switch
          checked={theme === "dark"}
          onChange={() => dispatch(toggleTheme())}
          checkedChildren="🌙"
          unCheckedChildren="☀️"
          className="bg-gray-200 dark:bg-gray-600"
        />
      </div>
    </div>
  );

  const DesktopNavbar = () => (
    <motion.nav
      className={`hidden lg:flex items-center bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg fixed top-0 w-full z-40 transition-all duration-300 ${
        isScrolled ? "h-12" : "h-16"
      }`}
    >
      <div className="max-w-7xl w-full mx-auto px-5">
        <div className="flex justify-between items-center">
          <motion.div className="flex items-center gap-2">
            <NavLink
              to="/owner/"
              className="flex items-center gap-2 text-2xl font-bold"
            >
              <span className="text-blue-600 dark:text-blue-400">
                Room<span className="text-[#F83002]">Ease</span>
              </span>
            </NavLink>
          </motion.div>

          <div className="flex flex-row">
            <div className="flex items-center gap-3">
              {menuItems?.map((item) => (
                <NavLink
                  key={item.key}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      isActive
                        ? "bg-blue-100/50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                        : "text-black dark:text-black hover:bg-gray-100/50 dark:hover:bg-gray-700/50"
                    }`
                  }
                >
                  <motion.div className="flex items-center gap-2">
                    {item.icon}
                    <span className="font-small">{item.label}</span>
                  </motion.div>
                </NavLink>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <Popover
                content={
                  <NotificationContent
                    handleClose={() => setNotificationOpen(false)}
                  />
                }
                trigger="click"
                placement="bottomRight"
              >
                <Badge count={unreadCount} color="red" offset={[-10, 10]}>
                  <Button
                    type="text"
                    className=" flex items-center justify-center"
                  >
                    <BellOutlined className="text-xl text-gray-600 dark:text-gray-300" />
                  </Button>
                </Badge>
              </Popover>

              <Popover
                content={ProfileContent}
                trigger="click"
                placement="bottomRight"
              >
                <Button
                  type="text"
                  className="flex items-center gap-2 h-10 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 rounded-lg"
                >
                  <Avatar
                    src={owner?.ownerPic}
                    icon={<UserOutlined />}
                    className="border-2 border-blue-500"
                  />
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    {user?.name?.split(" ")[0].toUpperCase()}
                  </span>
                </Button>
              </Popover>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );

  const MobileView = () => (
    <>
      <nav className="lg:hidden flex items-center bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-sm fixed top-0 w-full h-16 px-4 z-50">
        <div className="flex justify-between items-center w-full">
          <NavLink to="/owner/home" className="flex items-center gap-2">
            <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
              Room
            </span>
            <span className="text-[#F83002]">Ease</span>
          </NavLink>

          <div className="flex items-center gap-5">
            <Popover
              content={
                <NotificationContent
                  handleClose={() => setNotificationOpen(false)}
                />
              }
              trigger="click"
              placement="bottomRight"
            >
              <Badge count={unreadCount} color="red" offset={[-10, 10]}>
                <Button
                  type="text"
                  className="w-10 h-10 flex items-center justify-center"
                >
                  <BellOutlined className="text-3xl text-gray-600 dark:text-gray-300" />
                </Button>
              </Badge>
            </Popover>

            <Popover
              content={ProfileContent}
              trigger="click"
              placement="bottomRight"
              className="flex gap-3"
            >
              <Avatar
                src={owner?.ownerPic}
                icon={<UserOutlined />}
                className="border-2 border-blue-500 cursor-pointer"
              />
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                {user?.name?.split(" ")[0].toUpperCase()}
              </span>
            </Popover>
          </div>
        </div>
      </nav>

      <motion.div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-t border-gray-200/50 dark:border-gray-700/50 shadow-lg z-50">
        <div className="flex justify-around items-center h-16 px-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.key}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-300 flex-1 mx-1 ${
                  isActive
                    ? "text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/20"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-700/50"
                }`
              }
            >
              <motion.div className="flex ">
                <div className=" flex flex-col justify-center items-center">
                  <span>{item.icon}</span>
                  <span className="text-xs mt-1 font-medium">{item.label}</span>
                </div>
              </motion.div>
            </NavLink>
          ))}
        </div>
      </motion.div>
    </>
  );

  return (
    <>
      <DesktopNavbar />
      <MobileView />
    </>
  );
};

export default OwnerNavbar;
