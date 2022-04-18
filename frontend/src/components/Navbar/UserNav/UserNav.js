import React, { useContext, useEffect, useState } from "react";
import {
  Nav,
  Navbar,
  Container,
  NavDropdown,
  Card,
  Button,
} from "react-bootstrap";
import logo from "../../../images/logo.svg";
import "./UserNav.css";
import { Outlet } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";
import axios from "axios";
import Notifications from "./Notification/Notification";

const UserNav = (props) => {
  const { logoutUser, user, authTokens } = useContext(AuthContext);
  const [res, setRes] = useState(null);
  const [userInfo, setUserInfo] = useState({
    avatar: null,
    first_name: "",
    last_name: "",
    email: "",
  });

  useEffect(() => {
    if (user) {
      if (user.restaurant !== null) {
        setRes(user.restaurant);
      }
      let header = { Authorization: "Bearer " + authTokens?.access };
      axios
        .get("/user/profile/", { headers: header })
        .then((res) => {
          setUserInfo(res.data);
          props.SetAvatar(res.data.avatar);
        })
        .catch((e) => {
          alert(e);
        });
    }
    // eslint-disable-next-line
  }, [user]);

  const NavMyRestaurant = () => {
    if (user.restaurant) {
      return <Nav.Link href={`/restaurant/${res}/`}>My Restaruant</Nav.Link>;
    } else {
      return (
        <Nav.Link href={`/create/restaurant/`}>Create Restaurant</Nav.Link>
      );
    }
  };

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
              <Nav.Link href={`/user/feed`}>Feed</Nav.Link>
              <NavMyRestaurant />
              <Notifications />

              <NavDropdown title="Account" id="basic-nav-dropdown">
                <Card className="card p-2 d-flex flex-column profile_container">
                  <Card.Img
                    variant="top"
                    src={props.Avatar}
                    className="img_fit"
                  />
                  <Card.Body className="dropdown-text">
                    <Card.Title>
                      {userInfo.first_name} {userInfo.last_name}
                    </Card.Title>
                    <Card.Text className="card-text">
                      {userInfo.phone_num && (
                        <>
                          <b>Phone Number:</b> {userInfo.phone_num}
                          <br />
                        </>
                      )}
                      {userInfo.email && (
                        <>
                          <b>Email: </b>
                          {userInfo.email}
                        </>
                      )}
                    </Card.Text>
                  </Card.Body>
                  <Button
                    variant="primary"
                    href={`/profile/edit`}
                    className="edit-profile mt-2"
                  >
                    Edit Profile
                  </Button>
                </Card>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link href="/login" onClick={logoutUser}>
                Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
};

export default UserNav;
