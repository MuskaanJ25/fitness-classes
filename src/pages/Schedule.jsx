import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import SessionCard from '../components/SessionCard.jsx';
import { apiGet } from '../api/client.js';

function Schedule() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
    try {
      const data = await apiGet('/sessions');
      setSessions(data);
    } catch (err) {
      setError('Failed to load schedule');
    } finally {
      setLoading(false);
    }
  };

  const groupSessionsByDate = (sessions) => {
    const grouped = {};
    sessions.forEach(session => {
      const date = new Date(session.startTime);
      const dateKey = date.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      });
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(session);
    });
    return grouped;
  };

  const groupedSessions = groupSessionsByDate(sessions);

  return (
    <Container className="py-4">
      <h1 className="mb-4 text-center">Class Schedule</h1>
      
      {loading ? (
        <LoadingSpinner message="Loading schedule..." />
      ) : error ? (
        <Alert variant="danger" className="text-center p-4">
          <h4 className="mb-3">Unable to Load Schedule</h4>
          <p className="mb-3">{error}</p>
          <Button variant="outline-danger" onClick={handleRetry}>
            Try Again
          </Button>
        </Alert>
      ) : sessions.length === 0 ? (
        <div className="text-center py-5">
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📅</div>
          <h3 className="text-muted">No upcoming classes scheduled</h3>
          <p className="text-muted">Check back soon for new sessions!</p>
        </div>
      ) : (
        <>
          {Object.entries(groupedSessions).map(([date, dateSessions]) => (
            <div key={date} className="mb-5">
              <h3 className="mb-4 text-primary">{date}</h3>
              <Row xs={1} md={2} lg={3} className="g-4">
                {dateSessions.map((session) => (
                  <Col key={session.id}>
                    <SessionCard session={session} />
                  </Col>
                ))}
              </Row>
            </div>
          ))}
        </>
      )}
    </Container>
  );
}

export default Schedule;