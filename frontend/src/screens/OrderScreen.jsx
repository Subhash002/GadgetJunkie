import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Message from "../components/Message";
import Spinner from "react-bootstrap/Spinner";
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
  useDeliveredOrderMutation,
} from "../slices/orderApiSlice";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

const OrderScreen = () => {
  const { id: orderId } = useParams();
  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);
  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPayPalClientIdQuery();
  const { userInfo } = useSelector((state) => state.auth);
  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliveredOrderMutation();
  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "CNY",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) loadPayPalScript();
      }
    }
  }, [order, paypal, paypalDispatch, loadingPayPal, errorPayPal]);
  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success("Payment Successful");
      } catch (error) {
        toast.error(error?.message || error?.data?.message);
      }
    });
  }
  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              currency_code: "USD", // Use the correct currency code here
              value: order.totalPrice, // Assuming order.totalPrice is in INR
            },
          },
        ],
      })
      .then((orderId) => orderId);
  }

  function onError(error) {
    toast.error(error?.message || error?.data?.message);
  }
  const deliverHandle = async () => {
    try {
      await deliverOrder(orderId);
      refetch();
      toast.success(`Order ${orderId} is delivered`);
    } catch (error) {
      toast.error(error?.message || error?.data?.message);
    }
  };

  const onApproveTest = async () => {
    await payOrder({ orderId, details: { payer: {} } });
    refetch();
    toast.success("Payment Successful");
  };
  return isLoading ? (
    <Spinner animation="grow" variant="light" />
  ) : error ? (
    <Message title={error} variant={"danger"} />
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p style={{ textTransform: "capitalize" }}>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p style={{ textTransform: "capitalize" }}>
                <strong>Email: </strong> {order.user.email}
              </p>
              <p style={{ textTransform: "capitalize" }}>
                <strong>Address:</strong>{" "}
                {`${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.postalCode}, ${order.shippingAddress.country}`}
              </p>
              {order.isDelivered ? (
                <Message
                  variant={"success"}
                  text={`Delivered on ${order.deliveredAt.substring(0, 10)}`}
                />
              ) : (
                <Message variant={"danger"} text={`Not Delivered`} />
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message
                  variant={"success"}
                  text={`Paid on ${order.paidAt.substring(0, 10)}`}
                />
              ) : (
                <Message variant={"danger"} text={`Not Paid`} />
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.map((item, index) => (
                <ListGroup.Item key={index}>
                  <Row>
                    <Col md={1}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col>
                      <Link to={`/products/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={4}>
                      {item.qty} X ${item.price} =${item.price * item.qty}
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
                <Row>
                  <Col>Total Price</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {/* Pay Order Placeorder */}
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Spinner animation="grow" variant="light" />}
                  {isPending ? (
                    <Spinner animation="grow" variant="light" />
                  ) : (
                    <div>
                      {/* This i will remove for testing only */}
                      <Button
                        style={{ marginBottom: "10px" }}
                        onClick={onApproveTest}
                      >
                        Test Pay Order
                      </Button>
                      <div>
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        ></PayPalButtons>
                      </div>
                    </div>
                  )}
                </ListGroup.Item>
              )}
              {/* Mark as delivered Placeorder */}
              {loadingDeliver && <Spinner animation="grow" variant="light" />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={deliverHandle}
                    >
                      Mark as delivered
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
