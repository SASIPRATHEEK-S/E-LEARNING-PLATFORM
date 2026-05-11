import React from "react";

// ErrorBoundary component - catches and displays errors in a user-friendly way
// This prevents the entire app from crashing if there's a JavaScript error
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  // This method is called when a child component throws an error
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  // This method logs the error for debugging purposes
  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    // If there's an error, show error message instead of crashing
    if (this.state.hasError) {
      return (
        <div className="container-fluid py-5">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card shadow border-danger">
                <div className="card-body text-center">
                  <i className="bi bi-exclamation-triangle display-4 text-danger mb-3"></i>
                  <h5 className="card-title text-danger">
                    Something went wrong
                  </h5>
                  <p className="card-text text-muted mb-3">
                    {this.state.error?.message}
                  </p>
                  {/* Reload button to refresh the page and try again */}
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      this.setState({ hasError: false, error: null });
                      window.location.reload();
                    }}
                  >
                    <i className="bi bi-arrow-clockwise me-2"></i>Reload Page
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // If no error, show the child components normally
    return this.props.children;
  }
}

export default ErrorBoundary;
