/**
 * Centralized error message mapping
 * Maps technical error codes to user-friendly messages
 */

export const ERROR_MESSAGES: Record<string, string> = {
    // Firebase Auth Errors
    'auth/email-already-in-use': 'This email already has an account. Try logging in instead?',
    'auth/weak-password': 'Choose a stronger password (mix of letters, numbers, and symbols)',
    'auth/invalid-email': 'Please enter a valid email address',
    'auth/user-not-found': 'No account found with this email. Want to sign up instead?',
    'auth/wrong-password': 'Incorrect password. Try again or reset your password.',
    'auth/too-many-requests': 'Too many failed attempts. Please wait a few minutes and try again.',
    'auth/network-request-failed': 'Connection issue. Check your internet and try again.',
    'auth/user-disabled': 'This account has been disabled. Contact support for help.',
    'auth/operation-not-allowed': 'This sign-in method is not enabled. Please contact support.',
    'auth/invalid-credential': 'Invalid login credentials. Please check and try again.',

    // Firestore Errors
    'permission-denied': 'You don\'t have permission to access this. Try logging in again.',
    'not-found': 'The requested information couldn\'t be found.',
    'already-exists': 'This item already exists.',
    'resource-exhausted': 'Too many requests. Please try again in a moment.',
    'unauthenticated': 'Please log in to continue.',

    // Network Errors
    'network-error': 'Network error. Check your connection and try again.',
    'timeout': 'Request timed out. Please try again.',

    // Generic Fallback
    'unknown': 'Something went wrong. Please try again.',
};

/**
 * Get user-friendly error message from error code or error object
 */
export function getUserFriendlyError(error: any): string {
    if (!error) return ERROR_MESSAGES['unknown'];

    // Extract error code from Firebase error
    const errorCode = error.code || error.message || '';

    // Check if we have a mapping for this error code
    for (const [key, message] of Object.entries(ERROR_MESSAGES)) {
        if (errorCode.includes(key)) {
            return message;
        }
    }

    // If error message is already user-friendly (no technical jargon), use it
    const errorMessage = error.message || '';
    if (errorMessage && !errorMessage.includes('Error:') && !errorMessage.includes('auth/')) {
        return errorMessage;
    }

    // Fallback to generic error
    return ERROR_MESSAGES['unknown'];
}

/**
 * Check if error indicates the user should retry
 */
export function isRetryableError(error: any): boolean {
    const errorCode = error?.code || '';
    const retryableCodes = [
        'network-request-failed',
        'timeout',
        'resource-exhausted',
        'unavailable',
    ];

    return retryableCodes.some(code => errorCode.includes(code));
}

/**
 * Check if error indicates user needs to login
 */
export function requiresAuth(error: any): boolean {
    const errorCode = error?.code || '';
    const authCodes = ['unauthenticated', 'permission-denied'];

    return authCodes.some(code => errorCode.includes(code));
}
