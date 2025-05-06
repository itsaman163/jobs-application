import { UploadOutlined, UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import React from "react";
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
        label: "In Active Jobs"
    },
    {
        key: 3,
        icon: React.createElement(UploadOutlined),
        label: "About"
    }
];


const LeftMenu = () => {
    const navigate = useNavigate();
    const onClick = (e) => {
        debugger;
        const selectedItem = MenuArr.find(item => item.key == e.key);
        if (selectedItem?.path) {
            navigate(selectedItem.path);
        }
    }
    return (
        <Menu onClick={onClick} theme="dark" mode="inline" defaultSelectedKeys={['1']} items={MenuArr} />
    )
}
export default LeftMenu; 