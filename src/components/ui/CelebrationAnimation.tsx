'use client';

import { useEffect, useState } from 'react';
import ReactConfetti from 'react-confetti';

interface CelebrationAnimationProps {
    isActive: boolean;
    duration?: number;
    onComplete?: () => void;
}

export default function CelebrationAnimation({
    isActive,
    duration = 3000,
    onComplete
}: CelebrationAnimationProps) {
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
    const [show, setShow] = useState(false);

    useEffect(() => {
        // Safe window access
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight
        });

        if (isActive) {
            setShow(true);
            const timer = setTimeout(() => {
                setShow(false);
                if (onComplete) onComplete();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [isActive, duration, onComplete]);

    if (!show) return null;

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 9999, pointerEvents: 'none' }}>
            <ReactConfetti
                width={windowSize.width}
                height={windowSize.height}
                numberOfPieces={200}
                gravity={0.3}
                colors={['#FFD700', '#FF6B6B', '#4ECDC4', '#1E1B4B']}
            />
        </div>
    );
}
