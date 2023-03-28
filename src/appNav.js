import { Nav, NavItem, NavbarBrand, NavLink } from "reactstrap";
import logo from "./images/logo2.png";
import img from "./images/me.jpg";
import React, { useState, useCallback, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useLocalState } from "./util/useLocalStorage";
import { Button } from "reactstrap";
import Dropzone, { useDropzone } from "react-dropzone";

const AppNav = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [username] = useState(jwt_decode(jwt).sub);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [loading, setLoading] = useState(true);
  const [profileImage, setProfileImage] = useState(null);
  const [id, setId] = useState(null);

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
    setId(body.id);
    setProfileImage(body.userProfileImageLink);
    setLoading(false);
    console.log(jwt);

    return body;
  };
  useEffect(() => {
    fetchUser();
  });

  const logOut = () => {
    setJwt("");

    window.location = "http://localhost:3000/auth";
  };

  // if (loading) return <div>Loading...</div>;

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

        <div style={{ display: "flex", justifyContent: "center" }}>
          {!loading ? <MyDropzone id={id} jwt={jwt} /> : ""}
        </div>

        {profileImage !== null ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              src={`http://localhost:5000/api/user/${id}/image/download`}
              alt="Logo"
              style={{
                borderRadius: "50%",
                width: "150px",
                height: "150px",
                marginBottom: "10px",
                objectFit: "cover",
              }}
            />
          </div>
        ) : null}

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
      <div
        className="mt-5"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Button color="secondary" outline onClick={logOut}>
          Log Out
        </Button>
      </div>
    </div>
  );
};

const drop = () => {};
const MyDropzone = ({ id, jwt }) => {
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append("file", file);
    const userId = id;
    const res = fetch(
      `http://localhost:5000/api/user/${userId}/image/upload`,

      {
        method: "POST",
        RequestMode: "no-cors",
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
        body: formData,
      }
    );
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the image here ...</p>
      ) : (
        <p>Drag 'n' drop profile image here, or click to select image</p>
      )}
    </div>
  );
};

export default AppNav;
