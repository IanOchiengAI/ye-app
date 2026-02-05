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
        bio: 'I lead the team analyzing M-PESA transaction flows to detect fraud. Growing up in Nakuru, I loved math but didn\'t know it could be a career. Now I use Python and SQL daily to protect millions of shillings for Kenyans.',
        funFact: 'I make the best chapos in Nairobi! 🥞',
        expertise: ['Technology', 'Data Science', 'M-PESA APIs'],
        imageUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=300&q=80',
        available: true
    },
    {
        id: '2',
        name: 'James Omondi',
        role: 'Wealth Manager',
        company: 'Equity Bank',
        bio: 'I help managing the "Wings to Fly" scholarship fund investments. Financial freedom starts small—I started saving in a bamboo bank at 15. Let me teach you how to budget your HELB loan or pocket money.',
        funFact: 'I run the Lewa Marathon every year for charity. 🏃🏿‍♂️',
        expertise: ['Finance', 'Investment', 'Banking'],
        imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80',
        available: true
    },
    {
        id: '3',
        name: 'Grace Wanjiku',
        role: 'Communications Director',
        company: 'Ogilvy Africa',
        bio: 'I\'ve managed PR campaigns for major brands like Coca-Cola Kenya. Public speaking used to terrify me, but I learned to turn nerves into energy. I help introverts find their voice in interviews and presentations.',
        funFact: 'I can speak 5 languages (including deeply fluent Sheng)! 🗣️',
        expertise: ['Marketing', 'Public Speaking', 'Branding'],
        imageUrl: 'https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?auto=format&fit=crop&w=300&q=80',
        available: false
    },
    {
        id: '4',
        name: 'David Kamau',
        role: 'Software Engineer',
        company: 'Microsoft ADC',
        bio: 'Self-taught dev from Kibera. I didn\'t have a laptop, so I coded on paper first. Now I work at the Africa Development Center in Westlands building Cloud tools. Coding creates opportunities anywhere.',
        funFact: 'I\'m a silent DJ on weekends! 🎧',
        expertise: ['Technology', 'Coding', 'Cloud Computing'],
        imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80',
        available: true
    },
    {
        id: '5',
        name: 'Amina Hassan',
        role: 'Clinical Psychologist',
        company: 'Chiromo Hospital',
        bio: 'KCSE pressure is real, I know because I went through it. I specialize in adolescent mental health and stress management. Your grades matter, but your sanity matters more. Let\'s talk about balance.',
        funFact: 'I love painting abstract art to relax. 🎨',
        expertise: ['Mental Health', 'Wellness', 'Stress Mgmt'],
        imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
        available: true
    },
    {
        id: '6',
        name: 'Brian Otieno',
        role: 'Operations Lead',
        company: 'Twiga Foods',
        bio: 'I started selling mandazi in campus to pay fees. Now I optimize supply chains connecting farmers to vendors. Business is about solving real problems—I\'ll show you how to turn your side hustle into a startup.',
        funFact: 'I\'ve climbed Mt. Kenya 3 times! 🏔️',
        expertise: ['Entrepreneurship', 'Logistics', 'Finance'],
        imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
        available: true
    }
];

export function getMentorsByCategory(category?: string) {
    if (!category || category === 'All') return MENTORS;
    return MENTORS.filter(m => m.expertise.includes(category));
}
