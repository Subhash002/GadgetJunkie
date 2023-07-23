import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Nav } from "react-bootstrap";
import { BsPatchCheckFill, BsPatchCheck } from "react-icons/bs";
const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className="justify-content-center mb-4">
      <Nav.Item>
        {step1 ? (
          <LinkContainer to={"/login"}>
            <Nav.Link>
              {" "}
              <BsPatchCheckFill /> Sign In
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>
            {" "}
            <BsPatchCheck /> Sign In
          </Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step2 ? (
          <LinkContainer to={"/shipping"}>
            <Nav.Link>
              {" "}
              <BsPatchCheckFill /> Shipping
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>
            {" "}
            <BsPatchCheck /> Shipping
          </Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step3 ? (
          <LinkContainer to={"/payment"}>
            <Nav.Link>
              {" "}
              <BsPatchCheckFill /> Payment
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>
            {" "}
            <BsPatchCheck /> Payment
          </Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step4 ? (
          <LinkContainer to={"/placeorder"}>
            <Nav.Link>
              {" "}
              <BsPatchCheckFill /> Place Order
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>
            {" "}
            <BsPatchCheck /> Place Order
          </Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutSteps;
