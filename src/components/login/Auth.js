import React, { useState } from "react"
import { useLocalState } from "../../util/useLocalStorage";

export default function (props) {
  const [authMode, setAuthMode] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
   const [jwt, setJwt] = useLocalState("", "jwt");

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin")

  }

  const submitData = () => {

      const reqBody = {
        username: email,
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


    const login = async (formBody) =>{
       console.log("hi1");
     const res = await fetch("http://localhost:5000/api/login", {
        headers: {
          "Content-Type": 'application/x-www-form-urlencoded',
        },
        method: "POST",
        body: formBody
      })

      if(res.status === 200){
      const data = await res.json()
      setJwt(data.access_token)
      window.location.href = "/";
      }else {
        alert("Invalid email or password")
        // return Promise.reject("Invalid email or password")
      }
      
      
      
    }
    login(formBody)

  }

  if (authMode === "signin") {
    return (
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="text-center">
              Not registered yet?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Sign Up
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
                value={email}
                onChange={(e)=>{setEmail(e.target.value)}}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                value={password}
                onChange={(e)=>{setPassword(e.target.value)}}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary" onClick={submitData}>
                Submit
              </button>
            </div>
            <p className="text-center mt-2">
              Forgot <a href="#">password?</a>
            </p>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary" onClick={changeAuthMode}>
              Sign In
            </span>
          </div>
          <div className="form-group mt-3">
            <label>User Name</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="e.g Jane4242"
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <p className="text-center mt-2">
            Forgot <a href="#">password?</a>
          </p>
        </div>
      </form>
    </div>
  )
}
