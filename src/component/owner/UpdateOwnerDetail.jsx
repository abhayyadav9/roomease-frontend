import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Form,
  Input,
  Button,
  message,
  Spin,
  Typography,
  Avatar,
  Upload,
  InputNumber,
} from "antd";
import { CloseOutlined, UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BASEURL from "../../utils/BaseUrl";

const { Text } = Typography;

const UpdateOwnerDetail = () => {
  // ... keep existing state and logic the same ...
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const owner = useSelector((state) => state.owner?.data?.data);
  const user = useSelector((state) => state.auth?.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role != "owner") {
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden mt-20"
    >
      <Spin spinning={loading}>
        {/* Gradient Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Avatar
              size={64}
              src={owner.ownerPic}
              className="border-2 border-white"
            />
            <h2 className="text-2xl font-bold text-white">
              ✏️ Update Profile - {owner.name}
            </h2>
          </div>
          <Button
            type="text"
            icon={<CloseOutlined className="text-white" />}
            className="!text-white hover:!bg-white/10"
            onClick={() => navigate("/owner-profile")}
          />
        </div>

        {/* Form Content */}
        <div className="p-8">
          <Form layout="vertical" onFinish={onFinish} initialValues={owner}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Owner Name */}
              <Form.Item
                label={
                  <span className="text-gray-700 font-semibold">
                    👤 Full Name
                  </span>
                }
                name="name"
                rules={[{ required: true }]}
              >
                <Input
                  placeholder="John Doe"
                  className="rounded-lg py-2 hover:border-blue-500"
                />
              </Form.Item>

              {/* Email (Disabled) */}
              <Form.Item
                label={
                  <span className="text-gray-700 font-semibold">📧 Email</span>
                }
              >
                <Input
                  disabled
                  value={owner?.user?.email || "N/A"}
                  className="rounded-lg bg-gray-100"
                />
              </Form.Item>

              {/* Phone */}
              <Form.Item
                label={
                  <span className="text-gray-700 font-semibold">📱 Phone</span>
                }
                name="phone"
                rules={[{ required: true }]}
              >
                <Input
                  placeholder="+91 9876543210"
                  className="rounded-lg py-2"
                />
              </Form.Item>

              {/* Pincode */}
              <Form.Item
                label={
                  <span className="text-gray-700 font-semibold">
                    📮 Pincode
                  </span>
                }
                name="pincode"
                rules={[{ required: true }]}
              >
                <InputNumber
                  min={1}
                  className="w-full rounded-lg"
                  placeholder="560001"
                />
              </Form.Item>

              {/* Address */}
              <Form.Item
                label={
                  <span className="text-gray-700 font-semibold">
                    📍 Address
                  </span>
                }
                name="address"
                rules={[{ required: true }]}
                className="col-span-2"
              >
                <Input.TextArea
                  rows={3}
                  placeholder="Enter full address"
                  className="rounded-lg"
                />
              </Form.Item>

              {/* Profile Picture */}
              <Form.Item
                label={
                  <span className="text-gray-700 font-semibold">
                    📸 Profile Photo
                  </span>
                }
                className="col-span-2"
              >
                <div className="flex items-center gap-6">
                  <Avatar
                    size={96}
                    src={image ? URL.createObjectURL(image) : owner.ownerPic}
                    className="border-2 border-gray-200"
                  />
                  <Upload
                    beforeUpload={handleImageUpload}
                    showUploadList={false}
                  >
                    <Button
                      icon={<UploadOutlined />}
                      className="h-12 px-6 rounded-lg bg-gray-100 hover:bg-gray-200 border-0"
                    >
                      Change Photo
                    </Button>
                  </Upload>
                </div>
              </Form.Item>

              {/* Created Rooms */}
              <Form.Item
                label={
                  <span className="text-gray-700 font-semibold">
                    🏠 Properties
                  </span>
                }
                className="col-span-2"
              >
                <div className="bg-blue-50 p-4 rounded-xl text-center">
                  <p className="text-lg font-semibold text-blue-600">
                    {owner.createdRooms?.length || 0}
                  </p>
                  <p className="text-gray-600">Listed Properties</p>
                </div>
              </Form.Item>
            </div>

            {/* Form Actions */}
            <div className="flex gap-4 mt-8">
              <Button
                onClick={() => navigate("/owner-profile")}
                className="h-12 px-8 rounded-lg bg-red-500 hover:bg-red-600 !text-white !border-0"
              >
                Cancel
              </Button>
              <Button
                htmlType="submit"
                loading={loading}
                className="h-12 px-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 !text-white !border-0"
              >
                {loading ? "Saving Changes..." : "Update Profile"}
              </Button>
            </div>
          </Form>
        </div>
      </Spin>
    </motion.div>
  );
};

export default UpdateOwnerDetail;
