import { Container, Nav } from 'react-bootstrap';
import { BrowserRouter, NavLink, Redirect, Route, Switch } from 'react-router-dom'
import { Graphs } from '../charts/Graphs';
import { Timeline } from '../timeline/Timeline';

export const AppWrapper = () => {

    return (
        <BrowserRouter>
            <Nav className="justify-content-center">
                <Nav.Item>
                    <Nav.Link activeClassName="active" eventKey="home" as={NavLink} to="/home">Graph</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link activeClassName="active" eventKey="timeline" as={NavLink} to="/timeline">Timeline</Nav.Link>
                </Nav.Item>
            </Nav>
            <Container fluid>
                <Switch>
                    <Route path="/timeline">
                        <Timeline />
                    </Route>
                    <Route path="/home">
                        <Graphs />
                    </Route>
                    <Route path="/" >
                        <Redirect to="/home" />
                    </Route>
                </Switch>
            </Container>
        </BrowserRouter>
    )
}