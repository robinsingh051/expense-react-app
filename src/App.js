import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import { authActions } from "./store/auth";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "./UI/Loading";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Forget from "./pages/Forget";
import Header from "./components/Header";
import Profile from "./pages/Profile";
import { useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  // useffect for user validation
  useEffect(() => {
    const token = localStorage.getItem("token");

    function removeSpecialCharacters(email) {
      return email.replace(/[.@]/g, "");
    }

    const validateUser = async (token) => {
      if (token) {
        try {
          const { data } = await axios.post(
            `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.REACT_APP_API_KEY}`,
            { idToken: token }
          );
          setLoading(false);
          // storing the token into redux store
          dispatch(
            authActions.login({
              token: token,
              email: removeSpecialCharacters(data.users[0].email),
            })
          );
        } catch (error) {
          console.log(error);
          toast.error("something went wrong");
        }
      }
    };

    // calling the above function to validate the user
    validateUser(token);
  }, []);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (loading) return <Loading />;
  return (
    <>
      <Header />
      <Switch>
        <Route path="/" exact>
          {isLoggedIn && <Redirect to="/home" />}
          {!isLoggedIn && <Redirect to="/login" />}
        </Route>
        <Route path="/home">
          {isLoggedIn && <Home />}
          {!isLoggedIn && <Redirect to="/login" />}
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/profile">
          {isLoggedIn && <Profile />}
          {!isLoggedIn && <Redirect to="/login" />}
        </Route>
        {!isLoggedIn && (
          <Route path="/forget">
            <Forget />
          </Route>
        )}
      </Switch>
    </>
  );
}

export default App;
