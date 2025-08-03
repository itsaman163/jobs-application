import { memo, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Popconfirm, Space } from "antd";
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

      <Popconfirm
        title="Logout"
        description="Are you sure to Logout?"
        onConfirm={logoutHandler}
        okText="Yes"
        cancelText="No"
      >
        <Button
          type="primary"
          icon={<PoweroffOutlined />}
        >
        </Button>
      </Popconfirm>

    </Space>
  )
}

export default memo(Logout);
