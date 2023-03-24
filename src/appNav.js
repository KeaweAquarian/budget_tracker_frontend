import { Nav, NavItem, NavbarBrand, NavLink, Navbar } from "reactstrap";
import logo from "./images/logo2.png";
import React, { useState } from "react";
import jwt_decode from "jwt-decode";
import { useLocalState } from "./util/useLocalStorage";

const AppNav = () => {
  const [jwt] = useLocalState("", "jwt");
  const [username, setUsername] = useState(jwt_decode(jwt).sub);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  // Fetch user details
  const fetchUser = async () => {
    const response = await fetch(`http://localhost:5000/api/user/${username}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    });
    const body = await response.json();
    setFirstname(body.firstName);
    setLastname(body.lastName);

    return body;
  };
  fetchUser();

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
        <div
          className="mt-5, mb-4"
          style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 1px" }}
        >
          <h5 className="text-center">
            {firstname} {lastname}
          </h5>
        </div>
        <Nav className="ml-auto" navbar pills></Nav>
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
          >
            Dashboard
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            href="/expenses"
            style={
              window.location.href === "http://localhost:3000/expenses"
                ? {
                    backgroundColor: "#5886F6",
                    borderRadius: "8px",
                    color: "white",
                  }
                : { color: "#383838" }
            }
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
          >
            About
          </NavLink>
        </NavItem>
      </Nav>
    </div>
  );
};

export default AppNav;
