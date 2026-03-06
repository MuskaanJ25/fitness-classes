import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { Link, useLocation } from 'react-router-dom';

function MobileBottomNav() {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <div className="mobile-bottom-nav d-lg-none">
      <Container>
        <Nav className="justify-content-around">
          <Nav.Link as={Link} to="/" className={isActive('/')}>
            <span>🏠</span>
            <span>Home</span>
          </Nav.Link>
          <Nav.Link as={Link} to="/schedule" className={isActive('/schedule')}>
            <span>📅</span>
            <span>Schedule</span>
          </Nav.Link>
          <Nav.Link as={Link} to="/my-bookings" className={isActive('/my-bookings')}>
            <span>🎫</span>
            <span>Bookings</span>
          </Nav.Link>
          <Nav.Link as={Link} to="/contact" className={isActive('/contact')}>
            <span>📞</span>
            <span>Contact</span>
          </Nav.Link>
        </Nav>
      </Container>
    </div>
  );
}

export default MobileBottomNav;