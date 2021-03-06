import React from "react";
import { Card, Button } from "react-bootstrap";
import { AiFillLike } from "react-icons/ai";
import { Link } from "react-router-dom";
import "./Blog.css";

const Blog = (props) => {
  return (
    <Card className="p-2 content_width mb-2 blog_bg" id="res_blog">
      <Link to={`/blog/${props.Blog.id}/`}>
        <Card.Title>{props.Blog.title}</Card.Title>
      </Link>
      <Card.Subtitle className="time_text_color">
        {props.Blog.creation_time.slice(0, 10)}
      </Card.Subtitle>
      <Card.Body className="preview_text m-1">
        {props.Blog.content}
      </Card.Body>
      <div className="d-flex">
        <AiFillLike size={20} />{" "}
        <div className="ps-1 ">{props.Blog.num_likes}</div>
        {props.owner && (
          <Button
            size="sm"
            className="ms-2"
            variant="danger"
            id={props.Blog.id}
            onClick={(e) => {
              props.onChange(e.target.id);
            }}
          >
            Delete
          </Button>
        )}
      </div>
    </Card>
  );
};

export default Blog;
