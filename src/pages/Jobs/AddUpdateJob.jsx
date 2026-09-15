import { Button, Form, Input, Select, Row, Col, Space } from "antd";
import {
  BankOutlined,
  IdcardOutlined,
  DollarOutlined,
  PhoneOutlined,
  LinkOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { apiRequestV1, errorMsg, successMsg } from "../../helper/general";
import { useEffect, useState } from "react";

const AddUpdateJob = ({ setOpen, mode, singleJobData, setRefresh }) => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  const onFinish = async (value) => {
    try {
      setSubmitting(true);
      const apiParams = {
        method: "POST",
        apiParams: {
          company: value.company_name,
          position: value.position,
          status: value.status || "pending",
          ctc: value.ctc,
          ectc: value.ectc,
          link: value.link,
          number: value.mobile_phone,
          noticePeriod: value.noticePeriod,
        },
      };

      if (mode === "update") {
        apiParams.method = "PATCH";
        apiParams.params = singleJobData._id;
      }

      const apiRes = await apiRequestV1("/jobs", apiParams);

      if (apiRes?.setting?.success === "1" || apiRes?.setting?.success === true) {
        setRefresh((prev) => !prev);
        setOpen(false);
        successMsg(apiRes.setting.massage || apiRes.setting.message || "Application saved successfully!");
      } else {
        errorMsg(apiRes?.setting?.message || apiRes?.setting?.massage || "Action failed");
      }
    } catch (err) {
      console.error("Save job error:", err);
      errorMsg("Failed to save job application");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (mode === "update" && singleJobData) {
      form.setFieldsValue({
        company_name: singleJobData.company,
        position: singleJobData.position,
        status: singleJobData.status || "pending",
        ctc: singleJobData.ctc,
        ectc: singleJobData.ectc,
        link: singleJobData.link,
        mobile_phone: singleJobData.number,
        noticePeriod: singleJobData.noticePeriod,
      });
    } else {
      form.resetFields();
    }
  }, [mode, singleJobData, form]);

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      name="job_form"
      style={{ marginTop: 16 }}
      requiredMark={false}
      initialValues={{ status: "pending" }}
    >
      <div className="modal-section-title">Company & Position Details</div>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="company_name"
            label="Company Name"
            rules={[{ required: true, message: "Please enter the company name" }]}
          >
            <Input
              prefix={<BankOutlined style={{ color: "#94a3b8" }} />}
              placeholder="e.g. Google, Stripe"
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="position"
            label="Job Position / Role"
            rules={[{ required: true, message: "Please enter the position" }]}
          >
            <Input
              prefix={<IdcardOutlined style={{ color: "#94a3b8" }} />}
              placeholder="e.g. Senior Frontend Engineer"
            />
          </Form.Item>
        </Col>
      </Row>

      <div className="modal-section-title">Compensation & Notice</div>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="ctc" label="Current CTC (LPA)">
            <Input
              prefix={<DollarOutlined style={{ color: "#94a3b8" }} />}
              placeholder="e.g. 15"
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item name="ectc" label="Expected CTC (LPA)">
            <Input
              prefix={<DollarOutlined style={{ color: "#94a3b8" }} />}
              placeholder="e.g. 24"
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="noticePeriod"
            label="Notice Period (Days)"
            rules={[
              {
                pattern: /^[0-9]+$/,
                message: "Please enter valid number of days",
              },
            ]}
          >
            <Input
              prefix={<CalendarOutlined style={{ color: "#94a3b8" }} />}
              placeholder="e.g. 30"
              maxLength={3}
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item name="status" label="Application Status">
            <Select
              options={[
                { value: "pending", label: "Pending / Applied" },
                { value: "interview", label: "Interviewing" },
                { value: "offer", label: "Offer Received" },
                { value: "declined", label: "Declined / Rejected" },
              ]}
            />
          </Form.Item>
        </Col>
      </Row>

      <div className="modal-section-title">Contact & External Reference</div>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="mobile_phone" label="Recruiter Phone / Contact">
            <Input
              prefix={<PhoneOutlined style={{ color: "#94a3b8" }} />}
              placeholder="e.g. 9876543210"
              maxLength={15}
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item name="link" label="Job Posting URL">
            <Input
              prefix={<LinkOutlined style={{ color: "#94a3b8" }} />}
              placeholder="https://linkedin.com/jobs/..."
            />
          </Form.Item>
        </Col>
      </Row>

      {/* Action Footer */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 12,
          marginTop: 24,
          paddingTop: 16,
          borderTop: "1px solid #f1f5f9",
        }}
      >
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button type="primary" htmlType="submit" loading={submitting}>
          {mode === "add" ? "Create Application" : "Save Changes"}
        </Button>
      </div>
    </Form>
  );
};

export default AddUpdateJob;
