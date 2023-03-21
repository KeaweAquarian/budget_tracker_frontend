import { Nav, Navbar, NavItem, NavbarBrand, NavLink } from "reactstrap";
import logo from "./images/logo2.png";
import React from "react";

const appNav = ({ toogleLink, active }) => {
  return (
    <div
      style={{
        padding: "10px",
        marginRight: "20px",
        backgroundColor: "white",
        boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
      }}
    >
      <Nav vertical>
        <NavbarBrand href="/">
          <img
            src={logo}
            alt="Logo"
            style={{ width: "200px", marginBottom: "10px" }}
          />
        </NavbarBrand>
        <Nav className="ml-auto" navbar pills></Nav>
        {/* <NavItem
          style={{
            backgroundColor: "#5886F6",
            borderRadius: "8px",
          }}
        >
          <NavLink href="/Auth" style={{ color: "#383838" }}>
            Auth
          </NavLink>
        </NavItem> */}
        <NavItem>
          <NavLink
            href="/"
            style={
              window.location.href === "http://localhost:3000/"
                ? {
                    backgroundColor: "#5886F6",
                    borderRadius: "8px",
                    color: "white",
                  }
                : { color: "#383838" }
            }
            onClick={() => toogleLink(1)}
          >
            Expences
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            href="/categories"
            style={
              window.location.href === "http://localhost:3000/categories"
                ? {
                    backgroundColor: "#5886F6",
                    borderRadius: "8px",
                    color: "white",
                  }
                : { color: "#383838" }
            }
            onClick={() => toogleLink(2)}
          >
            Categories
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            href="/about"
            style={
              window.location.href === "http://localhost:3000/about"
                ? {
                    backgroundColor: "#5886F6",
                    borderRadius: "8px",
                    color: "white",
                  }
                : { color: "#383838" }
            }
            onClick={() => toogleLink(3)}
          >
            About
          </NavLink>
        </NavItem>
      </Nav>
    </div>
  );
};

export default appNav;
