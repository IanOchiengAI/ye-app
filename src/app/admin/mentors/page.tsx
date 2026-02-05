'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext'; // We'll assume admin check is inside or handled via protected route
import styles from './admin-mentors.module.css';

// Mock data for mentor applications
const initialApplications = [
    { id: 1, name: 'Dr. Jane K.', profession: 'Software Engineer', status: 'pending', date: '2024-02-04' },
    { id: 2, name: 'John Doe', profession: 'Teacher', status: 'pending', date: '2024-02-03' },
    { id: 3, name: 'Sarah Connor', profession: 'Security Analyst', status: 'approved', date: '2024-01-20' },
];

export default function AdminMentorsPage() {
    const [applications, setApplications] = useState(initialApplications);
    const [filter, setFilter] = useState('pending');

    const handleAction = (id: number, action: 'approve' | 'reject') => {
        // In real app: call API to update Firestore
        setApplications(prev => prev.map(app =>
            app.id === id ? { ...app, status: action === 'approve' ? 'approved' : 'rejected' } : app
        ));
    };

    const filteredApps = applications.filter(app =>
        filter === 'all' ? true : app.status === filter
    );

    return (
        <div className={styles.adminPage}>
            <header className={styles.header}>
                <h1>Mentor Management</h1>
                <div className={styles.stats}>
                    <div className={styles.statCard}>
                        <span className={styles.statNum}>{applications.filter(a => a.status === 'pending').length}</span>
                        <span className={styles.statLabel}>Pending</span>
                    </div>
                    <div className={styles.statCard}>
                        <span className={styles.statNum}>{applications.filter(a => a.status === 'approved').length}</span>
                        <span className={styles.statLabel}>Active</span>
                    </div>
                </div>
            </header>

            <div className={styles.filters}>
                <button
                    className={`${styles.filterBtn} ${filter === 'pending' ? styles.active : ''}`}
                    onClick={() => setFilter('pending')}
                >
                    Pending Review
                </button>
                <button
                    className={`${styles.filterBtn} ${filter === 'approved' ? styles.active : ''}`}
                    onClick={() => setFilter('approved')}
                >
                    Approved Mentors
                </button>
                <button
                    className={`${styles.filterBtn} ${filter === 'all' ? styles.active : ''}`}
                    onClick={() => setFilter('all')}
                >
                    All Applications
                </button>
            </div>

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Profession</th>
                            <th>Date Applied</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredApps.length > 0 ? filteredApps.map(app => (
                            <tr key={app.id}>
                                <td className={styles.nameCell}>
                                    <div className={styles.avatar}>{app.name.charAt(0)}</div>
                                    {app.name}
                                </td>
                                <td>{app.profession}</td>
                                <td>{app.date}</td>
                                <td>
                                    <span className={`badge ${app.status === 'approved' ? 'badge-success' :
                                            app.status === 'pending' ? 'badge-warning' : 'badge-error'
                                        }`}>
                                        {app.status}
                                    </span>
                                </td>
                                <td>
                                    {app.status === 'pending' && (
                                        <div className={styles.actions}>
                                            <button
                                                className="btn btn-sm btn-primary"
                                                onClick={() => handleAction(app.id, 'approve')}
                                            >
                                                Approve
                                            </button>
                                            <button
                                                className="btn btn-sm btn-outline"
                                                onClick={() => handleAction(app.id, 'reject')}
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    )}
                                    {app.status !== 'pending' && (
                                        <button className="btn btn-sm btn-ghost">View Details</button>
                                    )}
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={5} className={styles.empty}>No mentors found for this filter.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
