import { Button } from "antd";
import "./Button.css";
const CustomButton = (props) => {
  let { className = "", ...rest } = props;
  className = "custom-button " + className;

  return (
    <>
      <Button className={className} {...rest}></Button>
    </>
  );
};

export default CustomButton;
