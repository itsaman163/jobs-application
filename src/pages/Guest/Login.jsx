import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Typography } from "antd";
import { errorMsg, successMsg } from "../../helper/general";
import { setSession } from "../../helper/auth";
import Loader from "../../components/Loader/Loader";
import CustomInput from "../../components/FormElements/Input/Input";
import "./Login.css";
import { LoginContext } from "../../App";
import axios from "axios";

const { Title, Paragraph, Text } = Typography;

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const { setIsLogin } = useContext(LoginContext);

  const navigate = useNavigate();

  const rememberMeChangeHandler = ({ target: { checked } }) => setRememberMe(checked);

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
        url: 'http://localhost:5000/api/v1/auth/login',
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
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <div className="login-container">

          <div className="slogun-text">
            <Title level={2}>
              <Text level={2}>Sign In</Text>
            </Title>
          </div>
          <Form
            className="login-form"
            name="normal_login"
            layout="vertical"
            onFinish={onFinish}
            form={form}
          >
            <Form.Item
              label="Email"
              name="username"
              className="form-row username-field"
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
              <CustomInput
                placeholder="Enter your email address"
                type="text"
                name="Username"
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
              <Input.Password type="password" placeholder="Password" />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Sign In
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </>
  );
};
export default Login;
