import React from "react";
import "./Signup.css";
import restify_logo from "../../images/restify_logo.png";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="vh-100">
      <div className="form text-center pt-5">
        <form className="form-signin">
          <img
            className="mb-4"
            src={restify_logo}
            alt=""
            width="150"
            height="150"
          />
          <h1 className="h3 mb-3 font-weight-normal">Please Sign Up</h1>
          <input
            type="text"
            id="username"
            className="form-control"
            placeholder="Username"
            required=""
          />
          <input
            type="text"
            id="firstName"
            className="form-control"
            placeholder="First Name"
            required=""
          />
          <input
            type="text"
            id="lastName"
            className="form-control"
            placeholder="Last Name"
            required=""
          />
          <input
            type="email"
            id="inputEmail"
            className="form-control"
            placeholder="Email address"
            required=""
            autoFocus=""
          />
          <input
            type="file"
            id="avatar"
            className="form-control"
            placeholder="Avatar"
            required=""
            autoFocus=""
            accept="image/png, image/jpeg, image/jpg"
          />

          <input
            type="password"
            id="signup-pass"
            className="form-control"
            placeholder="Password"
            required=""
          />
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
