import { UploadOutlined, UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import React, { memo, useState } from "react";
import { useNavigate } from "react-router-dom";

const MenuArr = [
    {
        key: 1,
        icon: React.createElement(UserOutlined),
        label: "All Job",
        path: "/jobs"
    },
    {
        key: 2,
        icon: React.createElement(VideoCameraOutlined),
        label: "Users",
        path: "/user"
    },
    {
        key: 3,
        icon: React.createElement(UploadOutlined),
        label: "About",
        path: "/about"
    }
];


const LeftMenu = () => {
    const navigate = useNavigate();
    const [defaultSelectedKeys, setDefaultSelectedKeys] = useState([0]);
    const onClick = (e) => {
        const selectedItem = MenuArr.find(item => item.key == e.key);
        if (selectedItem?.path) {
            navigate(selectedItem.path);
        }
    }
    return (
        <Menu onClick={onClick} theme="dark" mode="inline" defaultSelectedKeys={defaultSelectedKeys} items={MenuArr} />
    )
}
export default memo(LeftMenu); 