import { memo, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Space } from "antd";
import { PoweroffOutlined } from "@ant-design/icons";
import { deleteSession } from "../../helper/auth";
import { LoginContext } from "../../App";
const Logout = () => {
  const navigate = useNavigate();
  const { setIsLogin } = useContext(LoginContext);
  const logoutHandler = () => {
    deleteSession();
    setIsLogin(null);
    navigate('/');
  };

  return (
    <Space direction="vertical" className="logout-button">
      <Button
        type="primary"
        icon={<PoweroffOutlined />}
        onClick={logoutHandler}
      >
      </Button>
    </Space>
  )
}

export default memo(Logout);
