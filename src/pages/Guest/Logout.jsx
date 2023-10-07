import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Space } from "antd";
import { PoweroffOutlined } from "@ant-design/icons";
import { deleteSession } from "../../helper/auth";
import { LoginContext } from "../../App";
const Logout = () => {
  const navigate = useNavigate();
  const [loadings, setLoadings] = useState([]);
  const { setIsLogin } = useContext(LoginContext);
  const logoutHandler = (index) => {
    deleteSession();
    setIsLogin(null);
    navigate('/');
  };

return (
  <Space direction="vertical">
    <Button
      type="primary"
      icon={<PoweroffOutlined />}
      loading={loadings[1]}
      onClick={() => logoutHandler()}
    >
      Logout
    </Button>
  </Space>
)
}

export default Logout;
