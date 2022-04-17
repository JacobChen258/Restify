import React, { useContext } from "react";
import "./Login.css";
import restify_logo from "../../images/restify_logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import AuthContext from "../Context/AuthContext";
import jwt_decode from "jwt-decode";

const Login = () => {
  const { setUser, user, setAuthTokens, logoutUser } = useContext(AuthContext);
  console.log(setUser);
  const nav = useNavigate();
  const validation = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validation,
    onSubmit: async (values) => {
      console.log(values);

      console.log(values);
      axios
        .post("/user/login/", values)
        .then((res) => {
          console.log(res.data.access);
          localStorage.setItem("authTokens", JSON.stringify(res.data));
          setAuthTokens(res.data);
          console.log(jwt_decode(res.data.access));
          setUser(jwt_decode(res.data.access));
          console.log(user);

          nav("/");
        })
        .catch((err) => {
          if (err.response.status === 401) {
            formik.setErrors({ username: "Invalid username or password" });
          } else {
            formik.setErrors({ username: "Pleade fix form errors" });
          }
          formik.setFieldValue("password", "", false);
          formik.setFieldTouched("password", false, false);
        });
    },
  });

  // const performLogin = (values) => {};

  return !user ? (
    <div className="vh-100">
      <div className="login-form">
        <form className="form-login" onSubmit={formik.handleSubmit}>
          <div className="text-center">
            <img src={restify_logo} alt="" width="150" height="150" />
          </div>
          <h1 className="h3 mb-3 font-weight-normal text-center">
            Please Log In
          </h1>

          {formik.errors.username && formik.touched.username ? (
            <div className="alert alert-danger" role="alert">
              {formik.errors.username}
            </div>
          ) : null}
          <label className="login-req">Username</label>
          <input
            type="text"
            name="username"
            id="login-username"
            className="form-control"
            placeholder="Username"
            required=""
            autoFocus=""
            {...formik.getFieldProps("username")}
          />

          {formik.errors.password && formik.touched.password ? (
            <div className="alert alert-danger mt-3" role="alert">
              {formik.errors.password}
            </div>
          ) : null}
          <label className="signup-req mt-2 ">Password</label>
          <input
            name="password"
            type="password"
            id="login-pass"
            className="form-control mb-3"
            placeholder="Password"
            required=""
            {...formik.getFieldProps("password")}
          />

          {formik.errors.lastName && formik.touched.lastName ? (
            <div className="alert alert-danger" role="alert">
              {formik.errors.lastName}
            </div>
          ) : null}

          <span className="mb-3 text-center">
            <Link to="/signup" className="account">
              Dont Have an Account?
            </Link>
          </span>

          <div className="text-center">
            <button className="btn btn-lg btn-dark btn-block" type="submit">
              Log In
            </button>
            <p className="mt-5 mb-3 text-muted">© 2022</p>
          </div>
        </form>
      </div>
    </div>
  ) : (
    logoutUser()
  );
};

export default Login;
