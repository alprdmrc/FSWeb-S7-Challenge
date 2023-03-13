import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  Button,
} from "reactstrap";

const Header = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <>
      <Navbar
        style={{
          backgroundColor: "#FF3650",

          // height: "72px",
          // display: "flex",
          // justifyContent: "space-between",
          // alignItems: "center",
        }}
        className="navbar-expand-lg navbar-light"
      >
        <NavbarBrand style={{ color: "white" }} onClick={() => navigate("/")}>
          Teknolojik Yemekler
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse className="justify-content-end" isOpen={isOpen} navbar>
          <Nav>
            <NavItem>
              <NavLink to="/">
                <Button color="primary">Home</Button>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/help">
                <Button>Help</Button>
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </>
  );
};

export default Header;
