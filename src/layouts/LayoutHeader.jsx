import "./LayoutHeader.css";
import Logout from "../pages/Guest/Logout";
import { Header } from "antd/es/layout/layout";
import { theme } from "antd";
const LayoutHeader = () => {
  const { token: { colorBgContainer } } = theme.useToken();
  return (

    <Header style={{ padding: 0, background: colorBgContainer }} >
      <Logout />
    </Header>
  );
};
export default LayoutHeader;
