import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import logo from "../../../images/logo.svg";
import "./AnonNav.css";

import { Outlet } from "react-router-dom";

const AnonNavbar = () => {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" top="fixed">
        <Nav.Link href="/">
          <img src={logo} alt="restify_logo" height="35px" />
        </Nav.Link>
        <Container>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto navbar"></Nav>
            <Nav>
              <Nav.Link href="/signup">Register</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="/login">Login</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
};

export default AnonNavbar;
