import { Button, Modal, Popconfirm, Typography } from "antd";
import { createContext, useEffect, useState } from "react";
import { apiRequestV1, errorMsg, successMsg } from "../../helper/general";
import Loader from "../../components/Loader/Loader";
import AddUpdateJob from "./AddUpdateJob";
import TableData from "../../components/Tables/Table";

export const JobContext = createContext();
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
      title: 'Contect No.',
      dataIndex: 'number',
      key: 'number',
    },
    {
      title: 'CTC',
      dataIndex: 'ctc',
      key: 'ctc',
    },
    {
      title: 'ECTC',
      dataIndex: 'ectc',
      key: 'ectc',
    },
    {
      title: 'Link',
      dataIndex: 'link',
      key: 'link',
    },

    {
      title: 'NP',
      dataIndex: 'noticePeriod',
      key: 'noticePeriod',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Created By',
      key: 'createdBy',
      render: (ele, record) => (
        record.userInfo[0]?.name || '--'
      )
    },
    {
      title: 'Added Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
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
    }
    setMode(mode)
    setOpen(true);
  };
  const contextData = {
    modelClickHandler
  }
  return (
    <>
      <JobContext.Provider value={contextData}>
        {isLoading && <Loader />}
        <Button type="primary" onClick={() => modelClickHandler('add')} className="add-button">
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
          width={"50%"}
        >
          <AddUpdateJob
            setOpen={setOpen}
            open={open}
            mode={mode}
            singleJobData={singleJobData}
            setRefresh={setRefresh}
          />
        </Modal>
      </JobContext.Provider>
    </>
  );
};

export default Jobs;
