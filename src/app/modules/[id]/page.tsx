'use client';

import { useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getModuleById } from '@/lib/data/modules';
import styles from './module-detail.module.css';

interface ModuleDetailProps {
    params: {
        id: string;
    };
}

export default function ModuleDetailPage({ params }: ModuleDetailProps) {
    const activeModule = getModuleById(params.id);
    const [activeTab, setActiveTab] = useState<'watch' | 'read' | 'quiz'>('watch');
    const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({}); // QuestionID -> OptionIndex
    const [quizSubmitted, setQuizSubmitted] = useState(false);

    if (!activeModule) {
        notFound();
    }

    const handleQuizSubmit = () => {
        setQuizSubmitted(true);
    };

    const getScore = () => {
        let correct = 0;
        activeModule.quiz.forEach(q => {
            if (quizAnswers[q.id] === q.correctAnswer) correct++;
        });
        return correct;
    };

    // Calculate progress based on tab visits (naive implementation)
    // In a real app, we'd check against UserProgress in context
    const progress = 0; // Placeholder

    return (
        <div className={styles.modulePage}>
            {/* Header */}
            <header className={styles.header}>
                <Link href="/modules" className={styles.backBtn}>
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                </Link>
                <div className={styles.headerContent}>
                    <span className={styles.moduleIcon}>{activeModule.thumbnail}</span>
                    <div>
                        <h1>{activeModule.title}</h1>
                        <p>{activeModule.category}</p>
                    </div>
                </div>
            </header>

            {/* Tabs */}
            <div className={styles.tabs}>
                <button
                    className={`${styles.tab} ${activeTab === 'watch' ? styles.active : ''}`}
                    onClick={() => setActiveTab('watch')}
                >
                    <span className="mr-2">🎬</span> Watch
                </button>
                <button
                    className={`${styles.tab} ${activeTab === 'read' ? styles.active : ''}`}
                    onClick={() => setActiveTab('read')}
                >
                    <span className="mr-2">📖</span> Read
                </button>
                <button
                    className={`${styles.tab} ${activeTab === 'quiz' ? styles.active : ''}`}
                    onClick={() => setActiveTab('quiz')}
                >
                    <span className="mr-2">📝</span> Quiz
                </button>
            </div>

            <main className={styles.main}>
                {/* WATCH TAB */}
                {activeTab === 'watch' && (
                    <div className={styles.contentContainer}>
                        <div className={styles.videoPlaceholder}>
                            <div className={styles.playButton}>▶</div>
                            <p>Video Placeholder for {activeModule.title}</p>
                            <small>(Duration: {activeModule.video.duration})</small>
                            {/* In production: <iframe src={activeModule.video.url} ... /> */}
                        </div>
                        <div className={styles.videoDescription}>
                            <h3>Overview</h3>
                            <p>{activeModule.description}</p>
                        </div>
                        <button
                            className="btn btn-primary btn-full mt-4"
                            onClick={() => setActiveTab('read')}
                        >
                            Next: Read Content
                        </button>
                    </div>
                )}

                {/* READ TAB */}
                {activeTab === 'read' && (
                    <div className={styles.contentContainer}>
                        <div className={styles.lessonContent}>
                            <p className={styles.introText}>{activeModule.content.intro}</p>

                            {activeModule.content.sections.map((section, idx) => (
                                <div key={idx} className={styles.sectionBlock}>
                                    <h3>{section.title}</h3>
                                    <p>{section.body}</p>
                                </div>
                            ))}
                        </div>
                        <button
                            className="btn btn-primary btn-full mt-6"
                            onClick={() => setActiveTab('quiz')}
                        >
                            Next: Take Quiz
                        </button>
                    </div>
                )}

                {/* QUIZ TAB */}
                {activeTab === 'quiz' && (
                    <div className={styles.quizContainer}>
                        <h2>Knowledge Check</h2>
                        <p className={styles.quizInstructions}>
                            Answer all questions to complete this module.
                        </p>

                        {!quizSubmitted ? (
                            <>
                                {activeModule.quiz.map((q, index) => (
                                    <div key={q.id} className={styles.quizQuestion}>
                                        <h4>
                                            <span className={styles.questionNumber}>{index + 1}</span>
                                            {q.text}
                                        </h4>
                                        <div className={styles.quizOptions}>
                                            {q.options.map((option, optIdx) => (
                                                <label key={optIdx} className={styles.quizOption}>
                                                    <input
                                                        type="radio"
                                                        name={`question-${q.id}`}
                                                        checked={quizAnswers[q.id] === optIdx}
                                                        onChange={() => setQuizAnswers(prev => ({ ...prev, [q.id]: optIdx }))}
                                                    />
                                                    <span className={styles.optionRadio}></span>
                                                    <span>{option}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                                <button
                                    className="btn btn-secondary btn-lg btn-full"
                                    onClick={handleQuizSubmit}
                                    disabled={Object.keys(quizAnswers).length < activeModule.quiz.length}
                                >
                                    Submit Answers
                                </button>
                            </>
                        ) : (
                            <div className={styles.quizResults}>
                                <div className={styles.scoreCard}>
                                    <span className={styles.scoreIcon}>
                                        {getScore() === activeModule.quiz.length ? '🎉' : '👍'}
                                    </span>
                                    <h3>
                                        {getScore() === activeModule.quiz.length ? 'Perfect Score!' : 'Well Done!'}
                                    </h3>
                                    <p>You got {getScore()} out of {activeModule.quiz.length} correct</p>
                                </div>
                                <Link href="/modules" className="btn btn-primary btn-lg btn-full">
                                    Back to Modules
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}
