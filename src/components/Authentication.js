import React, { Fragment, useContext, useState } from "react";
import AuthContext from "./Store/AuthContext";
import classes from "./Authentication.module.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authAction } from "./ReduxStore/AuthReducer";

const Authentication = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [login, setLogin] =useState(true)
  const dispatch=useDispatch()
//   const AuthCntx = useContext(AuthContext);
//   const isLogin = AuthCntx.isLogin;

//   const switchAuthHandler = AuthCntx.switchAuth;

  const switchHandler = () => {
    // switchAuthHandler();
    setLogin(!login)
  };

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };
  let url;
  const Auth = async() => {
    if (login) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDEEV5oe8QHzMWZ9RLhehZG6wu6Ez0agmQ";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDEEV5oe8QHzMWZ9RLhehZG6wu6Ez0agmQ";
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);

      if (!data.error) {
        localStorage.setItem("token", data.idToken);
      //   setIsAuthenticate(true);
      dispatch(authAction.login())  //this login function from AuthReducer

        localStorage.setItem("email", email);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    // AuthCntx.authFunction(email, password)
    // console.log(email,password)
    Auth()

  };
  return (
    <Fragment>
      <div className={classes.parent}>
        <form onSubmit={submitHandler} className={classes.form}>
          <label>Email</label>
          <input
            type="email"
            placeholder="enter email"
            value={email}
            onChange={emailHandler}
          ></input>
          <label>Password</label>
          <input
            type="password"
            placeholder="enter password"
            value={password}
            onChange={passwordHandler}
          ></input>
          <div className={classes.buttonParent}>
            <button type="submit" className="btn btn-primary">
              {login ? "login" : "signUp"}
            </button>
            <button
              onClick={switchHandler}
              type="button"
              className="btn btn-primary"
            >
              {login ? "create account" : "login with account"}
            </button>
            <div className={classes.link}>
              <Link to="/ForgotPassword">Forgot Password</Link>
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default Authentication;
