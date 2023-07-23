import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../assets/gj.png";
import { useDispatch, useSelector } from "react-redux";
import Badge from "react-bootstrap/Badge";
import { LinkContainer } from "react-router-bootstrap";
import { AiOutlineLogin, AiOutlineShoppingCart } from "react-icons/ai";
import { GrUserAdmin } from "react-icons/gr";
import { FiLogOut } from "react-icons/fi";
import { RiUserSettingsLine, RiUserStarFill } from "react-icons/ri";
import { NavDropdown } from "react-bootstrap";
import { logout } from "../slices/authSlice";
import { useNavigate } from "react-router";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { toast } from "react-toastify";
import SearchBox from "./SearchBox";
import { clearCart } from "../slices/cartSlice";

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
      dispatch(clearCart());
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <header>
      <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to={"/"}>
            <Navbar.Brand>
              <img
                src={logo}
                style={{ height: "80px", width: "120px" }}
                alt="GadgetJunkie"
              />
              Gadget Junkie
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <SearchBox />
              <LinkContainer to={"/cart"}>
                <Nav.Link>
                  <AiOutlineShoppingCart /> Cart
                  {cartItems.length > 0 && (
                    <Badge pill bg="success" style={{ marginLeft: "5px" }}>
                      {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown
                  style={{ textTransform: "capitalize" }}
                  title={
                    <>
                      <RiUserStarFill /> {userInfo.name}
                    </>
                  }
                  id="username"
                >
                  <LinkContainer to={"/profile"}>
                    <NavDropdown.Item>
                      {" "}
                      <RiUserSettingsLine /> Profile
                    </NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    <FiLogOut /> Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to={"/login"}>
                  <Nav.Link>
                    <AiOutlineLogin /> Login
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown
                  title={
                    <>
                      <GrUserAdmin />
                      Admin
                    </>
                  }
                  id="adminmenu"
                >
                  <LinkContainer to={"/admin/orderlist"}>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to={"/admin/productlist"}>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to={"/admin/userlist"}>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
