import { Button, Form, Input, Modal, Radio } from "antd";
// import { useForm } from "antd/es/form/Form";

const AddUpdateJob = (props) => {
  const { form } = Form.useForm();
  const onFinish = (value) => {
    // console.log(value);
  };
  console.log(props.jobFormData, props.mode);
  const onFinishFailed = () => {};

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
