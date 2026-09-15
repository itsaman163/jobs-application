import { useEffect, useState, useMemo } from "react";
import { apiRequestV1, errorMsg } from "../../helper/general";
import Loader from "../../components/Loader/Loader";
import { Avatar, Button, Image, Input, Space, Tag } from "antd";
import {
  UserOutlined,
  SearchOutlined,
  ReloadOutlined,
  TeamOutlined,
  FileImageOutlined,
} from "@ant-design/icons";
import TableData from "../../components/Tables/Table";

const User = () => {
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const columns = [
    {
      title: "Photo",
      key: "profilePicture",
      align: "center",
      width: 90,
      render: (_, record) => {
        const photoUrl =
          record.profilePicture && record.profilePicture !== "--"
            ? record.profilePicture
            : record.profilePicture && record.profilePicture !== "--" && record.profilePicture.startsWith("http")
              ? record.profilePicture
              : null;

        return photoUrl ? (
          <Image
            src={photoUrl}
            alt={record.name || "Profile"}
            width={42}
            height={42}
            style={{
              borderRadius: 8,
              objectFit: "cover",
              border: "1px solid #e2e8f0",
            }}
          />
        ) : (
          <Avatar
            style={{
              backgroundColor: "#4f46e5",
              fontWeight: 700,
            }}
            size={40}
            icon={!record.name && <UserOutlined />}
          >
            {(record.name || "U").charAt(0).toUpperCase()}
          </Avatar>
        );
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name, record) => (
        <div>
          <div style={{ fontWeight: 700, color: "#0f172a" }}>
            {name || "User"}
          </div>
          <div style={{ fontSize: 12, color: "#94a3b8" }}>
            ID: {record._id ? `${record._id.slice(-6)}` : "--"}
          </div>
        </div>
      ),
    },
    {
      title: "Email Address",
      dataIndex: "email",
      key: "email",
      render: (email) => (
        <span style={{ color: "#334155", fontWeight: 500 }}>{email}</span>
      ),
    },
    {
      title: "Role / Permissions",
      dataIndex: "role",
      key: "role",
      render: (role) => (
        <Tag color={role === "admin" ? "purple" : "blue"} style={{ fontWeight: 600 }}>
          {(role || "Member").toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Joined Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => (date ? new Date(date).toLocaleDateString() : "--"),
    },
  ];

  const getUserList = async () => {
    try {
      setIsLoading(true);
      const apiParams = {
        method: "GET",
        apiParams: {},
      };
      const apiRes = await apiRequestV1("/auth", apiParams);
      if (apiRes?.setting?.success === "1" || apiRes?.setting?.success === true) {
        setUserList(apiRes.data || []);
      } else {
        errorMsg(apiRes?.setting?.message || "Failed to fetch users");
      }
    } catch (error) {
      console.error("Fetch users error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserList();
  }, []);

  const filteredUsers = useMemo(() => {
    return userList.filter(
      (u) =>
        !searchTerm ||
        (u.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (u.email || "").toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [userList, searchTerm]);

  return (
    <div className="page-wrapper">
      {isLoading && <Loader />}

      <div className="table-toolbar">
        <div className="toolbar-filters">
          <Input
            placeholder="Search team members by name or email..."
            prefix={<SearchOutlined style={{ color: "#94a3b8" }} />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            allowClear
            style={{ width: 340 }}
          />
          <Button icon={<ReloadOutlined />} onClick={getUserList}>
            Refresh
          </Button>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Tag icon={<TeamOutlined />} color="indigo" style={{ padding: "4px 10px", fontSize: 13 }}>
            Total: {userList.length} Users
          </Tag>
        </div>
      </div>

      <TableData columns={columns} data={filteredUsers} />
    </div>
  );
};

export default User;