'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import styles from './profile.module.css';

export default function MentorProfilePage() {
    const { profile } = useAuth();
    const [formData, setFormData] = useState({
        profession: 'Software Engineer', // Mock initial data
        company: 'Tech Corp',
        bio: 'Passionate about helping young people get into tech.',
        linkedin: 'https://linkedin.com/in/example',
        expertise: ['Coding', 'Career Advice', 'Resume Building'],
        availability: 'Weekends',
    });
    const [saving, setSaving] = useState(false);

    const handleSave = () => {
        setSaving(true);
        // Simulate save
        setTimeout(() => {
            setSaving(false);
            alert('Profile updated!');
        }, 1000);
    };

    return (
        <div className={styles.profilePage}>
            <header className={styles.header}>
                <Link href="/dashboard/mentor" className={styles.backBtn}>
                    ← Back
                </Link>
                <h1>Edit Profile</h1>
                <div style={{ width: 40 }}></div>
            </header>

            <main className={styles.main}>
                <div className={styles.avatarSection}>
                    <div className={styles.avatarLarge}>
                        {profile?.displayName?.charAt(0) || 'M'}
                    </div>
                    <button className="btn btn-outline btn-sm">Change Photo</button>
                </div>

                <div className={styles.formSection}>
                    <div className="form-group">
                        <label className="form-label">Profession / Title</label>
                        <input
                            type="text"
                            className="form-input"
                            value={formData.profession}
                            onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Company / Organization</label>
                        <input
                            type="text"
                            className="form-input"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Short Bio</label>
                        <textarea
                            className="form-input"
                            rows={4}
                            value={formData.bio}
                            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">LinkedIn URL</label>
                        <input
                            type="url"
                            className="form-input"
                            value={formData.linkedin}
                            onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Areas of Expertise</label>
                        <div className={styles.tags}>
                            {formData.expertise.map((tag, i) => (
                                <span key={i} className={styles.tag}>
                                    {tag} <button className={styles.removeTag}>×</button>
                                </span>
                            ))}
                            <button className={styles.addTagBtn}>+ Add</button>
                        </div>
                    </div>

                    <button
                        className="btn btn-primary btn-lg btn-full"
                        onClick={handleSave}
                        disabled={saving}
                    >
                        {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </main>
        </div>
    );
}
