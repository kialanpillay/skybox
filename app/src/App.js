import React from "react";
import Globe from "react-globe.gl";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: null,
      observatories: null,
      satellites: null,
      satellite: "",
      processed: false,
      gData: [],
      gLabels: [],
    };
    this.globeEl = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    this.getObservatories();
    const globe = this.globeEl;
    globe.current.controls().autoRotate = true;
    globe.current.controls().autoRotateSpeed = 3;
  }

  processDateTime = (dt) => {
    return dt.substring(0, dt.indexOf(".")).replace(/[-:]/g, "");
  };

  getLocations = (satellite) => {
    const url = "https://sscweb.gsfc.nasa.gov/WS/sscr/2";
    const endDate = new Date(satellite.EndTime);
    const currentDate = new Date();

    const end =
      currentDate < endDate
        ? this.processDateTime(currentDate.toISOString()).slice(0, -2) + "00Z"
        : this.processDateTime(satellite.EndTime) + "Z";

    let prevDate;
    if (currentDate < endDate) {
      prevDate = currentDate;
    } else {
      prevDate = endDate;
    }
    prevDate.setDate(prevDate.getDate() - 1);
    const start =
      this.processDateTime(prevDate.toISOString()).slice(0, -2) + "00Z";

    const endpoint = `${url}/locations/${satellite.Id}/${start},${end}/`;
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
          locations: response.Result.Data[1],
        });
      })
      .then(() => this.processLocation(satellite))
      .catch((err) => {
        console.log(err);
      });
  };

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

  processObservatories = () => {
    const observatories = this.state.observatories.map((observatory) => {
      return observatory.Name;
    });
    const data = this.convertArrayToObject(this.state.observatories);
    this.setState({
      observatories: observatories,
      satellites: data,
      satellite: observatories[0],
    });
  };

  convertArrayToObject = (array) => {
    const obj = {};
    return array.reduce((obj, observatory) => {
      return {
        ...obj,
        [observatory.Name]: {
          Id: observatory.Id,
          Name: observatory.Name,
          StartTime: observatory.StartTime[1],
          EndTime: observatory.EndTime[1],
        },
      };
    }, obj);
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleClick = () => {
    this.getLocations(this.state.satellites[this.state.satellite]);
  };

  processLocation = (satellite) => {
    const data = this.state.locations.map((location, index) => ({
      name: satellite.Name,
      lat:
        location.Coordinates[1][0].Latitude[1][
          location.Coordinates[1][0].Latitude[1].length - 1
        ],
      lng:
        location.Coordinates[1][0].Longitude[1][
          location.Coordinates[1][0].Longitude[1].length - 1
        ],
      altitude:
        (location.RadialLength[1][location.RadialLength[1].length - 1] -
          6378.137) /
        10000,
      color: "red",
    }));
    const labels = this.state.locations.map((location, index) => ({
      text: satellite.Name,
      id: satellite.Id,
      lat:
        location.Coordinates[1][0].Latitude[1][
          location.Coordinates[1][0].Latitude[1].length - 1
        ],
      lng:
        location.Coordinates[1][0].Longitude[1][
          location.Coordinates[1][0].Longitude[1].length - 1
        ],
    }));
    this.setState({ gData: data, gLabels: labels });
  };

  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/">
              <Container>
                <Row className="justify-content-center">
                  <Col md="auto">
                    <h1 className="brand" style={{ fontSize: "8rem" }}>
                      SKYBOX
                    </h1>
                  </Col>
                </Row>
                <Row className="justify-content-center">
                  <Col md="auto">
                    {this.state.satellites ? (
                      <h5 className="mono">
                        There are {this.state.observatories.length} satellites
                        historically or currently orbiting Planet Earth.
                      </h5>
                    ) : (
                      <Spinner animation="border" role="status"></Spinner>
                    )}
                  </Col>
                </Row>

                <Row
                  className="justify-content-center"
                  style={{ marginTop: "1rem" }}
                >
                  <Col md={4}>
                    {this.state.satellites ? (
                      <InputGroup className="mb-3">
                        <Form.Control
                          as="select"
                          name="satellite"
                          value={this.state.satellite}
                          onChange={this.handleChange}
                        >
                          {this.state.observatories.map((satellite, index) => {
                            return <option key={index}>{satellite}</option>;
                          })}
                        </Form.Control>
                        <InputGroup.Append>
                          <Button
                            variant="secondary"
                            onClick={this.handleClick}
                          >
                            Locate
                          </Button>
                        </InputGroup.Append>
                      </InputGroup>
                    ) : (
                      <InputGroup className="mb-3">
                        <FormControl
                          placeholder="Loading SSC Satellites"
                          disabled={true}
                        />
                        <InputGroup.Append>
                          <Button variant="secondary" disabled={true}>
                            Locate
                          </Button>
                        </InputGroup.Append>
                      </InputGroup>
                    )}
                  </Col>
                </Row>
                <Row
                  className="justify-content-center"
                  style={{ marginTop: "1rem" }}
                >
                  <Col md={2}>
                    {this.state.gData.length !== 0 ? (
                      <h6 className="mono">
                        ID
                        <br /> {this.state.gLabels[0].id}
                      </h6>
                    ) : null}
                  </Col>
                  <Col md={2}>
                    {this.state.gData.length !== 0 ? (
                      <h6 className="mono">
                        Latitude <br /> {this.state.gData[0].lat}
                      </h6>
                    ) : null}
                  </Col>
                  <Col md={2}>
                    {this.state.gData.length !== 0 ? (
                      <h6 className="mono">
                        Longitude <br />
                        {this.state.gData[0].lng}
                      </h6>
                    ) : null}
                  </Col>
                  <Col md={2}>
                    {this.state.gData.length !== 0 ? (
                      <h6 className="mono">
                        Altitude <br />
                        {Math.round(this.state.gData[0].altitude * 1000, 2)}km
                      </h6>
                    ) : null}
                  </Col>
                  <Col md={2}>
                    {this.state.gData.length !== 0 ? (
                      <h6 className="mono">
                        Last Update <br />
                        {new Date(this.state.satellites[this.state.satellite].EndTime).toLocaleDateString()}
                      </h6>
                    ) : null}
                  </Col>
                </Row>
                <Row
                  className="justify-content-center"
                  style={{ marginTop: "1rem" }}
                >
                  <Col md="auto">
                    <Globe
                      ref={this.globeEl}
                      globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                      width={800}
                      height={400}
                      pointsData={this.state.gData}
                      pointAltitude="altitude"
                      pointColor="color"
                      labelsData={this.state.gLabels}
                      labelSize={10}
                    />
                  </Col>
                </Row>
              </Container>
            </Route>
            <Route exact path="/globe"></Route>
          </Switch>
        </Router>
      </div>
    );
  }
}
