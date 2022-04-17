import { React, useContext } from "react";
import "./EditProfile.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form } from "react-bootstrap";
import AuthContext from "../Context/AuthContext";

const EditProfile = () => {

    const { authTokens } = useContext(AuthContext);
    const nav = useNavigate();
    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
    const nameRegex = /^[a-zA-Z\s-]*$/;
    const validation = Yup.object({
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
    });
  
    const formik = useFormik({
      initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        avatar: "",
      },

      validationSchema: validation,
  
      onSubmit: (values) => {
        var bodyFormData = new FormData();
        if (values.firstName) {
            bodyFormData.append("first_name", values.firstName);
        }    

        if (values.lastName) {
            bodyFormData.append("last_name", values.lastName);
        } 

        if (values.email) {
            bodyFormData.append("email", values.email);
        } 

        if (values.phone) {
            bodyFormData.append("phone_num", values.phone);
        } 

        if (values.avatar) {
          bodyFormData.append("avatar", values.avatar);
        }
  
        const headers = {
          headers: { 
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer " + authTokens?.access, 
            },
        };

        axios.patch("/user/profile/", bodyFormData, headers)
          .then(() => {
            nav("/");
          })
        },
    });

    return (
        <div className="vh-100">
            <div className="signup-form">
                <form className="form-signin" onSubmit={formik.handleSubmit}>
                    <h1 className="h3 mb-3 font-weight-normal text-center">
                    Edit Profile
                    </h1>
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
                    />
                    </Form.Group>
                    <div className="text-center">
                    <button
                        className="btn btn-lg btn-dark btn-block text-center"
                        type="submit"
                    >
                        Update Profile
                    </button>
                    <p className="mt-5 mb-3 text-muted">© 2022</p>
                    </div>
                </form>
            </div>
        </div>   
    );
}

export default EditProfile;