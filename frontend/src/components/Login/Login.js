import React from "react";
import "./Login.css";
import restify_logo from "../../images/restify_logo.png";
import { Link } from "react-router-dom";
import { useFormik } from "formik";

const validate = (values) => {
  const errors = {};
  if (values.password != values.confirmPassword) {
    errors.confirmPassword = "passwords do not match";
  }

  if (values.firstName) {
    if (values.firstName.length > 15) {
      errors.firstName = "Must be 15 characters or less";
    }
  }

  if (values.lastName) {
    if (values.lastName.length > 20) {
      errors.lastName = "Must be 20 characters or less";
    }
  }

  if (values.email) {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }
  }

  if (!values.password) {
    errors.password = "Password is required";
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = "You must confirm your password";
  }

  if (!values.username) {
    errors.username = "Username is required";
  }

  return errors;
};

const Login = () => {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
    validate,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div className="vh-100">
      <div className="login-form">
        <form className="form-login">
          <div className="text-center">
            <img src={restify_logo} alt="" width="150" height="150" />
          </div>
          <h1 className="h3 mb-3 font-weight-normal text-center">
            Please Log In
          </h1>

          <label className="login-req">Username</label>
          <input
            type="text"
            name="username"
            id="login-username"
            className="form-control"
            placeholder="Username *"
            required=""
            autoFocus=""
            {...formik.getFieldProps("username")}
          />

          <label className="signup-req mt-2 ">Password</label>
          <input
            name="password"
            type="password"
            id="login-pass"
            className="form-control"
            placeholder="Password *"
            required=""
            {...formik.getFieldProps("password")}
          />

          <label className="signup-req mt-2">Confirm Password</label>
          <input
            name="confirmPassword"
            type="password"
            id="login-confirm-pass"
            className="form-control"
            placeholder="Confirm Password *"
            required=""
            {...formik.getFieldProps("confirmPassword")}
          />
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
  );
};

export default Login;
