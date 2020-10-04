import React from "react";
import Globe from "react-globe.gl";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navigation from "./components/Navigation";
import SatelliteSituationCenter from "./pages/SSC";
import Library from "./pages/Library";
import Objects from "./pages/Objects";
import About from "./pages/About";
import Report from "./pages/Report";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.globeEl = React.createRef();
  }
  componentDidMount() {
    const globe = this.globeEl;
    if (globe.current) {
      globe.current.controls().autoRotate = true;
      globe.current.controls().autoRotateSpeed = 1;
    }
  }

  render() {
    const data = [...Array(20).keys()].map(() => ({
      startLat: (Math.random() - 0.5) * 180,
      startLng: (Math.random() - 0.5) * 360,
      endLat: (Math.random() - 0.5) * 180,
      endLng: (Math.random() - 0.5) * 360,
      color: [
        ["red", "white", "blue", "green"][Math.round(Math.random() * 3)],
        ["red", "white", "blue", "green"][Math.round(Math.random() * 3)],
      ],
    }));
    return (
      <div className="App">
        <Navigation />
        <Router>
          <Switch>
            <Route exact path="/">
              <Container>
                <Row className="justify-content-center">
                  <Col md="auto">
                    <h1 className="brand" style={{ fontSize: "14rem" }}>
                      SKYBOX
                    </h1>
                  </Col>
                </Row>
                <Row className="justify-content-center">
                  <Col md="auto">
                    <h3>
                      Orbital Exploration At Your Fingertips
                    </h3>
                  </Col>
                </Row>
                <Row
                  className="justify-content-center"
                  style={{ marginTop: "1rem" }}
                >
                  <Globe
                    ref={this.globeEl}
                    globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                    width={800}
                    height={350}
                    arcsData={data}
                    arcColor="color"
                    arcDashGap={() => Math.random()}
                    arcDashAnimateTime={() => Math.random() * 4000 + 500}
                  />
                </Row>
              </Container>
            </Route>
            <Route exact path="/ssc">
              <SatelliteSituationCenter />
            </Route>
            <Route exact path="/library">
              <Library />
            </Route>
            <Route exact path="/objects">
              <Objects />
            </Route>
            <Route exact path="/report">
              <Report />
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}
