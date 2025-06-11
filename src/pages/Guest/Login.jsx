import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Card, Form, Input, Typography } from "antd";
import { errorMsg, successMsg } from "../../helper/general";
import { setSession } from "../../helper/auth";
import Loader from "../../components/Loader/Loader";
import { LoginContext } from "../../App";
import axios from "axios";
import { API_END_POINT } from "../../config";

const { Title, Text } = Typography;

const Login = () => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const { setIsLogin } = useContext(LoginContext);

  const navigate = useNavigate();

  const onFinish = async (formData) => {
    setIsLoading(true);
    const apiRes = await login(formData);
    setIsLoading(false);
    if (apiRes?.setting?.success == "1") {
      const resData = apiRes.data;
      resData["login_time"] = new Date();
      successMsg(apiRes.setting.message);
      setSession(resData);
      setIsLogin(true);
      navigate("/jobs");
    } else {
      errorMsg(apiRes);
    }
  };

  const login = async (formData) => {
    try {
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: API_END_POINT + "/auth/login",
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify({
          "email": formData.username,
          "password": formData.password
        })
      };
      const result = await axios.request(config);
      return result.data
    } catch (err) {
      return err.response.data.msg;
    }
  };
  return (
    <Card className="login-form">
      {isLoading && <Loader />}
      <Title level={2}>
        <Text level={2}>Sign In</Text>
      </Title>
      <Form
        className="form"
        name="normal_login"
        layout="vertical"
        onFinish={onFinish}
        form={form}
        autoComplete="off"
        size="default"
      >
        <Form.Item
          label="Email"
          name="username"
          className="form-row"
          rules={[
            {
              type: "email",
              message: "Please enter a valid email",
            },
            {
              required: true,
              message: "Please enter your email",
            },
          ]}
        >
          <Input
            placeholder="Enter your email address"
          />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          className="form-row password-field"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button
            block
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Sign In
          </Button>
        </Form.Item>
        or <NavLink to="/registration" end>Sign up Now</NavLink>

      </Form>
    </Card>
  );
};
export default Login;
