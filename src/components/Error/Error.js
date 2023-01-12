import React from "react";
import Alert from "react-bootstrap/Alert";

const Error = () => {
  <Alert variant="danger" dismissible>
    <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
    <p>
      There is an error caused from the Servers.
      Please Try Again
    </p>
  </Alert>;
};

export default Error;
