import { Button, Form, Input, Modal, Radio, Select } from "antd";
import { apiRequestV1, errorMsg, successMsg } from "../../helper/general";
import { useNavigate } from "react-router-dom";
// import { useForm } from "antd/es/form/Form";

const AddUpdateJob = (props) => {
  const { form } = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (value) => {
    const apiParams = {
      method: "POST",
      apiParams: {
        company: value.company_name,
        position: value.position,
        status: value.status

      },
    };
    const apiRes = await apiRequestV1('/jobs', apiParams)
    debugger;
    if (apiRes?.setting?.success == "1") {
      successMsg(apiRes.setting.massage);
      navigate("/jobs");
    }else{
      errorMsg(apiRes.setting.message);
    }
  };
  // console.log(props.jobFormData, props.mode);
  const onFinishFailed = () => { };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      name="form_in_modal"
      initialValues={{
        modifier: "public",
      }}
    >
      <Form.Item
        name="company_name"
        label="Company Name"
        rules={[
          {
            required: true,
            message: "Please input the Company Name of Job!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="position" label="Position">
        <Input />
      </Form.Item>
      <Form.Item name="status" label="Status">
        <Select>
          <Select.Option value="pending">Pending</Select.Option>
          <Select.Option value="interview">Interview</Select.Option>
          <Select.Option value="declined">Declined</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <div style={{ textAlign: "end" }}>
          <Button type="primary" htmlType="submit">
            Add
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default AddUpdateJob;
