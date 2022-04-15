import React from "react";
import "./AddBlog.css";

const AddBlog = () => {
  return (
    <>
      <h1 class="text-left">Create New Blog Post</h1>
      <hr />

      <form class="menu-form">
        <div class="form-group mt-3">
          <label for="postName">Post Name</label>
          <input
            type="text"
            class="form-control"
            id="postName"
            placeholder="Enter post name"
          />
        </div>

        <div class="form-group mt-3">
          <label for="postDescription">Post Body</label>
          <textarea
            class="form-control"
            id="postDescription"
            placeholder="Enter body"
            cols="20"
            rows="5"
          ></textarea>
        </div>
        <div class="text-center mt-3">
          <button type="submit" class="btn btn-success">
            Create Blog Post
          </button>
        </div>
      </form>
    </>
  );
};

export default AddBlog;
