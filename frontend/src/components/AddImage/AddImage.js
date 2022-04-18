import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";
import Image from "../Restaurant/ImagesComponent/ImageComponent/image";
import InfiniteScroll from "react-infinite-scroll-component";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./AddImage.css";
import showSuccessModal from "../../utils/SuccessModal";
import AuthContext from "../Context/AuthContext";

const AddImage = (props) => {
  const { authTokens } = useContext(AuthContext);
  const params = useParams();
  const [images, setImages] = useState([]);
  const [success, setSuccess] = useState("");
  const [change, setChange] = useState(false);
  useEffect(() => {
    axios
      .get(`/restaurant/${params.id}/images`)
      .then((res) => {
        setImages(res.data.results);
        setNext(res.data.next);
      })
      .catch((e) => {
        alert(e);
      });
  }, [params.id, change]);
  const [next, setNext] = useState(null);
  const fetchData = () => {
    if (next != null) {
      axios
        .get(next)
        .then((res) => {
          setImages(images.concat(res.data.results));
          setNext(res.data.next);
        })
        .catch((e) => {
          alert(e);
        });
    }
  };

  const validation = Yup.object({
    image: Yup.mixed().required("Image is required"),
  });

  const formik = useFormik({
    initialValues: {
      image: "",
    },
    // validationSchema: validation,
    onSubmit: async (values) => {
      var bodyFormData = new FormData();
      bodyFormData.append("image", values.image);

      const options = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + authTokens?.access,
        },
      };

      axios
        .post("/restaurant/image/", bodyFormData, options)
        .then((res) => {
          showSuccessModal("Image Added!", setSuccess);
          setChange((prev) => !prev);
          //   formik.setFieldValue("image", );
        })
        .catch((err) => {
          if (err.response.status === 400) {
            formik.setErrors({ image: "Image is required" });
          } else if (err.response.status === 500) {
            formik.setErrors({ image: "Image is too large" });
          }
        });
    },
  });

  const deleteImage = (e) => {
    const id = e.target.getAttribute("image-id");

    const headers = {
      headers: {
        Authorization: "Bearer " + authTokens?.access,
      },
      data: { image_id: id },
    };

    axios
      .delete("/restaurant/image/", headers)
      .then((res) => {
        showSuccessModal("Image Deleted!", setSuccess);
        setChange((prev) => !prev);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="mb-5">
      <div>
        <h1>Add Image</h1>
        <hr></hr>
        {success && (
          <div className="alert alert-success mt-3 mb-1" role="alert">
            {success}
          </div>
        )}
        <form
          className="image-form w-50 m-auto pb-5"
          onSubmit={formik.handleSubmit}
        >
          <div className="form-group mt-3">
            {formik.errors.image && formik.touched.image ? (
              <div className="alert alert-danger mt-3 mb-1" role="alert">
                {formik.errors.image}
              </div>
            ) : null}
            <label htmlFor="postName" className="add-image-req">
              Image
            </label>
            <input
              name="image"
              type="file"
              className="form-control"
              id="post-name"
              placeholder="Select image"
              accept="image/png, image/jpeg, image/jpg"
              onChange={(e) => {
                formik.setFieldValue("image", e.currentTarget.files[0]);
              }}
            />
          </div>

          <div className="text-center mt-3">
            <button type="submit" className="btn btn-success">
              Add Image
            </button>
          </div>
        </form>
      </div>
      <h1>Your Images</h1>
      <hr></hr>

      <InfiniteScroll
        dataLength={images.length} //This is important field to render the next data
        next={fetchData}
        hasMore={next !== null}
        className="d-flex flex-wrap w-100 ps-5"
      >
        {images.map((image) => (
          <div className="text-center" key={image.id}>
            <Image className="m-5" Image={image.image} />
            <Button
              style={{ display: "block", margin: "auto" }}
              className="mb-2 mt-2"
              variant="danger"
              image-id={image.id}
              onClick={deleteImage}
            >
              Delete
            </Button>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};
export default AddImage;
