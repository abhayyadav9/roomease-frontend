import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Card,
  Tabs,
  Divider,
  Avatar,
  Typography,
  Badge,
  Tag,
  Spin,
} from "antd";
import {
  EditOutlined,
  PlusOutlined,
  LogoutOutlined,
  UserOutlined,
  PhoneOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import TenantCreateRequirement from "./TenantCreateRequirement";
import axios from "axios";
import BASEURL from "../../utils/BaseUrl";
import { logout as logoutAction } from "../../redux/slice/authSlice";
import SavedRooms from "./SavedRooms";
import RoomCard from "../commonPage/RoomCard";
import { motion, AnimatePresence } from "framer-motion";
import { setSelectedRoom } from "../../redux/slice/roomSlice";
import ViewRoomDetail from "../commonPage/ViewRoomDetail";

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const TenantProfile = () => {
  const tenant = useSelector((state) => state.tenant?.data?.data);
  const requirements = useSelector(
    (state) => state.requirement.requirements.requirement.requirements
  );
  const [activeTab, setActiveTab] = useState("requirements");
  const [globalLoading, setGlobalLoading] = useState(false);
  const [requirementsLoading, setRequirementsLoading] = useState(false);
  const [savedLoading, setSavedLoading] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const allRooms = useSelector((state) => state.room?.room);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //for apply queries room
  const handleOpenModal = (room) => {
    dispatch(setSelectedRoom(room));
    setIsModalOpen(true);
  };

  const appliedQueryRooms = allRooms?.filter((room) =>
    tenant?.appliedQuery?.includes(room?._id)
  );
  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  // Filter tenant-specific requirements
  const tenantRequirements = requirements?.filter(
    (req) => req?.tenant?.user === user?.id
  );

  // Example: Simulate global loading on mount (e.g., fetching tenant details)
  useEffect(() => {
    setGlobalLoading(true);
    // Simulate async loading delay
    const timer = setTimeout(() => {
      setGlobalLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Logout handler using Axios and Redux action
  const handleLogout = async () => {
    try {
      setGlobalLoading(true);
      await axios.post(
        `${BASEURL}/api/v1/logout`,
        {},
        { withCredentials: true }
      );
      dispatch(logoutAction());
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setGlobalLoading(false);
    }
  };

  // Component for rendering profile details
  const ProfileSection = () => (
    <Card
      className="shadow-xl rounded-2xl border-0 mt-14"
      style={{
        background: "linear-gradient(135deg, #f0f4ff 0%, #f8faff 100%)",
        borderLeft: "6px solid #4f46e5",
      }}
    >
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <Badge
          count={
            <EditOutlined className="text-white bg-indigo-500 p-1 rounded-full" />
          }
          offset={[-20, 90]}
        >
          <Avatar
            src={tenant?.tenantPic}
            size={110}
            className="border-4 border-indigo-100 shadow-md"
            style={{ backgroundColor: "#6366f1" }}
            icon={<UserOutlined className="text-3xl text-indigo-100" />}
          />
        </Badge>
        <div className="space-y-2 text-center md:text-left">
          <div className="flex items-center gap-3">
            <Title level={2} className="!mb-0 !text-indigo-900 !font-bold">
              {tenant?.name?.toUpperCase() || "Unknown Tenant"}
            </Title>
            <Tag color="#4f46e5" className="!flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Verified
            </Tag>
          </div>
          <Text
            type="secondary"
            className="!text-base !text-indigo-400 !font-medium"
          >
            {tenant?.user?.email || "No email provided"}
          </Text>
          <div className="flex flex-wrap gap-4 mt-4 justify-center md:justify-start">
            <Button
              type="primary"
              shape="round"
              icon={<EditOutlined />}
              onClick={() => navigate("/tenant/update-detail")}
              className="!bg-indigo-500 !border-indigo-500 hover:!bg-indigo-600 !flex items-center gap-2 !px-6"
            >
              Edit Profile
            </Button>
            <Button
              type="primary"
              shape="round"
              ghost
              icon={<PlusOutlined />}
              onClick={() => navigate("/tenant/add-requirement")}
              className="!text-indigo-500 !border-indigo-500 hover:!text-indigo-600 !flex items-center gap-2 !px-6"
            >
              New Requirement
            </Button>
          </div>
        </div>
      </div>

      <Divider className="!mt-8 !mb-6 !border-indigo-100" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DetailItem
          label="Phone"
          value={tenant?.phone || "N/A"}
          icon={<PhoneOutlined className="text-indigo-400" />}
        />
        <DetailItem
          label="Address"
          value={tenant?.address || "N/A"}
          icon={<HomeOutlined className="text-indigo-400" />}
        />
      </div>

      <div className="mt-8 flex justify-end">
        <Button
          danger
          shape="round"
          icon={<LogoutOutlined />}
          onClick={handleLogout}
          className="!flex items-center gap-2 !px-6 !border-red-100 hover:!border-red-200 !text-red-500 hover:!text-red-600"
        >
          Logout
        </Button>
      </div>
    </Card>
  );

  // Detail item component for Phone and Address
  const DetailItem = ({ label, value, icon }) => (
    <div className="flex items-start gap-4 p-4 bg-indigo-50 rounded-xl">
      <div className="p-2 bg-white rounded-lg shadow-sm">{icon}</div>
      <div>
        <Text strong className="!block !text-indigo-400 !text-sm !mb-1">
          {label}
        </Text>
        <Text className="!block !text-indigo-800 !font-medium !text-base">
          {value}
        </Text>
      </div>
    </div>
  );

  // Tab label component showing icon, label, and count badge
  const TabLabel = ({ count, label, icon, color }) => (
    <div className="flex items-center gap-2 px-4 py-2">
      <span className="text-xl">{icon}</span>
      <span className="font-medium" style={{ color }}>
        {label}
      </span>
      {count !== undefined && (
        <span
          className="px-2 py-1 rounded-full text-xs font-bold"
          style={{ backgroundColor: `${color}20`, color }}
        >
          {count}
        </span>
      )}
    </div>
  );

  const currentRequirements = requirements?.filter(
    (req) =>
      req?.tenant?.user === user?.id &&
      req.availability === "notfound" &&
      req.status === "active"
  );

  const requirementsHistory = requirements?.filter(
    (req) =>
      req?.tenant?.user === user?.id &&
      req.availability === "found" &&
      req.status === "active"
  );

  return (
    <Spin spinning={globalLoading} tip="Loading...">
      <div className="container mx-auto px-4 py-8 max-w-4xl nt-10">
        <ProfileSection />

        <Tabs
          activeKey={activeTab}
          onChange={(key) => {
            setActiveTab(key);
            // Simulate loading when switching tabs
            if (key === "requirements") {
              setRequirementsLoading(true);
              setTimeout(() => {
                setRequirementsLoading(false);
              }, 800);
            }
            if (key === "saved") {
              setSavedLoading(true);
              setTimeout(() => {
                setSavedLoading(false);
              }, 800);
            }
          }}
          className="mt-8 custom-tabs"
          centered
          tabBarStyle={{
            background: "linear-gradient(135deg, #f8faff 0%, #f0f4ff 100%)",
            borderRadius: "12px",
            padding: "8px",
          }}
        >
          <TabPane
            tab={
              <TabLabel
                count={currentRequirements?.length || 0}
                label="Requirements"
                icon="📋"
                color="#4f46e5"
              />
            }
            key="requirements"
          >
            <Spin spinning={requirementsLoading} tip="Loading Requirements...">
              {tenantRequirements?.length > 0 ? (
                <TenantCreateRequirement
                  tenantRequirements={currentRequirements}
                />
              ) : (
                <Card className="text-center py-8">
                  <Text type="secondary">No requirements found</Text>
                </Card>
              )}
            </Spin>
          </TabPane>

          <TabPane
            tab={
              <TabLabel
                count={tenant?.bookmarks?.length || 0}
                label="Saved Rooms"
                icon="❤️"
                color="#ef4444"
              />
            }
            key="saved"
          >
            <Spin spinning={savedLoading} tip="Loading Saved Rooms...">
              {tenant?.bookmarks?.length > 0 ? (
                <SavedRooms />
              ) : (
                <Card className="text-center py-8">
                  <Text type="secondary">No saved rooms found</Text>
                </Card>
              )}
            </Spin>
          </TabPane>

          <TabPane
            tab={
              <TabLabel
                count={requirementsHistory?.length || 0}
                label="History"
                icon=""
                color="#ef41101"
              />
            }
            key="history"
          >
            <Spin spinning={requirementsLoading} tip="Loading Requirements...">
              {requirementsHistory?.length > 0 ? (
                <>
                  <div className="flex justify-center">
                    <p className="text-3xl">All Requirement History</p>
                  </div>
                  <TenantCreateRequirement
                    tenantRequirements={requirementsHistory}
                  />
                </>
              ) : (
                <Card className="text-center py-8">
                  <Text type="secondary">No History found</Text>
                </Card>
              )}
            </Spin>
          </TabPane>

          {/* applied query room */}
          <TabPane
            tab={
              <TabLabel
                count={tenant?.appliedQuery.length || 0}
                label="Applied Query"
                color="#10b981"
              />
            }
            key="queries"
          >
            <Card className="text-center py-1">
              <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-2">
                <motion.h1
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-3xl font-bold text-gray-800 mb-8 text-center"
                >
                  Your Applied Query
                </motion.h1>

                {appliedQueryRooms?.length > 0 ? (
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4"
                  >
                    <AnimatePresence>
                      {appliedQueryRooms?.map((room) => (
                        <motion.div
                          key={room?._id}
                          variants={cardVariants}
                          whileHover={{ scale: 1.02 }}
                          className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:shadow-xl"
                        >
                          <RoomCard
                            room={room}
                            onClick={() => handleOpenModal(room)}
                            isBookmarked={true}
                          />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-20"
                  >
                    <p className="text-gray-500 text-xl">
                      <Text type="secondary">No queries available yet.</Text>
                    </p>
                    <button
                      onClick={() => navigate("/tenant/all-rooms")}
                      className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      Browse Properties
                    </button>
                  </motion.div>
                )}

                {isModalOpen && (
                  <ViewRoomDetail onClose={() => setIsModalOpen(false)} />
                )}
              </div>
            </Card>
          </TabPane>
        </Tabs>
      </div>
    </Spin>
  );
};

export default TenantProfile;
