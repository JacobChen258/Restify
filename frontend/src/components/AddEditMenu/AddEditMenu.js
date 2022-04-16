import React from "react";

const AddEditMenu = () => {
  return (
    <>
      <h1 className="text-left">Your Menu</h1>
      <hr />

      <div className="container text-center">
        <div className="row">
          <div className="col">
            <div className="card" style={{ width: "18rem" }}>
              <div className="card-body">
                <h5 className="card-title">Pepperoni Pizza</h5>
                <h6 className="card-subtitle mb-2 text-muted">$10.99</h6>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <button
                  type="submit"
                  className="btn btn-outline-secondary btn-sm"
                >
                  edit
                </button>
                <button type="submit" className="btn btn-outline-danger btn-sm">
                  Delete
                </button>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card" style={{ width: "18rem" }}>
              <div className="card-body">
                <h5 className="card-title">Falafel</h5>
                <h6 className="card-subtitle mb-2 text-muted">$5.50</h6>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <button
                  type="submit"
                  className="btn btn-outline-secondary btn-sm"
                >
                  edit
                </button>
                <button type="submit" className="btn btn-outline-danger btn-sm">
                  Delete
                </button>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card" style={{ width: "18rem" }}>
              <div className="card-body">
                <h5 className="card-title">Biriyani</h5>
                <h6 className="card-subtitle mb-2 text-muted">$6.50</h6>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <button
                  type="submit"
                  className="btn btn-outline-secondary btn-sm"
                >
                  edit
                </button>
                <button type="submit" className="btn btn-outline-danger btn-sm">
                  Delete
                </button>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card" style={{ width: "18rem" }}>
              <div className="card-body">
                <h5 className="card-title">Ice cream</h5>
                <h6 className="card-subtitle mb-2 text-muted">Free</h6>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <button
                  type="submit"
                  className="btn btn-outline-secondary btn-sm"
                >
                  edit
                </button>
                <button type="submit" className="btn btn-outline-danger btn-sm">
                  Delete
                </button>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card" style={{ width: "18rem" }}>
              <div className="card-body">
                <h5 className="card-title">Water</h5>
                <h6 className="card-subtitle mb-2 text-muted">$200</h6>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <button
                  type="submit"
                  className="btn btn-outline-secondary btn-sm"
                >
                  edit
                </button>
                <button type="submit" className="btn btn-outline-danger btn-sm">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h1 className="text-left">Add Menu Item</h1>
      <hr />
      <form className="menu-form">
        <div className="form-group">
          <label htmlFor="inputName">Item Name</label>
          <input
            type="text"
            className="form-control"
            id="itemName"
            placeholder="Enter item name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="inputPrice">Price</label>
          <input
            type="number"
            className="form-control"
            id="inputPrice"
            placeholder="Price"
          />
        </div>
        <div className="form-group">
          <label htmlFor="inputDescription">Description</label>
          <textarea
            className="form-control"
            id="inputDescription"
            placeholder="Enter Description"
            cols="20"
            rows="5"
          ></textarea>
        </div>
        <div className="text-center mt-2">
          <button type="submit" className="btn btn-success">
            Add Menu Item
          </button>
        </div>
      </form>
    </>
  );
};

export default AddEditMenu;
