import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddBlog.css";
import AuthContext from "../Context/AuthContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import showSuccessModal from "../../utils/SuccessModal";

const AddBlog = () => {
  const { authTokens } = useContext(AuthContext);
  const nav = useNavigate();
  const [success, setSuccess] = useState("");
  const validation = Yup.object({
    name: Yup.string()
      .required("Post name is required")
      .max(50, "Post name is too long"),
    body: Yup.string()
      .required("Post body is required")
      .max(1000, "Post body is too long"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      body: "",
    },
    validationSchema: validation,
    onSubmit: async (values) => {
      const body = { title: values.name, content: values.body };
      const headers = {
        headers: {
          Authorization: "Bearer " + authTokens?.access,
        },
      };
      axios
        .post("/blog/create/", body, headers)
        .then((res) => {
          showSuccessModal("Blog created!", setSuccess);
          formik.setFieldValue("name", "", false);
          formik.setFieldValue("body", "", false);
          formik.setFieldTouched("name", false, false);
          formik.setFieldTouched("body", false, false);
          console.log(res);
        })
        .catch((err) => {
          if (err.response.status === 401) {
            nav("/login");
          } else if (err.response.status === 400) {
            formik.setErrors({ name: "Please fix form errors" });
          } else if (err.response.status === 404) {
            formik.setErrors({ name: "You do not own a restaurant" });
          }
        });
    },
  });

  return (
    <>
      <h1 className="text-left">Create New Blog Post</h1>
      <hr />

      <form className="menu-form" onSubmit={formik.handleSubmit}>
        {success && (
          <div className="alert alert-success mt-3 mb-1" role="alert">
            {success}
          </div>
        )}
        <div className="form-group mt-3">
          {formik.errors.name && formik.touched.name ? (
            <div className="alert alert-danger mt-3 mb-1" role="alert">
              {formik.errors.name}
            </div>
          ) : null}
          <label htmlFor="postName" className="add-blog-req">
            Post Name
          </label>
          <input
            name="name"
            type="text"
            className="form-control"
            id="post-name"
            placeholder="Enter post name"
            {...formik.getFieldProps("name")}
          />
        </div>

        <div className="form-group mt-3">
          {formik.errors.body && formik.touched.body ? (
            <div className="alert alert-danger mt-3 mb-1" role="alert">
              {formik.errors.body}
            </div>
          ) : null}
          <label htmlFor="postDescription" className="add-blog-req">
            Post Body
          </label>
          <textarea
            name="body"
            className="form-control"
            id="postDescription"
            placeholder="Enter body"
            cols="20"
            rows="5"
            {...formik.getFieldProps("body")}
          ></textarea>
        </div>
        <div className="text-center mt-3">
          <button type="submit" className="btn btn-success">
            Create Blog Post
          </button>
        </div>
      </form>
    </>
  );
};

export default AddBlog;
