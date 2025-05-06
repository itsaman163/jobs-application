import { Button, Card, Modal, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import { apiRequest } from "../../helper/general";
import Loader from "../../components/Loader/Loader";
import AddUpdateJob from "./AddUpdateJob";
import TableData from "../../components/Tables/Table";


const columns = [
  {
    title: 'Company',
    dataIndex: 'company',
    key: 'company',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Position',
    dataIndex: 'position',
    key: 'position',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: 'Created By',
    key: 'createdBy',
    dataIndex: 'createdBy'
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Invite </a>
        <a>Delete</a>
      </Space>
    ),
  },
];
const Jobs = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [projectData, setProjectData] = useState([]);
  const [open, setOpen] = useState(false);
  const [jobFormData, setJobFormData] = useState({});
  const [mode, setMode] = useState("add");

  const getProjectList = async () => {
    try {
      setIsLoading(false);
      const apiParams = {
        method: "Get",
        apiParams: {},
      };
      const res = await apiRequest("/jobs", apiParams);
      if (res.setting.success == "1") {
        setProjectData(res.data.jobs);
      }
    } catch (error) { }
  };
  const getFormData = async (value) => {
    setMode("update");
    setIsLoading(true);
    const apiParams = {
      method: "POST",
      apiParams: {},
    };
    const res = await apiRequest(`/jobs/${value}`, apiParams);
    setIsLoading(false);
    if (res.setting.success == "1") {
      setJobFormData(res.data.job);
    }
    setOpen(true);
  };

  useEffect(() => {
    getProjectList();
  }, []);
  const modelClickHandler = () => {
    setOpen(true);
  };
  return (
    <>
      {isLoading && <Loader />}
      <Button type="primary" onClick={modelClickHandler} className="add-button">
        Add New Job
      </Button>
      <Typography.Title level={3} className="table-heading">
        All JOBS
      </Typography.Title>
        <TableData columns={columns} data={projectData}/>
      <div>
        <Modal
          title="Create Job"
          centered
          open={open}
          footer={null}
          onCancel={() => {
            setOpen(false);
          }}
        >
          <AddUpdateJob
            setOpen={setOpen}
            mode={mode}
            jobFormData={jobFormData}
          />
        </Modal>
      </div>
    </>
  );
};

export default Jobs;
