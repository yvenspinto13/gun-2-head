import { useEffect } from "react";
import { Container, Nav } from "react-bootstrap";
import {
  BrowserRouter,
  NavLink,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { About } from "../about/About";
import { Graphs } from "../charts/Graphs";
import { LiveTimeline } from "../live-timeline/components/LiveTimeline";
import { setUpSerieData } from "../serie-data-service";
import { Timeline } from "../timeline/components/Timeline";
import { getRequest } from "../utils/http";

export const AppWrapper = () => {
  const routes = [
    {
      id: "about",
      route: "/about",
      text: "About",
      component: About,
    },
    {
      id: "graph",
      route: "/home",
      text: "Graph",
      component: Graphs,
    },
    {
      id: "timeline",
      route: "/timeline",
      text: "Timeline",
      component: Timeline,
    },
    {
      id: "livetimeline",
      route: "/live-timeline",
      text: "Live Timeline",
      component: LiveTimeline,
    },
  ];

  useEffect(() => {
    getRequest("./data.json").then((res) => setUpSerieData(res));
  }, []);

  return (
    <BrowserRouter>
      <Nav className="justify-content-center">
        {routes.map((x) => (
          <Nav.Item key={x.id}>
            <Nav.Link
              activeClassName="active"
              eventKey={x.id}
              as={NavLink}
              to={x.route}
            >
              {x.text}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
      <Container fluid>
        <Switch>
          {routes.map((x) => (
            <Route key={x.id} path={x.route}>
              <x.component />
            </Route>
          ))}
          <Route path="/">
            <Redirect to="/home" />
          </Route>
        </Switch>
      </Container>
    </BrowserRouter>
  );
};
