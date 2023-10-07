import { Input } from "antd";
import "./input.css";
const CustomInput = (props) => {
  let { className = "", ...rest } = props;
  className = "custom-input " + className;

  return <Input className={className} {...rest} />;
};

export default CustomInput;
