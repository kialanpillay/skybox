import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

export default class Navigation extends Component {
  render() {
    return (
      <Navbar bg="none" variant="dark">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/ssc">Satellite Situation Center</Nav.Link>
          <Nav.Link href="/objects">Space Objects</Nav.Link>
          <Nav.Link href="/about">About Us</Nav.Link>
        </Nav>
      </Navbar>
    );
  }
}
