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
            type="email"
            id="inputEmail"
            className="form-control"
            placeholder="Email address"
            required=""
            autoFocus=""
          />
          <input
            type="password"
            id="inputPassword"
            className="form-control"
            placeholder="Password"
            required=""
          />
          <input
            type="confirmPassword"
            id="confirmPassword"
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
