import React from "react";
import { Modal, Tag, Button } from "antd";
import {
  EnvironmentOutlined,
  DollarOutlined,
  UserOutlined,
  TeamOutlined,
  FileTextOutlined,
  PhoneOutlined,
} from "@ant-design/icons";

const ViewRequirementDetail = ({ requirement, onClose }) => {
  if (!requirement) return null; // Ensure data exists

  return (
    <Modal title="📌 Requirement Details" open={true} onCancel={onClose} footer={null} width={700} centered>
      {/* 📜 Requirement Details */}
      <div className="p-6 space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">Requirement for {requirement.category}</h2>
        <p className="text-gray-600 text-lg">{requirement.description || "No additional details provided."}</p>

        {/* 📌 Requirement Information */}
        <div className="grid grid-cols-2 gap-4 text-gray-700">
          <div className="flex items-center gap-2">
            <EnvironmentOutlined className="text-blue-600 text-xl" />
            <span className="font-medium">Location: <strong>{requirement.location}</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <DollarOutlined className="text-green-600 text-xl" />
            <span className="font-medium">Price Range: <strong>₹{requirement.priceRange}</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <UserOutlined className="text-purple-600 text-xl" />
            <span className="font-medium">Tenant Name: <strong>{requirement.tenant?.name}</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <PhoneOutlined className="text-red-600 text-xl" />
            <span className="font-medium">Contact: <strong>{requirement.additionalNumber || "N/A"}</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <TeamOutlined className="text-yellow-600 text-xl" />
            <span className="font-medium">Number of Persons: <strong>{requirement.numberOfPerson}</strong></span>
          </div>
        </div>

        {/* ✅ Status Indicator */}
        <div className="flex justify-center mt-4">
          <Tag color={requirement.status === "active" ? "green" : "red"} className="text-lg px-4 py-1">
            {requirement.status === "active" ? "Active" : "Inactive"}
          </Tag>
        </div>

        {/* 🔘 Close Button */}
        <Button
          onClick={onClose}
          className="w-full bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-lg mt-4 transition-all duration-300"
        >
          Close
        </Button>
      </div>
    </Modal>
  );
};

export default ViewRequirementDetail;
