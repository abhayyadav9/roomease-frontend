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
  Card,
} from "antd";
import { CloseOutlined } from "@ant-design/icons";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BASEURL from "../../utils/BaseUrl";

const { Option } = Select;
const { Title, Text } = Typography;

const UpdateRequirement = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const selectedRequirement = useSelector(
    (state) => state.requirement.selectedRequirement
  );

  if (!selectedRequirement) {
    return <p className="text-center text-red-500">No requirement selected.</p>;
  }

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const { location, category, description, requirement, priceRange, numberOfPerson, additionalNumber } = values;

      const response = await axios.put(
        `${BASEURL}/api/v3a/update/requirement/${selectedRequirement._id}`,
        { location, category, description, requirement, priceRange, numberOfPerson, additionalNumber },
        { withCredentials: true }
      );

      message.success(response.data.message || "Requirement updated successfully!");
      navigate("/tenant/profile");
    } catch (error) {
      console.error("Error updating requirement:", error);
      message.error(
        error.response?.data?.message || "Failed to update requirement"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full px-4 py-8">
      <Card
        className="shadow-xl rounded-2xl border-0 mx-auto"
        style={{
          maxWidth: "100%",
          background: "linear-gradient(135deg, #f0f4ff 0%, #f8faff 100%)",
          borderLeft: "6px solid #4f46e5",
        }}
      >
        <Spin spinning={loading}>
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <Title level={3} className="!text-indigo-900 !font-bold">
              ✏️ Update Requirement
            </Title>
            <Button
              type="text"
              icon={<CloseOutlined className="text-indigo-400 hover:text-indigo-600" />}
              onClick={() => navigate("/tenant/profile")}
            />
          </div>

          <Divider className="!border-indigo-100" />

          {/* Form */}
          <Form
            layout="vertical"
            onFinish={onFinish}
            initialValues={selectedRequirement}
          >
            {/* Location */}
            <Form.Item
              label={<Text strong className="!text-indigo-600">📍 Location</Text>}
              name="location"
              rules={[{ required: true, message: "Please enter the location" }]}
            >
              <Input placeholder="Enter location" className="!rounded-lg hover:!border-indigo-300 focus:!border-indigo-500" />
            </Form.Item>

            {/* Requirement Type */}
            <Form.Item
              label={<Text strong className="!text-indigo-600">📌 Requirement</Text>}
              name="requirement"
              rules={[{ required: true, message: "Please select the requirement type" }]}
            >
              <Select placeholder="Select requirement type" className="!rounded-lg">
                <Option value="flat">Flat</Option>
                <Option value="room">Room</Option>
              </Select>
            </Form.Item>

            {/* Category */}
            <Form.Item
              label={<Text strong className="!text-indigo-600">🏠 Category</Text>}
              name="category"
              rules={[{ required: true, message: "Please enter the category" }]}
            >
              <Input placeholder="Enter category" className="!rounded-lg hover:!border-indigo-300 focus:!border-indigo-500" />
            </Form.Item>

            {/* Number of Persons */}
            <Form.Item
              label={<Text strong className="!text-indigo-600">👥 Number of Persons</Text>}
              name="numberOfPerson"
              rules={[{ required: true, message: "Please enter the number of persons" }]}
            >
              <InputNumber min={1} className="w-full !rounded-lg" />
            </Form.Item>

            {/* Additional Number */}
            <Form.Item
              label={<Text strong className="!text-indigo-600">➕ Additional Number</Text>}
              name="additionalNumber"
              rules={[{ required: true, message: "Please enter an additional number" }]}
            >
              <InputNumber min={0} className="w-full !rounded-lg" />
            </Form.Item>

            {/* Price Range */}
            <Form.Item
              label={<Text strong className="!text-indigo-600">💰 Price Range</Text>}
              name="priceRange"
              rules={[{ required: true, message: "Please enter the price range" }]}
            >
              <InputNumber min={0} className="w-full !rounded-lg" />
            </Form.Item>

            {/* Description */}
            <Form.Item
              label={<Text strong className="!text-indigo-600">📝 Description</Text>}
              name="description"
            >
              <Input.TextArea
                rows={4}
                placeholder="Enter description"
                className="!rounded-lg hover:!border-indigo-300 focus:!border-indigo-500"
              />
            </Form.Item>

            <Divider className="!border-indigo-100" />

            {/* Buttons */}
            <div className="flex gap-3 mt-4">
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                block
                className="!rounded-lg !bg-indigo-600 hover:!bg-indigo-700 !border-none"
              >
                {loading ? "Updating..." : "Update Requirement"}
              </Button>
              <Button
                onClick={() => navigate("/tenant/profile")}
                className="!rounded-lg !bg-gray-500 !text-white hover:!bg-gray-600 w-full"
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Spin>
      </Card>
    </div>
  );
};

export default UpdateRequirement;
