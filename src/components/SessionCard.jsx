import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

function SessionCard({ session, onBook }) {
  const getSpotsClass = (spots, capacity) => {
    if (spots === 0) return 'spots-full';
    if (spots <= 3) return 'spots-limited';
    return 'spots-available';
  };

  const formatDateTime = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (date) => {
    const d = new Date(date);
    return d.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  return (
    <Card className="h-100">
      <Card.Body>
        <div className="session-time mb-1">
          {formatTime(session.startTime)}
        </div>
        <div className="session-date mb-3">
          {formatDateTime(session.startTime)}
        </div>
        
        <div className="mb-3">
          <small className="text-muted">
            <i className="bi bi-geo-alt-fill me-1"></i>
            {session.classType?.location || 'Main Studio'}
          </small>
        </div>
        
        <div className="mb-3">
          <div className="d-flex justify-content-between align-items-center">
            <small className="text-muted">Duration: {session.classType?.durationMinutes || 60} min</small>
            <small className={getSpotsClass(session.spotsRemaining, session.capacity)}>
              {session.spotsRemaining > 0 ? (
                `${session.spotsRemaining} spots available`
              ) : (
                'Fully Booked'
              )}
            </small>
          </div>
          {session.capacity > 0 && (
            <div className="progress mt-2" style={{ height: '6px' }}>
              <div
                className="progress-bar"
                role="progressbar"
                style={{
                  width: `${((session.capacity - session.spotsRemaining) / session.capacity) * 100}%`,
                  backgroundColor: session.spotsRemaining <= 3 ? '#ffc107' : '#6b4c9a',
                }}
              ></div>
            </div>
          )}
        </div>

        {session.spotsRemaining > 0 && session.status === 'scheduled' ? (
          <Button
            as={Link}
            to={`/book/${session.id}`}
            variant="primary"
            className="w-100"
          >
            Book Now
          </Button>
        ) : (
          <Button
            variant="outline-secondary"
            className="w-100"
            disabled
          >
            {session.spotsRemaining === 0 ? 'Fully Booked' : 'Not Available'}
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default SessionCard;