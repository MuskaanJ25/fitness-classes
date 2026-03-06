import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center p-3">
          <Alert variant="danger" className="text-center">
            <Alert.Heading>Something went wrong</Alert.Heading>
            <p className="mb-3">
              We encountered an unexpected error. Please try refreshing the page.
            </p>
            <hr />
            <p className="mb-3 text-muted">
              {this.state.error?.message}
            </p>
            <Button 
              variant="outline-danger" 
              onClick={() => window.location.reload()}
            >
              Refresh Page
            </Button>
          </Alert>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;