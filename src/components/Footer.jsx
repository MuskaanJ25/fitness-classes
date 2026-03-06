import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Footer() {
  return (
    <footer className="bg-dark text-white py-4 mt-auto">
      <Container>
        <Row>
          <Col xs={12} md={6} className="text-center text-md-start mb-3 mb-md-0">
            <h5 className="mb-2">🧘 Power Flow Yoga</h5>
            <p className="mb-0 text-muted">
              Building strength, flexibility, and mindfulness through yoga.
            </p>
          </Col>
          <Col xs={12} md={6} className="text-center text-md-end">
            <p className="mb-0 text-muted">
              © 2024 Power Flow Yoga. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;