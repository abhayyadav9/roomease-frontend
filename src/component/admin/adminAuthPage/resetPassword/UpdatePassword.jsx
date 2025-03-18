import React, { useState } from "react";
import { Input, Button, Typography, message, Spin } from "antd";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import BASEURL from "../../../../utils/BaseUrl";
import { motion } from "framer-motion";

const { Title, Text } = Typography;

const UpdatePassword = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { resetToken } = useParams();
  const navigate = useNavigate();

  // Handle Password Input Change
  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  // Submit New Password
  const handleSubmitPassword = async () => {
    if (password.length < 6) {
      return message.error("Password must be at least 6 characters long.");
    }

    setLoading(true);
    try {
      const response = await axios.post(`${BASEURL}/api/v1/update-password/${resetToken}`, {
        password,
      });

      message.success(response.data.message || "Password updated successfully!");

      // Redirect to login after successful password update
      setTimeout(() => {
        navigate("/admin/login");
      }, 1500);
    } catch (error) {
      message.error(error.response?.data?.message || "Password update failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 px-4"
    >
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-6">
        {/* Title & Instructions */}
        <div className="text-center">
          <Title level={3} className="!text-2xl !font-bold !text-gray-800">
            Update Password
          </Title>
          <Text type="secondary" className="!text-gray-600 !mt-2">
            Enter your new password.
          </Text>
        </div>

        {/* Password Input */}
        <Input.Password
          value={password}
          onChange={handleChange}
          placeholder="New Password"
          className="!w-full !h-12 !text-lg !font-semibold !rounded-lg !border-2 !border-purple-200
                     focus:ring-2 !focus:ring-purple-100 hover:border-purple-300 transition-all duration-200"
          disabled={loading}
        />

        {/* Submit Button */}
        <Button
          type="primary"
          size="large"
          block
          onClick={handleSubmitPassword}
          disabled={loading}
          className="!h-12 !rounded-xl !bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 
                    !border-none !text-white !font-semibold !shadow-lg hover:!shadow-xl"
        >
          {loading ? <Spin className="!text-white" /> : "Update Password"}
        </Button>
      </div>
    </motion.div>
  );
};

export default UpdatePassword;
