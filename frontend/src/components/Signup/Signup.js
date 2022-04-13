import React from "react";
import "./Signup.css";
import restify_logo from "../../images/restify_logo.png";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { Form } from "react-bootstrap";
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

const Signup = () => {
  const formik = useFormik({
    initialValues: {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      avatar: "",
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
      <div className="signup-form">
        <form className="form-signin" onSubmit={formik.handleSubmit}>
          <div className="text-center">
            <img src={restify_logo} alt="" width="150" height="150" />
          </div>
          <h1 className="h3 mb-3 font-weight-normal text-center">
            Please Sign Up
          </h1>
          {formik.errors.username && formik.touched.username ? (
            <div class="alert alert-danger" role="alert">
              {formik.errors.username}
            </div>
          ) : null}
          <label className="signup-req">Username</label>
          <input
            type="text"
            name="username"
            id="signup-username"
            className="form-control "
            placeholder="Username"
            required=""
            {...formik.getFieldProps("username")}
          />
          {formik.errors.firstName && formik.touched.firstName ? (
            <div class="alert alert-danger mt-3" role="alert">
              {formik.errors.firstName}
            </div>
          ) : null}

          <label className="mt-2">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className="form-control"
            placeholder="First Name"
            required=""
            {...formik.getFieldProps("firstname")}
          />
          {formik.errors.lastName && formik.touched.lastName ? (
            <div class="alert alert-danger mt-3" role="alert">
              {formik.errors.lastName}
            </div>
          ) : null}

          <label className="mt-2">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className="form-control"
            placeholder="Last Name"
            required=""
            {...formik.getFieldProps("lastName")}
          />
          {formik.errors.email && formik.touched.email ? (
            <div class="alert alert-danger mt-3" role="alert">
              {formik.errors.email}
            </div>
          ) : null}

          <label className="mt-2">Email</label>
          <input
            type="email"
            id="inputEmail"
            name="email"
            className="form-control"
            placeholder="Email address"
            required=""
            autoFocus=""
            {...formik.getFieldProps("email")}
          />
          {formik.errors.avater && formik.touched.avatar ? (
            <div class="alert alert-danger mt-3" role="alert">
              {formik.errors.avater}
            </div>
          ) : null}

          <label className="mt-2">Avatar</label>
          <input
            type="file"
            id="avatar"
            name="avatar"
            className="form-control"
            placeholder="Avatar"
            required=""
            autoFocus=""
            accept="image/png, image/jpeg, image/jpg"
            {...formik.getFieldProps("avatar")}
          />
          {formik.errors.password && formik.touched.password ? (
            <div class="alert alert-danger mt-3" role="alert">
              {formik.errors.password}
            </div>
          ) : null}

          <label className="mt-2 signup-req">Password</label>
          <input
            type="password"
            id="signup-pass"
            name="password"
            className="form-control"
            placeholder="Password"
            required=""
            {...formik.getFieldProps("password")}
          />
          {formik.errors.confirmPassword && formik.touched.confirmPassword ? (
            <div class="alert alert-danger mt-3" role="alert">
              {formik.errors.confirmPassword}
            </div>
          ) : null}

          <label className="mt-2 signup-req">Confirm Password</label>
          <input
            type="password"
            id="signup-confirm-pass"
            name="confirmPassword"
            className="form-control"
            placeholder="Confirm Password"
            required=""
            {...formik.getFieldProps("confirmPassword")}
          />
          <span className="mb-3 text-center">
            <Link to="/login" className="account">
              Have an Account?
            </Link>
          </span>
          <div className="text-center">
            <button
              className="btn btn-lg btn-dark btn-block text-center"
              type="submit"
            >
              Sign up
            </button>
            <p className="mt-5 mb-3 text-muted">© 2022</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
