import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

export default class Library extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      observatories: null,
      satellites: null,
    };
  }
  componentDidMount() {
    this.getObservatories();
  }
  getObservatories = () => {
    const url = "https://sscweb.gsfc.nasa.gov/WS/sscr/2";
    const endpoint = `${url}/observatories/`;
    fetch(endpoint, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          observatories: response.Observatory[1],
        });
      })
      .then(() => this.processObservatories())
      .catch((err) => {
        console.log(err);
      });
  };

  convertArrayToObject = (array) => {
    const obj = {};
    return array.reduce((obj, observatory) => {
      return {
        ...obj,
        [observatory.Name]: {},
      };
    }, obj);
  };

  processObservatories = () => {
    const observatories = this.state.observatories.map((observatory) => {
      return observatory.Name;
    });
    const data = this.state.observatories;
    this.setState({
      observatories: observatories,
      satellites: data,
    });
  };

  render() {
    return (
      <div>
        <Container>
          <Row className="justify-content-center">
            <Col md="auto">
              <h1 className="brand" style={{ fontSize: "8rem" }}>
                SSC LIBRARY
              </h1>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md={12}>
              <h3 className="light">
                Discover the NASA Satellite Situation Center observatories.
              </h3>
            </Col>
          </Row>
          {this.state.satellites ? (
            <Row
              className="justify-content-center"
              style={{
                marginTop: "1rem",
                height: "30rem",
                overflowY: "scroll",
              }}
            >
              {this.state.satellites.map((satellite, index) => {
                return (
                  <Col md={3} key={index}>
                    <OverlayTrigger
                      key={index}
                      placement="top"
                      overlay={<Tooltip>SSC ID: {satellite.Id}</Tooltip>}
                    >
                      <h3
                        className="light"
                        key={index}
                        style={{ cursor: "pointer" }}
                      >
                        {satellite.Name}
                      </h3>
                    </OverlayTrigger>
                  </Col>
                );
              })}
            </Row>
          ) : (
            <Spinner animation="border" role="status"></Spinner>
          )}
        </Container>
      </div>
    );
  }
}
