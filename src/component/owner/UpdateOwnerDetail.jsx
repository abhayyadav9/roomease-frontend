import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  message,
  Spin,
  Typography,
  Divider,
  Avatar,
  Upload,
} from "antd";
import { CloseOutlined, UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BASEURL from "../../utils/BaseUrl";
import { useEffect } from "react";

const { Title, Text } = Typography;

const UpdateOwnerDetail = () => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const owner = useSelector((state) => state.owner?.data?.data);
  const user = useSelector(state=> state.auth?.user)
  const navigate = useNavigate();



  useEffect(() => {
    if (user?.role !="owner") {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!owner) {
    return <p className="text-center text-red-500">No owner selected.</p>;
  }

  const handleImageUpload = (file) => {
    setImage(file);
    return false; // Prevent automatic upload
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      if (!owner?.user?._id) {
        message.error("Owner ID is missing! Please try again.");
        return;
      }

      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("phone", values.phone);
      formData.append("address", values.address);
      formData.append("pincode", values.pincode);
      if (image) formData.append("file", image);

      const apiUrl = `${BASEURL}/api/v2/update-owner/${owner.user._id}`;
      console.log("Sending request to:", apiUrl);

      await axios.put(apiUrl, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      message.success("Owner updated successfully!");
      navigate("/owner-profile");
    } catch (error) {
      console.error("Error updating owner:", error);
      message.error(error.response?.data?.message || "Failed to update owner");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md mt-20">
      <Spin spinning={loading}>
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            {/* ✅ Owner Image */}
            <Avatar size={64} src={owner.ownerPic} alt="Owner Profile" />
            <Title level={3} className="text-blue-600">
              ✏️ Update Owner - {owner.name}
            </Title>
          </div>
          <Button
            type="text"
            icon={<CloseOutlined />}
            className="text-gray-500 hover:text-red-500"
            onClick={() => navigate("/owner-profile")}
          />
        </div>

        <Divider />

        {/* Form */}
        <Form layout="vertical" onFinish={onFinish} initialValues={owner}>
          {/* Owner Name */}
          <Form.Item
            label={<Text strong>👤 Owner Name</Text>}
            name="name"
            rules={[
              { required: true, message: "Please enter the owner's name" },
            ]}
          >
            <Input placeholder="Enter owner's name" />
          </Form.Item>

          {/* Email (Disabled) */}
          <Form.Item label={<Text strong>📧 Email</Text>} name="email">
            <Input disabled value={owner?.user?.email || "N/A"} />
          </Form.Item>

          {/* Phone */}
          <Form.Item
            label={<Text strong>📞 Phone</Text>}
            name="phone"
            rules={[
              {
                required: true,
                message: "Please enter the owner's phone number",
              },
            ]}
          >
            <Input placeholder="Enter phone number" />
          </Form.Item>

          {/* Address */}
          <Form.Item
            label={<Text strong>📍 Address</Text>}
            name="address"
            rules={[{ required: true, message: "Please enter the address" }]}
          >
            <Input placeholder="Enter address" />
          </Form.Item>

          {/* Pincode */}
          <Form.Item
            label={<Text strong>📮 Pincode</Text>}
            name="pincode"
            rules={[{ required: true, message: "Please enter the pincode" }]}
          >
            <Input placeholder="Enter pincode" />
          </Form.Item>

          {/* Profile Picture Upload */}
          <Form.Item label={<Text strong>📸 Profile Picture</Text>}>
            <Upload beforeUpload={handleImageUpload} showUploadList={false}>
              <Button icon={<UploadOutlined />}>Upload New Image</Button>
            </Upload>
          </Form.Item>

          {/* Created Rooms (View Only) */}
          <Form.Item label={<Text strong>🏠 Created Rooms</Text>}>
            <div className="bg-gray-100 p-3 rounded-md text-gray-600">
              {owner.createdRooms?.length > 0 ? (
                <p>🏡 {owner.createdRooms.length} room(s) created</p>
              ) : (
                <p>No rooms created yet.</p>
              )}
            </div>
          </Form.Item>

          {/* Buttons */}
          <div className="flex gap-3 mt-4">
            <Button type="primary" htmlType="submit" loading={loading} block>
              {loading ? "Updating..." : "Update Owner"}
            </Button>
            <Button
              onClick={() => navigate("/owner-profile")}
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

export default UpdateOwnerDetail;
