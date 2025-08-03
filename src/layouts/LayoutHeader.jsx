import "./LayoutHeader.css";
import Logout from "../pages/Guest/Logout";
import { Header } from "antd/es/layout/layout";
import { theme } from "antd";
import { LoginContext } from "../App";
import { useContext } from "react";
const LayoutHeader = () => {
  const { token: { colorBgContainer } } = theme.useToken();
  const { loginData } = useContext(LoginContext);

  return (

    <Header style={{ padding: 0, background: colorBgContainer }} >
      <div className="header-right-itm">
        <div>
          <span className="user-name">
            {loginData.user}
          </span>
        </div>
        <Logout />
      </div>
    </Header>
  );
};
export default LayoutHeader;
