import React from "react";
import Globe from "react-globe.gl";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FormControl from "react-bootstrap/FormControl";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import countries from "../data/countries.json";
import scores from "../data/scores.json";

const MODES = [
  "ORBITAL_PAYLOAD_COUNT",
  "ORBITAL_ROCKET_BODY_COUNT",
  "ORBITAL_DEBRIS_COUNT",
  "ORBITAL_TOTAL_COUNT",
  "DECAYED_PAYLOAD_COUNT",
  "DECAYED_PAYLOAD_COUNT",
  "DECAYED_ROCKET_BODY_COUNT",
  "DECAYED_DEBRIS_COUNT",
  "DECAYED_TOTAL_COUNT",
  "COUNTRY_TOTAL",
];

export default class SpaceObjects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scores: [],
      gLabels: [],
      gData: [],
      mode: "COUNTRY_TOTAL",
    };
    this.globeEl = React.createRef();
  }
  componentDidMount() {
    const globe = this.globeEl;
    if (globe.current) {
      globe.current.controls().autoRotate = true;
      globe.current.controls().autoRotateSpeed = 1;
    }
    this.processData(this.state.mode);
  }

  convertArrayToObject = (array) => {
    const obj = {};
    return array.reduce((obj, record) => {
      return {
        ...obj,
        [record.COUNTRY]: {
          COUNTRY: record.COUNTRY,
          SPADOC_CD: record.SPADOC_CD,
          ORBITAL_TBA: record.ORBITAL_TBA,
          ORBITAL_PAYLOAD_COUNT: record.ORBITAL_PAYLOAD_COUNT,
          ORBITAL_ROCKET_BODY_COUNT: record.ORBITAL_ROCKET_BODY_COUNT,
          ORBITAL_DEBRIS_COUNT: record.ORBITAL_DEBRIS_COUNT,
          ORBITAL_TOTAL_COUNT: record.ORBITAL_TOTAL_COUNT,
          DECAYED_PAYLOAD_COUNT: record.DECAYED_PAYLOAD_COUNT,
          DECAYED_ROCKET_BODY_COUNT: record.DECAYED_ROCKET_BODY_COUNT,
          DECAYED_DEBRIS_COUNT: record.DECAYED_DEBRIS_COUNT,
          DECAYED_TOTAL_COUNT: record.DECAYED_TOTAL_COUNT,
          COUNTRY_TOTAL: record.COUNTRY_TOTAL,
        },
      };
    }, obj);
  };

  processData = (mode) => {
    const obj = this.convertArrayToObject(scores);
    const data = countries.map((item) => ({
      lat: item.latlng[0],
      lng: item.latlng[1],
      count: obj[item.name.toUpperCase()]
        ? obj[item.name.toUpperCase()][mode] / 100
        : 0,
    }));
    const labels = countries.map((item) => ({
      lat: item.latlng[0],
      lng: item.latlng[1],
      text: obj[item.name.toUpperCase()]
        ? `${item.name} - ${obj[item.name.toUpperCase()][mode]}`
        : `${item.name} - 0`,
    }));
    this.setState({ gData: data, gLabels: labels });
  };

  handleClick = (mode) => {
    this.setState({ mode: mode });
    this.processData(mode);
  };

  render() {
    return (
      <div>
        <Container>
          <Row className="justify-content-center">
            <Col md="auto">
              <h1 className="brand" style={{ fontSize: "8rem" }}>
                SKYBOX
              </h1>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md={12}>
              <h5 className="mono">
                The Eternal Space Race. Compare you country's space exploits
                against the World.
              </h5>
            </Col>
          </Row>
          <Row className="justify-content-center" style={{ marginTop: "1rem" }}>
            <Col md={3}>
              <h6 className="mono">
                Score<br />
                {this.state.mode}
              </h6>
            </Col>
            <Col md={3}>
              <DropdownButton variant="secondary" title="Space Object Scores">
                {MODES.map((mode, index) => {
                  return (
                    <Dropdown.Item
                      key={index}
                      onClick={() => this.handleClick(mode)}
                    >
                      {mode}
                    </Dropdown.Item>
                  );
                })}
              </DropdownButton>
            </Col>
          </Row>
          <Row className="justify-content-center" style={{ marginTop: "1rem" }}>
            <Col md="auto">
              <Globe
                ref={this.globeEl}
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                width={800}
                height={400}
                pointsData={this.state.gData}
                pointAltitude="count"
                labelsData={this.state.gLabels}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
