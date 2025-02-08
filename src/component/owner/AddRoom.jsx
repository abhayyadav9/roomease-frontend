import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Form, Input, Button, Upload, message, Select, InputNumber } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

const { Option } = Select;

const AddRoom = () => {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const owner = useSelector((state) => state.owner.data?.data); // Get logged-in owner
  const user = useSelector((state) => state.auth.user);

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
        `https://roomease-backend-edd9.onrender.com/api/v2a/add/room/${user.id}`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      message.success("Room added successfully!");
      setImages([]);
    } catch (error) {
      console.error("Error adding room:", error);
      message.error(error.response?.data?.message || "Failed to add room");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">🏡 Add a Room</h2>
      <Form layout="vertical" onFinish={onFinish}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Form.Item
            label="House Name"
            name="houseName"
            rules={[{ required: true, message: "Please enter house name" }]}
          >
            <Input placeholder="Enter house name" />
          </Form.Item>

          <Form.Item
            label="Room Type"
            name="roomType"
            rules={[{ required: true, message: "Please select room type" }]}
          >
            <Select placeholder="Select room type">
              <Option value="flat">Flat</Option>
              <Option value="room">Room</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Number of Rooms"
            name="numberRoom"
            rules={[{ required: true, message: "Please enter number of rooms" }]}
          >
            <InputNumber min={1} className="w-full" />
          </Form.Item>

          <Form.Item
            label="Contact Number"
            name="contactNumber"
            rules={[{ required: true, message: "Please enter contact number" }]}
          >
            <Input placeholder="Enter contact number" />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please enter address" }]}
          >
            <Input placeholder="Enter address" />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please enter price" }]}
          >
            <InputNumber min={0} className="w-full" />
          </Form.Item>

          <Form.Item label="Room Images" className="col-span-2">
            <Upload
              listType="picture-card"
              beforeUpload={() => false} // Prevent automatic upload
              onChange={handleImageUpload}
              multiple // Allow multiple file uploads
            >
              <Button icon={<UploadOutlined />}>Upload Images</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: false }]}
            className="col-span-2"
          >
            <Input.TextArea rows={4} placeholder="Enter room description" />
          </Form.Item>
        </div>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            {loading ? "Adding..." : "Add Room"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddRoom;