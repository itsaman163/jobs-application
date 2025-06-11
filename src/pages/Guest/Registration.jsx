import { Button, Form, Input, Typography, Upload } from "antd";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { errorMsg, successMsg } from "../../helper/general";
import { API_END_POINT } from "../../config";
import { UploadOutlined } from "@ant-design/icons";
const { Title, Text } = Typography;

const RegisterForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const submitHandler = async (value) => {
    try {
      const formData = new FormData();
      for (const [key, val] of Object.entries(value)) {
        console.log(val)
        formData.append(key, val);
      }
      const config = {
        method: "POST",
        url: API_END_POINT + "/auth/register",
        headers: {
          'content-Type': 'application/json'
        },
        // formData
        data: JSON.stringify({
          "name": value.name,
          "email": value.email,
          "password": value.password,
          "file": value.profilePicture
        })
      }
      const apiRes = await axios.request(config);

      if (apiRes?.data?.setting?.success) {
        successMsg(apiRes.data.setting.message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error)
      errorMsg(error.response.data.msg);
    }

  }
  return (
    <>
      <div className="main-register-container">
        <div className="left-container">
          <figure>
            <img src="\regitration-image.jpg" className="image-ele" />
          </figure>
        </div>
        <div className="right-container">
          <div className="registration-form">
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
                label="Username"
                name="name"
                rules={[{
                  required: true,
                  message: "Name is required!!"
                }]}
              >
                <Input placeholder="Enter your name here" />
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
                <Input placeholder="Enter your email here" />
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
                <Input.Password placeholder="password" />
              </Form.Item>
              <Form.Item
                label="Profile Picture"
                name={"profilePicture"}
                valuePropName="fileList"
                getValueFromEvent={(event) => {
                  return event?.fileList;
                }}
              // rules={[
              //   {
              //     required: true,
              //     message: "Please select Profile Picture!"
              //   },
              //   {
              //     validator(_, fileList) {
              //       return new Promise((resolve, reject) => {
              //         if (fileList && fileList[0].size > 1489360) {
              //           reject("File Size is Exceeded!");
              //         } else {
              //           resolve();
              //         }
              //       })
              //     }
              //   }
              // ]}
              >
                <Upload
                  maxCount={1}>
                  <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
              </Form.Item>
              <Form.Item>
                <Button
                  block
                  type="primary"
                  htmlType="submit"
                >Continue</Button>
              </Form.Item>
            </Form>
          </div>

        </div>
      </div>
    </>
  )
}
export default RegisterForm;