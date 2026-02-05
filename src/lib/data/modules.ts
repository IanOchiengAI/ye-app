import { Module } from '../types';

export const CORE_MODULES: Module[] = [
    {
        id: '1',
        title: 'Financial Literacy 101',
        description: 'Master your money before it masters you. Learn budgeting, saving, and investing basics.',
        thumbnail: '💰',
        category: 'Life Skills',
        order: 1,
        video: {
            url: 'pZ_1Oq0bLhI', // "Money Management for Teens" (Placeholder ID)
            duration: '12:30'
        },
        content: {
            intro: "Money isn't just about what you earn—it's about what you keep. In this module, we'll explore how to make your shillings work for you, avoiding common traps that keep young people broke.",
            sections: [
                {
                    title: "The 50/30/20 Rule",
                    body: "A simple rule for budgeting: Allocate **50%** of your income to Needs (Rent, Food, Transport), **30%** to Wants (Airtime, Entertainment, Fashion), and **20%** to Savings/Debt Repayment. This ensures you always pay yourself first."
                },
                {
                    title: "Mobile Money Discipline",
                    body: "M-Pesa makes spending easy, but it can drain your wallet. Track your transaction costs. Treat your M-Pesa balance like a bank account, not spending money. **Never share your PIN** with anyone."
                },
                {
                    title: "Compound Interest",
                    body: "Albert Einstein called compound interest the 'eighth wonder of the world'. Investing small amounts early (e.g., in a Money Market Fund) allows your money to earn interest on top of interest. Start now, even with 100 KES!"
                }
            ]
        },
        quiz: [
            {
                id: 1,
                text: "What is the recommended percentage of income to save according to the 50/30/20 rule?",
                options: ["5%", "10%", "20%", "50%"],
                correctAnswer: 2
            },
            {
                id: 2,
                text: "Which of these is considered a 'Need'?",
                options: ["New sneakers", "Key textbook/School lunch", "Netflix subscription", "Airtime for gossip"],
                correctAnswer: 1
            },
            {
                id: 3,
                text: "Why is starting to invest early important?",
                options: ["You have more money later", "Compound interest grows money over time", "Banks give free money", "It's required by law"],
                correctAnswer: 1
            }
        ]
    },
    {
        id: '2',
        title: 'Communication Skills',
        description: 'How to speak so people listen, and listen so people speak.',
        thumbnail: '💬',
        category: 'Core',
        order: 2,
        video: {
            url: 'HAnw168huqA', // Julian Treasure TED Talk
            duration: '15:45'
        },
        content: {
            intro: "Great leaders are great communicators. Communication isn't just about talking; it's about connecting. It starts with empathy and understanding the other person's perspective.",
            sections: [
                {
                    title: "The Art of Active Listening",
                    body: "Listening is not just waiting for your turn to speak. It means paying attention to body language, tone, and the unspoken emotions. maintain eye contact and nod to show engagement."
                },
                {
                    title: "Non-Verbal Communication",
                    body: "Over 70% of communication is non-verbal. Your posture, facial expressions, and hand gestures speak louder than words. Stand tall, smile, and open your arms to show approachability."
                },
                {
                    title: "Speaking with Confidence",
                    body: "Avoid filler words like 'um' and 'like'. Pause when you need to think. A silent pause is powerful—it makes you look thoughtful, whereas fillers make you look unsure."
                }
            ]
        },
        quiz: [
            {
                id: 1,
                text: "What is the most important part of communication?",
                options: ["Speaking loud", "Listening", "Using big words", "Speaking fast"],
                correctAnswer: 1
            },
            {
                id: 2,
                text: "What percentage of communication is non-verbal?",
                options: ["10%", "30%", "50%", "Over 70%"],
                correctAnswer: 3
            },
            {
                id: 3,
                text: "What should you do instead of saying 'um'?",
                options: ["Talk faster", "Pause silently", "Cough", "Apologize"],
                correctAnswer: 1
            }
        ]
    },
    {
        id: '3',
        title: 'Mental Health Awareness',
        description: 'Understanding stress, anxiety, and when to ask for help.',
        thumbnail: '🧠',
        category: 'Health',
        order: 3,
        video: {
            url: 'DxIDKZHW3-E', // We All Have Mental Health
            duration: '20:00'
        },
        content: {
            intro: "Your mental health is just as important as your physical health. It affects how you think, feel, and act. It also helps determine how you handle stress, relate to others, and make choices.",
            sections: [
                {
                    title: "Identifying Stress & Anxiety",
                    body: "Stress is a normal reaction to pressure, but chronic stress is harmful. Signs include irritability, lack of sleep, headaches, and trouble concentrating. Anxiety is when worry becomes overwhelming."
                },
                {
                    title: "Coping Strategies",
                    body: "1. **Talk to someone**: A friend, mentor, or counselor.\n2. **Physical Activity**: Exercise releases 'happy hormones'.\n3. **Sleep**: Prioritize 8 hours of rest.\n4. **Mindfulness**: Take 5 minutes to breathe deeply."
                },
                {
                    title: "Breaking the Sigma",
                    body: "It is NOT weak to ask for help. It takes courage. If you or a friend is struggling, reach out to a trusted adult or use our 'Get Help' feature."
                }
            ]
        },
        quiz: [
            {
                id: 1,
                text: "True or False: Asking for help is a sign of weakness.",
                options: ["True", "False"],
                correctAnswer: 1
            },
            {
                id: 2,
                text: "Which of these is a healthy coping strategy?",
                options: ["Isolating yourself", "Sleeping less", "Physical Exercise", "Bottling it up"],
                correctAnswer: 2
            },
            {
                id: 3,
                text: "What usually happens to stress if ignored?",
                options: ["It goes away", "It gets worse", "Nothing", "It turns into excitement"],
                correctAnswer: 1
            }
        ]
    },
    {
        id: '4',
        title: 'Goal Setting',
        description: 'Turn your dreams into actionable plans using SMART goals.',
        thumbnail: '🎯',
        category: 'Core',
        order: 4,
        video: {
            url: 'y74391qJjGk', // SMART Goals
            duration: '10:00'
        },
        content: {
            intro: "A goal without a plan is just a wish. Successful people don't just 'hope' for things—they plan for them using specific frameworks.",
            sections: [
                {
                    title: "The S.M.A.R.T Framework",
                    body: "**S**pecific: Be clear (e.g., 'Get an A in Math' vs 'Do better').\n**M**easurable: How will you know you did it?\n**A**chievable: Is it realistic?\n**R**elevant: Does it matter to you?\n**T**ime-bound: When will you finish?"
                },
                {
                    title: "Breaking it Down",
                    body: "Big goals are scary. Break them into small baby steps. If your goal is 'Run a Marathon', step 1 is 'Buy running shoes', step 2 is 'Run 1km'."
                },
                {
                    title: "Review and Adapt",
                    body: "Life changes. Check your goals every month. Are you on track? Do you need to change the timeline? That's okay!"
                }
            ]
        },
        quiz: [
            {
                id: 1,
                text: "What does the 'T' in SMART stand for?",
                options: ["Tough", "Time-bound", "Testing", "Trying"],
                correctAnswer: 1
            },
            {
                id: 2,
                text: "Which is a Specific goal?",
                options: ["Be rich", "Get fit", "Save 10,000 KES by December", "Learn stuff"],
                correctAnswer: 2
            },
            {
                id: 3,
                text: "What should you do if you miss a milestone?",
                options: ["Give up", "Adjust the plan and keep going", "Ignore it", "Blame others"],
                correctAnswer: 1
            }
        ]
    },
    {
        id: '5',
        title: 'Digital Safety',
        description: 'Protecting yourself and your data online.',
        thumbnail: '🔒',
        category: 'Life Skills',
        order: 5,
        video: {
            url: 'yrln8nyVBLU', // Internet Safety
            duration: '14:20'
        },
        content: {
            intro: "The internet is a tool. Don't let it use you. Your digital footprint lasts forever, so manage it wisely.",
            sections: [
                {
                    title: "Social Media Privacy",
                    body: "Check your privacy settings. Only connect with people you know in real life. Remember: Anything you post can be screenshotted and shared, even if you delete it."
                },
                {
                    title: "Cyberbullying",
                    body: "If someone is mean to you online, **Block** and **Report** them. Do not engage. Tell a trusted adult."
                },
                {
                    title: "Phishing Scams",
                    body: "If a link looks suspicious (e.g., 'Free iPhone click here'), DO NOT CLICK. Hackers use these to steal your passwords."
                }
            ]
        },
        quiz: [
            {
                id: 1,
                text: "Should you share your password with your best friend?",
                options: ["Yes", "No", "Only if they promise not to tell", "Maybe"],
                correctAnswer: 1
            },
            {
                id: 2,
                text: "What is a 'Digital Footprint'?",
                options: ["A shoe brand", "The trail of data you leave online", "A dance move", "A computer virus"],
                correctAnswer: 1
            },
            {
                id: 3,
                text: "What should you do if you see a suspicious link?",
                options: ["Click it", "Forward to friends", "Ignore/Delete it", "Reply to sender"],
                correctAnswer: 2
            }
        ]

    },
    {
        id: '6',
        title: 'Side Hustle 101',
        description: 'Start a business with zero capital using Jiji, Facebook, and WhatsApp.',
        thumbnail: '📱',
        category: 'Career',
        order: 6,
        isPremium: false,
        video: {
            url: 'HAnw168huqA',
            duration: '10:00'
        },
        content: {
            intro: "You don't need a shop to start a business. Your phone is your shop.",
            sections: [
                {
                    title: "Selling on WhatsApp Status",
                    body: "Your contacts are your first customers. Post clear photos with prices."
                }
            ]
        },
        quiz: []
    },
    {
        id: '7',
        title: 'Smart Farming (Kilimo)',
        description: 'Make money from urban farming: Tomatoes, Chicken, and Vertical Gardens.',
        thumbnail: '🌱',
        category: 'Career',
        order: 7,
        isPremium: true,
        video: {
            url: 'HAnw168huqA',
            duration: '25:00'
        },
        content: {
            intro: "Farming isn't just for shags. You can make 50k/month from a small balcony.",
            sections: []
        },
        quiz: []
    },
    {
        id: '8',
        title: 'Chama Wealth Secrets',
        description: 'How to turn your Table Banking group into an investment powerhouse.',
        thumbnail: '🤝',
        category: 'Life Skills',
        order: 8,
        isPremium: true,
        video: {
            url: 'HAnw168huqA',
            duration: '20:00'
        },
        content: {
            intro: "Don't just eat the money. Multiply it.",
            sections: []
        },
        quiz: []
    },
    {
        id: '9',
        title: 'Digital Gigs (Ajira)',
        description: 'Earn dollars online: Transcription, Writing, and Virtual Assistance.',
        thumbnail: '💻',
        category: 'Career',
        order: 9,
        isPremium: true,
        video: {
            url: 'HAnw168huqA',
            duration: '30:00'
        },
        content: {
            intro: "The world is hiring. Work from Nairobi for clients in New York.",
            sections: []
        },
        quiz: []
    }
];

export function getModuleById(id: string): Module | undefined {
    return CORE_MODULES.find(m => m.id === id);
}
