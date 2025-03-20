import {
  Avatar,
  Button,
  Popover,
  Menu,
  Drawer,
  Modal,
  Badge,
  Switch,
} from "antd";
import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { AiOutlineSave } from "react-icons/ai";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  HomeOutlined,
  SearchOutlined,
  FormOutlined,
  UserOutlined,
  MenuOutlined,
  CloseOutlined,
  LogoutOutlined,
  EditOutlined,
  ContactsOutlined,
  CustomerServiceFilled,
  MessageOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { logout as logoutAction } from "../../redux/slice/authSlice";
import BASEURL from "../../utils/BaseUrl";
import { toggleTheme } from "../../redux/slice/themeSlice";

const TenantNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const tenant = useSelector((state) => state.tenant.data?.data);
  const user = useSelector((state) => state.auth?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useSelector((state) => state.theme.theme);

  // Responsive menu configuration
  const menuItems = [
    {
      key: "home",
      label: "Home",
      path: "/tenant/home",
      icon: <HomeOutlined  />,
    },
    {
      key: "find-room",
      label: "Find Room",
      path: "/tenant/all-rooms",
      icon: <SearchOutlined  />,
    },
    {
      key: "requirements",
      label: "Requirements",
      path: "/tenant/requirements",
      icon: <FormOutlined  />,
    },
  ];

  const toggleSidebar = useCallback(() => setIsOpen((prev) => !prev), []);
  const closeSidebar = useCallback(() => setIsOpen(false), []);

  const handleLogout = async () => {
    Modal.confirm({
      title: "Confirm Logout",
      content: "Are you sure you want to logout?",
      okButtonProps: { className: "bg-blue-500 hover:!bg-blue-600" },
      onOk: async () => {
        try {
          setLogoutLoading(true);
          await axios.post(
            `${BASEURL}/api/v1/logout`,
            {},
            { withCredentials: true }
          );
          dispatch(logoutAction());

          // Clear all storage
          localStorage.clear();
          sessionStorage.clear();
          caches
            .keys()
            .then((keys) => keys.forEach((key) => caches.delete(key)));

          navigate("/login");
        } catch (error) {
          console.error("Logout error:", error);
          Modal.error({
            title: "Logout Error",
            content: "Failed to logout. Please try again.",
          });
        } finally {
          setLogoutLoading(false);
        }
      },
    });
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

    <> 
    <Drawer
      title={
        <NavLink to="/tenant/home" onClick={closeSidebar}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2"
          >
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              RoomEase
            </span>
          </motion.div>
        </NavLink>
      }
      placement="right"
      closable={false}
      onClose={closeSidebar}
      open={isOpen}
      width="280px"
      className="dark:bg-gray-800"
    >

<div className="flex  flex-col px-5 border-t dark:border-gray-700">
       
       <NavLink
         to="/tenant/profile"
         className="menu-link flex gap-3 mt-4 dark:hover:!bg-gray-700"
       >
        <img src={tenant?.tenantPic} className="h-4 w-4 rounded-full" />
         View Profile
       </NavLink>
       </div>
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
      <div className="flex  flex-col px-5 border-t dark:border-gray-700">
       
       
        <NavLink
          to="/tenant/saved-rooms"
          className="menu-link flex gap-3 mt-4 dark:hover:!bg-gray-700"
        >
          <AiOutlineSave  />
          Saved Rooms
        </NavLink>

   
          <Link to="/tenant/contact"  className="menu-link flex gap-3 mt-4 dark:hover:!bg-gray-700">
            <MessageOutlined  />
            <span> Message us </span>
          </Link>
          <Link to="/tenant/messages"  className="menu-link flex gap-3 mt-4 dark:hover:!bg-gray-700">
            <ContactsOutlined  />
            <span> Contact us </span>
          </Link>

      </div>
        <div className="mt-10 ">
          <button
            onClick={handleLogout}
            className="w-full menu-link text-red-600 hover:!bg-red-50 dark:text-red-400 dark:hover:!bg-red-900/20"
          >
            <LogoutOutlined />
            Logout
          </button>
        </div>
    </Drawer>
    </>
  );

  const profileContent = (
    <div className="flex flex-col gap-2 p-2 w-64">
      <div className="flex items-center gap-4 border-b pb-4">
        <Avatar
          src={tenant?.tenantPic}
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
        to="/tenant/profile"
        className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <UserOutlined className="text-lg text-blue-500" />
        <span className="text-gray-700">View Profile</span>
      </NavLink>

      <NavLink
        to="/tenant/update-detail"
        className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <EditOutlined className="text-lg text-green-500" />
        <span className="text-gray-700">Edit Profile</span>
      </NavLink>
      <NavLink
        to="/tenant/saved-rooms"
        className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <AiOutlineSave className="text-lg text-green-500" />
        <span className="text-gray-700">Save Rooms</span>
      </NavLink>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600"
      >
        <LogoutOutlined className="text-lg" />
        <span>Logout</span>
      </button>
    </div>
  );

  return (
    <nav className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 shadow-lg fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center flex-1">
            <NavLink
              to="/tenant/home"
              className="flex items-center gap-2 text-2xl font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2"
              >
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                  RoomEase
                </span>
              </motion.div>
            </NavLink>
          </div>

          {/* Desktop Menu */}
          {renderDesktopMenu()}

          {/* Right Controls */}
          <div className="flex items-center gap-4 ml-auto">
            {/* Service Dropdown */}

            <Popover
              content={
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    padding: "12px",
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    minWidth: "200px",
                  }}
                >
                  <Link
                    to="/tenant/contact"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "8px",
                      color: "#333",
                      textDecoration: "none",
                      borderRadius: "6px",
                      transition: "background 0.2s",
                      hover: { background: "#f5f5f5" },
                    }}
                  >
                    <ContactsOutlined
                      style={{ fontSize: "18px", color: "#1890ff" }}
                    />
                    <span>Our Contact</span>
                  </Link>

                  {user?.role === "tenant" && (
                    <NavLink
                      to="/tenant/messages"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        padding: "8px",
                        color: "#333",
                        textDecoration: "none",
                        borderRadius: "6px",
                        transition: "background 0.2s",
                        hover: { background: "#f5f5f5" },
                      }}
                    >
                      <MessageOutlined
                        style={{ fontSize: "18px", color: "#1890ff" }}
                      />
                      <span>Message Us</span>
                    </NavLink>
                  )}
                </div>
              }
              trigger={["click", "hover"]}
              placement="bottomRight"
            >
              <Button
                type="text"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  height: "40px",
                  padding: "0 16px",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  hover: { background: "#f5f5f5" },
                }}
              >
                <CustomerServiceFilled
                  style={{ fontSize: "18px", color: "#1890ff" }}
                />
                <span
                  style={{ color: "#333", fontSize: "14px", fontWeight: 500 }}
                >
                  Services
                </span>
              </Button>
            </Popover>

            {/* Profile Section */}
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
                  src={tenant?.tenantPic}
                  icon={<UserOutlined />}
                  className="border-2 border-blue-500"
                />
                <span className="text-gray-700">
                  {user?.name?.split(" ")[0]}
                </span>
              </Button>
            </Popover>

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? (
                <CloseOutlined className="text-xl text-gray-700 dark:text-gray-300" />
              ) : (
                <MenuOutlined className="text-xl text-gray-700 dark:text-gray-300" />
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

export default TenantNavbar;
