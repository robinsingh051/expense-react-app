import { useState, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import ErrorContext from "../store/error-context";
import AuthContext from "../store/auth-context";

import { Card, Form, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Login = () => {
  const history = useHistory();

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [isLoading, setIsLoading] = useState(false);

  const errorCtx = useContext(ErrorContext);
  const authCtx = useContext(AuthContext);

  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    setIsLoading(true);
    const userDetails = {
      email: enteredEmail,
      password: enteredPassword,
    };

    console.log(userDetails);
    try {
      const response = await axios.post(
        "http://localhost:4000/users/logIn",
        userDetails
      );
      console.log(response.data.token);
      authCtx.login(response.data.token);
      history.replace("/home");
    } catch (err) {
      let errorMessage = "User doesn't exist";
      errorCtx.showError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center mt-5">
      <Card
        style={{
          width: "20rem",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Card.Body>
          <h5>Login</h5>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                ref={emailInputRef}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                name="password"
                ref={passwordInputRef}
                required
              />
            </Form.Group>

            {!isLoading && (
              <Button variant="primary" type="submit">
                Log In
              </Button>
            )}
            {isLoading && <p>Sending Request</p>}
          </Form>
        </Card.Body>
        <Link to="/register">New User?</Link>
      </Card>
    </Container>
  );
};

export default Login;
