import React, { useContext, useState, useEffect } from "react";
import { Toast } from "react-bootstrap";
import ErrorContext from "../store/error-context";

const ErrorToast = () => {
  const { error, hideError } = useContext(ErrorContext);
  const [show, setShow] = useState(!!error);

  useEffect(() => {
    setShow(!!error);
  }, [error]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      hideError();
    }, 2000); // Adjust the duration (in milliseconds) as needed

    return () => clearTimeout(timer);
  }, [error, hideError]);

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: 9999,
      }}
    >
      <Toast
        show={show}
        onClose={() => setShow(false)}
        autohide
        className="text-black rounded"
        style={{ backgroundColor: "red" }}
      >
        <Toast.Body
          style={{
            fontFamily: "Helvetica",
            fontWeight: "bold",
            textTransform: "uppercase",
          }}
        >
          {error}
        </Toast.Body>
      </Toast>
    </div>
  );
};

export default ErrorToast;
