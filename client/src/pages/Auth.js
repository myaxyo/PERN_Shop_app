import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { login, registration } from "../http/userAPI";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { login as loginSlice } from "../features/user/userSlice";
const Auth = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const clickAuth = async () => {
    try {
      let data;
      if (isLogin) {
        data = await login(email, password);
      } else {
        data = await registration(email, password);
      }
      dispatch(loginSlice(data));
      navigate(SHOP_ROUTE);
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 54 }}
    >
      <Card style={{ width: 600 }} className="p-5">
        <h2 className="m-auto">{isLogin ? "Sign In" : "Sign Up"}</h2>
        <Form className="d-flex flex-column">
          <Form.Control
            placeholder="Enter your email"
            type="email"
            className="mt-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Control
            placeholder="Enter your password"
            type="password"
            className="mt-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
            <Col>
              {isLogin ? (
                <div>
                  Not registered?{" "}
                  <NavLink to={REGISTRATION_ROUTE}>Sign Up</NavLink>
                </div>
              ) : (
                <div>
                  Already registered?{" "}
                  <NavLink to={LOGIN_ROUTE}>Sign In</NavLink>
                </div>
              )}
            </Col>
            <Col className="d-flex justify-content-end">
              <Button variant={"outline-success"} onClick={clickAuth}>
                {isLogin ? "Login" : "Sign Up"}
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </Container>
  );
};

export default Auth;
