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
  MailOutlined,
  LockOutlined,
  UserOutlined,
  GoogleOutlined,
  FacebookOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../redux/slice/authSlice";
import BASEURL from "../../../utils/BaseUrl";
import { motion } from "framer-motion";
import { Option } from "antd/es/mentions";

const { Title, Text } = Typography;

const AdminLogin = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.auth?.user);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${BASEURL}/api/v1/login`,
        {
          email: values.email,
          password: values.password,
          role: values.role,
        },
        { withCredentials: true }
      );

      message.success(`Welcome back, ${response.data.user.name}!`);
      dispatch(setUser(response.data?.user));

      navigate("/admin/dashboard");
    } catch (error) {
      message.error(
        error.response?.data?.message ||
          "Invalid credentials. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md mx-4 p-8"
      >
        <div className="text-center mb-8">
          <img
            src="/logo.png"
            alt="Company Logo"
            className="h-16 mx-auto mb-4"
          />
          <Title level={2} className="!mb-2 dark:text-white">
            Welcome Admin
          </Title>
          <Text type="secondary" className="dark:text-gray-300">
            Streamlining property rentals with smart solutions
          </Text>
        </div>

        <Form form={form} layout="vertical" onFinish={onFinish}>
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
              placeholder="name@company.com"
              size="large"
              className="rounded-lg hover:border-blue-400 focus:border-blue-500"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="••••••••"
              size="large"
              className="rounded-lg hover:border-blue-400"
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
              suffixIcon={<UserOutlined className="text-gray-400" />}
            >
              <Option value="admin">Administrator</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={loading}
              className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200"
            >
              Sign In
            </Button>
          </Form.Item>

          <div className="flex justify-between items-center mb-6">
            <Link
              to="/admin/send-verification"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm"
            >
              Forgot password?
            </Link>
            <Text className="text-gray-500 dark:text-gray-300 text-sm">
              New user?{" "}
              <Link
                to="/admin/register"
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
              >
                Create account
              </Link>
            </Text>
          </div>

          <Divider className="text-gray-400 before:bg-gray-200 after:bg-gray-200 dark:before:bg-gray-600 dark:after:bg-gray-600">
            or continue with
          </Divider>

          <div className="flex justify-center gap-4 mt-6">
            {/* Social login buttons */}
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
        </Form>

        <Text className="block mt-8 text-center text-gray-500 dark:text-gray-400 text-xs">
          By signing in, you agree to our{" "}
          <Link to="/terms" className="hover:text-blue-600">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link to="/privacy" className="hover:text-blue-600">
            Privacy Policy
          </Link>
        </Text>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
