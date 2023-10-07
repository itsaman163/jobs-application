import { Button } from "antd";
import "./Phone.css";
import React from "react";
import FormItem from "antd/es/form/FormItem";
import PhoneInput from "antd-phone-input";
const CustomPhone = (props) => {
  let { className = "", ...rest } = props;
  className = "custom-link " + className;

  return (
    <>
      <FormItem name="phone">
        <PhoneInput enableSearch />
      </FormItem>
    </>
  );
};

export default CustomPhone;
