import { Space, Table, Tag } from 'antd';
const TableData = ({ columns, data }) => {

    return (
        <Table columns={columns} dataSource={data} rowKey="_id"/>
    )
}
export default TableData;