import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

function NavBar() {
  const [expanded, setExpanded] = React.useState(false);

  const closeNav = () => setExpanded(false);

  return (
    <Navbar 
      bg="white" 
      expand="lg" 
      sticky="top" 
      className="shadow-sm"
      expanded={expanded}
      onToggle={() => setExpanded(!expanded)}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" onClick={closeNav} className="fw-bold">
          🧘 Power Flow Yoga
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto d-lg-none">
            <Nav.Link as={Link} to="/" onClick={closeNav}>Home</Nav.Link>
            <Nav.Link as={Link} to="/schedule" onClick={closeNav}>Schedule</Nav.Link>
            <Nav.Link as={Link} to="/my-bookings" onClick={closeNav}>My Bookings</Nav.Link>
            <Nav.Link as={Link} to="/contact" onClick={closeNav}>Contact</Nav.Link>
          </Nav>
          <Nav className="ms-auto d-none d-lg-flex">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/schedule">Schedule</Nav.Link>
            <Nav.Link as={Link} to="/my-bookings">My Bookings</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;