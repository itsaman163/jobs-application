import { Table } from "antd";

const TableData = ({ columns, data, loading = false }) => {
  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey={(r) => r._id || r.id || Math.random().toString()}
      loading={loading}
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "50"],
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
      }}
      scroll={{ x: 800 }}
      size="middle"
      style={{
        borderRadius: 12,
        overflow: "hidden",
      }}
    />
  );
};

export default TableData;