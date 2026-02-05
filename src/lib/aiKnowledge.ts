/**
 * Kenya-Specific AI Knowledge Base
 * 
 * This module contains the core knowledge used by Rafiki AI
 * for providing contextually relevant responses to Kenyan students.
 * 
 * Topics covered:
 * - CBC Curriculum
 * - KCPE/KCSE Exam Preparation  
 * - Career Guidance (Kenya-focused)
 * - Financial Literacy (M-Pesa, Saccos, etc.)
 * - Mental Health (culturally sensitive)
 * - Swahili/Sheng responses
 */

// CBC Curriculum Knowledge
export const cbcKnowledge = {
    levels: [
        'Pre-Primary (PP1-PP2)',
        'Lower Primary (Grade 1-3)',
        'Upper Primary (Grade 4-6)',
        'Junior School (Grade 7-9)',
        'Senior School (Grade 10-12)'
    ],
    subjects: [
        'Mathematics',
        'English',
        'Kiswahili',
        'Science & Technology',
        'Social Studies',
        'Creative Arts',
        'Agriculture',
        'Home Science'
    ],
    competencies: [
        'Communication & Collaboration',
        'Critical Thinking & Problem Solving',
        'Creativity & Imagination',
        'Citizenship',
        'Digital Literacy',
        'Learning to Learn',
        'Self-Efficacy'
    ],
    tips: [
        "CBC focuses on competencies, not just passing exams. Practice applying what you learn to real-life situations! 📚",
        "Group projects are important in CBC - they build collaboration skills employers value! 🤝",
        "Keep a portfolio of your best work. It shows your growth and achievements! 🌟",
        "Don't worry too much about memorization. Focus on understanding concepts deeply. 🧠"
    ]
};

// Exam Preparation Knowledge
export const examKnowledge = {
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
};

// Career Guidance Knowledge
export const careerKnowledge = {
    inDemand: [
        'Technology & Software',
        'Healthcare',
        'Agriculture & Agribusiness',
        'Finance & M-Pesa',
        'Creative Industries',
        'Renewable Energy'
    ],
    paths: [
        "Many successful Kenyans started with what they had. Hustler mentality + education = success! 💪",
        "Consider TVET (Technical colleges) - artisans and technicians are highly needed! 🔧",
        "Entrepreneurship is huge in Kenya - start small while still in school! 📈",
        "Digital skills can earn you money online. Learn coding, design, or digital marketing! 💻"
    ],
    // Premium-only detailed career paths
    premiumPaths: {
        technology: {
            title: 'Technology & Software',
            skills: ['Python', 'JavaScript', 'Mobile Development', 'Cloud Computing'],
            companies: ['Safaricom', 'Andela', 'M-KOPA', 'Branch', 'Cellulant'],
            salary: 'KES 80,000 - 500,000+ monthly',
            resources: ['freeCodeCamp', 'Moringa School', 'ALX Africa']
        },
        healthcare: {
            title: 'Healthcare',
            skills: ['Nursing', 'Laboratory Technology', 'Public Health', 'Telemedicine'],
            companies: ['Aga Khan', 'Nairobi Hospital', 'AMREF', 'M-TIBA'],
            salary: 'KES 50,000 - 300,000+ monthly',
            resources: ['Kenya Medical Training College', 'Moi University']
        },
        business: {
            title: 'Business & Finance',
            skills: ['Financial Analysis', 'M-Pesa Operations', 'Accounting', 'Sales'],
            companies: ['Equity Bank', 'KCB', 'Safaricom', 'Deloitte Kenya'],
            salary: 'KES 60,000 - 400,000+ monthly',
            resources: ['Strathmore University', 'CPA Kenya']
        }
    }
};

// Financial Literacy Knowledge
export const financeKnowledge = {
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
};

// Mental Health Knowledge
export const mentalHealthKnowledge = {
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
};

// Swahili/Sheng Responses
export const swahiliResponses = {
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

// Quick Prompts for UI
export const quickPrompts = [
    { id: 1, text: "🧠 Ask about a topic", category: 'general' },
    { id: 2, text: "🎯 Reflect on my goals", category: 'goals' },
    { id: 3, text: "🗓️ Plan my week", category: 'planning' },
    { id: 4, text: "💼 Explore careers", category: 'career' },
    { id: 5, text: "📖 Exam prep tips", category: 'exams' },
    { id: 6, text: "💰 Money tips", category: 'finance' },
];

/**
 * Get AI Response based on message content
 * 
 * @param message - User's message
 * @param isPremium - Whether user has premium access
 * @returns AI response string
 */
export function getKenyaAIResponse(message: string, isPremium: boolean): string {
    const lowerMessage = message.toLowerCase();

    // Goal Reflections
    if (lowerMessage.includes('reflect') || lowerMessage.includes('goal')) {
        return "Reflection is where the real growth happens! ✨ What's one thing you did this week that moved you closer to your dream? (Even a small step counts!)";
    }

    // Planning
    if (lowerMessage.includes('plan') || lowerMessage.includes('week')) {
        return "Fail to plan, plan to fail! Let's break it down. What are your top 3 priorities for this week? 📝";
    }

    // Swahili/Sheng greeting detection
    if (lowerMessage.includes('habari') || lowerMessage.includes('sasa') ||
        lowerMessage.includes('mambo') || lowerMessage.includes('vipi') ||
        lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
        return swahiliResponses.greetings[Math.floor(Math.random() * swahiliResponses.greetings.length)];
    }

    // CBC Curriculum
    if (lowerMessage.includes('cbc') || lowerMessage.includes('curriculum') ||
        lowerMessage.includes('competenc') || lowerMessage.includes('masomo')) {
        const tip = cbcKnowledge.tips[Math.floor(Math.random() * cbcKnowledge.tips.length)];
        return `${tip}\n\nCBC focuses on 7 core competencies: ${cbcKnowledge.competencies.slice(0, 3).join(', ')}... Would you like to know more about a specific subject or level?`;
    }

    // KCPE
    if (lowerMessage.includes('kcpe') || lowerMessage.includes('grade 6') ||
        lowerMessage.includes('primary exam')) {
        return examKnowledge.kcpe[Math.floor(Math.random() * examKnowledge.kcpe.length)];
    }

    // KCSE
    if (lowerMessage.includes('kcse') || lowerMessage.includes('form 4') ||
        lowerMessage.includes('secondary exam')) {
        return examKnowledge.kcse[Math.floor(Math.random() * examKnowledge.kcse.length)];
    }

    // General exam/study tips
    if (lowerMessage.includes('exam') || lowerMessage.includes('study') ||
        lowerMessage.includes('mtihani') || lowerMessage.includes('soma')) {
        return examKnowledge.general[Math.floor(Math.random() * examKnowledge.general.length)];
    }

    // Career advice (Premium enhanced)
    if (lowerMessage.includes('career') || lowerMessage.includes('job') ||
        lowerMessage.includes('kazi') || lowerMessage.includes('future')) {
        const advice = careerKnowledge.paths[Math.floor(Math.random() * careerKnowledge.paths.length)];

        if (isPremium) {
            // Premium users get detailed career insights
            const career = careerKnowledge.premiumPaths.technology;
            return `${advice}\n\n📊 **Premium Career Insight - Technology:**\n🏢 Top Companies: ${career.companies.join(', ')}\n💰 Salary Range: ${career.salary}\n📚 Learn at: ${career.resources.join(', ')}\n\nWould you like detailed paths for Healthcare or Business?`;
        }

        return `${advice}\n\n🌟 **Upgrade to Premium** for personalized career path recommendations with salary insights and company connections!`;
    }

    // Financial literacy
    if (lowerMessage.includes('money') || lowerMessage.includes('pesa') ||
        lowerMessage.includes('saving') || lowerMessage.includes('business') ||
        lowerMessage.includes('mpesa') || lowerMessage.includes('finance')) {
        const tips = [...financeKnowledge.tips, ...financeKnowledge.entrepreneurship];
        return tips[Math.floor(Math.random() * tips.length)];
    }

    // Mental health
    if (lowerMessage.includes('stress') || lowerMessage.includes('anxious') ||
        lowerMessage.includes('sad') || lowerMessage.includes('depressed') ||
        lowerMessage.includes('overwhelm') || lowerMessage.includes('worried') ||
        lowerMessage.includes('nimechoka') || lowerMessage.includes('sijui')) {
        const responses = [...mentalHealthKnowledge.responses, ...mentalHealthKnowledge.coping];
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
