export interface Mentor {
    id: string;
    name: string;
    role: string;
    company: string;
    bio: string;
    funFact: string;
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
        bio: 'I grew up in Nakuru and wasn\'t sure what to do after school. A mentor helped me find my passion for tech, and now I use data to solve problems for millions of Kenyans.',
        funFact: 'I make the best chapos in Nairobi! 🥞',
        expertise: ['Technology', 'Data Science', 'Career Advice'],
        imageUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=300&q=80',
        available: true
    },
    {
        id: '2',
        name: 'James Omondi',
        role: 'Wealth Manager',
        company: 'Equity Bank',
        bio: 'Started saving my pocket money at 15. I learned that financial freedom isn\'t about earning millions, but managing what you have. Let me show you how to budget like a pro.',
        funFact: 'I run a marathon every year for charity. 🏃🏿‍♂️',
        expertise: ['Finance', 'Entrepreneurship', 'Banking'],
        imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80',
        available: true
    },
    {
        id: '3',
        name: 'Grace Wanjiku',
        role: 'Communications Director',
        company: 'Ogilvy Africa',
        bio: 'I used to be terrified of public speaking. Now I do it for a living! I believe every young Kenyan has a powerful story — let me help you find your voice.',
        funFact: 'I can speak 5 languages (including Sheng)! 🗣️',
        expertise: ['Marketing', 'Public Speaking', 'Leadership'],
        imageUrl: 'https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?auto=format&fit=crop&w=300&q=80',
        available: false
    },
    {
        id: '4',
        name: 'David Kamau',
        role: 'Software Engineer',
        company: 'Microsoft',
        bio: 'Self-taught dev from Kibera. I didn\'t have a fancy laptop, just a dream. Now I build products used worldwide. I\'ll help you with coding and landing your first tech job.',
        funFact: 'I\'m a silent DJ on weekends! 🎧',
        expertise: ['Technology', 'Coding', 'Study Skills'],
        imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80',
        available: true
    },
    {
        id: '5',
        name: 'Amina Hassan',
        role: 'Clinical Psychologist',
        company: 'Kenyatta National Hospital',
        bio: 'My high school years were tough. That\'s why I specialize in helping young people navigate stress and anxiety. Your mental health matters just as much as your grades.',
        funFact: 'I love painting abstract art. 🎨',
        expertise: ['Mental Health', 'Wellness', 'Study Skills'],
        imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
        available: true
    },
    {
        id: '6',
        name: 'Brian Otieno',
        role: 'Entrepreneur & Founder',
        company: 'Twiga Foods',
        bio: 'I started selling mandazi in campus. Now I run a tech company. Business is about solving problems — come learn how to turn your ideas into a hustle.',
        funFact: 'I\'ve climbed Mt. Kenya 3 times! 🏔️',
        expertise: ['Entrepreneurship', 'Leadership', 'Finance'],
        imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
        available: true
    }
];

export function getMentorsByCategory(category?: string) {
    if (!category || category === 'All') return MENTORS;
    return MENTORS.filter(m => m.expertise.includes(category));
}
