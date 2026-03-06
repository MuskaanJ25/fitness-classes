import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function Contact() {
  return (
    <Container className="py-4">
      <h1 className="mb-4 text-center">Contact Us</h1>

      <Row className="justify-content-center mb-5">
        <Col xs={12} md={8} lg={6}>
          <Card className="text-center p-4 mb-4">
            <Card.Body>
              <h2 className="h4 mb-4">Studio Location</h2>
              <div className="mb-3">
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📍</div>
                <p className="mb-1">
                  <strong>Power Flow Yoga Studio</strong>
                </p>
                <p className="mb-1">123 Fitness Street</p>
                <p className="text-muted">San Francisco, CA 94102</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="justify-content-center mb-5">
        <Col xs={12} md={8} className="text-center">
          <h2 className="mb-4">Get in Touch</h2>
          <Row xs={1} sm={2} className="g-4">
            <Col>
              <Card className="h-100 text-center p-4">
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📞</div>
                <h3 className="h5 mb-3">Phone</h3>
                <p className="mb-0">
                  <strong>(415) 555-1234</strong>
                </p>
              </Card>
            </Col>
            <Col>
              <Card className="h-100 text-center p-4">
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📧</div>
                <h3 className="h5 mb-3">Email</h3>
                <p className="mb-0">
                  <strong>hello@powerflowyoga.com</strong>
                </p>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row className="justify-content-center mb-5">
        <Col xs={12} md={8}>
          <Card className="bg-primary text-white text-center p-4">
            <Card.Body>
              <h2 className="h4 mb-3">Studio Hours</h2>
              <div className="row gx-0">
                <div className="col-6 text-start">
                  <div className="mb-2">
                    <strong>Monday - Friday:</strong>
                  </div>
                  <div className="mb-2">
                    <strong>Saturday:</strong>
                  </div>
                  <div className="mb-2">
                    <strong>Sunday:</strong>
                  </div>
                </div>
                <div className="col-6 text-end">
                  <div className="mb-2">6:00 AM - 8:00 PM</div>
                  <div className="mb-2">7:00 AM - 6:00 PM</div>
                  <div className="mb-2">8:00 AM - 2:00 PM</div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col xs={12} md={8} className="text-center">
          <h2 className="mb-4">Ready to Start?</h2>
          <p className="lead text-muted mb-4">
            Book your first class and discover the transformative power of yoga.
          </p>
          <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
            <Link to="/schedule" className="btn btn-primary btn-lg">
              Book a Class
            </Link>
            <Link to="/" className="btn btn-outline-secondary btn-lg">
              Learn More
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Contact;