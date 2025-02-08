import React, { useState } from "react";
import { Form, Input, Button, message, Select, InputNumber, Divider, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const { Option } = Select;

const AddRequirement = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const tenant = useSelector((state) => state.tenant?.data?.data);
  const navigate = useNavigate();

  if (!tenant) {
    return <p className="text-center text-red-500">No Tenant selected.</p>;
  }

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const { location, category, description, requirement, priceRange, numberOfPerson, additionalNumber } = values;
      const apiUrl = ` https://roomease-backend-edd9.onrender.com/api/v3a/tenant-add/requirement/${tenant._id}`;
      const res = await axios.post(apiUrl, {
        location,
        category,
        description,
        requirement,
        priceRange,
        numberOfPerson,
        additionalNumber,
      },{
        withCredentials:true
      });

      message.success("Requirement added successfully!");
      form.resetFields();
      navigate("/tenant-profile");
    } catch (error) {
      console.error("Error adding requirement:", error);
      message.error(error.response?.data?.message || "Failed to add requirement");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto mt-16 px-4 lg:px-8">
      <Spin spinning={loading}>
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-xl">
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Add New Requirement</h2>
          <Divider />
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
              requirement: "room",
              category: "normal",
            }}
          >
            <Form.Item
              label="Location"
              name="location"
              rules={[{ required: true, message: "Location is required!" }]}
            >
              <Input placeholder="Enter the location of the property" />
            </Form.Item>

            <Form.Item
              label="Requirement Type"
              name="requirement"
              rules={[{ required: true, message: "Please select the requirement type" }]}
            >
              <Select placeholder="Select type">
                <Option value="room">Room</Option>
                <Option value="flat">Flat</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Category"
              name="category"
              rules={[{ required: true, message: "Please select the category" }]}
            >
              <Select placeholder="Select category">
                <Option value="normal">Normal</Option>
                <Option value="well_furnished">Well Furnished</Option>
                <Option value="vip">VIP</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Price Range"
              name="priceRange"
              rules={[{ required: true, message: "Please enter the price range" }]}
            >
              <InputNumber
                style={{ width: "100%" }}
                placeholder="Enter your budget"
                min={1}
                prefix="₹"
              />
            </Form.Item>

            <Form.Item
              label="Number of People"
              name="numberOfPerson"
              rules={[{ required: true, message: "Please enter the number of people" }]}
            >
              <InputNumber
                style={{ width: "100%" }}
                placeholder="How many people"
                min={1}
              />
            </Form.Item>

            <Form.Item
              label="Additional Number"
              name="additionalNumber"
            >
              <InputNumber
                style={{ width: "100%" }}
                placeholder="Additional number of rooms"
                min={0}
              />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: "Please provide a description" }]}
            >
              <Input.TextArea
                rows={4}
                placeholder="Provide additional details about your requirement"
              />
            </Form.Item>

            <Form.Item className="flex justify-between gap-4">
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="w-full lg:w-auto"
              >
                Add Requirement
              </Button>
              <Button
                type="default"
                onClick={() => navigate("/tenant-profile")}
                className="w-full lg:w-auto mt-2 lg:mt-0"
              >
                Cancel
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Spin>
    </div>
  );
};

export default AddRequirement;
