export interface Mentor {
    id: string;
    name: string;
    role: string;
    company: string;
    bio: string;
    expertise: string[];
    imageUrl: string;
    available: boolean;
}

// Real Unsplash photos of African professionals
export const MENTORS: Mentor[] = [
    {
        id: '1',
        name: 'Dr. Sarah Kimani',
        role: 'Senior Data Scientist',
        company: 'Safaricom',
        bio: 'Passionate about helping young women break into STEM. 10+ years in AI/ML at top Kenyan firms. Let me help you code your future!',
        expertise: ['Technology', 'Data Science', 'Career Advice'],
        imageUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=300&q=80',
        available: true
    },
    {
        id: '2',
        name: 'James Omondi',
        role: 'Wealth Manager',
        company: 'Equity Bank',
        bio: 'Started saving at 15, now I manage millions. Financial freedom is possible — let me show you how to budget, save, and invest wisely.',
        expertise: ['Finance', 'Entrepreneurship', 'Banking'],
        imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80',
        available: true
    },
    {
        id: '3',
        name: 'Grace Wanjiku',
        role: 'Communications Director',
        company: 'Ogilvy Africa',
        bio: 'From shyness to TED talks. I believe every young Kenyan has a story worth sharing — let me help you find your voice.',
        expertise: ['Marketing', 'Public Speaking', 'Leadership'],
        imageUrl: 'https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?auto=format&fit=crop&w=300&q=80',
        available: false
    },
    {
        id: '4',
        name: 'David Kamau',
        role: 'Software Engineer',
        company: 'Microsoft',
        bio: 'Self-taught dev from Kibera. Now building products used by millions. I\'ll help you with coding bootcamps, GitHub, and landing your first tech job.',
        expertise: ['Technology', 'Coding', 'Study Skills'],
        imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80',
        available: true
    },
    {
        id: '5',
        name: 'Amina Hassan',
        role: 'Clinical Psychologist',
        company: 'Kenyatta National Hospital',
        bio: 'Mental health matters. I specialize in helping young people navigate stress, anxiety, and the pressures of school and life.',
        expertise: ['Mental Health', 'Wellness', 'Study Skills'],
        imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
        available: true
    },
    {
        id: '6',
        name: 'Brian Otieno',
        role: 'Entrepreneur & Founder',
        company: 'Twiga Foods',
        bio: 'Dropped out of university to start a company. Now we employ 1,000+ Kenyans. I\'ll teach you how to turn ideas into businesses.',
        expertise: ['Entrepreneurship', 'Leadership', 'Finance'],
        imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
        available: true
    }
];

export function getMentorsByCategory(category?: string) {
    if (!category || category === 'All') return MENTORS;
    return MENTORS.filter(m => m.expertise.includes(category));
}
