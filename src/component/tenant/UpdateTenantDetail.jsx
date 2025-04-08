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
  Card,
  Row,
  Col,
  Badge,
} from "antd";
import {
  CloseOutlined,
  UploadOutlined,
  UserOutlined,
  PhoneOutlined,
  HomeOutlined,
  MailOutlined,
} from "@ant-design/icons";
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
  const dispatch = useDispatch();

  if (!tenant) {
    return <p className="text-center text-red-500">No Tenant selected.</p>;
  }

  const handleImageUpload = (file) => {
    setImage(file);
    return false;
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("phone", values.phone);
      formData.append("address", values.address);
      if (image) formData.append("file", image);

      const res = await axios.put(
        `${BASEURL}/api/v3/update-tenant/${tenant?.user?._id}`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      message.success("Tenant updated successfully!");
      dispatch(setTenant(res.data));
      navigate("/tenant/profile");
    } catch (error) {
      message.error(error.response?.data?.message || "Failed to update Tenant");
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
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <Badge
                count={
                  <UploadOutlined className="text-white bg-indigo-500 p-1 rounded-full" />
                }
                offset={[-10, 90]}
              >
                <Avatar
                  size={64}
                  src={tenant?.tenantPic}
                  icon={<UserOutlined className="text-2xl text-indigo-100" />}
                  className="border-4 border-indigo-100 shadow-md"
                  style={{ backgroundColor: "#6366f1" }}
                />
              </Badge>
              <Title level={3} className="!mb-0 !text-indigo-900 !font-bold">
                ✨ Update Profile
              </Title>
            </div>
            <Button
              type="text"
              icon={
                <CloseOutlined className="text-indigo-400 hover:text-indigo-600" />
              }
              onClick={() => navigate("/tenant/profile")}
            />
          </div>

          <Divider className="!border-indigo-100" />

          {/* Form */}
          <Form layout="vertical" onFinish={onFinish} initialValues={tenant}>
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  label={
                    <Text strong className="!text-indigo-600">
                      Full Name
                    </Text>
                  }
                  name="name"
                  rules={[{ required: true, message: "Please enter name" }]}
                >
                  <Input
                    prefix={<UserOutlined className="text-indigo-400" />}
                    placeholder="John Doe"
                    className="!rounded-lg hover:!border-indigo-300 focus:!border-indigo-500"
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  label={
                    <Text strong className="!text-indigo-600">
                      Phone Number
                    </Text>
                  }
                  name="phone"
                  rules={[
                    { required: true, message: "Please enter phone number" },
                  ]}
                >
                  <Input
                    prefix={<PhoneOutlined className="text-indigo-400" />}
                    placeholder="+1 234 567 890"
                    className="!rounded-lg hover:!border-indigo-300 focus:!border-indigo-500"
                  />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  label={
                    <Text strong className="!text-indigo-600">
                      Email Address
                    </Text>
                  }
                >
                  <Input
                    prefix={<MailOutlined className="text-indigo-400" />}
                    value={tenant?.user?.email}
                    disabled
                    className="!rounded-lg !bg-indigo-50"
                  />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  label={
                    <Text strong className="!text-indigo-600">Address</Text>
                  }
                  name="address"
                  rules={[{ required: true, message: "Please enter address" }]}
                >
                  <Input
                    prefix={<HomeOutlined className="text-indigo-400" />}
                    placeholder="Enter full address"
                    className="!rounded-lg hover:!border-indigo-300 focus:!border-indigo-500"
                  />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  label={
                    <Text strong className="!text-indigo-600">
                      Profile Photo
                    </Text>
                  }
                >
                  <Upload
                    beforeUpload={handleImageUpload}
                    showUploadList={false}
                  >
                    <Button
                      icon={<UploadOutlined className="text-indigo-500" />}
                      className="!rounded-lg !border-indigo-300 !text-indigo-600 hover:!border-indigo-400"
                    >
                      Upload New Image
                    </Button>
                  </Upload>
                  {image && (
                    <Text className="!block !mt-2 !text-indigo-400">
                      Selected file: {image?.name}
                    </Text>
                  )}
                </Form.Item>
              </Col>
            </Row>

            <Divider className="!border-indigo-100" />

            <div className="flex gap-4 justify-end">
              <Button
                onClick={() => navigate("/tenant/profile")}
                className="!rounded-lg !px-6 !h-10 !border-indigo-200 !text-indigo-600 hover:!border-indigo-300"
              >
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="!rounded-lg !px-6 !h-10 !bg-indigo-600 hover:!bg-indigo-700 !border-none"
              >
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </Form>
        </Spin>
      </Card>
    </div>
  );
};

export default UpdateTenantDetail;
