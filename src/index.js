import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./store/auth-context";

//React bootstarp configuration
import "../node_modules/react-bootstrap/dist/react-bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import { ErrorContextProvider } from "./store/error-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ErrorContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </ErrorContextProvider>
  </BrowserRouter>
);
