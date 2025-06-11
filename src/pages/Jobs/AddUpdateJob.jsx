import { Button, Form, Input, Select } from "antd";
import { apiRequestV1, errorMsg, successMsg } from "../../helper/general";
import { useEffect } from "react";

const AddUpdateJob = ({ setOpen, mode, singleJobData, setRefresh }) => {
  const [form] = Form.useForm();

  const onFinish = async (value) => {
    const apiParams = {
      method: "POST",
      apiParams: {
        company: value.company_name,
        position: value.position,
        status: value.status
      },
    };
    if (mode === 'update') {
      apiParams.method = 'PATCH'
      apiParams.params = singleJobData._id
    }
    const apiRes = await apiRequestV1('/jobs', apiParams);
    if (apiRes?.setting?.success == "1") {
      setRefresh(prev => !prev);
      setOpen(false);
      successMsg(apiRes.setting.massage);
    } else {
      errorMsg(apiRes.setting.message);
    }
  };
  const getJobData = async () => {
    form.setFieldsValue({
      company_name: singleJobData.company,
      position: singleJobData.position,
      status: singleJobData.status,
    });

  }
  useEffect(() => {
    if (mode === 'update') {
      getJobData()
    }
  }, [singleJobData])
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
            {mode === 'add' ? 'Add' : "Upadte"}
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default AddUpdateJob;
