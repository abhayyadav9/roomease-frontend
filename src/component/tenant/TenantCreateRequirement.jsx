import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ViewRequirementDetail from "../commonPage/ViewRequirementDetail";
import { setSelectedRequirement } from "../../redux/slice/requirementSlice";
import {
  Popover,
  Spin,
  Modal,
  Button,
  message,
  Card,
  Avatar,
  Typography,
  Tag,
} from "antd";
import {
  BsThreeDots,
  BsPencil,
  BsTrash,
  BsInfoCircle,
  BsXCircle,
  BsCheckCircle,
} from "react-icons/bs";
import {
  HomeOutlined,
  UserOutlined,
  DollarOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import BASEURL from "../../utils/BaseUrl";
import axios from "axios";
import useGetAllRequirement from "../../hooks/useGetAllRequirement";

const { Title, Text } = Typography;

const TenantCreateRequirement = ({tenantRequirements,role }) => {
 
  const loading = useSelector((state) => state.requirement.loading);
  const error = useSelector((state) => state.requirement.error);
  const selectedRequirement = useSelector(
    (state) => state.requirement.selectedRequirement
  );
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { refreshData } = useGetAllRequirement();
  const [activeTab, setActiveTab] = useState("activeRooms");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
    const requirements = useSelector(
      (state) => state.requirement.requirements.requirement.requirements
    );


  const requirementsHistory = requirements.filter(
    (req) =>
      req?.tenant?.user === user?.id &&
      req.availability === "found" &&
      req.status === "active"
  );
  const handleOpenModal = (requirement) => {
    dispatch(setSelectedRequirement(requirement));
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    dispatch(setSelectedRequirement(null));
  };

  const handleStatusChange = async (requirementId, newStatus) => {
    setActionLoading(true);
    try {
      await axios.put(
        `${BASEURL}/api/v3a/requirement/status/${requirementId}`,
        { status: newStatus },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      refreshData()

      message.success(`Requirement marked as ${newStatus}`);
    } catch (error) {
      message.error(`Failed to update status`);
    } finally {
      setActionLoading(false);
    }
  };

  const handleAvailabilityChange = async (requirementId, newAvailability) => {
    setActionLoading(true);
    try {
      await axios.put(
        `${BASEURL}/api/v3a/requirement/availability/${requirementId}`,
        { availability: newAvailability },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      refreshData()
      message.success(`Availability updated to ${newAvailability}`);
    } catch (error) {
      message.error("Failed to update availability");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (requirementId) => {
    // Reuse the status change handler for deletion
    await handleStatusChange(requirementId, "inactive");
  };

  const MenuContent = (requirement) => (
    <div className="space-y-2 p-2 min-w-[120px]">
      <Button
        type="text"
        block
        className="!flex items-center !justify-start !px-4"
        onClick={() => handleOpenModal(requirement)}
      >
        <BsInfoCircle className="mr-2" />
        Details
      </Button>

      <Button
        type="text"
        block
        className="!flex items-center !justify-start !px-4"
        onClick={() => console.log("Edit:", requirement._id)}
      >
        <BsPencil className="mr-2" />
        Edit
      </Button>

      {/* Availability Controls */}
      {requirement.availability === "notfound" && (
        <Button
          type="text"
          block
          className="!flex items-center !justify-start !px-4 !text-green-600"
          onClick={() => handleAvailabilityChange(requirement._id, "found")}
          loading={actionLoading}
        >
          <BsCheckCircle className="mr-2" />
           Found
        </Button>
      )}

      {requirement.availability === "found" && (
        <Button
          type="text"
          block
          className="!flex items-center !justify-start !px-4 !text-orange-600"
          onClick={() => handleAvailabilityChange(requirement._id, "notfound")}
          loading={actionLoading}
        >
          <BsXCircle className="mr-2" />
           Not Found
        </Button>
      )}

      {/* Delete/Inactive Button */}
      <Button
        type="text"
        danger
        block
        className="!flex items-center !justify-start !px-4"
        onClick={() => handleDelete(requirement._id)}
        loading={actionLoading}
      >
        <BsTrash className="mr-2" />
        Delete
      </Button>
    </div>
  );

  if (loading) return <Spin size="large" className="!block !my-20" />;

  if (error)
    return (
      <Text type="danger" className="!block !text-center !my-10">
        Error loading requirements: {error}
      </Text>
    );



  // if (tenantRequirements?.length === 0)
  //   return (
  //     <Card className="!text-center !py-10 !my-6">
  //       <Text type="secondary">No requirements created yet</Text>
  //     </Card>
  //   );

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <Title level={3} className="!text-center !mb-8 !text-indigo-900">
        🏡 Your Property Requirements
      </Title>


      <div className="flex justify-center gap-4 mb-6">
        <Button
          type={activeTab === "activeRequirement" ? "primary" : "default"}
          onClick={() => setActiveTab("activeRequirement")}
          className="px-6 py-2 rounded-lg shadow-md transition-all duration-300"
        >
          Active Requirement
        </Button>
        <Button
          type={activeTab === "foundRequirement" ? "primary" : "default"}
          onClick={() => setActiveTab("foundRequirement")}
          className="px-6 py-2 rounded-lg shadow-md transition-all duration-300"
        >
          Found Rooms
        </Button>
       {
        role === "admin" &&
        <Button
        type={activeTab === "deletedRooms" ? "primary" : "default"}
        onClick={() => setActiveTab("deletedRooms")}
        className="px-6 py-2 rounded-lg shadow-md transition-all duration-300"
      >
        Deleted Rooms
      </Button>
       }
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tenantRequirements?.map((requirement) => (
          <Card
            key={requirement._id}
            className="shadow-xl rounded-2xl hover:shadow-2xl transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-4">
                <Avatar
                  size={64}
                  src={requirement.tenant?.tenantPic}
                  icon={<UserOutlined />}
                  className="border-2 border-indigo-100"
                />
                <div>
                  <Title level={5} className="!m-0 !text-indigo-900">
                    {requirement.tenant?.name}
                  </Title>
                  <Text type="secondary">{requirement.location}</Text>
                </div>
              </div>

              <Popover
                content={() => MenuContent(requirement)}
                trigger="click"
                placement="bottomRight"
              >
                <Button
                  type="text"
                  icon={<BsThreeDots className="text-xl text-gray-600" />}
                  className="!rounded-full"
                />
              </Popover>
            </div>

            <div className="space-y-3 border-t border-indigo-50 pt-4">
              <div className="flex items-center gap-2">
                <HomeOutlined className="text-indigo-400" />
                <Text strong className="!text-indigo-600">
                  {requirement.requirement}
                </Text>
                <Tag color="blue" className="!ml-auto">
                  {requirement.category}
                </Tag>
              </div>

              <div className="flex items-center gap-2">
                <DollarOutlined className="text-indigo-400" />
                <Text>₹{requirement.priceRange}</Text>
              </div>

              <div className="flex items-center gap-2">
                <TeamOutlined className="text-indigo-400" />
                <Text>{requirement.numberOfPerson} people</Text>
              </div>
            </div>

            <Button
              type="primary"
              block
              className="!mt-4 !rounded-lg !bg-indigo-600 hover:!bg-indigo-700"
              onClick={() => handleOpenModal(requirement)}
            >
              View Full Details
            </Button>
          </Card>
        ))}
      </div>

      <Modal
        title="Requirement Details"
        visible={isModalOpen}
        onCancel={handleCloseModal}
        footer={null}
        className="rounded-2xl"
        width={800}
        destroyOnClose
      >
        {selectedRequirement && (
          <ViewRequirementDetail
            requirement={selectedRequirement}
            onClose={handleCloseModal}
          />
        )}
      </Modal>
    </div>
  );
};

export default TenantCreateRequirement;
