import { useState, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import ErrorContext from "../store/error-context";

import { Card, Form, Button, Container } from "react-bootstrap";

const Register = () => {
  const history = useHistory();

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();
  const nameInputRef = useRef();

  const [isLoading, setIsLoading] = useState(false);

  const errorCtx = useContext(ErrorContext);

  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredConfirmPassword = confirmPasswordInputRef.current.value;
    const enteredName = nameInputRef.current.value;

    if (enteredPassword !== enteredConfirmPassword) {
      console.log("enter same password");
      errorCtx.showError("please enter same password");
    } else {
      setIsLoading(true);
      const newDetails = {
        name: enteredName,
        email: enteredEmail,
        password: enteredPassword,
      };

      console.log(newDetails);
      try {
        const response = await axios.post(
          "http://localhost:3000/users/signUp",
          newDetails
        );
        console.log(response.data);
      } catch (err) {
        let errorMessage = "User Already exists";
        errorCtx.showError(errorMessage);
      } finally {
        setIsLoading(false);
      }
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
          <h5>Register</h5>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="formName" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                name="name"
                ref={nameInputRef}
                required
              />
            </Form.Group>

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

            <Form.Group controlId="formConfirmPassword" className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="confirm password"
                name="password"
                ref={confirmPasswordInputRef}
                required
              />
            </Form.Group>
            {!isLoading && (
              <Button variant="primary" type="submit">
                Submit
              </Button>
            )}
            {isLoading && <p>Sending Request</p>}
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Register;
