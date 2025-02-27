import React, { useState } from "react";
  import { motion } from "framer-motion";
  import {
    Form,
    Input,
    Button,
    Upload,
    message,
    Select,
    InputNumber,
    Spin,
    Typography,
    Divider,
  } from "antd";
  import { UploadOutlined, CloseOutlined } from "@ant-design/icons";
  import axios from "axios";
  import { useSelector } from "react-redux";
  import { useNavigate } from "react-router-dom";
  import BASEURL from "../../utils/BaseUrl";
  
  const { Option } = Select;
  const { Title, Text } = Typography;
  
  const EditRoom = () => {
    // ... keep existing state and logic the same ...
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const selectedRoom = useSelector((state) => state.room.selectedRoom);
  const navigate = useNavigate();

  // ✅ Ensure selectedRoom exists before rendering
  if (!selectedRoom) {
    return <p className="text-center text-red-500">No room selected.</p>;
  }

  // ✅ Show existing images and allow uploads
  const existingImages = selectedRoom.roomImages || [];

  const handleImageUpload = ({ fileList }) => {
    setImages(fileList);
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const formData = new FormData();

      // ✅ Append only new images, keeping existing ones
      images.forEach((image) => {
        formData.append("roomImages", image.originFileObj);
      });

      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value);
      });

      await axios.put(`${BASEURL}/api/v2a/edit/room/${selectedRoom?._id}`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      message.success("Room updated successfully!");
      navigate("/owner-profile");
    } catch (error) {
      console.error("Error updating room:", error);
      message.error(error.response?.data?.message || "Failed to update room");
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
        <Spin spinning={loading}>
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 flex justify-between items-center">
            <Title level={3} className="!text-white !m-0">
              ✏️ Edit Property - {selectedRoom?.houseName}
            </Title>
            <Button
              type="text"
              icon={<CloseOutlined className="text-white" />}
              className="!text-white hover:!bg-white/10"
              onClick={() => navigate("/owner-profile")}
            />
          </div>
  
          {/* Form Content */}
          <div className="p-8">
            <Form
              layout="vertical"
              onFinish={onFinish}
              initialValues={selectedRoom}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* House Name */}
                <Form.Item
                  label={<Text strong className="text-gray-700">🏠 Property Name</Text>}
                  name="houseName"
                  rules={[{ required: true }]}
                >
                  <Input
                    placeholder="Luxury Villa"
                    className="rounded-lg py-2"
                  />
                </Form.Item>
  
                {/* Address */}
                <Form.Item
                  label={<Text strong className="text-gray-700">📍 Location</Text>}
                  name="address"
                  rules={[{ required: true }]}
                >
                  <Input
                    placeholder="Enter full address"
                    className="rounded-lg py-2"
                  />
                </Form.Item>
  
                {/* Room Type */}
                <Form.Item
                  label={<Text strong className="text-gray-700">🛌 Property Type</Text>}
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
  
                {/* Number of Rooms */}
                <Form.Item
                  label={<Text strong className="text-gray-700">🚪 Rooms Available</Text>}
                  name="numberRoom"
                  rules={[{ required: true }]}
                >
                  <InputNumber
                    min={1}
                    className="w-full rounded-lg"
                    controls={false}
                  />
                </Form.Item>
  
                {/* Price */}
                <Form.Item
                  label={<Text strong className="text-gray-700">💰 Monthly Price</Text>}
                  name="price"
                  rules={[{ required: true }]}
                >
                  <InputNumber
                    min={0}
                    className="w-full rounded-lg"
                    formatter={(value) => `₹ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={(value) => value.replace(/₹\s?|(,*)/g, '')}
                  />
                </Form.Item>
  
                {/* Status */}
                <Form.Item
                  label={<Text strong className="text-gray-700">📊 Listing Status</Text>}
                  name="status"
                  rules={[{ required: true }]}
                >
                  <Select
                    placeholder="Select status"
                    className="rounded-lg"
                    dropdownClassName="rounded-lg"
                  >
                    <Option value="active">🟢 Active</Option>
                    <Option value="inactive">🔴 Inactive</Option>
                  </Select>
                </Form.Item>
              </div>
  
              {/* Image Upload */}
              <Form.Item label={<Text strong className="text-gray-700">📸 Property Images</Text>}>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-4 mb-4">
                  {existingImages?.map((img, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={img}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-32 object-cover rounded-xl border shadow-sm"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                        <Button
                          type="primary"
                          danger
                          className="!flex items-center"
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Upload
                  listType="picture-card"
                  beforeUpload={() => false}
                  onChange={handleImageUpload}
                  multiple
                  className="w-full"
                >
                  <div className="flex flex-col items-center justify-center h-32 border-2 border-dashed rounded-xl hover:border-blue-500 transition-colors">
                    <UploadOutlined className="text-2xl text-gray-500 mb-2" />
                    <Text className="text-gray-600">Click to upload</Text>
                    <Text type="secondary" className="text-sm">
                      (JPEG, PNG)
                    </Text>
                  </div>
                </Upload>
              </Form.Item>
  
              {/* Description */}
              <Form.Item
                label={<Text strong className="text-gray-700">📝 Property Description</Text>}
                name="description"
              >
                <Input.TextArea
                  rows={4}
                  placeholder="Describe your property's best features..."
                  className="rounded-lg"
                />
              </Form.Item>
  
              {/* Form Actions */}
              <div className="flex gap-4 mt-8">
                <Button
                  onClick={() => navigate("/owner-profile")}
                  className="h-12 px-8 rounded-lg bg-red-500  !border-0"
                >
                  Cancel
                </Button>
                <Button
                  htmlType="submit"
                  loading={loading}
                  className="h-12 px-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600  !border-0"
                >
                  {loading ? "Saving Changes..." : "Update Property"}
                </Button>
              </div>
            </Form>
          </div>
        </Spin>
      </motion.div>
    );
  };
  
  export default EditRoom;