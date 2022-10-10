import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { useDispatch } from "react-redux";
import { login, logout } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
const NavBar = () => {
  const { isAuth } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Navbar bg="dark" variant="dark" className="mb-4">
      <Container>
        <NavLink
          to={SHOP_ROUTE}
          style={{ color: "white", textDecoration: "none" }}
        >
          ShopBoom
        </NavLink>
        {isAuth ? (
          <Nav className="ml-auto" style={{ gap: "10px" }}>
            <Button
              variant="outline-light"
              onClick={() => navigate(ADMIN_ROUTE)}
            >
              Admin
            </Button>
            <Button
              variant="outline-light"
              onClick={() => {
                navigate(LOGIN_ROUTE);
                dispatch(logout());
                localStorage.removeItem("token");
              }}
            >
              Logout
            </Button>
          </Nav>
        ) : (
          <Nav className="ml-auto">
            <Button
              variant="outline-light"
              onClick={() => navigate(LOGIN_ROUTE)}
            >
              Auth
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
};

export default NavBar;
