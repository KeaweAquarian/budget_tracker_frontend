import React, { Component } from "react";
import { Container } from "reactstrap";
import AppNav from "./appNav";

class Home extends Component {
  state = {};
  render() {
    return (
      <div style={{ backgroundColor: "white", width: "83%" }}>
        <Container>
          <h2>Welcome to Expence App</h2>
        </Container>
      </div>
    );
  }
}

export default Home;
