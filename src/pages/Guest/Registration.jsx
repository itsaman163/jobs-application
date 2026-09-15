import { useState } from "react";
import { Button, Form, Input, Typography, Upload } from "antd";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  UploadOutlined,
  RocketOutlined,
  CheckCircleFilled,
  SafetyCertificateOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import { errorMsg, successMsg } from "../../helper/general";
import { API_END_POINT } from "../../config";

const { Title, Text } = Typography;

const RegisterForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const submitHandler = async (value) => {
    try {
      setLoading(true);
      let profilePictureKey = "";

      // 1. Fetch presigned URL and upload image to S3 if a file was selected
      if (value.profilePicture && value.profilePicture.length > 0) {
        const fileObj = value.profilePicture[0].originFileObj;

        const preSignedRes = await axios.get(
          `${API_END_POINT}/common/get-pre-signed-url`,
          {
            params: {
              fileName: fileObj.name,
              fileType: fileObj.type,
            },
          }
        );

        const uploadData = preSignedRes?.data?.data;
        if (uploadData?.uploadUrl && uploadData?.key) {
          await axios.put(uploadData.uploadUrl, fileObj, {
            headers: {
              "Content-Type": fileObj.type || "application/octet-stream",
            },
            transformRequest: [(data) => data],
          });

          profilePictureKey = uploadData.key;
        }
      }

      // 2. Call Register API with user data & image key
      const registerPayload = {
        name: value.name,
        email: value.email,
        password: value.password,
        profilePicture: profilePictureKey,
        file: profilePictureKey,
      };

      const apiRes = await axios.post(
        `${API_END_POINT}/auth/register`,
        registerPayload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (apiRes?.data?.setting?.success) {
        successMsg(apiRes.data.setting.message || apiRes.data.setting.massage || "Account created successfully!");
        navigate("/login");
      } else {
        errorMsg(
          apiRes?.data?.setting?.message ||
            apiRes?.data?.setting?.massage ||
            "Registration failed"
        );
      }
    } catch (error) {
      console.error("Registration error:", error);
      errorMsg(
        error.response?.data?.setting?.massage ||
          error.response?.data?.setting?.message ||
          error.response?.data?.msg ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-container">
      {/* Left Hero Section */}
      <div className="auth-hero-section">
        <div className="auth-hero-brand">
          <div className="auth-hero-logo">
            <RocketOutlined />
          </div>
          <span className="auth-hero-title">CareerHub</span>
        </div>

        <div className="auth-hero-content">
          <h1 className="auth-hero-heading">
            Join thousands managing their job hunt intelligently.
          </h1>
          <p className="auth-hero-subtext">
            Organize every opportunity, interview schedule, and offer letter in one unified, modern workspace.
          </p>

          <div className="auth-feature-list">
            <div className="auth-feature-item">
              <div className="auth-feature-icon">
                <CheckCircleFilled />
              </div>
              <span>Customizable interview & application stages</span>
            </div>
            <div className="auth-feature-item">
              <div className="auth-feature-icon">
                <SafetyCertificateOutlined />
              </div>
              <span>Encrypted credentials & secure AWS asset uploads</span>
            </div>
            <div className="auth-feature-item">
              <div className="auth-feature-icon">
                <ThunderboltOutlined />
              </div>
              <span>Data-driven career progress insights</span>
            </div>
          </div>
        </div>

        <div className="auth-hero-footer">
          © {new Date().getFullYear()} CareerHub Inc. All rights reserved.
        </div>
      </div>

      {/* Right Form Section */}
      <div className="auth-form-section">
        <div className="auth-card">
          <div className="auth-header">
            <Title level={2} className="auth-title">
              Create your account
            </Title>
            <Text className="auth-subtitle">
              Start managing your career applications today
            </Text>
          </div>

          <Form
            form={form}
            name="registration-form"
            layout="vertical"
            onFinish={submitHandler}
            autoComplete="off"
            requiredMark={false}
          >
            <Form.Item
              label="Full Name"
              name="name"
              rules={[{ required: true, message: "Please enter your name" }]}
            >
              <Input
                prefix={<UserOutlined style={{ color: "#94a3b8" }} />}
                placeholder="Aman Kumar"
                size="large"
              />
            </Form.Item>

            <Form.Item
              label="Email Address"
              name="email"
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Please enter a valid email address" },
              ]}
            >
              <Input
                prefix={<MailOutlined style={{ color: "#94a3b8" }} />}
                placeholder="name@company.com"
                size="large"
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please create a password" },
                { min: 6, message: "Password must be at least 6 characters" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: "#94a3b8" }} />}
                placeholder="Minimum 6 characters"
                size="large"
              />
            </Form.Item>

            <Form.Item
              label="Profile Picture (Optional)"
              name="profilePicture"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload
                maxCount={1}
                beforeUpload={() => false}
                listType="picture"
                accept="image/*"
              >
                <Button icon={<UploadOutlined />}>Select Photo</Button>
              </Upload>
            </Form.Item>

            <Form.Item style={{ marginTop: 24 }}>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                loading={loading}
              >
                Create Account
              </Button>
            </Form.Item>

            <div className="auth-switch">
              <span>Already have an account?</span>
              <NavLink to="/login">Sign in</NavLink>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;