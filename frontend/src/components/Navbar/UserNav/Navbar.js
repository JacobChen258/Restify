import React from "react";
import {
  Nav,
  Navbar,
  Container,
  NavDropdown,
  Card,
  Button,
} from "react-bootstrap";
import logo from "../../../images/logo.svg";
import "./Navbar.css";
import profilePicture from "../../../images/profile-picture.png";
import { Outlet } from "react-router-dom";

const UserNavbar = () => {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" top="fixed">
        <Nav.Link href="/">
          <img src={logo} alt="restify_logo" height="35px" />
        </Nav.Link>
        <Container>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto navbar">
              <Nav.Link href="/feed">Feed</Nav.Link>
              <Nav.Link href="/restaruant">My Restaruant</Nav.Link>
              <NavDropdown title="Notifications" id="basic-nav-dropdown">
                <div className="dropdown-text">
                  <NavDropdown.Item href="#action/3.1">
                    <b>Notification Title</b>
                    <br />
                    ejnfrkejgnrkgjnrekgnerkgjnkjk
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.1">
                    <b>Notification Title</b>
                    <br />
                    ejnfrkejgnrkgjnre
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.1">
                    <b>Notification Title</b>
                    <br />
                    ejnfrkejgnrkgjnrekgnerkgjnkjk
                  </NavDropdown.Item>
                </div>
              </NavDropdown>

              <NavDropdown title="Account" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">
                  <Card className="card">
                    <Card.Img variant="top" src={profilePicture} />
                    <Card.Body className="dropdown-text">
                      <Card.Title>FirstName LastName</Card.Title>
                      <Card.Text className="card-text">
                        <b>Phone Number:</b> 647-123-4567
                        <br />
                        <b>Email:</b> myemailmyemailmyemail@gmail.com
                      </Card.Text>
                    </Card.Body>
                    <Button variant="primary">Edit Profile</Button>
                  </Card>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link href="/logout">Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
};

export default UserNavbar;
