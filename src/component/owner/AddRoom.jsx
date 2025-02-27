import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Form, Input, Button, Upload, message, Select, InputNumber } from "antd";
import { UploadOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import axios from "axios";
import BASEURL from "../../utils/BaseUrl";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const AddRoom = () => {
  // ... keep existing state and logic the same ...
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const owner = useSelector((state) => state.owner?.data?.data); // Get logged-in owner
  const user = useSelector((state) => state.auth?.user);
  const navigate= useNavigate();

  useEffect(() => {
    if (user?.role != "owner") {
      navigate("/login");
    }
  }, [user, navigate]);
  

  const handleImageUpload = ({ fileList }) => {
    setImages(fileList);
  };

  const onFinish = async (values) => {
    if (!owner?._id) {
      message.error("Owner not found. Please log in again.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      images.forEach((image) => {
        formData.append("roomImages", image.originFileObj); // Ensure the field name matches the backend
      });

      formData.append("houseName", values.houseName);
      formData.append("roomType", values.roomType);
      formData.append("numberRoom", values.numberRoom);
      formData.append("contactNumber", values.contactNumber);
      formData.append("address", values.address);
      formData.append("price", values.price);
      formData.append("description", values.description);

      const response = await axios.post(
        `${BASEURL}/api/v2a/add/room/${user.id}`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      message.success("Room added successfully!");
      navigate("/owner-profile")
      setImages([]);
    } catch (error) {
      console.error("Error adding room:", error);
      message.error(error.response?.data?.message || "Failed to add room");
    } finally {
      setLoading(false);
    }
  };


  
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden mt-20"
      >
        {/* Gradient Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 flex justify-between items-center">
          <h2 className="text-3xl font-bold text-white">🏡 Add New Property</h2>
          <Button
            type="text"
            icon={<ArrowLeftOutlined className="text-white" />}
            className="!text-white hover:!bg-white/10"
            onClick={() => navigate("/owner-profile")}
          />
        </div>
  
        {/* Form Content */}
        <div className="p-8">
          <Form
            layout="vertical"
            onFinish={onFinish}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Property Name */}
              <Form.Item
                label={<span className="text-gray-700 font-semibold">🏠 Property Name</span>}
                name="houseName"
                rules={[{ required: true }]}
              >
                <Input
                  placeholder="Luxury Villa"
                  className="rounded-lg py-2 hover:border-blue-500 focus:border-blue-500"
                />
              </Form.Item>
  
              {/* Property Type */}
              <Form.Item
                label={<span className="text-gray-700 font-semibold">🛌 Property Type</span>}
                name="roomType"
                rules={[{ required: true }]}
              >
                <Select
                  placeholder="Select type"
                  className="rounded-lg"
                  dropdownClassName="rounded-lg"
                >
                  <Option value="flat">🏢 Apartment</Option>
                  <Option value="room">🏠 Independent House</Option>
                </Select>
              </Form.Item>
  
              {/* Rooms Available */}
              <Form.Item
                label={<span className="text-gray-700 font-semibold">🚪 Rooms Available</span>}
                name="numberRoom"
                rules={[{ required: true }]}
              >
                <InputNumber
                  min={1}
                  className="w-full rounded-lg"
                  controls={false}
                  placeholder="3"
                />
              </Form.Item>
  
              {/* Contact Number */}
              <Form.Item
                label={<span className="text-gray-700 font-semibold">📱 Contact Number</span>}
                name="contactNumber"
                rules={[{ required: true }]}
              >
                <Input
                  placeholder="+91 9876543210"
                  className="rounded-lg py-2"
                />
              </Form.Item>
  
              {/* Location */}
              <Form.Item
                label={<span className="text-gray-700 font-semibold">📍 Location</span>}
                name="address"
                rules={[{ required: true }]}
              >
                <Input
                  placeholder="Enter full address"
                  className="rounded-lg py-2"
                />
              </Form.Item>
  
              {/* Monthly Price */}
              <Form.Item
                label={<span className="text-gray-700 font-semibold">💰 Monthly Price</span>}
                name="price"
                rules={[{ required: true }]}
              >
                <InputNumber
                  min={0}
                  className="w-full rounded-lg"
                  formatter={(value) => `₹ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={(value) => value.replace(/₹\s?|(,*)/g, '')}
                  placeholder="25000"
                />
              </Form.Item>
  
              {/* Image Upload */}
              <Form.Item 
                label={<span className="text-gray-700 font-semibold">📸 Property Images</span>}
                className="col-span-2"
              >
                <Upload
                  listType="picture-card"
                  beforeUpload={() => false}
                  onChange={handleImageUpload}
                  multiple
                  className="w-full"
                >
                  <div className="flex flex-col items-center justify-center h-32 border-2 border-dashed rounded-xl hover:border-blue-500 transition-colors">
                    <UploadOutlined className="text-2xl text-gray-500 mb-2" />
                    <span className="text-gray-600">Click to upload</span>
                    <span className="text-sm text-gray-500">(JPEG, PNG)</span>
                  </div>
                </Upload>
              </Form.Item>
  
              {/* Description */}
              <Form.Item
                label={<span className="text-gray-700 font-semibold">📝 Property Description</span>}
                name="description"
                className="col-span-2"
              >
                <Input.TextArea
                  rows={4}
                  placeholder="Describe your property's best features..."
                  className="rounded-lg"
                />
              </Form.Item>
            </div>
  
            {/* Form Actions */}
            <div className="flex gap-4 mt-8">
              <Button
                onClick={() => navigate("/owner-profile")}
                className="h-12 px-8 rounded-lg bg-red-500 hover:bg-red-600 !text-white !border-0"
              >
                Cancel
              </Button>
              <Button
                htmlType="submit"
                loading={loading}
                className="h-12 px-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600  !border-0"
              >
                {loading ? "Creating..." : "Create Listing"}
              </Button>
            </div>
          </Form>
        </div>
      </motion.div>
    );
  };
  
  export default AddRoom;