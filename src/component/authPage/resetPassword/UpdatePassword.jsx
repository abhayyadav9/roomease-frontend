import React, { useState } from "react";
import { Input, Button, Typography, message, Spin } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";

const { Title, Text } = Typography;

const UpdatePassword = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { resetToken } = useParams();

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
      const response = await axios.post(`http://localhost:3000/api/v1/update-password/${resetToken}`, {
        password,
      });

      message.success(response.data.message || "Password updated successfully!");

      // Redirect to login after successful password update
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (error) {
      message.error(error.response?.data?.message || "Password update failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 md:p-10 rounded-lg shadow-lg w-full max-w-md">
        {/* Title & Instructions */}
        <Title level={3} className="text-center text-gray-800">
          Update Password
        </Title>
        <Text className="block text-center text-gray-600 mb-4">
          Enter your new password.
        </Text>

        {/* Password Input */}
        <Input.Password
          value={password}
          onChange={handleChange}
          placeholder="New Password"
        />

        {/* Submit Button */}
        <Button
          type="primary"
          block
          className="mt-4"
          onClick={handleSubmitPassword}
          disabled={loading}
        >
          {loading ? <Spin /> : "Update Password"}
        </Button>
      </div>
    </div>
  );
};

export default UpdatePassword;