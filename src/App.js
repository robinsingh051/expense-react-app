import React, { useContext } from "react";
import AuthContext from "./store/auth-context";
import { Route, Switch, Redirect } from "react-router-dom";

import Register from "./pages/Register";
import ErrorToast from "./UI/ErrorToast";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Forget from "./pages/Forget";
import Header from "./components/Header";
import Profile from "./pages/Profile";
import SuccessToast from "./UI/SuccessToast";

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <>
      <ErrorToast />
      <SuccessToast />
      <Header />
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
        <Route path="/profile">
          {authCtx.isLoggedIn && <Profile />}
          {!authCtx.isLoggedIn && <Redirect to="/login" />}
        </Route>
        {!authCtx.isLoggedIn && (
          <Route path="/forget">
            <Forget />
          </Route>
        )}
      </Switch>
    </>
  );
}

export default App;
