import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

function LoadingSpinner({ message = 'Loading...' }) {
  return (
    <div className="loading-spinner">
      <Spinner animation="border" role="status" variant="primary">
        <span className="visually-hidden">{message}</span>
      </Spinner>
      <p className="mt-3 text-muted">{message}</p>
    </div>
  );
}

export default LoadingSpinner;