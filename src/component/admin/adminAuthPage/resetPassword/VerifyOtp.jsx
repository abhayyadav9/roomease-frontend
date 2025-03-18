import React, { useState, useRef, useEffect } from "react";
import { Flex, Input, Button, Typography, message, Spin } from "antd";
import axios from "axios";
import BASEURL from "../../../../utils/BaseUrl";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const { Title, Text } = Typography;

const VerifyOtp = () => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [timer, setTimer] = useState(60);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  
  // Retrieve email from localStorage
  const email = localStorage.getItem('userEmail');

  // Security: Ensure OTP has been sent before accessing this page
  useEffect(() => {
    if (!localStorage.getItem('otpSent')) {
      message.error("OTP not sent. Please request an OTP first.");
      navigate("/login");  // Redirect to login or wherever appropriate
    }

    inputRefs.current[0]?.focus();
    startResendTimer();
  }, []);

  const startResendTimer = () => {
    setResendDisabled(true);
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setResendDisabled(false);
          return 60;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleChange = (index, value) => {
    if (!/^\d$/.test(value) && value !== "") return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmitOtp = async () => {
    const otpValue = otp.join("");
    if (!/^\d{6}$/.test(otpValue)) {
      return message.error("Please enter a valid 6-digit code");
    }

    setLoading(true);
    try {
      const response = await axios.post(`${BASEURL}/api/v1/verify-otp`, {
        resetToken: otpValue, // ✅ Matches backend request body
      });

      message.success(response.data.message || "Verification successful!");
      localStorage.removeItem('otpSent'); // Reset flag after successful verification
      setTimeout(() => navigate("/admin/update-password"), 1500);
    } catch (error) {
      const errMsg = error.response?.data?.message || "Verification failed";
      message.error(`${errMsg} (Attempts remaining: ${error.response?.data?.remainingAttempts || 'unknown'})`);
      setOtp(Array(6).fill(""));
      inputRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setResendDisabled(true);
    try {
      await axios.post(`${BASEURL}/api/v1/reset-password`, {
        email,
      });
      message.success("New OTP sent successfully");
      startResendTimer();
    } catch (error) {
      message.error(error.response?.data?.message || "Resend failed. Try again later.");
      setResendDisabled(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 px-4"
    >
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-6">
        <div className="text-center">
          <Title level={3} className="!text-2xl !font-bold !text-gray-800">
            Secure Verification
          </Title>
          <Text type="secondary" className="!text-gray-600 !mt-2">
            Enter the 6-digit security code sent to your email
          </Text>
        </div>

        <Flex justify="center" gap={10} className="mb-6">
          {otp.map((digit, index) => (
            <Input
              key={index}
              value={digit}
              ref={(el) => (inputRefs.current[index] = el)}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              maxLength={1}
              autoComplete="one-time-code"
              className="w-12 h-12 text-xl font-bold text-center border-2 border-purple-200 rounded-lg 
                        focus:border-purple-500 focus:ring-2 focus:ring-purple-100 hover:border-purple-300
                        transition-all duration-200"
              disabled={loading}
            />
          ))}
        </Flex>

        <Button
          type="primary"
          size="large"
          block
          onClick={handleSubmitOtp}
          disabled={loading || otp.join("").length !== 6}
          className="!h-12 !rounded-xl !bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 
                    !border-none !text-white !font-semibold !shadow-lg hover:!shadow-xl"
        >
          {loading ? <Spin className="!text-white" /> : "Verify Identity"}
        </Button>

        <div className="text-center">
          <Button
            type="link"
            onClick={handleResendOtp}
            disabled={resendDisabled}
            className="!text-gray-600 hover:!text-purple-600 !font-medium"
          >
            {resendDisabled ? `Resend code in ${timer}s` : "Resend verification code"}
          </Button>
        </div>

        <Text type="secondary" className="!block !text-center !text-sm !mt-4">
          For security reasons, this code will expire in 10 minutes
        </Text>
      </div>
    </motion.div>
  );
};

export default VerifyOtp;
