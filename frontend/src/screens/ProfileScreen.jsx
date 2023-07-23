import React, { useEffect, useState } from "react";
import { Table, Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { LinkContainer } from "react-router-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { FaTimes } from "react-icons/fa";
import { useProfileMutation } from "../slices/usersApiSlice";
import { useGetMyOrdersQuery } from "../slices/orderApiSlice";
import { setCredentials } from "../slices/authSlice";
import Message from "../components/Message";
const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading }] = useProfileMutation();
  const {
    data: orders,
    isLoading: myOrdersLoading,
    error: ordersError,
  } = useGetMyOrdersQuery();
  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password does not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          password,
          email,
        }).unwrap();
        dispatch(setCredentials(res));
        toast.success("Profile updated successfully");
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <Row>
      <Col md="3">
        <h2>User Profile</h2>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name" className="my-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => {
                e.persist();
                setName(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group controlId="email" className="my-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => {
                e.persist();
                setEmail(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group controlId="password" className="my-3">
            <Form.Label>Enter Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => {
                e.persist();
                setPassword(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group controlId="confirmPassword" className="my-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Please confirm password"
              value={confirmPassword}
              onChange={(e) => {
                e.persist();
                setConfirmPassword(e.target.value);
              }}
            />
          </Form.Group>
          <Button
            type="submit"
            variant="primary"
            className="mt-2"
            disabled={isLoading}
          >
            Update Profile
          </Button>
          {isLoading && <Spinner animation="grow" variant="light" />}
        </Form>
      </Col>
      <Col md="9">
        <h2>My Orders</h2>
        {myOrdersLoading ? (
          <Spinner animation="grow" variant="dark" />
        ) : ordersError ? (
          <Message
            text={ordersError?.error || ordersError?.data?.message}
            variant={"danger"}
          />
        ) : (
          <Table
            striped
            bordered
            responsive
            hover
            variant="dark"
            className="table-sm"
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className="btn-sm" variant="light">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
