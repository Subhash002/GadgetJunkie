import React from "react";
import { Button, Container } from "react-bootstrap";
import { useRouteError } from "react-router";
import { Link } from "react-router-dom";

const ErrorScreen = () => {
  const error = useRouteError();
  return (
    <Container className="mt-5 text-center">
      <h1 className="display-1">Oops!</h1>
      <h2 className="display-4">Error {error.message}</h2>
      <p className="lead">Something went wrong. Please try again later.</p>
      <Button variant="light">
        {" "}
        <Link to={"/"} style={{ textDecoration: "none" }}>
          Return Home
        </Link>{" "}
      </Button>
    </Container>
  );
};

export default ErrorScreen;
