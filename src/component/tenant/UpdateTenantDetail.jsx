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
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setTenant } from "../../redux/slice/tenantSlice";
import BASEURL from "../../utils/BaseUrl";

const { Title, Text } = Typography;

const UpdateTenantDetail = () => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const tenant = useSelector((state) => state.tenant?.data?.data);
  const navigate = useNavigate();
  const dispatch= useDispatch()

  if (!tenant) {
    return <p className="text-center text-red-500">No Tenant selected.</p>;
  }

  const handleImageUpload = (file) => {
    setImage(file);
    return false; // Prevent automatic upload
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      if (!tenant?.user?._id) {
        message.error("Tenant ID is missing! Please try again.");
        return;
      }

      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("phone", values.phone);
      formData.append("address", values.address);
      if (image) formData.append("file", image);

      const apiUrl = `${BASEURL}/api/v3/update-tenant/${tenant.user._id}`;
      console.log("Sending request to:", apiUrl);

     const res= await axios.put(apiUrl, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      message.success("Tenant updated successfully!");
      dispatch(setTenant(res.data))
      navigate("/tenant/profile");
    } catch (error) {
      console.error("Error updating Tenant:", error);
      message.error(error.response?.data?.message || "Failed to update Tenant");
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
            {/* ✅ Tenant Image */}
            <Avatar size={64} src={tenant?.tenantPic} alt="Tenant Profile" />
            <Title level={3} className="text-blue-600">
              ✏️ Update Tenant - {tenant.name}
            </Title>
          </div>
          <Button
            type="text"
            icon={<CloseOutlined />}
            className="text-gray-500 hover:text-red-500"
            onClick={() => navigate("/tenant/profile")}
          />
        </div>

        <Divider />

        {/* Form */}
        <Form layout="vertical" onFinish={onFinish} initialValues={tenant}>
          {/* Tenant Name */}
          <Form.Item
            label={<Text strong>👤 Tenant Name</Text>}
            name="name"
            rules={[{ required: true, message: "Please enter the Tenant's name" }]}
          >
            <Input placeholder="Enter Tenant's name" />
          </Form.Item>

          {/* Email (Disabled) */}
          <Form.Item label={<Text strong>📧 Email</Text>} name="email">
            <Input disabled placeholder={tenant?.user?.email} value={tenant?.user?.email || "N/A"} />
          </Form.Item>

          {/* Phone */}
          <Form.Item
            label={<Text strong>📞 Phone</Text>}
            name="phone"
            rules={[{ required: true, message: "Please enter the Tenant's phone number" }]}
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

          {/* Profile Picture Upload */}
          <Form.Item label={<Text strong>📸 Profile Picture</Text>}>
            <Upload beforeUpload={handleImageUpload} showUploadList={false}>
              <Button icon={<UploadOutlined />}>Upload New Image</Button>
            </Upload>
          </Form.Item>

          {/* Buttons */}
          <div className="flex gap-3 mt-4">
            <Button type="primary" htmlType="submit" loading={loading} block>
              {loading ? "Updating..." : "Update Tenant"}
            </Button>
            <Button
              onClick={() => navigate("/tenant/profile")}
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

export default UpdateTenantDetail;
