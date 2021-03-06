import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useCallback,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./AddEditMenu.css";
import { Card, Button } from "react-bootstrap";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import AuthContext from "../Context/AuthContext";
import showSuccessModal from "../../utils/SuccessModal";

var pages = 1;

var done = false;

const AddEditMenu = () => {
  const nav = useNavigate();
  const params = useParams();

  const addMenuRef = useRef(null);

  const { authTokens, user } = useContext(AuthContext);
  const [menuItems, setMenuItems] = useState([]);
  const [toggleMenu, setToggleMenu] = useState([]);
  const [changed, setChanged] = useState(false);
  const [success, setSuccess] = useState("");
  var next = `/menu_item/restaurant/${params.id}`;

  const priceRegex = /^(([1-9]\d{0,7})|(\d{0,8}\.\d{1,2}))$/;
  const validation = Yup.object({
    itemName: Yup.string()
      .required("Item name is required")
      .max(100, "Maximum 100 character"),
    price: Yup.string()
      .required("Price is invalid")
      .matches(priceRegex, "Price must be postive, max 2 decimal point and 8 digits"),
    description: Yup.string()
      .max(500, "Maximum 500 characters")
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

      const editIds = getIdFromName(values.itemName);

      if (editIds.length > 0) {
        editIds.forEach((id) => {
          axios
            .patch(`/menu_item/${id}/`, body, headers)
            .then(() => showSuccessModal("Menu item Edited!", setSuccess));
        });

        resetForm();

        setToggleMenu((prev) => !prev);
      } else {
        axios
          .post("/menu_item/add/", body, headers)
          .then((res) => {
            setToggleMenu((prev) => !prev);
            showSuccessModal("Menu item added!", setSuccess);
            resetForm();
          })
          .catch((err) => {
            if (err.response.status === 401 || err.response.status === 403) {
              nav("/login");
            } else if (err.response.status === 404) {
              formik.setErrors({ itemName: "You do not own a restaurant" });
            }
          });

        setChanged(true);
      }
    },
  });

  const resetForm = () => {
    formik.setFieldValue("itemName", "", false);
    formik.setFieldValue("description", "", false);
    formik.setFieldValue("price", "", false);
    formik.setFieldTouched("itemName", false, false);
    formik.setFieldTouched("description", false, false);
    formik.setFieldTouched("price", false, false);
  };

  const getIdFromName = (name) => {
    return menuItems
      .filter((x) => {
        return x.name === name;
      })
      .map((i) => {
        return i.id;
      });
  };

  useEffect(() => {
    getMenuItems();

    // eslint-disable-next-line
  }, [toggleMenu]);

  const deleteMenuItem = (e) => {
    const deleteID = e.target.getAttribute("item-id");
    const headers = {
      headers: {
        Authorization: "Bearer " + authTokens?.access,
      },
    };

    axios
      .delete(`/menu_item/${deleteID}/`, headers)
      .then((res) => {
        setToggleMenu((prev) => !prev);
        showSuccessModal("Menu item deleted!", setSuccess);
      })
      .catch((err) => {
        console.log(err);
      });

    setToggleMenu((prev) => !prev);
  };

  const getInitItems = `/menu_item/restaurant/${params.id}`;
  const getMenuItems = async () => {
    setMenuItems([]);
    next = getInitItems;

    if (done) {
      while (next) {
        let res;
        try {
          res = await axios.get(next);
        } catch (err) {
          if (err.response.status === 401) {
            nav("/login");
          } else if (err.response.status === 404) {
            nav("/");
          }
        }
        setMenuItems((prev) => [...prev, ...res.data.results]);
        next = res.data.next ? res.data.next.replace("8000", "3000") : null;
      }
    } else {
      let i = 0;
      while (i < pages) {
        let res;
        try {
          res = await axios.get(next);
        } catch (err) {
          if (err.response.status === 401) {
            nav("/login");
          } else if (err.response.status === 404) {
            nav("/");
          }
        }
        setMenuItems((prev) => [...prev, ...res.data.results]);
        next = res.data.next ? res.data.next.replace("8000", "3000") : null;

        i += 1;
      }
    }
  };

  const getMenuItemsPaginate = async () => {
    setLoading(true);
    if (next) {
      axios
        .get(next)
        .then((res) => {
          setMenuItems((prev) => [...prev, ...res.data.results]);

          next = res.data.next ? res.data.next.replace("8000", "3000") : null;

          pages += 1;
        })
        .catch((err) => {
          if (err.response.status === 401) {
            nav("/login");
          }
        });
    } else {
      done = true;
    }

    setLoading(false);
  };

  const popEdit = (e) => {
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

  const [loading, setLoading] = useState(false);

  const observer = useRef();
  const infScrollRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          getMenuItemsPaginate();
        }
      });
      if (node) observer.current.observe(node);
    }, // eslint-disable-next-line
    [loading]
  );

  return (
    <>
      <h1 className="text-left">Your Menu</h1>
      <hr />
      {success && (
        <div className="alert alert-success mt-3 mb-1" role="alert">
          {success}
        </div>
      )}

      <div className="container text-center">
        <div className="row">
          {menuItems.map((mi, index) => {
            return (
              <div className="col" key={mi.id}>
                <Card
                  className="menu-item shadow"
                  style={{ width: "18rem" }}
                  ref={index === menuItems.length - 1 ? infScrollRef : null}
                >
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
        </div>
      </div>
      <h1 className="text-left" ref={addMenuRef}>
        Add/Edit Menu Item
      </h1>
      <hr />
      <form className="menu-form" onSubmit={formik.handleSubmit}>
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
            type="text"
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
