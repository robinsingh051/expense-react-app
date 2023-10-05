import React from "react";
import { Nav, Navbar, Container, Button } from "react-bootstrap";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth";

const Header = (props) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isPremiumAvailable = useSelector(
    (state) => state.expenses.isPremiumAvailable
  );
  const dispatch = useDispatch();
  const history = useHistory();

  const loginHandler = () => {
    history.push("/login");
  };

  const registerHandler = () => {
    history.push("/register");
  };

  const logoutHandler = () => {
    dispatch(authActions.logout());
    history.replace("/");
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Nav className="me-auto">
          {isLoggedIn && (
            <NavLink to="/home" className="nav-link">
              Home
            </NavLink>
          )}
          {isLoggedIn && (
            <NavLink to="/profile" className="nav-link">
              Profile
            </NavLink>
          )}
        </Nav>
        {isPremiumAvailable && (
          <Button variant="outline-light" style={{ marginRight: 6 }}>
            Activate Premium
          </Button>
        )}
        {isLoggedIn && (
          <Button variant="outline-light" onClick={logoutHandler}>
            Log Out
          </Button>
        )}
        {!isLoggedIn && (
          <Button
            variant="outline-light"
            onClick={registerHandler}
            style={{ marginRight: 6 }}
          >
            Register
          </Button>
        )}
        {!isLoggedIn && (
          <Button variant="outline-light" onClick={loginHandler}>
            Log In
          </Button>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
