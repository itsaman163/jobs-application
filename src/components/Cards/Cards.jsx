import { Avatar, Card, Skeleton } from "antd";
import Meta from "antd/es/card/Meta";
import { EditOutlined, SettingOutlined } from "@ant-design/icons";
const Cards = (props) => {
  return (
    <Card
      style={{
        width: 300,
        marginTop: 16,
      }}
      actions={[
        <EditOutlined onClick={()=>props.getFormData(props.data?._id)} />,
        <SettingOutlined key="setting" />,
      ]}
    >
      <Skeleton loading={false} avatar active>
        <Meta
          avatar={
            <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=2" />
          }
          title={props?.data?.position}
          description={props?.data?.company}
        />
      </Skeleton>
    </Card>
  );
};
export default Cards;
