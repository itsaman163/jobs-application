import { useEffect, useState } from "react";
import { Button, Card, Col, Progress, Row, Space, Table, Tag, Typography } from "antd";
import {
  AppstoreAddOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  DollarOutlined,
  RiseOutlined,
  RocketOutlined,
  SendOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { apiRequestV1 } from "../../helper/general";
import Loader from "../../components/Loader/Loader";

const { Title, Text } = Typography;

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await apiRequestV1("/jobs", { method: "GET", apiParams: {} });
      if (res?.setting?.success === "1" || res?.setting?.success === true) {
        setJobs(res.data.jobs || []);
      }
    } catch (err) {
      console.error("Dashboard jobs fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const totalJobs = jobs.length;
  const interviewCount = jobs.filter((j) =>
    (j.status || "").toLowerCase().includes("interview")
  ).length;
  const offerCount = jobs.filter((j) =>
    (j.status || "").toLowerCase().includes("offer")
  ).length;
  const rejectedCount = jobs.filter((j) =>
    (j.status || "").toLowerCase().includes("reject")
  ).length;
  const pendingCount = Math.max(
    0,
    totalJobs - interviewCount - offerCount - rejectedCount
  );

  const getStatusTag = (status = "Pending") => {
    const s = status.toLowerCase();
    if (s.includes("offer")) {
      return <Tag color="success" icon={<CheckCircleOutlined />}>Offer</Tag>;
    }
    if (s.includes("interview")) {
      return <Tag color="purple" icon={<SyncOutlined spin />}>Interviewing</Tag>;
    }
    if (s.includes("reject")) {
      return <Tag color="error" icon={<CloseCircleOutlined />}>Declined</Tag>;
    }
    return <Tag color="processing" icon={<ClockCircleOutlined />}>{status || "Applied"}</Tag>;
  };

  const recentColumns = [
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
      render: (text) => (
        <span style={{ fontWeight: 600, color: "#0f172a" }}>{text}</span>
      ),
    },
    {
      title: "Role / Position",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "Compensation (CTC)",
      dataIndex: "ctc",
      key: "ctc",
      render: (ctc) => (ctc ? `${ctc} LPA` : "--"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => getStatusTag(status),
    },
  ];

  if (loading) {
    return <Loader />;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Welcome Banner */}
      <Card
        style={{
          background: "linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)",
          borderRadius: 16,
          border: "none",
          color: "#ffffff",
          boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.3)",
        }}
      >
        <Row align="middle" justify="space-between" gutter={[16, 16]}>
          <Col xs={24} md={16}>
            <h1 style={{ color: "#ffffff", fontSize: 24, fontWeight: 800, margin: 0 }}>
              Welcome back to your Career Command Center
            </h1>
            <p style={{ color: "#c7d2fe", marginTop: 8, fontSize: 14, marginBottom: 0 }}>
              You currently have <strong>{totalJobs}</strong> applications tracked. Keep pushing forward!
            </p>
          </Col>
          <Col xs={24} md={8} style={{ textAlign: "right" }}>
            <Space>
              <Button
                type="default"
                size="large"
                style={{
                  background: "rgba(255, 255, 255, 0.15)",
                  color: "#ffffff",
                  borderColor: "rgba(255, 255, 255, 0.3)",
                  fontWeight: 600,
                }}
                onClick={() => navigate("/jobs")}
              >
                View Pipeline
              </Button>
              <Button
                type="primary"
                size="large"
                icon={<AppstoreAddOutlined />}
                style={{
                  background: "#ffffff",
                  color: "#4f46e5",
                  fontWeight: 700,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                }}
                onClick={() => navigate("/jobs")}
              >
                + New Application
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* KPI Stats Row */}
      <div className="stats-grid">
        <div className="kpi-card">
          <div className="kpi-info">
            <span className="kpi-label">Total Applications</span>
            <span className="kpi-value">{totalJobs}</span>
            <span className="kpi-trend positive">
              <RiseOutlined /> Active Pipeline
            </span>
          </div>
          <div className="kpi-icon-wrapper" style={{ background: "#eef2ff", color: "#4f46e5" }}>
            <SendOutlined />
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-info">
            <span className="kpi-label">Interviews</span>
            <span className="kpi-value">{interviewCount}</span>
            <span className="kpi-trend" style={{ color: "#7e22ce" }}>
              <SyncOutlined /> In progress
            </span>
          </div>
          <div className="kpi-icon-wrapper" style={{ background: "#f3e8ff", color: "#7e22ce" }}>
            <RocketOutlined />
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-info">
            <span className="kpi-label">Offers Received</span>
            <span className="kpi-value">{offerCount}</span>
            <span className="kpi-trend positive">
              <CheckCircleOutlined /> Successful
            </span>
          </div>
          <div className="kpi-icon-wrapper" style={{ background: "#ecfdf5", color: "#059669" }}>
            <DollarOutlined />
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-info">
            <span className="kpi-label">Pending / Screening</span>
            <span className="kpi-value">{pendingCount}</span>
            <span className="kpi-trend" style={{ color: "#0ea5e9" }}>
              <ClockCircleOutlined /> Awaiting updates
            </span>
          </div>
          <div className="kpi-icon-wrapper" style={{ background: "#f0f9ff", color: "#0284c7" }}>
            <ClockCircleOutlined />
          </div>
        </div>
      </div>

      {/* Middle Section: Pipeline Health & Recent List */}
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={15}>
          <Card
            title={<span style={{ fontWeight: 700, fontSize: 16 }}>Recent Applications</span>}
            extra={
              <Button type="link" onClick={() => navigate("/jobs")}>
                View All →
              </Button>
            }
            style={{ borderRadius: 16, height: "100%" }}
          >
            <Table
              dataSource={jobs.slice(0, 5)}
              columns={recentColumns}
              rowKey={(r) => r._id || r.id || Math.random()}
              pagination={false}
              size="middle"
            />
          </Card>
        </Col>

        <Col xs={24} lg={9}>
          <Card
            title={<span style={{ fontWeight: 700, fontSize: 16 }}>Pipeline Breakdown</span>}
            style={{ borderRadius: 16, height: "100%" }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <Text strong>Applied & Screening</Text>
                  <Text type="secondary">
                    {totalJobs ? Math.round((pendingCount / totalJobs) * 100) : 0}% ({pendingCount})
                  </Text>
                </div>
                <Progress
                  percent={totalJobs ? Math.round((pendingCount / totalJobs) * 100) : 0}
                  strokeColor="#4f46e5"
                  showInfo={false}
                />
              </div>

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <Text strong>Interviewing</Text>
                  <Text type="secondary">
                    {totalJobs ? Math.round((interviewCount / totalJobs) * 100) : 0}% ({interviewCount})
                  </Text>
                </div>
                <Progress
                  percent={totalJobs ? Math.round((interviewCount / totalJobs) * 100) : 0}
                  strokeColor="#7e22ce"
                  showInfo={false}
                />
              </div>

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <Text strong>Offers</Text>
                  <Text type="secondary">
                    {totalJobs ? Math.round((offerCount / totalJobs) * 100) : 0}% ({offerCount})
                  </Text>
                </div>
                <Progress
                  percent={totalJobs ? Math.round((offerCount / totalJobs) * 100) : 0}
                  strokeColor="#10b981"
                  showInfo={false}
                />
              </div>

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <Text strong>Declined / Closed</Text>
                  <Text type="secondary">
                    {totalJobs ? Math.round((rejectedCount / totalJobs) * 100) : 0}% ({rejectedCount})
                  </Text>
                </div>
                <Progress
                  percent={totalJobs ? Math.round((rejectedCount / totalJobs) * 100) : 0}
                  strokeColor="#ef4444"
                  showInfo={false}
                />
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;