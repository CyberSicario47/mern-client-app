import React from "react";
import Alert from "react-bootstrap/Alert";

const Error = (props) => {
  <Alert variant="danger" dismissible>
    <Alert.Heading>Oh snap! An error occured!</Alert.Heading>
    <p>
      {props.description}
    </p>
  </Alert>;
};

export default Error;
