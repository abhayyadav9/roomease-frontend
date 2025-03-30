import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Typography,
  message,
  Divider,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  LockOutlined,
  GoogleOutlined,
  FacebookOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BASEURL from "../../utils/BaseUrl";
import { motion } from "framer-motion";
import "./Auth.css";
import { Option } from "antd/es/mentions";
import { useSelector } from "react-redux";

const { Title, Text } = Typography;

const Register = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.auth?.user);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(`${BASEURL}/api/v1/register`, values, {
        headers: { "Content-Type": "application/json" },
      });

      message.success(response.data.message);
      form.resetFields();
      navigate("/acc-verify");
    } catch (error) {
      message.error(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md mx-4 p-8"
      >
        <div className="text-center mb-2">
          <img src="loh.jp1g" alt="Company Logo" className="h-16 mx-auto " />
          <Title level={2} className="!mb-2 dark:text-white">
            Join Room<span className="text-[#F83002]">Ease</span>
          </Title>
          <Text type="secondary" className="dark:text-gray-300">
            Create your account to manage properties or find your perfect home
          </Text>
        </div>

        <Form form={form} layout="vertical" onFinish={onFinish}>
          <div className="grid ">
            <Form.Item
              label="Full Name"
              name="name"
              rules={[
                { required: true, message: "Please enter your full name" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="text-gray-400" />}
                placeholder="user name"
                size="large"
                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please enter your email address" },
                { type: "email", message: "Invalid email format" },
              ]}
            >
              <Input
                prefix={<MailOutlined className="text-gray-400" />}
                placeholder="name@email.com"
                size="large"
                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item
              label="Phone Number"
              name="phone"
              rules={[
                { required: true, message: "Please enter your phone number" },
                { pattern: /^[0-9]{10,15}$/, message: "Invalid phone number" },
              ]}
            >
              <Input
                prefix={<PhoneOutlined className="text-gray-400" />}
                placeholder="+97 9811111111"
                size="large"
                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item
              label="Account Type"
              name="role"
              rules={[{ required: true, message: "Please select your role" }]}
            >
              <Select
                size="large"
                placeholder="Select account type"
                className="w-full rounded-lg"
              >
                <Option value="owner">Property Owner</Option>
                <Option value="tenant">Tenant</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please enter your password" },
                { min: 8, message: "Password must be at least 8 characters" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="••••••••"
                size="large"
                className="rounded-lg"
              />
            </Form.Item>
          </div>

          <Form.Item className="mt-6">
            <Button
              type="warning"
              htmlType="submit"
              size="large"
              loading={loading}
              className="w-full text-white rounded-lg bg-[#9933ff] hover:bg-[#b366ff] transition-all shadow-lg hover:shadow-blue-200"
            >
              Create Account
            </Button>
          </Form.Item>

          <div className="flex justify-center items-center mb-6">
            <Text className="text-gray-500 dark:text-gray-300 text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
              >
                Sign in here
              </Link>
            </Text>
          </div>

          <Divider className="text-gray-400 before:bg-gray-200 after:bg-gray-200 dark:before:bg-gray-600 dark:after:bg-gray-600">
            or sign up with
          </Divider>

          <div className="flex justify-center gap-4 mt-6">
            <Button
              shape="circle"
              icon={<GoogleOutlined />}
              className="hover:bg-gray-100 dark:hover:bg-gray-700"
            />
            <Button
              shape="circle"
              icon={<FacebookOutlined />}
              className="hover:bg-gray-100 dark:hover:bg-gray-700"
            />
            <Button
              shape="circle"
              icon={<GithubOutlined />}
              className="hover:bg-gray-100 dark:hover:bg-gray-700"
            />
          </div>

          <Text className="block mt-8 text-center text-gray-500 dark:text-gray-400 text-xs">
            By registering, you agree to our{" "}
            <Link to="/terms" className="hover:text-blue-600">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="hover:text-blue-600">
              Privacy Policy
            </Link>
          </Text>
        </Form>
      </motion.div>
    </div>
  );
};

export default Register;
