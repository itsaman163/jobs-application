import { useState, useEffect, createContext, useMemo } from "react";
import {
  Button,
  Modal,
  Popconfirm,
  Typography,
  Input,
  Select,
  Tag,
  Space,
  Tooltip,
  Card,
} from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  DeleteOutlined,
  EditOutlined,
  LinkOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { apiRequestV1, errorMsg, successMsg } from "../../helper/general";
import Loader from "../../components/Loader/Loader";
import AddUpdateJob from "./AddUpdateJob";
import TableData from "../../components/Tables/Table";

const { Title, Text } = Typography;
export const JobContext = createContext();

const Jobs = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [projectData, setProjectData] = useState([]);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("add");
  const [refresh, setRefresh] = useState(false);
  const [singleJobData, setSingleJobData] = useState(null);

  // Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const getStatusTag = (status = "pending") => {
    const s = (status || "").toLowerCase();
    if (s.includes("offer")) {
      return (
        <span className="status-badge offer">
          <CheckCircleOutlined /> Offer
        </span>
      );
    }
    if (s.includes("interview")) {
      return (
        <span className="status-badge interview">
          <SyncOutlined spin /> Interview
        </span>
      );
    }
    if (s.includes("declined") || s.includes("reject")) {
      return (
        <span className="status-badge rejected">
          <CloseCircleOutlined /> Declined
        </span>
      );
    }
    return (
      <span className="status-badge pending">
        <ClockCircleOutlined /> {status || "Pending"}
      </span>
    );
  };

  const columns = [
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
      sorter: (a, b) => (a.company || "").localeCompare(b.company || ""),
      render: (text, record) => (
        <div className="company-cell">
          <div className="company-avatar">
            {(text || "C").charAt(0).toUpperCase()}
          </div>
          <div>
            <div
              style={{
                fontWeight: 700,
                color: "#0f172a",
                cursor: "pointer",
              }}
              onClick={() => modelClickHandler("update", record)}
            >
              {text}
            </div>
            {record.number && (
              <span style={{ fontSize: 12, color: "#94a3b8" }}>
                📞 {record.number}
              </span>
            )}
          </div>
        </div>
      ),
    },
    {
      title: "Position / Role",
      dataIndex: "position",
      key: "position",
      render: (pos) => (
        <span style={{ fontWeight: 600, color: "#334155" }}>
          {pos || "Software Engineer"}
        </span>
      ),
    },
    {
      title: "CTC / ECTC",
      key: "compensation",
      render: (_, record) => (
        <div>
          <span style={{ fontWeight: 600, color: "#0f172a" }}>
            {record.ctc ? `${record.ctc} LPA` : "--"}
          </span>
          {record.ectc && (
            <div style={{ fontSize: 12, color: "#64748b" }}>
              Exp: {record.ectc} LPA
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Notice Period",
      dataIndex: "noticePeriod",
      key: "noticePeriod",
      render: (np) => (np ? `${np} Days` : "--"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => getStatusTag(status),
    },
    {
      title: "Job Link",
      dataIndex: "link",
      key: "link",
      render: (link) =>
        link ? (
          <Tooltip title={link}>
            <Button
              type="text"
              icon={<LinkOutlined style={{ color: "#4f46e5" }} />}
              href={link.startsWith("http") ? link : `https://${link}`}
              target="_blank"
              size="small"
            >
              Link
            </Button>
          </Tooltip>
        ) : (
          <span style={{ color: "#cbd5e1" }}>--</span>
        ),
    },
    {
      title: "Created By",
      key: "createdBy",
      render: (_, record) => (
        <span style={{ color: "#64748b", fontSize: 13 }}>
          {record.userInfo?.[0]?.name || record.createdByName || "--"}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Space size={8}>
          <Tooltip title="Edit Job">
            <Button
              type="text"
              icon={<EditOutlined style={{ color: "#4f46e5" }} />}
              onClick={() => modelClickHandler("update", record)}
            />
          </Tooltip>
          <Tooltip title="Delete Job">
            <Popconfirm
              title="Delete this application?"
              description="Are you sure you want to delete this job application record?"
              onConfirm={() => deleteJobHandler(record)}
              okText="Yes, delete"
              cancelText="Cancel"
              okButtonProps={{ danger: true }}
            >
              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const getProjectList = async () => {
    try {
      setIsLoading(true);
      const apiParams = {
        method: "GET",
        apiParams: {},
      };
      const res = await apiRequestV1("/jobs", apiParams);
      if (res?.setting?.success === "1" || res?.setting?.success === true) {
        setProjectData(res.data.jobs || []);
      }
    } catch (error) {
      console.error("Fetch Jobs error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteJobHandler = async (data) => {
    try {
      const path = `/jobs/${data._id}`;
      const apiParams = {
        method: "DELETE",
        apiParams: {},
      };
      const apiRes = await apiRequestV1(path, apiParams);
      if (apiRes?.setting?.success === "1" || apiRes?.setting?.success === true) {
        successMsg(apiRes.setting.massage || apiRes.setting.message || "Job deleted successfully");
        setRefresh((prev) => !prev);
      } else {
        errorMsg(apiRes?.setting?.message || "Failed to delete job");
      }
    } catch (error) {
      errorMsg(error?.response?.data?.msg || "Delete request failed");
    }
  };

  useEffect(() => {
    getProjectList();
  }, [refresh]);

  const modelClickHandler = (modeType, data) => {
    if (modeType === "update") {
      setSingleJobData(data);
    } else {
      setSingleJobData(null);
    }
    setMode(modeType);
    setOpen(true);
  };

  const filteredData = useMemo(() => {
    return projectData.filter((item) => {
      const matchesSearch =
        !searchTerm ||
        (item.company || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.position || "").toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ||
        (item.status || "").toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [projectData, searchTerm, statusFilter]);

  const contextData = {
    modelClickHandler,
  };

  return (
    <JobContext.Provider value={contextData}>
      {isLoading && <Loader />}
      
      <div className="page-wrapper">
        {/* Table Top Toolbar */}
        <div className="table-toolbar">
          <div className="toolbar-filters">
            <Input
              placeholder="Search company or position..."
              prefix={<SearchOutlined style={{ color: "#94a3b8" }} />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              allowClear
              style={{ width: 280 }}
            />

            <Select
              defaultValue="all"
              value={statusFilter}
              onChange={(val) => setStatusFilter(val)}
              style={{ width: 160 }}
              options={[
                { value: "all", label: "All Statuses" },
                { value: "pending", label: "Pending" },
                { value: "interview", label: "Interview" },
                { value: "declined", label: "Declined" },
              ]}
            />

            <Button
              icon={<ReloadOutlined />}
              onClick={() => setRefresh((prev) => !prev)}
            >
              Refresh
            </Button>
          </div>

          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            onClick={() => modelClickHandler("add")}
          >
            Add New Application
          </Button>
        </div>

        {/* Data Table */}
        <TableData columns={columns} data={filteredData} />

        {/* Create / Edit Modal */}
        <Modal
          title={
            <div style={{ paddingBottom: 8, borderBottom: "1px solid #f1f5f9" }}>
              <span style={{ fontSize: 18, fontWeight: 800 }}>
                {mode === "update" ? "Edit Job Application" : "Create New Job Application"}
              </span>
            </div>
          }
          centered
          open={open}
          footer={null}
          onCancel={() => setOpen(false)}
          width={650}
          destroyOnClose
        >
          <AddUpdateJob
            setOpen={setOpen}
            open={open}
            mode={mode}
            singleJobData={singleJobData}
            setRefresh={setRefresh}
          />
        </Modal>
      </div>
    </JobContext.Provider>
  );
};

export default Jobs;
