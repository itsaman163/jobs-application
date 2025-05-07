import { Button, Card, Form, Input, Typography } from "antd";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { errorMsg } from "../../helper/general";
import { API_END_POINT } from "../../config";
const { Title, Text } = Typography;

const RegisterForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const submitHandler = async (value) => {
    try {
      const config = {
        method: "POST",
        url: API_END_POINT + "/auth/register",
        headers: {
          'content-Type': 'application/json'
        },
        data: JSON.stringify({
          "name": value.name,
          "email": value.email,
          "password": value.password
        })
      }
      const apiRes = await axios.request(config);

      if (apiRes?.data?.setting?.success) {
        successMsg(apiRes.data.setting.message);
        navigate("/login");
      }
    } catch (error) {
      errorMsg(error.response.data.msg);
    }

  }
  return (
    <>
      <Card className="registration-form">
        <div className="back-to-login">
          <span>Already have an account?</span>
          <NavLink to="/login" className="header-right"> Log in →</NavLink>
        </div>
        <Title level={2} className="header">
          <Text level={2}>Sign Up</Text>
        </Title>
        <Form
          className="registration"
          name="registration-form"
          layout="vertical"
          form={form}
          onFinish={submitHandler}
          size="default"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{
              required: true,
              message: "Name is required!!"
            }]}
          >
            <Input placeholder="name here" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Email is required!!"
              },
              {
                type: "email",
                message: "Please enter a valid email!!"
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button
              block
              type="primary"
              htmlType="submit"
            >Continue</Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  )
}
export default RegisterForm;