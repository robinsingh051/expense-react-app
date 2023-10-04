import React, { useContext, useState, useEffect } from "react";
import { Toast } from "react-bootstrap";
import SuccessContext from "../store/success-context";

const SuccessToast = () => {
  const { text, hideText } = useContext(SuccessContext);
  const [show, setShow] = useState(!!text);

  useEffect(() => {
    setShow(!!text);
  }, [text]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      hideText();
    }, 2000);

    return () => clearTimeout(timer);
  }, [text, hideText]);

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
        className="text-white rounded"
        style={{ backgroundColor: "green" }}
      >
        <Toast.Body
          style={{
            fontFamily: "Helvetica",
            fontWeight: "bold",
            textTransform: "uppercase",
          }}
        >
          {text}
        </Toast.Body>
      </Toast>
    </div>
  );
};

export default SuccessToast;
