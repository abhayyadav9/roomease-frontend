import { Form, Input, Button, Typography, message } from "antd";
import { MailOutlined } from "@ant-design/icons";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const SendVerification = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Dynamically set the API base URL based on the environment
    
      const response = await axios.post(`http://localhost:3000/api/v1/reset-password`, {
        email: values.email,
      });

      message.success(response.data.message); // Success message
      navigate("/verify-otp") 
    } catch (error) {
      // Detailed error handling
      const errorMessage = error.response?.data?.message || "Unable to process your request.";
      message.error(errorMessage);
    } finally {
      setLoading(false); // End loading state
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 md:p-10 lg:p-12 rounded-lg shadow-xl w-full max-w-md">
        <Title level={2} className="text-center text-gray-800 mb-6">
          Reset Your Password
        </Title>

        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Enter a valid email!" },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Enter your email"
              aria-label="Email address"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full"
              loading={loading}
            >
              Find Your Account
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SendVerification;
