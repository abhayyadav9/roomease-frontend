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
  CustomerServiceOutlined,
  MessageOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { logout as logoutAction } from "../redux/slice/authSlice";
import BASEURL from "../utils/BaseUrl";
import { toggleTheme } from "../redux/slice/themeSlice";
import { motion } from "framer-motion";
import { markAllAsRead, markAsRead } from "../redux/slice/notificationSlice";
import { FaUser } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
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

  // Responsive menu items configuration
  const menuItems = [
    {
      key: "home",
      label: "Home",
      path: "/",
      icon: <HomeFilled className="text-lg" />,
    },
    {
      key: "find-room",
      label: "Find Room",
      path: "/all-rooms",
      icon: <SearchOutlined className="text-lg" />,
    },
    {
      key: "requirements",
      label: "Requirements",
      path: "/all-requirement",
      icon: <FormOutlined className="text-lg" />,
    },
  ];

  const toggleSidebar = useCallback(() => setIsOpen((prev) => !prev), []);
  const closeSidebar = useCallback(() => setIsOpen(false), []);

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
      console.error("Logout error:", error);
      notification.error({
        message: "Logout Failed",
        description: "An error occurred while logging out",
      });
    }
  };

  const NotificationContent = ({ handleClose }) => {
    const allTenants = useSelector((state) => state.allTenant?.allTenantData);

    useEffect(() => {
      if (unreadCount > 0) dispatch(markAllAsRead());
    }, [dispatch, unreadCount]);

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-3 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-4"
      >
        {notifications?.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 py-2">
            No New Notifications
          </p>
        ) : (
          <div className="overflow-y-auto max-h-[70vh] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800">
            {notifications.map((notification) => {
              const tenant = allTenants?.find(
                (tenant) => tenant.user?._id === notification?.sender?._id
              );

              return (
                <motion.div
                  key={notification._id}
                  whileHover={{ scale: 1.02 }}
                  className={`p-3 ${
                    notification.read
                      ? "bg-white dark:bg-gray-700"
                      : "bg-gray-100 dark:bg-gray-800"
                  } rounded-lg cursor-pointer mb-3 transition-colors`}
                  onClick={() => {
                    navigate(`/room/${notification?.relatedEntity}`);
                    if (!notification.read)
                      dispatch(markAsRead(notification._id));
                    handleClose();
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Avatar
                      size="small"
                      src={tenant?.tenantPic}
                      icon={
                        <FaUser className="text-blue-500 dark:text-blue-400" />
                      }
                      className="border-2 border-blue-500/30"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800 dark:text-white truncate">
                        {notification?.sender?.name}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                        {notification?.message}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    {new Date(notification?.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                      }
                    )}{" "}
                    •{" "}
                    {new Date(notification?.createdAt).toLocaleTimeString(
                      "en-US",
                      {
                        hour: "numeric",
                        minute: "2-digit",
                      }
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>
    );
  };

  const renderDesktopMenu = () => (
    <div className="hidden lg:flex items-center gap-6">
      {menuItems.map((item) => (
        <NavLink
          key={item.key}
          to={item.path}
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
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
    </div>
  );

  const renderMobileMenu = () => (
    <Drawer
      title={
        <NavLink
          to="/"
          onClick={closeSidebar}
          className="flex items-center gap-2"
        >
          <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Room<span className="text-[#F83002]">Ease</span>
          </span>
        </NavLink>
      }
      placement="right"
      closable={false}
      onClose={closeSidebar}
      open={isOpen}
      width="280px"
      className="dark:bg-gray-800"
    >
      <Menu
        mode="vertical"
        className="border-0 dark:bg-gray-800"
        items={menuItems.map((item) => ({
          key: item.key,
          icon: item.icon,
          label: (
            <NavLink to={item.path} onClick={closeSidebar}>
              {item.label}
            </NavLink>
          ),
          className: "!py-3 hover:!bg-gray-100 dark:hover:!bg-gray-700",
        }))}
      />
      <div className="flex flex-col  mt-4 mx-5 gap-4 text-gray-700 dark:text-gray-300">
        <Link to="/contact"> 
        <MessageOutlined className="text-xl" />
        <span> Message us </span>
        </Link>
        <Link to="/owner-message" >
          <ContactsOutlined className="text-xl" />
          <span> Contact us </span>
        </Link>
      </div>

      <div className="px-4 border-t pt-4 dark:border-gray-700">
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
  );

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

      <div className="flex items-center justify-between px-2 py-3 border-t dark:border-gray-700">
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
  return (
    <nav className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 shadow-lg fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center flex-1">
            <NavLink
              to="/"
              className="flex items-center gap-2 text-xl font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-colors"
            >
              <h1 className="font-metal text-2xl tracking-widest">
                Room<span className="text-[#F83002]">Ease</span>
              </h1>
            </NavLink>
          </div>

          {/* Desktop Menu */}
          {renderDesktopMenu()}

          {/* Right Controls */}
          <div className="flex items-center gap-4 ml-auto">
            {/* Service Dropdown */}
            <Popover
              content={
                <div className="flex flex-col gap-2 p-2 w-64">
                  <NavLink
                    to="/contact"
                    className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ContactsOutlined className="text-lg text-blue-500" />
                    <span className="text-gray-700">Our Contact</span>
                  </NavLink>
                  {user?.role === "owner" && (
                    <NavLink
                      to="/owner-message"
                      className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <MessageOutlined className="text-lg text-green-500" />
                      <span className="text-gray-700">Message Us</span>
                    </NavLink>
                  )}
                </div>
              }
              trigger={["click", "hover"]}
              placement="bottomRight"
              overlayClassName="service-popover"
            >
              <Button
                type="text"
                className="hidden lg:flex items-center gap-2 h-10 hover:bg-gray-100 rounded-lg"
              >
                Services <CustomerServiceOutlined />
              </Button>
            </Popover>

            {/* Notifications */}
            {user?.role === "owner" && (
              <Popover
                content={
                  <NotificationContent
                    handleClose={() => setNotificationOpen(false)}
                  />
                }
                trigger="click"
                open={notificationOpen}
                onOpenChange={(open) => setNotificationOpen(open)}
              >
                <Button type="text" className="p-2">
                  <Badge count={unreadCount} color="#2563eb" offset={[8, -5]}>
                    <BellOutlined className="text-lg text-gray-700 dark:text-gray-300" />
                  </Badge>
                </Button>
              </Popover>
            )}

            {/* Profile Section */}
            {user ? (
              <Popover
                content={profileContent}
                trigger="click"
                placement="bottomRight"
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
                  <span className="hidden lg:inline text-gray-700 dark:text-gray-300">
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

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? (
                <CloseOutlined className="text-xl" />
              ) : (
                <MenuOutlined className="text-xl" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {renderMobileMenu()}
    </nav>
  );
};

export default Navbar;
