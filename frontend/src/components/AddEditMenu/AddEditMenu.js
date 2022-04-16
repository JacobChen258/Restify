import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./AddEditMenu.css";
import { Card, Button } from "react-bootstrap";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

const AddEditMenu = () => {
  const nav = useNavigate();
  const params = useParams();
  const [menuItems, setmenuItems] = useState({});

  const addMenuItem = () => {
    axios.post("/user/restaurant/menu/add/", {});
  };

  const editMenuItems = () => {};

  const getMenuItems = () => {
    axios
      .get(`/restaurant/${params.id}/menu/`)
      .then((res) => setmenuItems(res))
      .catch((err) => {
        if (err.response.status == 401) {
          nav("login");
        }
      });
  };

  const popEdit = () => {};

  const priceRegex = /^(\d{1,8}|\d{0,5}\.\d{1,2})$/;
  const validation = Yup.object({
    itemName: Yup.string()
      .required("Item name is required")
      .max(20, "Item name is too long"),
    price: Yup.string()
      .matches(priceRegex, "Please enter a valid price")
      .required("Price is required"),

    description: Yup.string()
      .max(50, "description is too long")
      .required("Description is required"),
  });

  const formik = useFormik({
    initialValues: {
      itemName: "",
      price: "",
      description: "",
    },
    validationSchema: validation,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <>
      <h1 className="text-left">Your Menu</h1>
      <hr />

      <div className="container text-center">
        <div className="row">
          <div className="col">
            <Card className="menu-item" style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Card Subtitle
                </Card.Subtitle>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
                <Button
                  className="ms-1"
                  onClick={popEdit}
                  variant="outline-secondary"
                >
                  Edit
                </Button>
                <Button className="ms-1" variant="outline-danger">
                  Delete
                </Button>

                {/* <Card.Link href="#">Another Link</Card.Link> */}
              </Card.Body>
            </Card>
          </div>
          <div className="col">
            <Card className="menu-item" style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Card Subtitle
                </Card.Subtitle>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
                <Button className="ms-1" variant="outline-secondary">
                  Edit
                </Button>
                <Button className="ms-1" variant="outline-danger">
                  Delete
                </Button>

                {/* <Card.Link href="#">Another Link</Card.Link> */}
              </Card.Body>
            </Card>
          </div>
          <div className="col">
            <Card className="menu-item" style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Card Subtitle
                </Card.Subtitle>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
                <Button className="ms-1" variant="outline-secondary">
                  Edit
                </Button>
                <Button className="ms-1" variant="outline-danger">
                  Delete
                </Button>

                {/* <Card.Link href="#">Another Link</Card.Link> */}
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
      <h1 className="text-left">Add Menu Item</h1>
      <hr />
      <form className="menu-form">
        <div className="form-group">
          {formik.errors.itemName && formik.touched.itemName ? (
            <div className="alert alert-danger mt-3 mb-1" role="alert">
              {formik.errors.itemName}
            </div>
          ) : null}
          <label className="add-menu-req" htmlFor="inputName">
            Item name
          </label>
          <input
            name="itemName"
            type="text"
            className="form-control"
            id="item-name"
            placeholder="Item Name"
            {...formik.getFieldProps("itemName")}
          />
        </div>

        <div className="form-group mt-2">
          {formik.errors.price && formik.touched.price ? (
            <div className="alert alert-danger mt-3 mb-1" role="alert">
              {formik.errors.price}
            </div>
          ) : null}
          <label className="add-menu-req" htmlFor="inputPrice">
            Price
          </label>
          <input
            name="price"
            type="number"
            className="form-control"
            id="menu-price"
            placeholder="Price"
            {...formik.getFieldProps("price")}
          />
        </div>

        {formik.errors.description && formik.touched.description ? (
          <div className="alert alert-danger mt-3 mb-1" role="alert">
            {formik.errors.description}
          </div>
        ) : null}
        <div className="form-group mt-2">
          <label className="add-menu-req" htmlFor="inputDescription">
            Description
          </label>
          <textarea
            name="description"
            className="form-control"
            id="menu-description"
            placeholder="Description"
            cols="20"
            rows="5"
            {...formik.getFieldProps("description")}
          ></textarea>
        </div>
        <div className="text-center mt-3">
          <button type="submit" className="btn btn-success">
            Add/Edit Menu Item
          </button>
        </div>
      </form>
    </>
  );
};

export default AddEditMenu;
