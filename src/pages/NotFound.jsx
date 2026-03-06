import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center p-3">
      <div className="text-center">
        <div style={{ fontSize: '6rem', marginBottom: '1rem' }}>🧘‍♀️</div>
        <h1 className="display-4 mb-3">404</h1>
        <h2 className="h4 mb-4">Page Not Found</h2>
        <p className="text-muted mb-4">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button as={Link} to="/" variant="primary" size="lg">
          Go to Home
        </Button>
      </div>
    </div>
  );
}

export default NotFound;