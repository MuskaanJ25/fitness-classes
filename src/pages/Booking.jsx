import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import { apiGet, apiPost } from '../api/client.js';

function Booking() {
  const { sessionId } = useParams();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    loadSession();
  }, [sessionId]);

  const loadSession = async () => {
    try {
      const data = await apiGet(`/sessions/${sessionId}`);
      setSession(data);
    } catch (err) {
      setError('Session not found or has been removed');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    // Basic validation
    if (!formData.customerName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setError('Please fill in all fields');
      setSubmitting(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      setSubmitting(false);
      return;
    }

    try {
      await apiPost('/bookings', {
        sessionId: parseInt(sessionId),
        customerName: formData.customerName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
      });
      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Failed to create booking');
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      </Container>
    );
  }

  if (error && !session) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error}</Alert>
        <Link to="/schedule">
          <Button variant="primary">Back to Schedule</Button>
        </Link>
      </Container>
    );
  }

  if (success) {
    return (
      <Container className="py-5">
        <Card className="text-center p-4 success-checkmark">
          <div style={{ fontSize: '4rem' }}>✅</div>
          <h2 className="mb-3 text-success">Booking Confirmed!</h2>
          <p className="mb-4 lead">
            You're registered for <strong>{session?.classType?.name}</strong> on{' '}
            <strong>
              {session?.startTime && new Date(session.startTime).toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
              })}
            </strong>{' '}
            at{' '}
            <strong>
              {session?.startTime && new Date(session.startTime).toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
              })}
            </strong>
          </p>
          <p className="text-muted mb-4">
            A confirmation has been sent to {formData.email}
          </p>
          <div className="d-flex flex-column gap-2 justify-content-center">
            <Button as={Link} to="/my-bookings" variant="primary" size="lg">
              View My Bookings
            </Button>
            <Button as={Link} to="/schedule" variant="outline-secondary">
              Book Another Class
            </Button>
          </div>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <h1 className="mb-4 text-center">Complete Your Booking</h1>
          
          {/* Session Summary */}
          <Card className="mb-4 bg-light">
            <Card.Body>
              <h3 className="h5 mb-2">{session?.classType?.name}</h3>
              <p className="mb-1 text-muted">
                {session?.startTime && new Date(session.startTime).toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              <p className="mb-0">
                {session?.startTime && new Date(session.startTime).toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit',
                })}
                {' - '}
                {session?.endTime && new Date(session.endTime).toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit',
                })}
              </p>
            </Card.Body>
          </Card>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your.email@example.com"
                required
              />
              <Form.Text className="text-muted">
                We'll send a confirmation to this email
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="(555) 123-4567"
                required
              />
            </Form.Group>

            <div className="d-flex flex-column gap-2">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={submitting}
                className="w-100"
              >
                {submitting ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-2"
                    />
                    Processing...
                  </>
                ) : (
                  'Confirm Booking'
                )}
              </Button>
              <Button
                as={Link}
                to="/schedule"
                variant="outline-secondary"
                disabled={submitting}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Booking;