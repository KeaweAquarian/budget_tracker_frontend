import { Nav, NavItem, NavbarBrand, NavLink } from "reactstrap";
import logo from "./images/logo2.png";
import img from "./images/userIcon2.png";
import React, { useState, useCallback, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useLocalState } from "./util/useLocalStorage";
import { Button } from "reactstrap";
import { useDropzone } from "react-dropzone";

const AppNav = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [username] = useState((data) =>
    data !== null ? jwt_decode(jwt).sub : ""
  );
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [loading, setLoading] = useState(true);
  const [profileImage, setProfileImage] = useState(null);
  const [id, setId] = useState(null);

  // Fetch user details
  const fetchUser = async () => {
    console.log("username is" + username);
    const response = await fetch(
      `https://expensetracker-production-2788.up.railway.app/api/user/${username}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    if (response.status === 200) {
      const body = await response.json();
      setProfileImage(body.userProfileImageLink);
      setFirstname(body.firstName);
      setLastname(body.lastName);
      setId(body.id);
      setLoading(false);
      return body;
    }
  };
  useEffect(() => {
    fetchUser();

    // eslint-disable-next-line
  }, []);

  const logOut = () => {
    setJwt("");

    window.location = "/auth";
  };

  const render = () => {
    window.location.reload();
  };

  return (
    <div
      style={{
        padding: "10px",
        marginRight: "20px",
        marginLeft: "20px",
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
          {!loading ? <MyDropzone id={id} jwt={jwt} render={render} /> : ""}
        </div>

        <Finished loading={loading} profileImage={profileImage} id={id} />

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

const Finished = ({ loading, profileImage, id }) => {
  let value = 0;
  if (profileImage !== null) {
    value = 1;
  } else {
    value = 2;
  }
  if (!loading) {
    switch (value) {
      case 1:
        return (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              src={`https://expensetracker-production-2788.up.railway.app/api/user/${id}/image/download`}
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
        );
      case 2:
        return (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              src={img}
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
        );

      default:
        return null;
    }
  } else return null;
};

const MyDropzone = ({ id, jwt, render }) => {
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append("file", file);
    const userId = id;
    const fetchImage = async () => {
      await fetch(
        `https://expensetracker-production-2788.up.railway.app/api/user/${userId}/image/upload`,

        {
          method: "POST",
          RequestMode: "no-cors",
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
          body: formData,
        }
      );
      await render();
    };

    fetchImage();
    // eslint-disable-next-line
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} style={{ cursor: "pointer" }}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <h6>Drop the image here ...</h6>
      ) : (
        <h6>Edit profile image</h6>
      )}
    </div>
  );
};

export default AppNav;
