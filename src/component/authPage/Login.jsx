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

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate()

  const onFinish = async (values) => {
    console.log("Form values:", values);
    try {
      const response = await axios.post("http://localhost:3000/api/v1//login", {
        email: values.email,
        password: values.password,
        role: values.role,
      });
      message.success(response.data.message);
      navigate("/");

    } catch (error) {
      console.error("Error logging in:", error.response.data.message);
      message.error("Unable to login")
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 md:p-10 lg:p-12 rounded-lg shadow-xl w-full max-w-md">
        {/* Title */}
        <Title level={2} className="text-center text-gray-800 mb-6">
          Welcome Back
        </Title>

        <Form form={form} layout="vertical" onFinish={onFinish}>
          {/* Name Field */}

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

          {/* Forgot Password */}
          <div className="flex justify-between mb-4">
            <Link
              to="/send-verification"
              className="text-blue-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Login
            </Button>
          </Form.Item>

          {/* Already have an account? */}
          <div className="text-center">
            <Text className="text-gray-600">
              Already have an account?{" "}
              <Link to="/register" className="text-blue-600 hover:underline">
                Register
              </Link>
            </Text>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
