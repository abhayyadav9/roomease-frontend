import React from "react";
import { Form, Input, Button, Select, Typography, message } from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const { Option } = Select;
const { Title, Text } = Typography;

const Register = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/register",
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      message.success(response.data.message);
      form.resetFields();
      navigate("/acc-verify");
    } catch (error) {
      console.error("Error during registration:", error);
      message.error(error.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen mt-9 bg-gray-50">
      <div className="bg-white p-8 md:p-10 lg:p-12 rounded-lg shadow-xl w-full max-w-md">
        {/* Title */}
        <Title level={2} className="text-center text-gray-800 mb-6">
          Register
        </Title>

        <Form form={form} layout="vertical" onFinish={onFinish}>
          {/* Name Field */}
          <Form.Item
            label="Full Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Enter your name" />
          </Form.Item>

          {/* Email Field */}
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Enter a valid email!" },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Enter your email" />
          </Form.Item>

          {/* Phone Field */}
          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[
              { required: true, message: "Please enter your phone number!" },
              {
                pattern: /^[0-9]{10,15}$/,
                message: "Enter a valid phone number!",
              },
            ]}
          >
            <Input prefix={<PhoneOutlined />} placeholder="Enter your phone" />
          </Form.Item>

          {/* Role Field */}
          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: "Please select your role!" }]}
          >
            <Select placeholder="Select your role">
              <Option value="owner">Owner</Option>
              <Option value="tenant">Tenant</Option>
              <Option value="admin">Admin</Option>
            </Select>
          </Form.Item>

          {/* Password Field */}
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter your password"
            />
          </Form.Item>

          {/* Forgot Password */}
          <div className="flex justify-between mb-4">
            <Link to="/forgot-password" className="text-blue-600 hover:underline">
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Register
            </Button>
          </Form.Item>

          {/* Already have an account? */}
          <div className="text-center">
            <Text className="text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                Login
              </Link>
            </Text>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;