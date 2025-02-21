import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  DashboardOutlined,
  UserOutlined,
  SettingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TransactionOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Avatar, Switch, Skeleton, Popover, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../redux/slice/themeSlice";
import { MdPersonOutline } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import axios from "axios";
import { logout as logoutAction } from "../../redux/slice/authSlice";
import BASEURL from "../../utils/BaseUrl";
import { motion, AnimatePresence } from "framer-motion";
import "./Admin.css";

const AdminNavbar = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const theme = useSelector((state) => state.theme.theme);
  const user = useSelector((state) => state.auth?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    setTimeout(() => setLoading(false), 1500);
  }, [theme]);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${BASEURL}/api/v1/logout`,
        {},
        { withCredentials: true }
      );
      dispatch(logoutAction());
      navigate("/admin/login");
    } catch (error) {
      console.error(error);
    }
  };

  const notificationContent = (
    <div className="w-64">
      {notifications.length === 0 ? (
        <p className="text-gray-500 text-center py-2">No new notifications</p>
      ) : (
        notifications.map((notification) => (
          <div
            key={notification.id}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            <p className="text-sm font-medium">{notification.title}</p>
            <p className="text-xs text-gray-500 truncate">
              {notification.message}
            </p>
          </div>
        ))
      )}
    </div>
  );

  const sidebarVariants = {
    open: { width: 256 },
    closed: { width: 80 },
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <motion.div
        initial={collapsed ? "closed" : "open"}
        animate={collapsed ? "closed" : "open"}
        variants={sidebarVariants}
        className="fixed inset-y-0 left-0 bg-gradient-to-b from-blue-600 to-purple-600 dark:from-gray-800 dark:to-gray-900 shadow-2xl z-20"
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-white/10">
            <AnimatePresence initial={false}>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-white text-lg font-bold"
                >
                  Admin Panel
                </motion.span>
              )}
            </AnimatePresence>
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="text-white hover:text-purple-200 transition-colors p-2 rounded-lg"
            >
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 mt-4 space-y-1 px-2">
            {[
              {
                to: "/admin/dashboard",
                icon: <DashboardOutlined />,
                text: "Dashboard",
              },
              { to: "/admin/owners", icon: <UserOutlined />, text: "Owners" },
              {
                to: "/admin/tenants",
                icon: <MdPersonOutline />,
                text: "Tenants",
              },
              {
                to: "/admin/settings",
                icon: <SettingOutlined />,
                text: "Settings",
              },
              {
                to: "/admin/transaction",
                icon: <TransactionOutlined />,
                text: "Transactions",
              },
              {
                to: "/admin/all-rooms",
                icon: <HomeOutlined />,
                text: "Rooms",
              },
              {
                to: "/admin/all-requirements",
                icon: <HomeOutlined />,
                text: "Requirements",
              },
            ].map((item) => (
              <motion.div
                key={item.to}
                whileHover={{ scale: 1.02 }}
                className="group"
              >
                <Link
                  to={item.to}
                  className="flex items-center p-3 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                >
                  <span className="text-lg">{item.icon}</span>
                  <AnimatePresence initial={false}>
                    {!collapsed && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        className="ml-3 text-sm font-medium"
                      >
                        {item.text}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* User Profile Section */}
          <div className="p-4 border-t border-white/10">
            {loading ? (
              <Skeleton avatar paragraph={{ rows: 0 }} active />
            ) : (
              <>
                <div
                  onClick={() => navigate("/admin/profile")}
                  className="flex items-center cursor-pointer group"
                >
                  <Avatar
                    src={user?.avatar || "https://via.placeholder.com/40"}
                    size="default"
                    className="bg-white/20 border-2 border-white/30"
                  />
                  <AnimatePresence initial={false}>
                    {!collapsed && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="ml-3"
                      >
                        <p className="text-white text-sm font-medium">
                          {user?.name}
                        </p>
                        <p className="text-white/60 text-xs">Administrator</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div
                  onClick={handleLogout}
                  className="flex items-center mt-4 text-white/80 hover:text-red-300 cursor-pointer transition-colors p-2 rounded-lg"
                >
                  <CiLogout className="text-lg" />
                  <AnimatePresence initial={false}>
                    {!collapsed && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="ml-3 text-sm"
                      >
                        Logout
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </>
            )}
          </div>
        </div>
        
      </motion.div>

      {/* Main Content Area */}
      <div
        className={`flex-1 justify-end transition-margin duration-300 ${
          collapsed ? "ml-20" : "ml-64"
        }`}
      >
        {/* Header */}
        <header className="sticky top-0 h-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-2xl flex items-center justify-between px-6 z-10">
          <div className="flex items-center gap-6">
            <Popover
              content={notificationContent}
              trigger="click"
              placement="bottomRight"
              overlayClassName="notification-popover"
            >
              <motion.div whileHover={{ scale: 1.05 }}>
                <Button
                  type="text"
                  shape="circle"
                  className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  icon={
                    <div className="relative">
                      <motion.span
                        key={notifications.length}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center"
                      >
                        {notifications.length}
                      </motion.span>
                      <svg
                        className="w-6 h-6 text-gray-600 dark:text-gray-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                        />
                      </svg>
                    </div>
                  }
                />
              </motion.div>
            </Popover>

            <Switch
              checked={theme === "dark"}
              onChange={() => dispatch(toggleTheme())}
              checkedChildren="🌙"
              unCheckedChildren="☀️"
              className="bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
            />

            <div className="flex items-center gap-3">
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div
                    key="loading-avatar"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Skeleton.Avatar active size="default" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="loaded-avatar"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="relative group"
                  >
                    <Avatar
                      src={user?.avatar}
                      className="border-2 border-blue-500 hover:border-blue-600 dark:hover:border-blue-400 transition-colors cursor-pointer"
                      onClick={() => navigate("/admin/profile")}
                    />
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6 overflow-auto" style={{ maxHeight: 'calc(100vh - 4rem)' }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;