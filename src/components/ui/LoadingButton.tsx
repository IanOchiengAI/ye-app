'use client';

import React from 'react';

interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
    loadingText?: string;
    children: React.ReactNode;
    className?: string;
}

export default function LoadingButton({
    isLoading = false,
    loadingText = 'Please wait...',
    children,
    className = '',
    disabled,
    ...props
}: LoadingButtonProps) {
    return (
        <button
            className={`${className} ${isLoading ? 'opacity-80 cursor-not-allowed' : ''}`}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                    <div className="loading-spinner"></div>
                    <span>{loadingText}</span>
                </div>
            ) : (
                children
            )}
        </button>
    );
}
