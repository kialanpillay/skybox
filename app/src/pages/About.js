import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default class About extends React.Component {
  render() {
    return (
      <div>
        <Container>
          <Row className="justify-content-center">
            <Col md="auto">
              <h1 className="brand" style={{ fontSize: "8rem" }}>
                ABOUT US
              </h1>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md={12}>
              <h5 className="mono">
                The Eternal Space Race. Compare your country's orbital exploits
                against the World.
              </h5>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
