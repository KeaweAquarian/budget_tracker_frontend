import React, { useState } from "react";
import { Button } from "reactstrap";
import { useLocalState } from "../../util/useLocalStorage";
import img from "../../images/default.png";

export default function Auth(props) {
  const [authMode, setAuthMode] = useState("signin");
  // const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [jwt, setJwt] = useLocalState("", "jwt");
  // const [auth, setAuth] = useState(null);

  //Swich from signin to signup
  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin");
  };

  //Signin
  const submitData = (e) => {
    e.preventDefault();
    const reqBody = {
      username: username,
      password: password,
    };
    var formBody = [];
    for (var property in reqBody) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(reqBody[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    //Get login token
    const login = async (formBody) => {
      console.log(formBody);
      const res = await fetch(
        "https://expensetracker-production-2788.up.railway.app/api/login",
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          method: "POST",
          body: formBody,
        }
      );
      console.log(res);

      if (res.status === 200) {
        const data = await res.json();
        setJwt(data.access_token);
        window.location.href = "/";
      } else {
        alert("Invalid email or password");
        // return Promise.reject("Invalid email or password")
        console.log(jwt);
      }
    };
    login(formBody);
  };

  //add user
  const submitUser = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const user = {
        firstName: firstName,
        lastName: lastName,
        userName: username,
        // email: email,
        password: password,
        userProfileImageLink: null,
        roles: [{ id: 1, name: "ROLE_USER" }],
      };
      submittingUser(user);
    }
  };
  //validate new user fields
  const validateForm = () => {
    if (firstName.length === 0) {
      window.alert("All fields must be entered. Please add a first name.");
      return false;
    }
    if (lastName.length === 0) {
      window.alert("All fields must be entered. Please add a last name.");
      return false;
    }
    if (username.length === 0) {
      window.alert("All fields must be entered. Please add a username name.");
      return false;
    }
    if (password.length === 0) {
      window.alert("All fields must be entered. Please add a password.");
      return false;
    }
    return true;
  };

  //Add user
  const submittingUser = async (user) => {
    const res = await fetch(
      `https://expensetracker-production-2788.up.railway.app/api/user/add`,
      {
        method: "POST",
        RequestMode: "no-cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          // Authorization: `Bearer ${auth}`,
        },
        body: JSON.stringify(user),
      }
    );
    console.log(res.status);
    if (res.status === 200 || res.status === 201) {
      changeAuthMode();
    } else {
      alert(
        "Username is already associated with an account. Please choose another."
      );
    }
  };

  //demo button
  const preFill = () => {
    setUsername("john");
    setPassword(1234);
  };

  if (authMode === "signin") {
    return (
      <>
        <div className="Auth-form-container">
          <form className="Auth-form">
            <div className="Auth-form-content">
              <img src={img} alt="Logo" style={{ maxWidth: "100%" }} />
              {/* <h3 className="Auth-form-title">Budget Tracker Sign In</h3> */}
              <div className="text-center">
                Not registered yet?{" "}
                <span
                  className="link-primary"
                  onClick={changeAuthMode}
                  role="button"
                >
                  Sign Up
                </span>
              </div>
              <div className="form-group mt-3">
                <label>Username</label>
                <input
                  type="text"
                  className="form-control mt-1"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </div>
              <div className="form-group mt-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control mt-1"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <div className="d-grid gap-2 mt-3">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={submitData}
                >
                  Submit
                </button>
              </div>
              {/* <p className="text-center mt-2">
              Forgot <a href="#">password?</a>
            </p> */}
            </div>

            <Button onClick={preFill} className="m-3">
              Demo Account
            </Button>
          </form>
        </div>
      </>
    );
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="text-center">
            Already registered?{" "}
            <span
              className="link-primary"
              onClick={changeAuthMode}
              role="button"
            >
              Sign In
            </span>
          </div>
          <div className="form-group mt-3">
            <label>First Name</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="e.g Jane"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
          </div>
          <div className="form-group mt-3">
            <label>Last Name</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="e.g Williams"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </div>
          <div className="form-group mt-3">
            <label>Username</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="e.g Jane4242"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          {/* <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div> */}
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={submitUser}
            >
              Submit
            </button>
          </div>
          {/* <p className="text-center mt-2">
            Forgot <a href="#">password?</a>
          </p> */}
        </div>
      </form>
    </div>
  );
}
