import React, { useEffect, useState } from "react";
import { Flex, Input, Button, Typography, message, Spin } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BASEURL from "../../../utils/BaseUrl";
import { useSelector } from "react-redux";

const { Title, Text } = Typography;

const AccVerify = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
const navigate= useNavigate()

const user = useSelector((state) => state.auth?.user);

useEffect(() => {
  if (user) {
    navigate("/");
  }
}, [user, navigate]);

  // Handle OTP Input Change
  const handleChange = (value) => {
    setOtp(value);
  };

  // Submit OTP for Verification
  const handleSubmitOtp = async () => {
    if (otp.length !== 6) {
      return message.error("Please enter a valid 6-digit OTP.");
    }

    setLoading(true);
    try {
      const response = await axios.post(`${BASEURL}/api/v1/verify-email`, {
        code: otp, // ✅ Matches backend request body
      });

      message.success(response.data.message || "Email verified successfully!");

      // Redirect to login after successful verification
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (error) {
      message.error(error.response?.data?.message || "Verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP Function
  const handleResendOtp = async () => {
    setResendDisabled(true);
    try {
      await axios.post(`${BASEURL}/api/v1/resend-verification-email`); // Adjust API as needed
      message.success("New verification code sent to your email.");
    } catch (error) {
      navigate("/send-verification")
      message.error("Failed to resend OTP. Try again later.");
    } finally {
      setTimeout(() => setResendDisabled(false), 60 * 1000); // Enable button after 60 sec
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 md:p-10 rounded-lg shadow-lg w-full max-w-md">
        {/* Title & Instructions */}
        <Title level={3} className="text-center text-gray-800">
          Email Verification
        </Title>
        <Text className="block text-center text-gray-600 mb-4">
          Enter the 6-digit OTP sent to your email.
        </Text>

        {/* OTP Input */}
        <Flex gap="middle" align="center" vertical>
          <Input.OTP length={6} value={otp} onChange={handleChange} />
        </Flex>

        {/* Submit Button */}
        <Button
          type="primary"
          block
          className="mt-4"
          onClick={handleSubmitOtp}
          disabled={loading}
        >
          {loading ? <Spin /> : "Verify Account"}
        </Button>

        {/* Resend OTP */}
        <Button
          type="link"
          className="w-full mt-2"
          onClick={handleResendOtp}
          disabled={resendDisabled}
        >
          {resendDisabled ? "Resend OTP in 60s" : "Resend OTP"}
        </Button>
      </div>
    </div>
  );
};

export default AccVerify;
