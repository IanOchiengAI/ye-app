'use client';

import { Component, ReactNode } from 'react';
import styles from './ErrorBoundary.module.css';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: any) {
        // Log error to console in development
        if (process.env.NODE_ENV === 'development') {
            console.error('Error Boundary caught an error:', error, errorInfo);
        }
        // In production, you would send this to an error tracking service
        // like Sentry, LogRocket, etc.
    }

    handleReset = () => {
        this.setState({ hasError: false, error: undefined });
        // Optionally reload the page or redirect
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            // Custom fallback UI or use provided fallback
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className={styles.errorContainer}>
                    <div className={styles.errorCard}>
                        <div className={styles.errorIcon}>
                            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="12" y1="8" x2="12" y2="12"></line>
                                <line x1="12" y1="16" x2="12.01" y2="16"></line>
                            </svg>
                        </div>
                        <h2 className={styles.errorTitle}>Oops! Something went wrong</h2>
                        <p className={styles.errorMessage}>
                            We ran into an unexpected problem. Don&apos;t worry—your progress is safe.
                        </p>
                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <details className={styles.errorDetails}>
                                <summary>Error Details (Dev Mode Only)</summary>
                                <pre>{this.state.error.toString()}</pre>
                            </details>
                        )}
                        <div className={styles.errorActions}>
                            <button onClick={this.handleReset} className="btn btn-primary">
                                Try Again
                            </button>
                            <a href="/" className="btn btn-outline">
                                Go to Home
                            </a>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
