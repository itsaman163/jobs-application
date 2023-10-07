import { Button } from "antd";
import "./Link.css";
import { Link } from "react-router-dom";
const CustomLink = (props) => {
  let { className = "", ...rest } = props;
  className = "custom-link " + className;

  return <Link className={className} {...rest}></Link>;
};

export default CustomLink;
