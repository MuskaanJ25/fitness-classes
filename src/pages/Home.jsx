import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import { apiGet } from '../api/client.js';

function Home() {
  const [classInfo, setClassInfo] = useState(null);
  const [nextSession, setNextSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadClassInfo();
  }, []);

  const loadClassInfo = async () => {
    try {
      const data = await apiGet('/class');
      setClassInfo(data);
      setNextSession(data.sessions?.[0] || null);
    } catch (err) {
      setError('Failed to load class information');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section className="hero">
        <Container>
          <h1>Power Flow Yoga</h1>
          <p>
            A dynamic vinyasa flow class that builds strength, flexibility, and mindfulness. 
            Suitable for all levels with modifications provided.
          </p>
          <Button as={Link} to="/schedule" variant="light" size="lg" className="fw-bold">
            Book a Spot
          </Button>
        </Container>
      </section>

      <Container className="py-5">
        <Row className="justify-content-center mb-5">
          <Col xs={12} md={8} className="text-center">
            <h2 className="mb-4">What to Expect</h2>
            <p className="lead text-muted mb-4">
              Join us for a transformative practice that will leave you feeling energized and centered.
            </p>
            
            <Row xs={1} md={3} className="g-4">
              <Col>
                <div className="card h-100 text-center p-4">
                  <div className="mb-3" style={{ fontSize: '3rem' }}>💪</div>
                  <h5>Build Strength</h5>
                  <p className="text-muted mb-0">
                    Challenging sequences that tone muscles and improve endurance
                  </p>
                </div>
              </Col>
              <Col>
                <div className="card h-100 text-center p-4">
                  <div className="mb-3" style={{ fontSize: '3rem' }}>🧘</div>
                  <h5>Increase Flexibility</h5>
                  <p className="text-muted mb-0">
                    Gentle stretches that open tight areas and improve range of motion
                  </p>
                </div>
              </Col>
              <Col>
                <div className="card h-100 text-center p-4">
                  <div className="mb-3" style={{ fontSize: '3rem' }}>🧠</div>
                  <h5>Finding Calm</h5>
                  <p className="text-muted mb-0">
                    Mindful focus that reduces stress and sharpens mental clarity
                  </p>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : null}

        {nextSession && (
          <Row className="justify-content-center mb-5">
            <Col xs={12} md={8}>
              <div className="card bg-primary text-white p-4 text-center">
                <h3 className="mb-3">Next Class Available</h3>
                <p className="mb-1">
                  <strong>{new Date(nextSession.startTime).toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                  })}</strong>
                </p>
                <p className="mb-3">
                  at {new Date(nextSession.startTime).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                  })}
                </p>
                <Button 
                  as={Link} 
                  to={`/book/${nextSession.id}`} 
                  variant="light" 
                  size="lg"
                  className="fw-bold"
                >
                  Reserve Your Spot
                </Button>
              </div>
            </Col>
          </Row>
        )}

        <Row className="justify-content-center">
          <Col xs={12} md={8}>
            <h2 className="text-center mb-4">What to Bring & FAQ</h2>
            
            <Accordion className="mb-4">
              <Accordion.Item eventKey="0">
                <Accordion.Header>What should I wear?</Accordion.Header>
                <Accordion.Body>
                  Wear comfortable, stretchy clothing that allows freedom of movement. 
                  Avoid loose, baggy clothes that might get in the way during poses.
                </Accordion.Body>
              </Accordion.Item>
              
              <Accordion.Item eventKey="1">
                <Accordion.Header>Do I need to bring my own mat?</Accordion.Header>
                <Accordion.Body>
                  We have mats available at the studio, but you're welcome to bring your own 
                  if you prefer. Bring a towel and water bottle as well!
                </Accordion.Body>
              </Accordion.Item>
              
              <Accordion.Item eventKey="2">
                <Accordion.Header>Is the class suitable for beginners?</Accordion.Header>
                <Accordion.Body>
                  Absolutely! Our classes are designed for all levels. The instructor provides 
                  modifications for beginner, intermediate, and advanced practitioners.
                </Accordion.Body>
              </Accordion.Item>
              
              <Accordion.Item eventKey="3">
                <Accordion.Header>How early should I arrive?</Accordion.Header>
                <Accordion.Body>
                  Please arrive 5-10 minutes early to check in and set up your space. 
                  Doors open 15 minutes before class starts.
                </Accordion.Body>
              </Accordion.Item>
              
              <Accordion.Item eventKey="4">
                <Accordion.Header>What's the cancellation policy?</Accordion.Header>
                <Accordion.Body>
                  You can cancel your booking anytime through the "My Bookings" page. 
                  Please cancel at least 2 hours before class so others can take your spot.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;