import { useContext, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button, Checkbox, Form, Input, Typography } from "antd";
import { apiRequest, errorMsg, successMsg } from "../../helper/general";
import { getCookie, setSession } from "../../helper/auth";
import Loader from "../../components/Loader/Loader";
import CustomInput from "../../components/FormElements/Input/Input";
import "./Login.css";
import { LoginContext } from "../../App";

const { Title, Paragraph, Text } = Typography;

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [rememberMe, setRememberMe] = useState(false);
  const [form] = Form.useForm();
  const { setIsLogin } = useContext(LoginContext);

  const navigate = useNavigate();

  const rememberMeChangeHandler = ({ target: { checked } }) =>
    setRememberMe(checked);
  const onFinish = async (formData) => {
    setIsLoading(true);
    const apiRes = await login(formData);
    setIsLoading(false);
    if (apiRes.setting.success == "1") {
      const resData = apiRes.data;
      resData["login_time"] = new Date();
      // formData.remember ? setCookie(formData) : deleteCookie();
      successMsg(apiRes.setting.message);
      setSession(resData);
      setIsLogin(true);
      navigate("/jobs");
    } else {
      errorMsg(apiRes.settings.message);
    }
  };

  const login = async (formData) => {
    const apiParams = {
      method: "POST",
      apiParams: {
        email: formData.username,
        password: formData.password,
      },
    };
    const apiRes = await apiRequest("/auth/login", apiParams);
    return apiRes;
  };

  // useEffect(() => {
  //   const cookieData = getCookie();
  //   if (cookieData) {
  //     setRememberMe(true);
  //     form.setFieldsValue({
  //       username: cookieData.username,
  //       password: cookieData.password,
  //       remember: cookieData.remember,
  //     });
  //   }
  // }, [form]);

  return (
    <>
      {isLoading && <Loader />}
      {/* {!isLoading && error && <ConnectionError />} */}
      {!isLoading && (
        <div className="login-container">
          <div className="login-form">
            {/* <ProjectLogo url={appData?.project_detials.project_logo} /> */}
            <div className="slogun-text">
              <Title level={2}>
                <Text level={2}>Sign In</Text>
              </Title>
              <Paragraph type="secondary">
                Enter your username and password
              </Paragraph>
            </div>
            <Form
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
                  // onChange={(e) => setusername(e.target.value)}
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
                <Form.Item
                  name="remember"
                  className="remeber-box"
                  valuePropName="checked"
                  style={{
                    display: "flex",
                    alignItems: "left",
                    float: "left",
                  }}
                >
                  <Checkbox
                    checked={rememberMe}
                    onChange={rememberMeChangeHandler}
                  >
                    Remember me
                  </Checkbox>
                </Form.Item>
                <Link to="/forgotpassword" className="login-form-forgot">
                  Forgot password
                </Link>
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
            {/* {appData?.app_detials && <img src="" />} */}
          </div>
        </div>
      )}
    </>
  );
};
export default Login;
