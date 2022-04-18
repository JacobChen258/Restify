import { React, useState, useEffect, useContext } from "react";
import "./EditProfile.css";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import AuthContext from "../Context/AuthContext";
import showSuccessModal from "../../utils/SuccessModal";

const EditProfile = (props) => {
  const { authTokens } = useContext(AuthContext);
  const [success, setSuccess] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const nameRegex = /^[a-zA-Z\s-]*$/;
  const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
  const usernameRegex = /^[a-zA-Z0-9_@+.-]*$/;
  const getUserInfo = async () => {
    const headers = {
      headers: {
        Authorization: "Bearer " + authTokens?.access,
      },
    };
    axios
      .get(`/user/profile/`, headers)
      .then((res) => {
        setUserInfo(res.data);
        props.SetAvatar(res.data.avatar);
        // userInfo = res.data;
      })
      .catch((e) => {
        alert(e);
      });
  };
  useEffect(() => {
    getUserInfo();

    // eslint-disable-next-line
  }, []);

  const validation = Yup.object({
    username: Yup.string().matches(
      usernameRegex,
      "Username may only contain alphanumeric and _@+.- characters"
    ),
    first_name: Yup.string().matches(
      nameRegex,
      "Name can only contain spaces, hyphens and alphabetical characters"
    ),
    last_name: Yup.string().matches(
      nameRegex,
      "Name can only contain spaces, hyphens and alphabetical characters"
    ),
    email: Yup.string().email("Invalid email address"),
    phone_num: Yup.string().matches(phoneRegex, "Invalid phone format"),
    avatar: Yup.mixed(),
  });

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      avatar: "",
      phone_num: "",
      error: "",
    },
    validationSchema: validation,
    onSubmit: async (values) => {
      var bodyFormData = new FormData();
      values.first_name && bodyFormData.append("first_name", values.first_name);
      values.last_name && bodyFormData.append("last_name", values.last_name);
      values.email && bodyFormData.append("email", values.email);
      values.phone_num && bodyFormData.append("phone_num", values.phone_num);

      if (values.avatar) {
        bodyFormData.append("avatar", values.avatar);
      }
      //   const body = {...};
      const headers = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + authTokens?.access,
        },
      };

      axios
        .patch("/user/profile/", bodyFormData, headers)
        .then((res) => {
          getUserInfo();
          showSuccessModal("Profile updated!", setSuccess);
        })
        .catch((err) => {
          formik.setErrors({ error: "Please fix form errors" });
        });

      formik.setFieldValue("first_name", "", false);
      formik.setFieldValue("last_name", "", false);
      formik.setFieldValue("email", "", false);
      formik.setFieldValue("phone", "", false);
      formik.setFieldTouched("first_nname", false, false);
      formik.setFieldTouched("last_name", false, false);
      formik.setFieldTouched("email", false, false);
      formik.setFieldTouched("phone", false, false);
    },
  });

  const handleFile = (e) => {
    formik.setFieldValue("avatar", e.currentTarget.files[0]);
    setUserInfo({
      ...userInfo,
      avatar: URL.createObjectURL(e.target.files[0]),
    });
  };

  return (
    <div>
      <section className="bg-secondary text-light py-3">
        <div className="container">
          <div className="row">
            <div className="col text-center">
              <h2>Edit Your Profile</h2>
              <br />
              <p className="lead">Here you can edit your personal profile</p>
            </div>
          </div>
        </div>
      </section>

      <section className="text-dark p-5">
        <div className="container text-center">
          <div className="col">
            <p className="lead">Please update your information below</p>
            <div className="card px-4 bg-light">
              <div className="card-header bg-light">
                Choose a new profile picture!
              </div>
              <div className="card-body text-center text-light bg-light py-3">
                <img
                  alt=""
                  id="edit-profile-avatar"
                  className="img-thumbnail p-3 text-center rounded img-account-profile w-50"
                  src={userInfo.avatar}
                />

                <br />
                <br />

                <div className="mb-3">
                  <label htmlFor="formFile" className="form-label">
                    Upload profile Picture
                  </label>
                  <input
                    className="form-control"
                    onChange={handleFile}
                    type="file"
                    id="formFile"
                  />
                </div>
              </div>
            </div>
            <br />
            {success && (
              <div className="alert alert-success mt-3 mb-1" role="alert">
                {success}
              </div>
            )}
            {formik.errors.error ? (
              <div className="alert alert-danger" role="alert">
                {formik.errors.error}
              </div>
            ) : null}
            <br />
            <div className="card px-4 bg-light">
              <div className="card-header bg-light">
                Edit your personal information!
              </div>
              <div className="card-body text-center bg-light">
                <form onSubmit={formik.handleSubmit}>
                  <div className="row mb-2">
                    <div className="col md-5">
                      {formik.errors.first_name && formik.touched.first_name ? (
                        <div className="alert alert-danger mb-0" role="alert">
                          {formik.errors.first_name}
                        </div>
                      ) : null}
                      <label className="small mb-2 mt-2">First Name</label>
                      <input
                        name="first_name"
                        className="form-control"
                        placeholder={userInfo.first_name}
                        type="text"
                        {...formik.getFieldProps("first_name")}
                      />
                    </div>
                    <div className="col md-5">
                      {formik.errors.last_name && formik.touched.last_name ? (
                        <div className="alert alert-danger mb-0" role="alert">
                          {formik.errors.last_name}
                        </div>
                      ) : null}
                      <label className="small mb-2 mt-2">Last Name</label>
                      <input
                        name="last_name"
                        className="form-control"
                        type="text"
                        placeholder={userInfo.last_name}
                        {...formik.getFieldProps("last_name")}
                      />
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col md-5">
                      {formik.errors.email && formik.touched.email ? (
                        <div className="alert alert-danger mb-0" role="alert">
                          {formik.errors.email}
                        </div>
                      ) : null}
                      <label className="small mb-2 mt-2">Email Address</label>
                      <input
                        name="email"
                        className="form-control"
                        type="text"
                        placeholder={userInfo.email}
                        {...formik.getFieldProps("email")}
                      />
                    </div>
                    <div className="col md-5">
                      {formik.errors.phone_num && formik.touched.phone_num ? (
                        <div className="alert alert-danger mb-0" role="alert">
                          {formik.errors.phone_num}
                        </div>
                      ) : null}
                      <label className="small mb-2 mt-2">Phone Number</label>
                      <input
                        name="phone_num"
                        placeholder={userInfo.phone}
                        className="form-control"
                        type="text"
                        {...formik.getFieldProps("phone_num")}
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <br />
            <br />

            <div className="row mx-5">
              {/* <div className="col">
                <button type="button" className="btn btn-outline-secondary">
                  Cancel Changes
                </button>
              </div> */}
              <div className="col">
                <button
                  type="submit"
                  onClick={formik.handleSubmit}
                  className="btn btn-outline-secondary"
                >
                  Save Changes
                </button>
              </div>
            </div>
            <br />
            <br />
            <br />
          </div>
        </div>
      </section>
    </div>
  );
};

export default EditProfile;
