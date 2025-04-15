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
  ContactsOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  // Responsive menu items configuration
  const menuItems = [
    {
      key: "home",
      label: "Home",
      path: "/",
      icon: <HomeFilled className="text-xl" />,
    },
    {
      key: "find-room",
      label: "Find Room",
      path: "/all-rooms",
      icon: <SearchOutlined className="text-xl" />,
    },
    {
      key: "requirements",
      label: "Requirements",
      path: "/all-requirement",
      icon: <FormOutlined className="text-xl" />,
    },
    {
      key: "contacts",
      label: "Contact",
      path: "/contact",
      icon: <ContactsOutlined className="text-xl" />,
    },
  ];

  // Handle scroll to add a smooth transition effect on desktop navbar height.
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Desktop Navbar: RoomEase on the left; navigation items & Login on the right.
  const DesktopNavbar = () => (
    <nav
      className={`hidden lg:flex items-center bg-white dark:bg-gray-800 shadow-lg fixed top-0 w-full ${
        isScrolled ? "h-12" : "h-16"
      } transition-all duration-300 z-40`}
    >
      <div className="max-w-7xl w-full mx-auto px-6 flex justify-between items-center">
        {/* Left: Logo */}
        <motion.div className="flex items-center">
          <NavLink
            to="/"
            className="flex items-center gap-2 text-2xl font-bold"
          >
            <span className="text-blue-600 dark:text-blue-400">
              Room<span className="text-[#F83002]">Ease</span>
            </span>
          </NavLink>
        </motion.div>

        {/* Right: Navigation Menu & Login */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-6">
            {menuItems.map((item) => (
              <NavLink
                key={item.key}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    isActive
                      ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-700/50"
                  }`
                }
              >
                <motion.div className="flex items-center gap-2">
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </motion.div>
              </NavLink>
            ))}
          </div>
          <Button
            type="primary"
            className="bg-blue-600 hover:bg-blue-700 border-none shadow-lg"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </div>
      </div>
    </nav>
  );

  // Mobile Top Bar: RoomEase logo and Login remain at the top.
  const MobileTopBar = () => (
    <nav className="lg:hidden flex items-center bg-white dark:bg-gray-800 shadow-lg fixed top-0 left-0 right-0 z-50 h-16 px-4 transition-all duration-300">
      <div className="flex justify-between items-center w-full">
        <NavLink to="/" className="flex items-center gap-2 text-2xl font-bold">
          <span className="text-blue-600 dark:text-blue-400">Room</span>
          <span className="text-[#F83002]">Ease</span>
        </NavLink>
        <Button
          type="primary"
          className="bg-blue-600 hover:bg-blue-700 border-none shadow-lg"
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
      </div>
    </nav>
  );

  // Mobile Bottom Navigation: Navigation items are fixed at the bottom.
  const MobileBottomNav = () => (
    <motion.div className="fixed bottom-0 left-0 right-0 lg:hidden z-50 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg">
      <div className="flex justify-around items-center h-16 px-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.key}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-300 flex-1 mx-1 ${
                isActive
                  ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`
            }
          >
            <motion.div className="flex flex-col items-center">
              {item.icon}
              <span className="text-xs mt-1 font-medium">{item.label}</span>
            </motion.div>
          </NavLink>
        ))}
      </div>
    </motion.div>
  );

  return (
    <>
      <DesktopNavbar />
      <MobileTopBar />
      <MobileBottomNav />
    </>
  );
};

export default Navbar;
