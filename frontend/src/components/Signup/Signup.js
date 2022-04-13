import React from "react";
import "./Signup.css";
import restify_logo from "../../images/restify_logo.png";
import { Link } from "react-router-dom";
import { useFormik } from "formik";

const validate = (values) => {
  const errors = {};
  if (values.password != values.confirmPassword) {
    errors.confirmPassword = "paswords to not match";
  }

  if (!values.firstName) {
    errors.firstName = "Required";
  } else if (values.firstName.length > 15) {
    errors.firstName = "Must be 15 characters or less";
  }

  if (!values.lastName) {
    errors.lastName = "Required";
  } else if (values.lastName.length > 20) {
    errors.lastName = "Must be 20 characters or less";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Required";
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = "Required";
  }
  if (!values.avatar) {
    errors.confirmPassword = "Required";
  }
  if (!values.username) {
    errors.confirmPassword = "Required";
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
      <div className="signup-form text-center pt-5">
        <form className="form-signin" onSubmit={formik.handleSubmit}>
          <img
            className="mb-4"
            src={restify_logo}
            alt=""
            width="150"
            height="150"
          />
          <h1 className="h3 mb-3 font-weight-normal">Please Sign Up</h1>
          {formik.errors.username ? (
            <div className="signup-error">{formik.errors.username}</div>
          ) : null}
          <input
            type="text"
            id="username"
            className="form-control"
            placeholder="Username"
            required=""
          />
          {formik.errors.firstName ? (
            <div className="signup-error">{formik.errors.firstName}</div>
          ) : null}
          <input
            type="text"
            id="firstName"
            className="form-control"
            placeholder="First Name"
            required=""
          />
          {formik.errors.lastName ? (
            <div className="signup-error">{formik.errors.lastName}</div>
          ) : null}
          <input
            type="text"
            id="lastName"
            className="form-control"
            placeholder="Last Name"
            required=""
          />
          {formik.errors.email ? (
            <div className="signup-error">{formik.errors.email}</div>
          ) : null}
          <input
            type="email"
            id="inputEmail"
            className="form-control"
            placeholder="Email address"
            required=""
            autoFocus=""
          />
          {formik.errors.avater ? (
            <div className="signup-error">{formik.errors.avatar}</div>
          ) : null}
          <input
            type="file"
            id="avatar"
            className="form-control"
            placeholder="Avatar"
            required=""
            autoFocus=""
            accept="image/png, image/jpeg, image/jpg"
          />
          {formik.errors.password ? (
            <div className="signup-error">{formik.errors.password}</div>
          ) : null}
          <input
            type="password"
            id="signup-pass"
            className="form-control"
            placeholder="Password"
            required=""
          />
          {formik.errors.confirmPassword ? (
            <div className="signup-error">{formik.errors.confirmPassword}</div>
          ) : null}
          <input
            type="password"
            id="signup-confirm-pass"
            className="form-control"
            placeholder="Confirm Password"
            required=""
          />
          <span className="mb-3">
            <Link to="/login" className="account">
              Have an Account?
            </Link>
          </span>
          <button className="btn btn-lg btn-dark btn-block" type="submit">
            Sign up
          </button>
          <p className="mt-5 mb-3 text-muted">© 2022</p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
