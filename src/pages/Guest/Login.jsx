import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Form, Input, Typography } from "antd";
import {
  MailOutlined,
  LockOutlined,
  CheckCircleFilled,
  RocketOutlined,
  SafetyCertificateOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import { errorMsg, successMsg } from "../../helper/general";
import { setSession } from "../../helper/auth";
import { LoginContext } from "../../App";
import axios from "axios";
import { API_END_POINT } from "../../config";

const { Title, Text } = Typography;

const Login = () => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const { setIsLogin, setLoginData } = useContext(LoginContext);
  const navigate = useNavigate();

  const onFinish = async (formData) => {
    setIsLoading(true);
    try {
      const config = {
        method: "post",
        url: `${API_END_POINT}/auth/login`,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      };

      const response = await axios.request(config);
      const apiRes = response.data;

      if (apiRes?.setting?.success === "1" || apiRes?.setting?.success === true) {
        const resData = apiRes.data;
        resData["login_time"] = new Date();
        successMsg(apiRes.setting.message || apiRes.setting.massage || "Login successful!");
        setSession(resData);
        setLoginData(resData);
        setIsLogin(true);
        navigate("/");
      } else {
        errorMsg(apiRes?.setting?.message || apiRes?.setting?.massage || "Invalid credentials");
      }
    } catch (err) {
      console.error("Login Error:", err);
      errorMsg(err.response?.data?.msg || err.response?.data?.setting?.massage || "Login failed");
    } finally {
      setIsLoading(false);
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
            Track your career applications with precision.
          </h1>
          <p className="auth-hero-subtext">
            Streamline your job search, manage interviews, record compensation packages, and land your dream offer.
          </p>

          <div className="auth-feature-list">
            <div className="auth-feature-item">
              <div className="auth-feature-icon">
                <CheckCircleFilled />
              </div>
              <span>Real-time application pipeline tracking</span>
            </div>
            <div className="auth-feature-item">
              <div className="auth-feature-icon">
                <SafetyCertificateOutlined />
              </div>
              <span>Secure cloud storage for resumes & profile assets</span>
            </div>
            <div className="auth-feature-item">
              <div className="auth-feature-icon">
                <ThunderboltOutlined />
              </div>
              <span>Instant status analytics and salary insights</span>
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
              Welcome back
            </Title>
            <Text className="auth-subtitle">
              Enter your credentials to access your dashboard
            </Text>
          </div>

          <Form
            form={form}
            name="login_form"
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
            requiredMark={false}
          >
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
              rules={[{ required: true, message: "Please enter your password" }]}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: "#94a3b8" }} />}
                placeholder="••••••••"
                size="large"
              />
            </Form.Item>

            <Form.Item style={{ marginTop: 24 }}>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                loading={isLoading}
              >
                Sign In
              </Button>
            </Form.Item>

            <div className="auth-switch">
              <span>Don't have an account?</span>
              <NavLink to="/registration">Create an account</NavLink>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
