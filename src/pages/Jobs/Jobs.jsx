import { Button, Modal, Popconfirm, Typography } from "antd";
import { useEffect, useState } from "react";
import { apiRequestV1, errorMsg, successMsg } from "../../helper/general";
import Loader from "../../components/Loader/Loader";
import AddUpdateJob from "./AddUpdateJob";
import TableData from "../../components/Tables/Table";

const Jobs = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [projectData, setProjectData] = useState([]);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("add");
  const [refresh, setRefresh] = useState(false);
  const [singleJobData, setSingleJobData] = useState();

  const columns = [
    {
      title: 'Company',
      dataIndex: 'company',
      key: 'company',
      render: (text, record) => <a onClick={() => modelClickHandler('update', record)}>{text}</a>,
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
        <Popconfirm
          title="Delete the task"
          description="Are you sure to delete this task?"
          onConfirm={() => deleteJobHandler(record)}
          okText="Yes"
          cancelText="No"
        >
          <Button danger>Delete</Button>
        </Popconfirm>
      ),
    },
  ];
  const getProjectList = async () => {
    try {
      setIsLoading(false);
      const apiParams = {
        method: "Get",
        apiParams: {},
      };
      const res = await apiRequestV1("/jobs", apiParams);
      if (res.setting.success == "1") {
        setProjectData(res.data.jobs);
      }
    } catch (error) { console.log("error------------->>", error) }
  };
  const deleteJobHandler = async (data) => {
    try {
      const path = "/jobs/" + data._id
      const apiParams = {
        method: "DELETE",
        apiParams: {},
      };
      const apiRes = await apiRequestV1(path, apiParams);
      if (apiRes?.setting?.success) {
        successMsg(apiRes.setting.massage);
        setRefresh(prev => !prev);
      }
    } catch (error) {
      errorMsg(error);
    }

  }
  useEffect(() => {
    getProjectList();
  }, [refresh]);

  const modelClickHandler = (mode, data) => {

    if (mode === 'update') {
      setSingleJobData(data);
      setMode('update')
    }
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
      <TableData columns={columns} data={projectData} />
      <Modal
        title={mode === 'update' ? "Update Job" : "Create Job"}
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
          singleJobData={singleJobData}
          setRefresh={setRefresh}
        />
      </Modal>
    </>
  );
};

export default Jobs;
