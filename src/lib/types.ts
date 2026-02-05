export interface Question {
    id: number;
    text: string;
    options: string[];
    correctAnswer: number; // Index of the correct option
}

export interface ModuleVideo {
    url: string; // YouTube ID or direct URL
    duration: string; // e.g., "15:00"
}

export interface ModuleContent {
    intro: string; // Markdown supported
    sections: {
        title: string;
        body: string; // Markdown supported
    }[];
}

export interface Module {
    id: string;
    title: string;
    description: string;
    thumbnail: string; // Emoji or image URL
    category: 'Core' | 'Life Skills' | 'Health' | 'Career';
    video: ModuleVideo;
    content: ModuleContent;
    quiz: Question[];
    order: number;
    isPremium?: boolean;
}

export interface UserModuleProgress {
    moduleId: string;
    startedAt: Date;
    completedAt?: Date;
    quizScore?: number; // Percentage
    status: 'not_started' | 'in_progress' | 'completed';
    lastPosition?: number; // Video timestamp or section index
}
