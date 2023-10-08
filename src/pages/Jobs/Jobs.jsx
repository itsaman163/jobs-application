import { Button, Card, Modal } from "antd";
import Cards from "../../components/Cards/Cards";
import { useEffect, useState } from "react";
import { apiRequest } from "../../helper/general";
import Loader from "../../components/Loader/Loader";
import AddUpdateJob from "./AddUpdateJob";

const Jobs = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [projectData, setProjectData] = useState([]);
  const [open, setOpen] = useState(false);
  const [jobFormData, setJobFormData] = useState({});
  const [mode, setMode] = useState("add");
  const onCreate = (values) => {
    console.log("Received values of form: ", values);
    setOpen(false);
  };
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
    } catch (error) {}
  };
  const getFormData = async (value) => {
    setMode("update");
    setIsLoading(true);
    const apiParams = {
      method: "POST",
      apiParams: {},
    };
    setIsLoading(false);
    // const res = await apiRequest(`/jobs/${value}`, apiParams);
    // if (res.setting.success == "1") {
    //   setJobFormData(res.data.job);
    // }
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
      {projectData.map((data) => (
        <Cards key={data._id} getFormData={getFormData} data={data} />
      ))}
      <div>
        <Button type="primary" onClick={modelClickHandler}>
          Add New Job
        </Button>
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
