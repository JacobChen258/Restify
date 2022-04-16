import React from "react";
import "./Signup.css";
import restify_logo from "../../images/restify_logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form } from "react-bootstrap";
import axios from "axios";
import { useContext } from "react";
import AuthContext from "../Context/AuthContext";

const Signup = () => {
  const { user, logoutUser } = useContext(AuthContext);

  const nav = useNavigate();
  const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
  const usernameRegex = /^[a-zA-Z0-9_@+.-]*$/;
  const nameRegex = /^[a-zA-Z\s-]*$/;
  const validation = Yup.object({
    username: Yup.string()
      .required("Username is required")
      .matches(
        usernameRegex,
        "Username may only contain alphanumeric and _@+.- characters"
      ),
    firstName: Yup.string().matches(
      nameRegex,
      "Name can only contain spaces, hyphens and alphabetical"
    ),
    lastName: Yup.string().matches(
      nameRegex,
      "Name can only contain spaces, hyphens and alphabetical"
    ),
    email: Yup.string().email("Invalid email address"),
    phone: Yup.string().matches(phoneRegex, "Invalid phone format"),
    avatar: Yup.mixed(),
    // .test("fileSize", "File Size is too large", (value) => {
    //   console.log(value.size);
    //   return !value || (value && value.size <= 1000000);
    // })
    // .test("fileType", "Unsupported File Format", (value) => {
    //   console.log(value.type);
    //   return (
    //     !value ||
    //     ((value) =>
    //       !value ||
    //       (value &&
    //         ["image/jpg", "image/jpeg", "image/png"].includes(value.type)))
    //   );
    // }),
    password: Yup.string()
      .required("Password is required")
      .min(5, "Password must be atleast 5 characters"),
    confirmPassword: Yup.string()
      .required("Must confirm your password")
      .oneOf([Yup.ref("password"), null], "Passwords don't match!"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      avatar: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validation,

    onSubmit: (values) => {
      var bodyFormData = new FormData();
      bodyFormData.append("username", values.username);
      bodyFormData.append("password", values.password);
      bodyFormData.append("password2", values.confirmPassword);
      bodyFormData.append("first_name", values.firstName);
      bodyFormData.append("last_name", values.lastName);
      bodyFormData.append("email", values.email);
      bodyFormData.append("phone_num", values.phone);

      if (values.avatar) {
        bodyFormData.append("avatar", values.avatar);
      }

      const options = {
        headers: { "Content-Type": "multipart/form-data" },
      };
      for (var pair of bodyFormData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }

      axios
        .post("/user/register/", bodyFormData, options)
        .then((res) => {
          alert("you signed up!");

          nav("/login");
        })
        .catch((err) => {
          console.log(err.response.status);
          if (err.response.status == 400) {
            console.log("here");
            formik.setErrors({ username: "This username is already in use" });
          } else {
            formik.setErrors({ username: "An unexpected error occurred" });
          }
          formik.setFieldValue("password", "", false);
          formik.setFieldValue("confirmPassword", "", false);
          formik.setFieldTouched("password", false, false);
          formik.setFieldTouched("confirmPassword", false, false);
        });
    },
  });

  return !user ? (
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
            <div className="alert alert-danger " role="alert">
              {formik.errors.username}
            </div>
          ) : null}
          <label htmlFor="signup-username" className="signup-req">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="signup-username"
            className="form-control mb-3"
            placeholder="Username"
            required=""
            {...formik.getFieldProps("username")}
          />
          {formik.errors.firstName && formik.touched.firstName ? (
            <div className="alert alert-danger" role="alert">
              {formik.errors.firstName}
            </div>
          ) : null}

          <label htmlFor="firstName" className="">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className="form-control mb-3"
            placeholder="First Name"
            required=""
            {...formik.getFieldProps("firstName")}
          />
          {formik.errors.lastName && formik.touched.lastName ? (
            <div className="alert alert-danger" role="alert">
              {formik.errors.lastName}
            </div>
          ) : null}

          <label htmlFor="firstName" className="">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className="form-control mb-3"
            placeholder="Last Name"
            required=""
            {...formik.getFieldProps("lastName")}
          />
          {formik.errors.email && formik.touched.email ? (
            <div className="alert alert-danger" role="alert">
              {formik.errors.email}
            </div>
          ) : null}

          <label htmlFor="signup-email" className="">
            Email
          </label>
          <input
            type="email"
            id="signup-email"
            name="email"
            className="form-control mb-3"
            placeholder="Email address"
            required=""
            autoFocus=""
            {...formik.getFieldProps("email")}
          />
          {formik.errors.phone && formik.touched.phone ? (
            <div className="alert alert-danger" role="alert">
              {formik.errors.phone}
            </div>
          ) : null}

          <label htmlFor="signup-phone" className="">
            Phone (XXX-XXX-XXXX)
          </label>
          <input
            type="tel"
            id="signup-phone"
            name="phone"
            className="form-control mb-3"
            placeholder="Phone"
            required=""
            autoFocus=""
            {...formik.getFieldProps("phone")}
          />
          {formik.errors.avater && formik.touched.avatar ? (
            <div className="alert alert-danger" role="alert">
              {formik.errors.avater}
            </div>
          ) : null}

          {/* <label className=""></label> */}
          <Form.Group className="">
            <Form.Label style={{ marginBottom: "0" }}>Avatar</Form.Label>
            <Form.Control
              style={{ padding: "10" }}
              type="file"
              size="lg"
              id="avatar"
              name="avatar"
              className="form-control mb-3"
              required=""
              autoFocus=""
              accept="image/png, image/jpeg, image/jpg"
              onChange={(e) =>
                formik.setFieldValue("avatar", e.currentTarget.files[0])
              }
              // {...formik.getFieldProps("avatar")}
            />
          </Form.Group>

          {formik.errors.password && formik.touched.password ? (
            <div className="alert alert-danger" role="alert">
              {formik.errors.password}
            </div>
          ) : null}

          <label htmlFor="signup-pass" className="signup-req">
            Password
          </label>
          <input
            type="password"
            id="signup-pass"
            name="password"
            className="form-control mb-3"
            placeholder="Password"
            required=""
            {...formik.getFieldProps("password")}
          />
          {formik.errors.confirmPassword && formik.touched.confirmPassword ? (
            <div className="alert alert-danger" role="alert">
              {formik.errors.confirmPassword}
            </div>
          ) : null}

          <label htmlFor="signup-confirm-pass" className="signup-req">
            Confirm Password
          </label>
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
  ) : (
    logoutUser()
  );
};

export default Signup;
