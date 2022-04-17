import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./AddEditMenu.css";
import { Card, Button } from "react-bootstrap";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import AuthContext from "../Context/AuthContext";
import showSuccessModal from "../../utils/SuccessModal";

const AddEditMenu = () => {
  const nav = useNavigate();
  const params = useParams();
  const addMenuRef = useRef(null);
  const { authTokens } = useContext(AuthContext);
  const [menuItems, setMenuItems] = useState([]);
  const [tempMenuItems, setTempMenuItems] = useState([]);
  const [success, setSuccess] = useState("");

  const priceRegex = /^(\d{1,8}|\d{0,5}\.\d{1,2})$/;
  const validation = Yup.object({
    itemName: Yup.string()
      .required("Item name is required")
      .max(50, "Item name is too long"),
    price: Yup.string()
      .matches(priceRegex, "Please enter a valid price")
      .required("Price is required"),

    description: Yup.string()
      .max(100, "description is too long")
      .required("Description is required"),
  });

  const formik = useFormik({
    initialValues: {
      itemName: "",
      price: "",
      description: "",
    },
    validationSchema: validation,
    onSubmit: async (values) => {
      const body = {
        name: values.itemName,
        description: values.description,
        price: values.price,
      };
      const headers = {
        headers: {
          Authorization: "Bearer " + authTokens?.access,
        },
      };
      axios
        .post("/menu_item/add/", body, headers)
        .then((res) => {
          console.log(res);
          setTempMenuItems((prev) => [...prev, res.data]);
          showSuccessModal("Menu item added!", setSuccess);
          formik.setFieldValue("itemName", "", false);
          formik.setFieldValue("description", "", false);
          formik.setFieldValue("price", "", false);
          formik.setFieldTouched("itemName", false, false);
          formik.setFieldTouched("description", false, false);
          formik.setFieldTouched("price", false, false);
        })
        .catch((err) => {
          if (err.response.status === 401) {
            nav("/login");
          } else if (err.response.status === 404) {
            console.log("hi");
            formik.setErrors({ itemName: "You do not own a restaurant" });
          }
        });
    },
  });

  useEffect(() => {
    getMenuItems();
    console.log("temp menu");
    console.log(tempMenuItems);
    // eslint-disable-next-line
  }, [tempMenuItems]);

  // const addMenuItem = () => {};

  // const editMenuItems = () => {};

  const deleteMenuItem = (e) => {
    const deleteID = e.target.getAttribute("item-id");
    const headers = {
      headers: {
        Authorization: "Bearer " + authTokens?.access,
      },
    };

    console.log(`/menu_item/${deleteID}/`);

    axios
      .delete(`/menu_item/${deleteID}/`, headers)
      .then((res) => {
        console.log(res);
        console.log(res.data.id);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
      });

    // filterMenu(deleteID);
    console.log(tempMenuItems);
    setTempMenuItems((prev) =>
      prev.filter((mi) => {
        return mi.id !== deleteID;
      })
    );
    console.log(menuItems);
  };

  // const filterMenu = (deleteID) => {
  //   setMenuItems((prev) =>
  //     prev.filter((mi) => {
  //       return mi.id !== deleteID;
  //     })
  //   );
  //   console.log(menuItems);

  // };

  const getMenuItems = async () => {
    axios
      .get(`/menu_item/restaurant/${params.id}`)
      .then((res) => {
        console.log(res.data.results);
        setMenuItems(res.data.results);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          nav("/login");
        }
      });
  };

  const popEdit = (e) => {
    console.log("hi");
    // console.log(e.itemname);
    formik.setFieldValue("itemName", e.target.getAttribute("item-name"), false);
    formik.setFieldValue("price", e.target.getAttribute("price"), false);
    formik.setFieldValue(
      "description",
      e.target.getAttribute("description"),
      false
    );
    formik.setErrors({ itemName: "", price: "", description: "" });
    addMenuRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <h1 className="text-left">Your Menu</h1>
      <hr />

      <div className="container text-center">
        <div className="row">
          {menuItems.map((mi) => {
            return (
              <div className="col" key={mi.id}>
                <Card className="menu-item shadow" style={{ width: "18rem" }}>
                  <Card.Body>
                    <Card.Title>{mi.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      ${mi.price}
                    </Card.Subtitle>
                    <Card.Text>{mi.description}</Card.Text>
                    <Button
                      className="ms-1"
                      onClick={popEdit}
                      variant="outline-secondary"
                      item-name={mi.name}
                      price={mi.price}
                      description={mi.description}
                    >
                      Edit
                    </Button>
                    <Button
                      className="ms-1"
                      onClick={deleteMenuItem}
                      variant="outline-danger"
                      item-id={mi.id}
                    >
                      Delete
                    </Button>

                    {/* <Card.Link href="#">Another Link</Card.Link> */}
                  </Card.Body>
                </Card>
              </div>
            );
          })}

          <div className="col">
            <Card className="menu-item shadow" style={{ width: "18rem" }}>
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
                  item-name="hi"
                  price="1.39"
                  description="fi"
                >
                  Edit
                </Button>
                <Button
                  className="ms-1"
                  onClick={deleteMenuItem}
                  variant="outline-danger"
                  item-id="1"
                >
                  Delete
                </Button>

                {/* <Card.Link href="#">Another Link</Card.Link> */}
              </Card.Body>
            </Card>
          </div>
          <div className="col">
            <Card className="menu-item shadow" style={{ width: "18rem" }}>
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
            <Card className="menu-item shadow" style={{ width: "18rem" }}>
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
      <h1 className="text-left" ref={addMenuRef}>
        Add/Edit Menu Item
      </h1>
      <hr />
      <form className="menu-form" onSubmit={formik.handleSubmit}>
        {success && (
          <div className="alert alert-success mt-3 mb-1" role="alert">
            {success}
          </div>
        )}
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
