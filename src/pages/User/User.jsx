import { useEffect, useState } from "react";
import { apiRequestV1 } from "../../helper/general";
import Loader from "../../components/Loader/Loader";
import { Button, Typography } from "antd";
import TableData from "../../components/Tables/Table";

const User = () => {
    const [userList, setUserList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name"
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email"
        },
        {
            title: "Password",
            dataIndex: "password",
            key: "password"
        }
    ];
    const getUserList = async () => {
        try {
            console.log("fdf");
            const apiParams = {
                method: "GET",
                apiParams: {}
            }
            const apiRes = await apiRequestV1("/auth", apiParams)
            setIsLoading(false);
            if (apiRes.setting.success) {
                setUserList(apiRes.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getUserList();
    }, [])
    return (
        <>
            {isLoading && <Loader />}
            <Button type="primary" className="add-button">
                Add New User
            </Button>
            <Typography.Title level={3} className="table-heading">
                All Users
            </Typography.Title>
            <TableData columns={columns} data={userList} />
        </>
    )
}
export default User;