import { Form, Input, Button, Typography, message, Space } from "antd";
import { MailOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BASEURL from "../../../../utils/BaseUrl";
import { motion } from "framer-motion";

const { Title, Text } = Typography;

const SendVerification = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Store email in localStorage for later use
      localStorage.setItem('userEmail', values.email);

      const response = await axios.post(`${BASEURL}/api/v1/reset-password`, {
        email: values.email,
      });
      localStorage.setItem('otpSent', 'true'); // Set flag after OTP is successfully sent


      message.success({
        content: response.data.message,
        style: { marginTop: '60px' },
      });
      navigate("/admin/verify-otp");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Unable to process your request.";
      message.error({
        content: errorMessage,
        style: { marginTop: '60px' },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center px-4"
    >
      <div className="max-w-md w-full">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-2xl shadow-lg p-8 sm:p-10 lg:p-12"
        >
          <div className="mb-8 text-center">
            <img
              alt="Password reset"
              className="w-48 mx-auto mb-6"
            />
            <Title level={2} className="!text-2xl !lg:text-3xl !font-bold !text-gray-800">
              Reset Your Password
            </Title>
            <Text type="secondary" className="!mt-2 !block !text-gray-600">
              Enter your email to receive a verification code
            </Text>
          </div>

          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            className="space-y-6"
          >
            <Form.Item
              label="Email address"
              name="email"
              rules={[{ required: true, message: "Please enter your email" }, { type: "email", message: "Invalid email address" }]}
              className="!mb-6"
            >
              <Input
                prefix={<MailOutlined className="text-gray-400" />}
                placeholder="john.doe@example.com"
                size="large"
                className="!rounded-lg !py-2 hover:!border-blue-300 focus:!border-blue-500"
              />
            </Form.Item>

            <Form.Item className="!mb-0">
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={loading}
                className="w-full !rounded-lg !h-12 !text-base !font-semibold 
                         !bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 
                         !border-none !shadow-lg hover:!shadow-xl transition-all duration-300"
              >
                Continue
              </Button>
            </Form.Item>

            <div className="text-center mt-6">
              <Button
                type="link"
                onClick={() => navigate("/admin/login")}
                className="!text-gray-600 hover:!text-blue-600 !font-medium"
              >
                <Space>
                  <ArrowLeftOutlined />
                  Back to Login
                </Space>
              </Button>
            </div>
          </Form>
        </motion.div>

        <div className="mt-8 text-center">
          <Text type="secondary" className="!text-sm">
            Need help?{' '}
            <a href="/contact-support" className="!text-blue-600 hover:!underline">
              Contact Support
            </a>
          </Text>
        </div>
      </div>
    </motion.div>
  );
};

export default SendVerification;
