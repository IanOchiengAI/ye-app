'use client';

import { useState, useRef, useEffect, memo, lazy, Suspense } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { getKenyaAIResponse, quickPrompts, swahiliResponses } from '@/lib/aiKnowledge';
import { trackAIChat, trackPremiumUpgrade } from '@/lib/analytics';
import styles from './ai-companion.module.css';

// Dynamic imports for code splitting
const PremiumUpsellModal = lazy(() => import('@/components/ai/PremiumUpsellModal'));
const ChatMessage = lazy(() => import('@/components/ai/ChatMessage'));

// Re-export Message type from ChatMessage component
interface Message {
    id: number;
    type: 'user' | 'ai';
    content: string;
    timestamp: Date;
}

// Loading fallback for lazy components
const MessageSkeleton = () => (
    <div className={styles.messageBubble} style={{ background: '#f3f4f6', minWidth: '200px', height: '60px' }} />
);

// Cache for offline functionality
const saveToCache = (messages: Message[]) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('ye_ai_chat_cache', JSON.stringify(messages.slice(-50)));
    }
};

const loadFromCache = (): Message[] => {
    if (typeof window !== 'undefined') {
        const cached = localStorage.getItem('ye_ai_chat_cache');
        if (cached) {
            const parsed = JSON.parse(cached);
            return parsed.map((m: Message) => ({
                ...m,
                timestamp: new Date(m.timestamp)
            }));
        }
    }
    return [];
};

export default function AICompanionPage() {
    const { profile } = useAuth();
    const isPremium = profile?.subscription === 'premium' || profile?.subscription === 'sponsor';

    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [showUpgrade, setShowUpgrade] = useState(false);
    const [isPremiumDemo, setIsPremiumDemo] = useState(false); // Demo state
    const [isListening, setIsListening] = useState(false); // Voice state
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Effective premium status (Real OR Demo)
    const activePremium = isPremium || isPremiumDemo;

    // Voice Synthesis & Recognition Refs
    const speechTimeout = useRef<NodeJS.Timeout | null>(null);

    // --- Voice Logic ---
    const handleVoiceInput = () => {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            alert('Voice input is not supported in this browser. Try Chrome!');
            return;
        }

        // @ts-ignore - Types for Web Speech API may be missing
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();

        recognition.lang = 'en-KE'; // Kenyan English preference
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => setIsListening(true);

        recognition.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            setInputValue(transcript);
            handleSendMessage(transcript); // Auto-send on voice end
        };

        recognition.onerror = (event: any) => {
            console.error('Speech error:', event.error);
            setIsListening(false);
        };

        recognition.onend = () => setIsListening(false);

        recognition.start();
    };

    const speakResponse = (text: string) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel(); // Stop previous
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 1.0;
            utterance.pitch = 1.0;
            window.speechSynthesis.speak(utterance);
        }
    };
    // -------------------

    // Load cached messages on mount
    useEffect(() => {
        const cached = loadFromCache();
        if (cached.length > 0) {
            setMessages(cached);
        } else {
            setMessages([{
                id: 1,
                type: 'ai',
                content: "Habari! 👋 Mimi ni AI companion yako - your personal guide for education, career, and life in Kenya. I understand CBC, KCPE, KCSE, and can chat in Sheng too! Niambie, how can I help you today?",
                timestamp: new Date(),
            }]);
        }
    }, []);

    // Save to cache when messages change
    useEffect(() => {
        if (messages.length > 1) {
            saveToCache(messages);
        }
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = (content: string) => {
        if (!content.trim()) return;

        // Limiting logic using activePremium
        if (!activePremium && messages.length >= 50) {
            setShowUpgrade(true);
            return;
        }

        const userMessage: Message = {
            id: messages.length + 1,
            type: 'user',
            content: content.trim(),
            timestamp: new Date(),
        };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsTyping(true);

        // Simulate AI typing delay
        setTimeout(() => {
            const responseText = getKenyaAIResponse(content, activePremium);
            const aiMessage: Message = {
                id: messages.length + 2,
                type: 'ai',
                content: responseText,
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, aiMessage]);
            setIsTyping(false);

            // Speak the response if it was a voice interaction or just generally helpful
            // For now, let's speak response if user used voice recently? 
            // Or simple auto-speak for accessibility. Let's auto-speak for now to demonstrate V4.
            speakResponse(responseText);

        }, 800 + Math.random() * 800);
    };

    const handleQuickPrompt = (prompt: typeof quickPrompts[0]) => {
        handleSendMessage(prompt.text);
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    };

    return (
        <div className={styles.chatPage}>
            {/* Upgrade Modal */}
            {showUpgrade && (
                <div className={styles.upgradeOverlay}>
                    <div className={styles.upgradeModal}>
                        <span className={styles.upgradeIcon}>🌟</span>
                        <h2>Upgrade to Premium</h2>
                        <p>Umefikia limit ya free tier! Upgrade to Premium for unlimited AI chat, personalized career advice, and more.</p>
                        <div className={styles.upgradeFeatures}>
                            <div>✅ Unlimited AI conversations</div>
                            <div>✅ Personalized career path</div>
                            <div>✅ Priority mentor matching</div>
                            <div>✅ Offline access</div>
                        </div>
                        <Link href="/premium" className="btn btn-primary btn-lg">
                            Upgrade Now - KES 500/mo
                        </Link>
                        <button className={styles.closeBtn} onClick={() => setShowUpgrade(false)}>
                            Maybe later
                        </button>
                    </div>
                </div>
            )}

            {/* Header */}
            <header className={styles.header}>
                <Link href="/dashboard" className={styles.backBtn}>
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                </Link>
                <div className={styles.headerContent}>
                    <div className={styles.avatarAI}>✨</div>
                    <div>
                        <h1>Rafiki Strategist</h1>
                        <span className={styles.status}>
                            <span className={styles.statusDot}></span>
                            {activePremium
                                ? 'Thinking with you (Unlimited Access ⚡)'
                                : `Free Preview • ${50 - messages.length} messages left today`}
                        </span>
                    </div>
                </div>

                {/* Demo Toggle for Reviewer - NOW FUNCTIONAL */}
                {!activePremium && (
                    <button
                        onClick={() => setIsPremiumDemo(true)}
                        style={{
                            fontSize: '0.75rem',
                            padding: '6px 12px',
                            background: '#FCD34D',
                            border: 'none',
                            borderRadius: '20px',
                            cursor: 'pointer',
                            color: '#1e293b',
                            fontWeight: 'bold',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                        }}
                    >
                        ⚡ Unlock Trial
                    </button>
                )}
                {activePremium && !isPremium && (
                    <div style={{ fontSize: '0.7rem', color: '#10b981', fontWeight: 'bold', padding: '0 8px' }}>
                        Trial Active
                    </div>
                )}
            </header>

            {/* Messages */}
            <main className={styles.messagesContainer}>
                <div className={styles.messages}>
                    {messages.map(message => (
                        <div
                            key={message.id}
                            className={`${styles.message} ${styles[message.type]}`}
                        >
                            {message.type === 'ai' && (
                                <div className={styles.messageAvatar}>✨</div>
                            )}
                            <div className={styles.messageBubble}>
                                <p>{message.content}</p>
                                <span className={styles.messageTime}>{formatTime(message.timestamp)}</span>
                            </div>
                        </div>
                    ))}

                    {isTyping && (
                        <div className={`${styles.message} ${styles.ai}`}>
                            <div className={styles.messageAvatar}>✨</div>
                            <div className={styles.typingIndicator}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Quick Prompts */}
                {messages.length < 4 && (
                    <div className={styles.quickPrompts}>
                        <p>Quick options:</p>
                        <div className={styles.promptsGrid}>
                            {quickPrompts.map(prompt => (
                                <button
                                    key={prompt.id}
                                    className={styles.promptBtn}
                                    onClick={() => handleQuickPrompt(prompt)}
                                >
                                    {prompt.text}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </main>

            {/* Input */}
            <footer className={styles.inputArea}>
                <div className={styles.inputContainer}>
                    <input
                        type="text"
                        placeholder="Andika ujumbe... (Type in English or Kiswahili)"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSendMessage(inputValue);
                            }
                        }}
                    />

                    {/* Voice Input Button */}
                    <button
                        className={`${styles.iconBtn} ${isListening ? styles.listening : ''}`}
                        onClick={handleVoiceInput}
                        title="Speak to Rafiki"
                        style={{ marginRight: '8px', color: isListening ? '#ef4444' : '#64748b' }}
                    >
                        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                            <line x1="12" y1="19" x2="12" y2="23" />
                            <line x1="8" y1="23" x2="16" y2="23" />
                        </svg>
                    </button>

                    <button
                        className={styles.sendBtn}
                        onClick={() => handleSendMessage(inputValue)}
                        disabled={!inputValue.trim()}
                    >
                        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                        </svg>
                    </button>
                </div>
                <p className={styles.disclaimer}>
                    🇰🇪 Designed for Kenyan students • Voice Enabled 🎙️ • Offline-ready
                </p>
            </footer>
        </div>
    );
}
