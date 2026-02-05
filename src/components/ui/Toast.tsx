'use client';

import { useEffect, useState } from 'react';
import styles from './Toast.module.css';

interface ToastProps {
    message: string;
    isVisible: boolean;
    duration?: number;
    onClose: () => void;
}

export default function Toast({ message, isVisible, duration = 4000, onClose }: ToastProps) {
    const [isShowing, setIsShowing] = useState(false);

    useEffect(() => {
        if (isVisible) {
            setIsShowing(true);
            const timer = setTimeout(() => {
                setIsShowing(false);
                setTimeout(onClose, 300); // Wait for exit animation
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [isVisible, duration, onClose]);

    if (!isVisible && !isShowing) return null;

    return (
        <div className={`${styles.toast} ${isShowing ? styles.show : styles.hide}`}>
            <div className={styles.icon}>✨</div>
            <div className={styles.content}>
                {message}
            </div>
        </div>
    );
}
