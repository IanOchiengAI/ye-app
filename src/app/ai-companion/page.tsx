'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import styles from './ai-companion.module.css';

interface Message {
    id: number;
    type: 'user' | 'ai';
    content: string;
    timestamp: Date;
}

// Kenya-specific AI Knowledge Base
const kenyaKnowledge = {
    // CBC Curriculum Topics
    cbc: {
        levels: ['Pre-Primary (PP1-PP2)', 'Lower Primary (Grade 1-3)', 'Upper Primary (Grade 4-6)', 'Junior School (Grade 7-9)', 'Senior School (Grade 10-12)'],
        subjects: ['Mathematics', 'English', 'Kiswahili', 'Science & Technology', 'Social Studies', 'Creative Arts', 'Agriculture', 'Home Science'],
        competencies: ['Communication & Collaboration', 'Critical Thinking & Problem Solving', 'Creativity & Imagination', 'Citizenship', 'Digital Literacy', 'Learning to Learn', 'Self-Efficacy'],
        tips: [
            "CBC focuses on competencies, not just passing exams. Practice applying what you learn to real-life situations! 📚",
            "Group projects are important in CBC - they build collaboration skills employers value! 🤝",
            "Keep a portfolio of your best work. It shows your growth and achievements! 🌟",
            "Don't worry too much about memorization. Focus on understanding concepts deeply. 🧠"
        ]
    },
    // Exam preparation
    exams: {
        kcpe: [
            "KCPE ni muhimu, lakini si mwisho wa dunia. Focus on understanding, not cramming! 📖",
            "Past papers are your best friend! Practice KCPE papers from the last 5 years. 📝",
            "Balance your subjects - don't neglect any. All subjects count equally! ⚖️"
        ],
        kcse: [
            "Start KCSE prep early! Form 3 topics often appear in the exams. 🎯",
            "Choose your cluster subjects wisely based on your career goals. 🔮",
            "Group study helps - teach others and you'll remember better! 👥"
        ],
        general: [
            "Panga muda wako vizuri! Make a study timetable and stick to it. ⏰",
            "Take short breaks every 45 minutes - your brain needs rest to absorb info! 🧘",
            "Sleep is important! 7-8 hours helps your brain remember what you studied. 😴"
        ]
    },
    // Career guidance for Kenyan context
    careers: {
        inDemand: ['Technology & Software', 'Healthcare', 'Agriculture & Agribusiness', 'Finance & M-Pesa', 'Creative Industries', 'Renewable Energy'],
        paths: [
            "Many successful Kenyans started with what they had. Hustler mentality + education = success! 💪",
            "Consider TVET (Technical colleges) - artisans and technicians are highly needed! 🔧",
            "Entrepreneurship is huge in Kenya - start small while still in school! 📈",
            "Digital skills can earn you money online. Learn coding, design, or digital marketing! 💻"
        ]
    },
    // Financial literacy for Kenyan youth
    finance: {
        tips: [
            "M-Pesa savings (M-Shwari, Fuliza) can help you save small amounts that grow! 💰",
            "Avoid loan apps with high interest rates - they can trap you in debt! ⚠️",
            "Start a chama (savings group) with friends - it builds discipline! 🤝",
            "Learn about Sacco's - they offer better loan rates than banks! 🏦"
        ],
        entrepreneurship: [
            "Many businesses can start with just 1,000 KES - selling snacks, phone accessories, etc. 📱",
            "Online businesses on Instagram and TikTok are booming - content is king! 📸",
            "Learn from the jua kali sector - innovation with limited resources! 🔨"
        ]
    },
    // Mental health in African context
    mentalHealth: {
        responses: [
            "Ni sawa kuhisi overwhelmed. Talking about it is the first step to feeling better. 💙",
            "Mental health matters! It's not 'madness' - it's normal to struggle sometimes. 🌈",
            "Talk to a trusted teacher, parent, or counselor. Asking for help is strength! 💪",
            "Uko sio peke yako. Many students feel the same way - you're not alone. 🤗"
        ],
        coping: [
            "Take deep breaths: Pumua ndani... exhale taratibu. Repeat 5 times. 🧘",
            "Go outside - a short walk in the sun can boost your mood! ☀️",
            "Write down your worries. Sometimes putting them on paper helps. 📝",
            "Listen to your favorite music - it can change your mood! 🎵"
        ]
    }
};

// Swahili/Sheng phrases and responses
const swahiliResponses = {
    greetings: [
        "Habari yako! 👋 Niko hapa kukusaidia. What's on your mind today?",
        "Sasa! 🌟 How can I help you leo?",
        "Mambo vipi? 💙 Ready to learn something new together?",
    ],
    encouragement: [
        "Umeaminia! You've got this! Every small step counts. 💪",
        "Pole pole ndio mwendo. Take it one step at a time! 🐢",
        "Hata Nairobi ilianza na block moja. Keep building! 🏗️",
        "Hakuna matata! We'll figure this out together. 🦁",
    ],
    goodbye: [
        "Kwaheri for now! Remember, wewe ni champion! 🏆",
        "Tutaonana! Keep working hard and stay positive! 🌟",
        "Usiku mwema! Rest well and come back stronger! 🌙"
    ]
};

// Kenya-specific quick prompts
const quickPrompts = [
    { id: 1, text: "CBC masomo yangu 📚", category: 'cbc' },
    { id: 2, text: "Exam prep tips 📝", category: 'exams' },
    { id: 3, text: "Career advice 🎯", category: 'careers' },
    { id: 4, text: "Pesa tips 💰", category: 'finance' },
    { id: 5, text: "Stress help 😰", category: 'mentalHealth' },
    { id: 6, text: "Find a mentor 🤝", category: 'mentor' },
];

function getKenyaAIResponse(message: string, isPremium: boolean): string {
    const lowerMessage = message.toLowerCase();

    // Swahili/Sheng greeting detection
    if (lowerMessage.includes('habari') || lowerMessage.includes('sasa') ||
        lowerMessage.includes('mambo') || lowerMessage.includes('vipi') ||
        lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
        return swahiliResponses.greetings[Math.floor(Math.random() * swahiliResponses.greetings.length)];
    }

    // CBC Curriculum
    if (lowerMessage.includes('cbc') || lowerMessage.includes('curriculum') ||
        lowerMessage.includes('competenc') || lowerMessage.includes('masomo')) {
        const tip = kenyaKnowledge.cbc.tips[Math.floor(Math.random() * kenyaKnowledge.cbc.tips.length)];
        return `${tip}\n\nCBC focuses on 7 core competencies: ${kenyaKnowledge.cbc.competencies.slice(0, 3).join(', ')}... Would you like to know more about a specific subject or level?`;
    }

    // KCPE
    if (lowerMessage.includes('kcpe') || lowerMessage.includes('grade 6') ||
        lowerMessage.includes('primary exam')) {
        return kenyaKnowledge.exams.kcpe[Math.floor(Math.random() * kenyaKnowledge.exams.kcpe.length)];
    }

    // KCSE
    if (lowerMessage.includes('kcse') || lowerMessage.includes('form 4') ||
        lowerMessage.includes('secondary exam')) {
        return kenyaKnowledge.exams.kcse[Math.floor(Math.random() * kenyaKnowledge.exams.kcse.length)];
    }

    // General exam/study tips
    if (lowerMessage.includes('exam') || lowerMessage.includes('study') ||
        lowerMessage.includes('mtihani') || lowerMessage.includes('soma')) {
        return kenyaKnowledge.exams.general[Math.floor(Math.random() * kenyaKnowledge.exams.general.length)];
    }

    // Career advice
    if (lowerMessage.includes('career') || lowerMessage.includes('job') ||
        lowerMessage.includes('kazi') || lowerMessage.includes('future')) {
        const advice = kenyaKnowledge.careers.paths[Math.floor(Math.random() * kenyaKnowledge.careers.paths.length)];
        return isPremium
            ? `${advice}\n\n📊 Careers in demand in Kenya: ${kenyaKnowledge.careers.inDemand.join(', ')}. Would you like personalized career guidance based on your interests?`
            : `${advice}\n\n🌟 Upgrade to Premium for personalized career path recommendations!`;
    }

    // Financial literacy
    if (lowerMessage.includes('money') || lowerMessage.includes('pesa') ||
        lowerMessage.includes('saving') || lowerMessage.includes('business') ||
        lowerMessage.includes('mpesa') || lowerMessage.includes('finance')) {
        const tips = [...kenyaKnowledge.finance.tips, ...kenyaKnowledge.finance.entrepreneurship];
        return tips[Math.floor(Math.random() * tips.length)];
    }

    // Mental health
    if (lowerMessage.includes('stress') || lowerMessage.includes('anxious') ||
        lowerMessage.includes('sad') || lowerMessage.includes('depressed') ||
        lowerMessage.includes('overwhelm') || lowerMessage.includes('worried') ||
        lowerMessage.includes('nimechoka') || lowerMessage.includes('sijui')) {
        const responses = [...kenyaKnowledge.mentalHealth.responses, ...kenyaKnowledge.mentalHealth.coping];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    // Mentor
    if (lowerMessage.includes('mentor') || lowerMessage.includes('guidance') ||
        lowerMessage.includes('advise')) {
        return "Having a mentor can change your life! 🤝 Check out our 'Find a Mentor' section to connect with verified Kenyan professionals who want to help you succeed. Would you like tips on how to approach a mentor?";
    }

    // Goodbye
    if (lowerMessage.includes('bye') || lowerMessage.includes('kwaheri') ||
        lowerMessage.includes('thanks') || lowerMessage.includes('asante')) {
        return swahiliResponses.goodbye[Math.floor(Math.random() * swahiliResponses.goodbye.length)];
    }

    // Default with encouragement
    return swahiliResponses.encouragement[Math.floor(Math.random() * swahiliResponses.encouragement.length)] +
        "\n\nWhat would you like to explore? I can help with CBC, exams, career advice, or just chat! 💬";
}

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
    const messagesEndRef = useRef<HTMLDivElement>(null);

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

        // Premium feature limiting for free users
        if (!isPremium && messages.length >= 10) {
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
            const aiMessage: Message = {
                id: messages.length + 2,
                type: 'ai',
                content: getKenyaAIResponse(content, isPremium),
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, aiMessage]);
            setIsTyping(false);
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
                            Thinking with you {isPremium ? '(Unlimited Power! ⚡)' : '• ' + (10 - messages.length) + ' insights left'}
                        </span>
                    </div>
                </div>
                {isPremium && (
                    <span className={styles.premiumBadge}>VIP ACCESS</span>
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
                    🇰🇪 Designed for Kenyan students • Offline-ready • CBC-aligned
                </p>
            </footer>
        </div>
    );
}
