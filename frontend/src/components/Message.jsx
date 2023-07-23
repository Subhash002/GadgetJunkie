import Alert from "react-bootstrap/Alert";
import React from "react";

const Message = ({ variant, text }) => {
  return <Alert variant={variant}>{text}</Alert>;
};

Message.defaultProps = {
  variant: "info",
};
export default Message;
