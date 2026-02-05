export interface Mentor {
    id: string;
    name: string;
    profession: string;
    company?: string;
    bio: string;
    expertise: string[];
    imageUrl?: string;
    availability: string;
}

// Mock mock mentor data
export const MOCK_MENTORS: Mentor[] = [
    {
        id: '1',
        name: 'Dr. Jane Kamau',
        profession: 'Software Engineer',
        company: 'Safaricom',
        bio: 'Passionate about helping young women get into tech. 5 years experience in cloud computing.',
        expertise: ['Technology', 'Career Guidance', 'Coding'],
        availability: 'Weekends',
    },
    {
        id: '2',
        name: 'Michael Ochieng',
        profession: 'Financial Advisor',
        company: 'KCB Bank',
        bio: 'Helping youth understand money management and investment basics.',
        expertise: ['Finance', 'Entrepreneurship', 'Savings'],
        availability: 'Evenings',
    },
    {
        id: '3',
        name: 'Sarah Wanjiku',
        profession: 'Digital Marketer',
        company: 'Agency Africa',
        bio: 'Creative professional with a love for storytelling and brand building.',
        expertise: ['Marketing', 'Social Media', 'Branding'],
        availability: 'Flexible',
    },
    {
        id: '4',
        name: 'David Njoroge',
        profession: 'Civil Engineer',
        company: 'Construction Co.',
        bio: 'Building the nation literally. Happy to guide aspiring engineers.',
        expertise: ['Engineering', 'STEM', 'Project Management'],
        availability: 'Saturday Mornings',
    }
];

export function getRecommendedMentors(interests: string[] = []): Mentor[] {
    if (!interests || interests.length === 0) return MOCK_MENTORS.slice(0, 3);

    // Simple matching logic: boost score if expertise matches interest
    const scored = MOCK_MENTORS.map(mentor => {
        let score = 0;
        mentor.expertise.forEach(exp => {
            if (interests.some(int => int.toLowerCase().includes(exp.toLowerCase()) || exp.toLowerCase().includes(int.toLowerCase()))) {
                score += 1;
            }
        });
        return { mentor, score };
    });

    // Sort by score descending
    scored.sort((a, b) => b.score - a.score);

    return scored.map(item => item.mentor);
}
