import React, { useContext } from "react";
import AuthContext from "./store/auth-context";
import { Route, Switch, Redirect } from "react-router-dom";

import Register from "./pages/Register";
import ErrorToast from "./UI/ErrorToast";
import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {
  const authCtx = useContext(AuthContext);
  console.log(authCtx.isLoggedIn);
  return (
    <>
      <ErrorToast />
      <Switch>
        <Route path="/" exact>
          {authCtx.isLoggedIn && <Redirect to="/home" />}
          {!authCtx.isLoggedIn && <Redirect to="/login" />}
        </Route>
        <Route path="/home">
          {authCtx.isLoggedIn && <Home />}
          {!authCtx.isLoggedIn && <Redirect to="/login" />}
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
      </Switch>
    </>
  );
}

export default App;
