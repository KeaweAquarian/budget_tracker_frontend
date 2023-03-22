import React, { Component } from "react";
import { Container } from "reactstrap";
import AppNav from "./appNav";

class Home extends Component {
  state = {};
  render() {
    return (
      <div
        className="d-flex"
        style={{ backgroundColor: "#EEF5F7", height: "100vh" }}
      >
        <AppNav />
        <div style={{ backgroundColor: "white", width: "83%" }}>
          <Container>
            <h2>Welcome to Expence App</h2>
          </Container>
        </div>
      </div>
    );
  }
}

export default Home;
