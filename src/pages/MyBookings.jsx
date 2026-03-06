import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import { apiGet, apiDelete } from '../api/client.js';

function MyBookings() {
  const [email, setEmail] = useState('');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [cancelling, setCancelling] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    if (!email.trim()) {
      setError('Please enter your email address');
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    try {
      const data = await apiGet(`/bookings?email=${encodeURIComponent(email.trim())}`);
      setBookings(data);
      setSearched(true);
    } catch (err) {
      setError('Failed to fetch bookings. Please check your email and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) {
      return;
    }

    setError(null);
    setSuccess(null);
    setCancelling(bookingId);

    try {
      await apiDelete(`/bookings/${bookingId}`);
      // Remove booking from list
      setBookings(prev => prev.filter(b => b.id !== bookingId));
      setSuccess('Booking cancelled successfully');
    } catch (err) {
      setError('Failed to cancel booking');
    } finally {
      setCancelling(null);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  return (
    <Container className="py-4">
      <h1 className="mb-4 text-center">My Bookings</h1>

      <Row className="justify-content-center mb-5">
        <Col xs={12} md={8} lg={6}>
          <Card>
            <Card.Body>
              <h3 className="h5 mb-3">Find Your Bookings</h3>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </Form.Group>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={loading}
                  className="w-100"
                >
                  {loading ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="me-2"
                      />
                      Searching...
                    </>
                  ) : (
                    'View My Bookings'
                  )}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      {searched && bookings.length === 0 && !loading && (
        <div className="text-center py-5">
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
          <h3 className="text-muted">No bookings found</h3>
          <p className="text-muted">You don't have any upcoming bookings for this email.</p>
          <Button href="/schedule" variant="primary">
            Book a Class
          </Button>
        </div>
      )}

      {bookings.length > 0 && (
        <Row className="justify-content-center">
          <Col xs={12}>
            <h3 className="mb-4 text-center">Your Upcoming Classes</h3>
            <Row xs={1} md={2} lg={3} className="g-4">
              {bookings.map((booking) => (
                <Col key={booking.id}>
                  <Card className="h-100">
                    <Card.Body>
                      <Card.Title className="mb-3">
                        {booking.session?.classType?.name || 'Yoga Class'}
                      </Card.Title>
                      
                      <div className="mb-2">
                        <strong>Date:</strong>
                        <div>{formatDate(booking.session?.startTime)}</div>
                      </div>
                      
                      <div className="mb-2">
                        <strong>Time:</strong>
                        <div>
                          {formatTime(booking.session?.startTime)} - {formatTime(booking.session?.endTime)}
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <strong>Location:</strong>
                        <div className="text-muted">
                          {booking.session?.classType?.location || 'Main Studio'}
                        </div>
                      </div>

                      <hr className="my-3" />

                      <div className="mb-3">
                        <small className="text-muted">Name:</small>
                        <div>{booking.customerName}</div>
                      </div>
                      
                      <div className="mb-3">
                        <small className="text-muted">Email:</small>
                        <div>{booking.email}</div>
                      </div>

                      <div className="mb-3">
                        <small className="text-muted">Booked on:</small>
                        <div>
                          {new Date(booking.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </div>
                      </div>

                      {new Date(booking.session?.startTime) < new Date() ? (
                        <Button
                          variant="secondary"
                          className="w-100"
                          disabled
                        >
                          Past Class
                        </Button>
                      ) : (
                        <Button
                          variant="outline-danger"
                          className="w-100"
                          onClick={() => handleCancelBooking(booking.id)}
                          disabled={cancelling === booking.id}
                        >
                          {cancelling === booking.id ? (
                            <>
                              <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                className="me-2"
                              />
                              Cancelling...
                            </>
                          ) : (
                            'Cancel Booking'
                          )}
                        </Button>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default MyBookings;