import React, { useContext } from "react";
import { Nav, Navbar, Container, Button } from "react-bootstrap";
import { NavLink, useHistory } from "react-router-dom";
import AuthContext from "../store/auth-context";

const Header = (props) => {
  const history = useHistory();

  const authCtx = useContext(AuthContext);

  const loginHandler = () => {
    history.push("/login");
  };

  const registerHandler = () => {
    history.push("/register");
  };

  const logoutHandler = () => {
    authCtx.logout();
    history.replace("/");
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Nav className="me-auto">
          {authCtx.isLoggedIn && (
            <NavLink to="/home" className="nav-link">
              Home
            </NavLink>
          )}
          {authCtx.isLoggedIn && (
            <NavLink to="/profile" className="nav-link">
              Profile
            </NavLink>
          )}
        </Nav>
        {authCtx.isLoggedIn && (
          <Button variant="outline-light" onClick={logoutHandler}>
            Log Out
          </Button>
        )}
        {!authCtx.isLoggedIn && (
          <Button
            variant="outline-light"
            onClick={registerHandler}
            style={{ marginRight: 6 }}
          >
            Register
          </Button>
        )}
        {!authCtx.isLoggedIn && (
          <Button variant="outline-light" onClick={loginHandler}>
            Log In
          </Button>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
