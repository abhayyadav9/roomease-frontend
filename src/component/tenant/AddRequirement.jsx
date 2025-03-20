import React, { useState } from "react";
import { 
  Form, 
  Input, 
  Button, 
  message, 
  Select, 
  InputNumber, 
  Divider, 
  Spin, 
  Card, 
  Row, 
  Col,
  Typography 
} from "antd";
import { 
  HomeOutlined, 
  TagOutlined, 
  ApartmentOutlined, 
  DollarOutlined, 
  TeamOutlined, 
  FormOutlined,
  CloseOutlined,
  WhatsAppOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import BASEURL from "../../utils/BaseUrl";

const { Option } = Select;
const { Title } = Typography;

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
      const apiUrl = `${BASEURL}/api/v3a/tenant-add/requirement/${tenant._id}`;
      await axios.post(apiUrl, values, { withCredentials: true });
      message.success("Requirement added successfully!");
      form.resetFields();
      navigate("/tenant/profile");
    } catch (error) {
      message.error(error.response?.data?.message || "Failed to add requirement");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Card
        className="shadow-xl rounded-2xl border-0"
        style={{
          background: 'linear-gradient(135deg, #f0f4ff 0%, #f8faff 100%)',
          borderLeft: '6px solid #4f46e5'
        }}
      >
        <Spin spinning={loading}>
          {/* Header */}
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-100 rounded-full">
                <HomeOutlined className="text-2xl text-indigo-600" />
              </div>
              <Title level={3} className="!mb-0 !text-indigo-900 !font-bold">
                🏠 New Requirement
              </Title>
            </div>
            <Button
              type="text"
              icon={<CloseOutlined className="text-indigo-400 hover:text-indigo-600" />}
              onClick={() => navigate("/tenant/profile")}
            />
          </div>

          <Divider className="!border-indigo-100" />

          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{ requirement: "room", category: "normal" }}
          >
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  label={<span className="!text-indigo-600 !font-medium">Location</span>}
                  name="location"
                  rules={[{ required: true, message: "Location is required!" }]}
                >
                  <Input
                    prefix={<HomeOutlined className="text-indigo-400" />}
                    placeholder="Enter property location"
                    className="!rounded-lg hover:!border-indigo-300 focus:!border-indigo-500"
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  label={<span className="!text-indigo-600 !font-medium">Requirement Type</span>}
                  name="requirement"
                  rules={[{ required: true }]}
                >
                  <Select
                    placeholder="Select type"
                    className="!rounded-lg"
                    suffixIcon={<ApartmentOutlined className="text-indigo-400" />}
                  >
                    <Option value="room">Room</Option>
                    <Option value="flat">Flat</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  label={<span className="!text-indigo-600 !font-medium">Category</span>}
                  name="category"
                  rules={[{ required: true }]}
                >
                  <Select
                    placeholder="Select category"
                    className="!rounded-lg"
                    suffixIcon={<TagOutlined className="text-indigo-400" />}
                  >
                    <Option value="normal">Normal</Option>
                    <Option value="well_furnished">Well Furnished</Option>
                    <Option value="vip">VIP</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  label={<span className="!text-indigo-600 !font-medium">Price Range</span>}
                  name="priceRange"
                  rules={[{ required: true }]}
                >
                  <InputNumber
                    className="w-full !rounded-lg"
                    placeholder="Enter budget"
                    min={1}
                    prefix={<DollarOutlined className="text-indigo-400" />}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  label={<span className="!text-indigo-600 !font-medium">Number of People</span>}
                  name="numberOfPerson"
                  rules={[{ required: true }]}
                >
                  <InputNumber
                    className="w-full !rounded-lg"
                    placeholder="Number of people"
                    min={1}
                    prefix={<TeamOutlined className="text-indigo-400" />}
                  />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  label={<span className="!text-indigo-600 !font-medium">WhatsApp no.</span>}
                  name="additionalNumber"
                >
                  <InputNumber
                    className="w-full !rounded-lg"
                    placeholder="Phone Number"
                    min={0}
                    prefix={<WhatsAppOutlined className="text-indigo-400" />}
                  />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  label={<span className="!text-indigo-600 !font-medium">Description</span>}
                  name="description"
                  rules={[{ required: true }]}
                >
                  <Input.TextArea
                    rows={4}
                    placeholder="Describe your requirements..."
                    className="!rounded-lg hover:!border-indigo-300 focus:!border-indigo-500"
                    prefix={<FormOutlined className="text-indigo-400" />}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Divider className="!border-indigo-100" />

            <div className="flex gap-4 justify-end">
              <Button
                onClick={() => navigate("/tenant/profile")}
                className="!rounded-lg !px-6 !h-10 !border-indigo-200 !text-indigo-600 hover:!border-indigo-300"
              >
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="!rounded-lg !px-6 !h-10 !bg-indigo-600 hover:!bg-indigo-700 !border-none"
              >
                {loading ? "Submitting..." : "Add Requirement"}
              </Button>
            </div>
          </Form>
        </Spin>
      </Card>
    </div>
  );
};

export default AddRequirement;