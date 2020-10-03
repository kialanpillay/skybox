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
              <h4 className="thin">
                SKYBOX is built for NASA Space Apps 2020 - Orbital Sky Challenge
              </h4>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md={12}>
              <h4 className="thin">Designed and Developed in South Africa</h4>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md={12}>
              <h4 className="thin">
                &copy; Kialan Pillay, Tshiamo Phaahla and Johns Paul
              </h4>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md={12}>
              <h4 className="thin">
                View the <a
                  href="https://github.com/kialanpillay/space-apps/"
                  target="_blank"
                >
                  Source Code
                </a>{" "}
              </h4>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md={12}>
              <img src={"Space_Apps_Logos/PNG/Square White.png"} width={350}/>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
