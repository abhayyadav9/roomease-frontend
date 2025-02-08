import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  message,
  Select,
  InputNumber,
  Spin,
  Typography,
  Divider,
} from "antd";
import { CloseOutlined } from "@ant-design/icons";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const { Option } = Select;
const { Title, Text } = Typography;

const UpdateRequirement = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const selectedRequirement = useSelector((state) => state.requirement.selectedRequirement);

  if (!selectedRequirement) {
    return <p className="text-center text-red-500">No requirement selected.</p>;
  }

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const { location, category, description, requirement, priceRange, numberOfPerson, additionalNumber } = values;

      const response = await axios.put(
   
        `https://roomease-backend-edd9.onrender.com/api/v3a/update/requirement/${selectedRequirement._id}`,
        { location, category, description, requirement, priceRange, numberOfPerson, additionalNumber },
        { withCredentials: true }
      );

      message.success(response.data.message || "Requirement updated successfully!");
      navigate("/tenant-profile");
    } catch (error) {
      console.error("Error updating requirement:", error);
      message.error(error.response?.data?.message || "Failed to update requirement");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mt-20 mx-auto bg-white p-6 rounded-lg shadow-md">
      <Spin spinning={loading}>
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <Title level={3} className="text-blue-600">
            ✏️ Update Requirement
          </Title>
          <Button
            type="text"
            icon={<CloseOutlined />}
            className="text-gray-500 hover:text-red-500"
            onClick={() => navigate("/tenant-profile")}
          />
        </div>

        <Divider />

        {/* Form */}
        <Form layout="vertical" onFinish={onFinish} initialValues={selectedRequirement}>
          {/* Location */}
          <Form.Item
            label={<Text strong>📍 Location</Text>}
            name="location"
            rules={[{ required: true, message: "Please enter the location" }]}
          >
            <Input placeholder="Enter location" />
          </Form.Item>

          {/* Requirement Type */}
          <Form.Item
            label={<Text strong>📌 Requirement</Text>}
            name="requirement"
            rules={[{ required: true, message: "Please select the requirement type" }]}
          >
            <Select placeholder="Select requirement type">
              <Option value="flat">Flat</Option>
              <Option value="room">Room</Option>
            </Select>
          </Form.Item>

          {/* Category */}
          <Form.Item
            label={<Text strong>🏠 Category</Text>}
            name="category"
            rules={[{ required: true, message: "Please enter the category" }]}
          >
            <Input placeholder="Enter category" />
          </Form.Item>

          {/* Number of Persons */}
          <Form.Item
            label={<Text strong>👥 Number of Persons</Text>}
            name="numberOfPerson"
            rules={[{ required: true, message: "Please enter the number of persons" }]}
          >
            <InputNumber min={1} className="w-full" />
          </Form.Item>

          {/* Additional Number */}
          <Form.Item
            label={<Text strong>➕ Additional Number</Text>}
            name="additionalNumber"
            rules={[{ required: true, message: "Please enter an additional number" }]}
          >
            <InputNumber min={0} className="w-full" />
          </Form.Item>

          {/* Price Range */}
          <Form.Item
            label={<Text strong>💰 Price Range</Text>}
            name="priceRange"
            rules={[{ required: true, message: "Please enter the price range" }]}
          >
            <InputNumber min={0} className="w-full" />
          </Form.Item>

          {/* Description */}
          <Form.Item
            label={<Text strong>📝 Description</Text>}
            name="description"
          >
            <Input.TextArea rows={4} placeholder="Enter description" />
          </Form.Item>

          {/* Buttons */}
          <div className="flex gap-3 mt-4">
            <Button type="primary" htmlType="submit" loading={loading} block>
              {loading ? "Updating..." : "Update Requirement"}
            </Button>
            <Button
              onClick={() => navigate("/tenant-profile")}
              className="bg-gray-500 text-white hover:bg-gray-600 w-full"
            >
              Cancel
            </Button>
          </div>
        </Form>
      </Spin>
    </div>
  );
};

export default UpdateRequirement;
