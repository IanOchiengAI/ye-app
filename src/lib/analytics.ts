/**
 * Google Analytics 4 Integration for YE App
 * Tracks user journeys, module completion, and premium conversions
 */

// Google Analytics Measurement ID (set in environment variable)
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || '';

// Track page views
export const pageview = (url: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('config', GA_MEASUREMENT_ID, {
            page_path: url,
        });
    }
};

// Track custom events
export const event = ({ action, category, label, value }: {
    action: string;
    category: string;
    label?: string;
    value?: number;
}) => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value,
        });
    }
};

// Predefined event tracking functions

/**
 * Track module completion
 */
export const trackModuleComplete = (moduleId: string, moduleName: string, progress: number) => {
    event({
        action: 'module_complete',
        category: 'Learning',
        label: moduleName,
        value: progress,
    });
};

/**
 * Track user signup
 */
export const trackSignup = (method: 'email' | 'phone', userRole: string) => {
    event({
        action: 'sign_up',
        category: 'User',
        label: `${method}_${userRole}`,
    });
};

/**
 * Track mentor connection
 */
export const trackMentorConnect = (mentorId: string) => {
    event({
        action: 'mentor_connect',
        category: 'Mentorship',
        label: mentorId,
    });
};

/**
 * Track premium upgrade attempt
 */
export const trackPremiumUpgrade = (planType: string, success: boolean) => {
    event({
        action: success ? 'premium_upgrade_success' : 'premium_upgrade_attempt',
        category: 'Monetization',
        label: planType,
    });
};

/**
 * Track AI companion usage
 */
export const trackAIChat = (messageCount: number, isPremium: boolean) => {
    event({
        action: 'ai_chat',
        category: 'AI Companion',
        label: isPremium ? 'premium' : 'free',
        value: messageCount,
    });
};

/**
 * Track user journey drop-off
 */
export const trackDropOff = (stage: 'signup' | 'onboarding' | 'module_start' | 'module_mid') => {
    event({
        action: 'user_drop_off',
        category: 'Funnel',
        label: stage,
    });
};

/**
 * Track search usage
 */
export const trackSearch = (query: string, resultsCount: number) => {
    event({
        action: 'search',
        category: 'User Interaction',
        label: query,
        value: resultsCount,
    });
};

// TypeScript type extension for gtag
declare global {
    interface Window {
        gtag?: (
            command: 'config' | 'event' | 'js',
            targetId: string | Date,
            config?: Record<string, any>
        ) => void;
    }
}
