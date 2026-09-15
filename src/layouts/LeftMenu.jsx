import {
  DashboardOutlined,
  AppstoreOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { memo, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const menuItems = [
  {
    key: "/",
    icon: <DashboardOutlined style={{ fontSize: 16 }} />,
    label: "Dashboard",
  },
  {
    key: "/jobs",
    icon: <AppstoreOutlined style={{ fontSize: 16 }} />,
    label: "Applications & Jobs",
  },
  {
    key: "/user",
    icon: <TeamOutlined style={{ fontSize: 16 }} />,
    label: "Team / Users",
  },
];

const LeftMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const selectedKey = useMemo(() => {
    if (location.pathname.startsWith("/jobs")) return "/jobs";
    if (location.pathname.startsWith("/user")) return "/user";
    return "/";
  }, [location.pathname]);

  const handleMenuClick = ({ key }) => {
    navigate(key);
  };

  return (
    <Menu
      onClick={handleMenuClick}
      theme="dark"
      mode="inline"
      selectedKeys={[selectedKey]}
      items={menuItems}
      className="sidebar-menu"
    />
  );
};

export default memo(LeftMenu);