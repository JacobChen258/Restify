import React, {useContext, useEffect, useState} from "react";
import './CreateRestaurant.css'
import AuthContext from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useFormik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";


const CreateRestaurant = () => {
  const { user, authTokens, logoutUser } = useContext(AuthContext);
  const nav = useNavigate();
  const [img, setImg] = useState(null);
  useEffect(() => {
    if (user === null) {
      nav("/login");
    } else if (user.restaurant) {
      nav(`/restaurant/${user.restaurant}/`);
    }
  }, [authTokens, nav, user]);
  const nameRegex = /^[0-9a-zA-Z \n]{1,100}$/;
  const addressRegex = /^[0-9a-zA-Z \-\n]{1,100}$/;
  const postalRegex = /^[A-Z]\d[A-Z][ ]\d[A-Z]\d$/;
  const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
  const handleUploadImage = (e) => {
    setImg(URL.createObjectURL(e.target.files[0]));
  };
  const validation = Yup.object({
    name: Yup.string()
      .required("Username is required")
      .matches(nameRegex, "Name can only contain alphabets and spaces"),
    address: Yup.string()
      .required("Address is required")
      .matches(addressRegex, "Name can only contain alphabets, spaces and -"),
    postal_code: Yup.string()
      .required("Postal Code is required")
      .matches(postalRegex, 'Postal code must be in the format of "L1L L1L"'),
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email address"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(phoneRegex, "Phone number must be like XXX-XXX-XXXX"),
    logo: Yup.mixed(),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      postal_code: "",
      email: "",
      phone: "",
      logo: null,
    },
        validationSchema: validation,
        onSubmit: (values)=>{
            var bodyFormData = new FormData();
            bodyFormData.append("name", values.name);
            bodyFormData.append("address", values.address);
            bodyFormData.append("postal_code", values.postal_code);
            bodyFormData.append("email", values.email);
            bodyFormData.append("phone_num", values.phone);
            if (values.logo) {
                bodyFormData.append("logo", values.logo);
            }
            const options = {
                headers: { "Content-Type": "multipart/form-data" ,
                "Authorization": "Bearer " + String(authTokens.access)},
            };
            for (var pair of bodyFormData.entries()) {
                console.log(pair[0] + ", " + pair[1]);
            }
            console.log(bodyFormData)
            axios
            .post("/restaurant/", bodyFormData, options)
            .then((res) => {
                alert("Restaurant Created! Please Login Again");
                logoutUser();
            })
            .catch((err) => {
            console.log(err.response);
            if (err.response.status == 400){
                alert("You have a restaurant already. Navigate to your restaurant.")
                nav(`/restaurant/${user.restaurant}/`);
            }
            });
        }
    })
        
    return (
        <div className="d-flex flex-column justify-content-center align-content-center">
            <h1 className="mt-5 mb-5 text-center">Create Your Restauraunt</h1>
            <form className="d-flex flex-column justify-content-center align-content-center" onSubmit={formik.handleSubmit}>
            <div className="align-self-center d-flex flex-column">
                <img src={img} className = "rounded-3 border border-2 border-dark align-self-center logo_container" alt="" ></img>
                {formik.errors.logo && formik.touched.logo ? (
                    <div className="alert alert-danger " role="alert">
                    {formik.errors.logo}
                    </div>
                ) : null}
                <div className="align-self-center mt-2 mb-2">
                    <label htmlFor ="imageFile">Upload logo: </label>
                    <input type="file" id="imageFile" accept="image/png, image/jpeg, image/jpg"
              onChange={(e) =>{
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
              aria-describedby="email_address"
              required=""
              {...formik.getFieldProps("email")}
            ></input>
          </div>
          {formik.errors.phone && formik.touched.phone ? (
            <div className="alert alert-danger " role="alert">
              {formik.errors.phone}
            </div>
          ) : null}
          <div className="input-group mb-3 modal_container">
            <span className="input-group-text w-100" id="email_address">
              Phone Number
            </span>
            <input
              type="text"
              className="form-control w-100"
              aria-describedby="phone_number"
              required=""
              {...formik.getFieldProps("phone")}
            ></input>
          </div>
        </div>
        <button
          className="btn btn-primary mt-3 align-self-center mb-3"
          type="submit"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateRestaurant;
