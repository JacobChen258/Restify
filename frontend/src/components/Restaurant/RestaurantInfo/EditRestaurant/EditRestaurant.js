import { Modal } from "react-bootstrap";
import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../../../Context/AuthContext";
import { useFormik, useReset } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./EditRestaurant.css";

const EditRestaurant = (props) => {
  const { user, authTokens } = useContext(AuthContext);
  const nav = useNavigate();
  const nameRegex = /^[0-9a-zA-Z \n]{0,100}$/;
  const addressRegex = /^[0-9a-zA-Z \-\n]{0,100}$/;
  const postalRegex = /^[A-Z]\d[A-Z][ ]\d[A-Z]\d$/;
  const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
  const handleUploadImage = (e) => {
    setImg(URL.createObjectURL(e.target.files[0]));
  };
  const [info, setInfo] = useState({});
  const [img, setImg] = useState(null);
  useEffect(() => {
    if (user.restaurant === null) {
      alert("You don't have a restaurant please create one");
      nav("/create/restaurant/");
      return;
    }
    axios
      .get(`/restaurant/${user.restaurant}/`)
      .then((res) => {
        setInfo(res.data);
        setImg(res.data.logo);
      })
      .catch((e) => {
        alert("Restaurant does not exist");
        nav("/");
      });
  }, []);
  const validation = Yup.object({
    name: Yup.string().matches(
      nameRegex,
      "Name can only contain alphabets and spaces"
    ),
    address: Yup.string().matches(
      addressRegex,
      "Name can only contain alphabets, spaces and -"
    ),
    postal_code: Yup.string().matches(
      postalRegex,
      'Postal code must be in the format of "L1L L1L"'
    ),
    email: Yup.string().email("Invalid email address"),
    phone_num: Yup.string().matches(
      phoneRegex,
      "Phone number must be like XXX-XXX-XXXX"
    ),
    logo: Yup.mixed(),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      postal_code: "",
      email: "",
      phone_num: "",
      logo: null,
    },
    validationSchema: validation,
    onSubmit: (values) => {
      var bodyFormData = new FormData();
      if (values.name && values.name !== "") {
        bodyFormData.append("name", values.name);
      }
      if (values.address && values.address !== "") {
        bodyFormData.append("address", values.address);
      }
      if (values.postal_code && values.postal_code !== "") {
        bodyFormData.append("postal_code", values.postal_code);
      }
      if (values.email && values.email !== "") {
        bodyFormData.append("email", values.email);
      }
      if (values.phone_num && values.phone_num !== "") {
        bodyFormData.append("phone_num", values.phone_num);
      }
      if (values.logo) {
        bodyFormData.append("logo", values.logo);
      }
      const options = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + String(authTokens.access),
        },
      };
      if (bodyFormData.entries().length === 0) {
        nav(`/restaurant/${user.restaurant}`);
        return;
      }
      axios
        .patch("/restaurant/", bodyFormData, options)
        .then((res) => {
          nav(`/restaurant/${user.restaurant}`);
        })
        .catch((err) => {
          if (err.response.status == 400) {
            alert(err);
          }
        });
    },
  });
  return (
    <div className="d-flex flex-column justify-content-center align-content-center">
      <h1 className="mt-5 mb-5 text-center">Edit Restauraunt Information</h1>
      <form
        className="d-flex flex-column justify-content-center align-content-center"
        onSubmit={formik.handleSubmit}
      >
        <div className="align-self-center d-flex flex-column">
          <img
            src={img}
            className="rounded-3 border border-2 border-dark align-self-center logo_container"
            alt=""
          ></img>
          {formik.errors.logo && formik.touched.logo ? (
            <div className="alert alert-danger " role="alert">
              {formik.errors.logo}
            </div>
          ) : null}
          <div className="align-self-center mt-2 mb-2">
            <label htmlFor="imageFile">Upload logo: </label>
            <input
              type="file"
              id="imageFile"
              accept="image/png, image/jpeg, image/jpg"
              onChange={(e) => {
                handleUploadImage(e);
                formik.setFieldValue("logo", e.currentTarget.files[0]);
              }}
            ></input>
          </div>
          {formik.errors.name && formik.touched.name ? (
            <div className="alert alert-danger " role="alert">
              {formik.errors.name}
            </div>
          ) : null}
          <div className="input-group mb-3 modal_container">
            <span className="input-group-text w-100" id="restaurant_name">
              Restaurant Name
            </span>
            <input
              type="text"
              className="form-control w-100"
              id="name"
              placeholder={info.name}
              aria-describedby="restaurant_name"
              required=""
              {...formik.getFieldProps("name")}
            ></input>
          </div>
          {formik.errors.address && formik.touched.address ? (
            <div className="alert alert-danger " role="alert">
              {formik.errors.address}
            </div>
          ) : null}
          <div className="input-group mb-3 modal_container">
            <span className="input-group-text w-100" id="restaurant_address">
              Address
            </span>
            <input
              type="text"
              className="form-control w-100"
              placeholder={info.address}
              aria-describedby="restaurant_address"
              required=""
              {...formik.getFieldProps("address")}
            ></input>
          </div>
          {formik.errors.postal_code && formik.touched.postal_code ? (
            <div className="alert alert-danger " role="alert">
              {formik.errors.postal_code}
            </div>
          ) : null}
          <div className="input-group mb-3 modal_container">
            <span className="input-group-text w-100" id="postal_code">
              Postal Code
            </span>
            <input
              type="text"
              pattern="[A-Za-z]\d[A-Za-z]\s\d[A-Za-z]\d"
              placeholder={info.postal_code}
              className="form-control w-100"
              aria-describedby="postal_code"
              required=""
              {...formik.getFieldProps("postal_code")}
            ></input>
          </div>
          {formik.errors.email && formik.touched.email ? (
            <div className="alert alert-danger " role="alert">
              {formik.errors.email}
            </div>
          ) : null}
          <div className="input-group mb-3 modal_container">
            <span className="input-group-text w-100" id="email_address">
              Email Address
            </span>
            <input
              type="email"
              className="form-control w-100"
              placeholder={info.email}
              aria-describedby="email_address"
              required=""
              {...formik.getFieldProps("email")}
            ></input>
          </div>
          {formik.errors.phone_num && formik.touched.phone_num ? (
            <div className="alert alert-danger " role="alert">
              {formik.errors.phone_num}
            </div>
          ) : null}
          <div className="input-group mb-3 modal_container">
            <span className="input-group-text w-100" id="email_address">
              Phone Number
            </span>
            <input
              type="text"
              className="form-control w-100"
              placeholder={info.phone_num}
              aria-describedby="phone_number"
              required=""
              {...formik.getFieldProps("phone_num")}
            ></input>
          </div>
        </div>
        <button
          className="btn btn-primary mt-3 align-self-center mb-3"
          type="submit"
        >
          Edit
        </button>
      </form>
    </div>
  );
};

export default EditRestaurant;
