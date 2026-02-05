Youth Educated App: MVP Developer Brief & Project Specification
1) High-Level Project Goals
Product: Deliver a mobile-first Progressive Web App (PWA) with an admin dashboard.
Core Function: Provide human mentorship, life-skills curriculum, and resources with scalable mentor-mentee matching and an AI companion layer.
Business Model: A "Freemium for Impact" model: free access for core features, with premium features for paying individuals and schools.
Key Technical Requirements: Must have offline-friendly content and be designed for SMS/USSD fallbacks in later phases.
Scope: Built for a rapid 12-week pilot targeting 10 schools and ~1,000 users, but designed to scale continent-wide.
2) Target User Persona: "Wanjiku"
Who: Wanjiku is a 16-year-old student at a public school in Nairobi. She is ambitious and curious but lacks access to formal mentorship.
Her Device: A basic Android smartphone with limited storage and an intermittent data connection.
Her Needs: She needs to feel Seen (content that speaks her language), Safe (a private, moderated space), Inspired (achievable goals), and Empowered (every action feels like progress).
3) MVP Scope (The 12-Week Pilot Plan)
This is the exact scope to be built with the 1 Million KES grant.
Phase A (Weeks 1-4): The Foundation
Authentication: User signup via phone/email, including parental consent flow for users under 18.
Onboarding: A simple, guided flow to capture a user's age, school, and interests (e.g., careers, life skills).
Dashboards: A basic Mentee Dashboard and an Admin Panel for user management.
Content: The ability to upload the 10 core life-skills modules (video + text + quiz) with offline caching.
Phase B (Weeks 5-8): The Human Connection
Mentor Features: Mentor onboarding and profile creation, including an admin approval workflow.
Matching: A basic "Find a Mentor" page where a mentee can send a request to one of the top 3 recommended mentors (manual request, not auto-matching yet).
Booking & Tracking: Simple session booking with calendar integration and basic progress tracking for mentees.
Notifications: Email and push notifications for key events (mentor request, session reminder).
Phase C (Weeks 9-12): The Business & AI Layer
Payments: Integration of M-Pesa for school and sponsor plans.
AI Prototype: A simple, rule-based "check-in" bot for the AI companion. No complex LLM yet.
Analytics: A basic dashboard for admins to see key metrics (e.g., active users, modules completed).
Safeguarding: Implement core safety and reporting flows.
4) Key UX Flows (The User's Journey)
Sign Up → Onboard → Land on Dashboard
Explore Modules → Complete a Lesson → Earn a Badge
Find a Mentor → Send Request → Get Accepted → Schedule Session
Chat with AI Companion → Get a Goal Nudge → Reflect on Progress
Upgrade to Premium → Sponsor Another Youth
;o;