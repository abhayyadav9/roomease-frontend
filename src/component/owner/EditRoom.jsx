import React, { useState } from "react";
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

const { Option } = Select;
const { Title, Text } = Typography;

const EditRoom = () => {
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

      await axios.put(
        `http://localhost:3000/api/v2a/edit/room/${selectedRoom._id}`,
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
    <div className="max-w-2xl mt-20 mx-auto bg-white p-6 rounded-lg shadow-md">
      <Spin spinning={loading}>
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <Title level={3} className="text-blue-600">
            ✏️ Edit Room - {selectedRoom.houseName}
          </Title>
          <Button
            type="text"
            icon={<CloseOutlined />}
            className="text-gray-500 hover:text-red-500"
            onClick={() => navigate("/owner-profile")}
          />
        </div>

        <Divider />

        {/* Form */}
        <Form
          layout="vertical"
          onFinish={onFinish}
          initialValues={selectedRoom}
        >
          {/* House Name */}
          <Form.Item
            label={<Text strong>🏠 House Name</Text>}
            name="houseName"
            rules={[{ required: true, message: "Please enter the house name" }]}
          >
            <Input placeholder="Enter house name" />
          </Form.Item>

          {/* Location (Disabled) */}

          <Form.Item
            label={<Text strong>🏠 House Location</Text>}
            name="address"
            value={selectedRoom.address}
            rules={[
              { required: true, message: "Please enter the house address" },
            ]}
          >
            <Input placeholder="Enter Address" />
          </Form.Item>

          {/* Room Type */}
          <Form.Item
            label={<Text strong>🛏️ Room Type</Text>}
            name="roomType"
            rules={[{ required: true, message: "Please select the room type" }]}
          >
            <Select placeholder="Select room type">
              <Option value="flat">Flat</Option>
              <Option value="room">Room</Option>
            </Select>
          </Form.Item>

          {/* Number of Rooms */}
          <Form.Item
            label={<Text strong>🏢 Number of Rooms</Text>}
            name="numberRoom"
            rules={[
              { required: true, message: "Please enter the number of rooms" },
            ]}
          >
            <InputNumber min={1} className="w-full" />
          </Form.Item>

          {/* Price */}
          <Form.Item
            label={<Text strong>💰 Price</Text>}
            name="price"
            rules={[{ required: true, message: "Please enter the price" }]}
          >
            <InputNumber min={0} className="w-full" />
          </Form.Item>

          {/* Status */}
          <Form.Item
            label={<Text strong>🔘 Status</Text>}
            name="status"
            rules={[{ required: true, message: "Please select the status" }]}
          >
            <Select placeholder="Select status">
              <Option value="active">Active</Option>
              <Option value="inactive">Inactive</Option>
            </Select>
          </Form.Item>

          {/* Room Images */}
          <Form.Item label={<Text strong>🖼️ Room Images</Text>}>
            <div className="grid grid-cols-3 gap-3 mb-3">
              {/* Show existing images */}
              {existingImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Room Image ${index + 1}`}
                  className="w-24 h-24 object-cover rounded-md border"
                />
              ))}
            </div>
            <Upload
              listType="picture-card"
              beforeUpload={() => false}
              onChange={handleImageUpload}
              multiple
            >
              <Button icon={<UploadOutlined />}>Upload New Images</Button>
            </Upload>
          </Form.Item>

          {/* Description */}
          <Form.Item
            label={<Text strong>📝 Description</Text>}
            name="description"
          >
            <Input.TextArea rows={4} placeholder="Enter description" />
          </Form.Item>

          {/* Buttons */}
          <div className="flex gap-3 mt-4">
            <Button type="primary" htmlType="submit" loading={loading} block>
              {loading ? "Updating..." : "Update Room"}
            </Button>
            <Button
              onClick={() => navigate("/owner-profile")}
              className="bg-gray-500 text-white hover:bg-gray-600 w-full"
            >
              Cancel
            </Button>
          </div>
        </Form>
      </Spin>
    </div>
  );
};

export default EditRoom;
