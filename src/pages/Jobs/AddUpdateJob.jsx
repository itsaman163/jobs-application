import { Button, Form, Input, Select } from "antd";
import { apiRequestV1, errorMsg, successMsg } from "../../helper/general";
import { useContext, useEffect } from "react";
import { JobContext } from "./Jobs";

const AddUpdateJob = ({ setOpen, open, mode, singleJobData, setRefresh }) => {
  const [form] = Form.useForm();
  const { modelClickHandler } = useContext(JobContext);

  const onFinish = async (value) => {
    const apiParams = {
      method: "POST",
      apiParams: {
        company: value.company_name,
        position: value.position,
        status: value.status,
        ctc: value.ctc,
        ectc: value.ectc,
        link: value.link,
        number: value.mobile_phone,
        noticePeriod: value.noticePeriod,
      },
    };
    if (mode === 'update') {
      apiParams.method = 'PATCH'
      apiParams.params = singleJobData._id
    }
    const apiRes = await apiRequestV1('/jobs', apiParams);
    formReset();
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
      ctc: singleJobData.ctc,
      ectc: singleJobData.ectc,
      link: singleJobData.link,
      mobile_phone: singleJobData.number,
      noticePeriod: singleJobData.noticePeriod,
    });

  }
  const formReset = () => {
    form.resetFields()
  }
  const cancelHandler = () => {
    modelClickHandler('add')
    setOpen(false);
  }

  useEffect(() => {
    if (mode === 'update') {
      getJobData();
    }
  }, [singleJobData])

  return (
    <div className="modal-form-wrapper">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        name="form_in_modal"
        onCancel={formReset}
        initialValues={{
          modifier: "public",
        }}
        className="modal-form"
      >
        <div className="form-body-scrollable">
          <Form.Item
            name="company_name"
            label="Company Name"
            style={{ display: 'inline-block', width: '97%' }}
            rules={[
              {
                required: true,
                message: "Please enter the Company Name of Job!",
              },
            ]}
          >
            <Input placeholder="company name here" />
          </Form.Item>
          <Form.Item
            name="position"
            label="Position"
            style={{ display: 'inline-block', width: '97%' }}
          >
            <Input placeholder="position here" />
          </Form.Item>
          <Form.Item >
            <Form.Item
              name={"link"}
              label="Link"
              style={{ display: 'inline-block', width: "49%" }}
            >
              <Input placeholder="link here" />
            </Form.Item>
            <Form.Item
              name={"noticePeriod"}
              label="Notice Period"
              style={{ display: 'inline-block', width: '47%', margin: '0 8px' }}
              rules={[
                {
                  required: true,
                  message: "Please enter your Notice!",
                },
                {
                  validator: (_, value) => {
                    const regex = /^[0-9][0-9]$/;
                    if (!value || regex.test(value)) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Please enter a valid 02-digit notice period!'));
                  },
                },
              ]}
            >
              <Input
                maxLength={2}
                placeholder="mobile number here"
                onKeyUp={(e) => {
                  if (!/[0-9]/.test(e.key)) {
                    e.preventDefault(); // Block non-numeric input
                  }
                }}
                type="text" />
            </Form.Item>
          </Form.Item>
          <Form.Item>
            <Form.Item
              name={"ctc"}
              label="CTC"
              style={{ display: 'inline-block', width: '49%' }}
            >
              <Input placeholder="current ctc here" />
            </Form.Item>
            <Form.Item
              name={"ectc"}
              label="ECTC"
              style={{ display: 'inline-block', width: '47%', margin: '0 8px' }}
            >
              <Input placeholder="expected current ctc here" />
            </Form.Item>
          </Form.Item>
          <Form.Item>
            <Form.Item
              name={"mobile_phone"}
              label="Mobile Number"
              style={{ display: 'inline-block', width: '49%' }}
              rules={[
                {
                  required: true,
                  message: "Please enter your phone number!",
                },
                {
                  validator: (_, value) => {
                    const regex = /^[1-9][0-9]{9}$/; // 10 digit number, not starting with 0
                    if (!value || regex.test(value)) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Please enter a valid 10-digit mobile number!'));
                  },
                },
              ]}
            >
              <Input maxLength={10}
                placeholder="mobile number here"
                onKeyUp={(e) => {
                  if (!/[0-9]/.test(e.key)) {
                    e.preventDefault(); // Block non-numeric input
                  }
                }}
                type="text" />
            </Form.Item>
            <Form.Item
              name="status"
              label="Status"
              style={{ display: 'inline-block', width: '47%', margin: '0 8px' }}
            >
              <Select placeholder={"job status"}>
                <Select.Option value="pending">Pending</Select.Option>
                <Select.Option value="interview">Interview</Select.Option>
                <Select.Option value="declined">Declined</Select.Option>
              </Select>
            </Form.Item>
          </Form.Item>
        </div>
        <Form.Item
          className="form-footer-fixed"
        >
          <div className="form-button">
            <div>
              <Button
                onClick={() => cancelHandler()}
              >
                cancel
              </Button>
            </div>
            <div>
              <Button type="primary" htmlType="submit">
                {mode === 'add' ? 'Add' : "Upadte"}
              </Button>
            </div>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddUpdateJob;
