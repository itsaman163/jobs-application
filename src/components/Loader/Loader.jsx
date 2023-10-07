import { Spin } from "antd";
// import "./loader.css";

const Loader = (props) => {
  const { size = "large", children = null, ...rest } = props; // default, small, large

  return (
    <div className="custom-loader ">
      <Spin size={size} {...rest}>
        {children}
      </Spin>
    </div>
  );
};

export default Loader;