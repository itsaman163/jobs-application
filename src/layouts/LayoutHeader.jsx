import { useContext } from "react";
import { Layout, Avatar, Dropdown, Space, Typography, Tag } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  BellOutlined,
} from "@ant-design/icons";
import { LoginContext } from "../App";
import { deleteSession } from "../helper/auth";
import { useNavigate, useLocation } from "react-router-dom";

const { Header } = Layout;
const { Text } = Typography;

const LayoutHeader = () => {
  const { loginData, setIsLogin, setLoginData } = useContext(LoginContext);
  const navigate = useNavigate();
  const location = useLocation();

  const getPageTitle = () => {
    if (location.pathname.startsWith("/jobs")) return "Job Applications";
    if (location.pathname.startsWith("/user")) return "Team & User Management";
    return "Overview Dashboard";
  };

  const handleLogout = () => {
    deleteSession();
    setLoginData(null);
    setIsLogin(false);
    navigate("/login");
  };

  const userName = loginData?.user || loginData?.name || "Member";
  const userRole = loginData?.role || "Candidate";
  const userInitial = userName.charAt(0).toUpperCase();

  const profileMenuItems = [
    {
      key: "user-info",
      label: (
        <div style={{ padding: "4px 0" }}>
          <div style={{ fontWeight: 700, color: "#0f172a" }}>{userName}</div>
          <div style={{ fontSize: 12, color: "#64748b" }}>{loginData?.email || "Logged in user"}</div>
        </div>
      ),
      disabled: true,
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      icon: <LogoutOutlined style={{ color: "#ef4444" }} />,
      danger: true,
      label: "Sign Out",
      onClick: handleLogout,
    },
  ];

  return (
    <Header className="app-header">
      <div className="header-left">
        <h2 className="header-page-title">{getPageTitle()}</h2>
      </div>

      <div className="header-right">
        <Space size={16}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "#f1f5f9",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#64748b",
            }}
          >
            <BellOutlined style={{ fontSize: 16 }} />
          </div>

          <Dropdown menu={{ items: profileMenuItems }} placement="bottomRight" arrow>
            <div className="header-user-badge">
              <Avatar
                size={30}
                style={{
                  backgroundColor: "#4f46e5",
                  verticalAlign: "middle",
                  fontSize: 14,
                  fontWeight: 700,
                }}
                icon={!userInitial && <UserOutlined />}
              >
                {userInitial}
              </Avatar>
              <span className="header-user-name">{userName}</span>
              <Tag color="indigo" style={{ margin: 0, fontSize: 11, fontWeight: 600 }}>
                {userRole}
              </Tag>
            </div>
          </Dropdown>
        </Space>
      </div>
    </Header>
  );
};

export default LayoutHeader;
