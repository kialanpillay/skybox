import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

export default class Navigation extends Component {
  render() {
    return (
      <Navbar bg="none" variant="dark">
        <Nav className="mr-auto">
          <Nav.Link href="/">Satellite Situation Center</Nav.Link>
          <Nav.Link href="/objects">Space Objects</Nav.Link>
        </Nav>
      </Navbar>
    );
  }
}
