'use client';

import { memo } from 'react';
import styles from '@/app/ai-companion/ai-companion.module.css';

interface Message {
    id: number;
    type: 'user' | 'ai';
    content: string;
    timestamp: Date;
}

interface ChatMessageProps {
    message: Message;
}

/**
 * Memoized Chat Message Component
 * 
 * Prevents re-renders when other messages are added.
 * Each message bubble is rendered independently for performance.
 */
const ChatMessage = memo(function ChatMessage({ message }: ChatMessageProps) {
    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    };

    return (
        <div className={`${styles.message} ${styles[message.type]}`}>
            {message.type === 'ai' && (
                <div className={styles.messageAvatar}>✨</div>
            )}
            <div className={styles.messageBubble}>
                <p>{message.content}</p>
                <span className={styles.messageTime}>{formatTime(message.timestamp)}</span>
            </div>
        </div>
    );
});

export default ChatMessage;

export type { Message };
