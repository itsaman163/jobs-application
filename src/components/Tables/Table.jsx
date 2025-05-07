import { Space, Table, Tag } from 'antd';
const TableData = ({ columns, data }) => {

    return (
        <Table size="small" columns={columns} dataSource={data} rowKey="_id"/>
    )
}
export default TableData;