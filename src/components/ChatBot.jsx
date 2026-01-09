import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Hi there! I'm Aniketh's AI assistant. I can tell you about his work experience, projects, skills, and certifications. What would you like to know?",
            sender: 'bot'
        }
    ]);

    // ... existing refs and scroll logic ...

    const getAllContext = () => {
        const { personalInfo, skills, projects, education, certifications, experience } = portfolioData;

        let context = [];

        // Personal Info
        context.push({ keywords: ['about', 'bio', 'who', 'background', 'intro'], content: personalInfo.bio.join(' ') });
        context.push({ keywords: ['email', 'contact', 'reach', 'phone', 'location', 'address'], content: `You can reach Aniketh at ${personalInfo.email}, call him at ${personalInfo.phone}, or find him in ${personalInfo.location}.` });
        context.push({ keywords: ['social', 'linkedin', 'github', 'twitter', 'x'], content: `Connect with him on LinkedIn: ${personalInfo.socials.linkedin}, GitHub: ${personalInfo.socials.github}, or X: ${personalInfo.socials.twitter}.` });

        // Experience
        experience.forEach(job => {
            context.push({
                keywords: ['experience', 'work', 'job', 'company', 'dhanya', 'career', job.company.toLowerCase(), job.title.toLowerCase()],
                content: `Aniketh is currently working as a ${job.title} at ${job.company} (${job.date}). ${job.description.join(' ')}`
            });
        });

        // Projects
        projects.forEach(project => {
            context.push({
                keywords: ['project', 'built', 'create', 'develop', project.title.toLowerCase()],
                content: `Project: ${project.title} (${project.category}, ${project.year}). ${project.description}. View it here: ${project.github}`
            });
        });

        // Skills
        context.push({ keywords: ['skill', 'stack', 'tech', 'language', 'tool', 'react', 'node', 'java'], content: `Aniketh's technical skills include: ${skills.join(', ')}.` });

        // Certifications
        const certNames = certifications.map(c => c.name).join(', ');
        context.push({ keywords: ['certification', 'certificate', 'licensed', 'course'], content: `Aniketh holds the following certifications: ${certNames}.` });

        // Education
        const edu = education[0];
        context.push({ keywords: ['education', 'degree', 'college', 'school', 'university', 'btech'], content: `Aniketh is pursuing his ${edu.degree} at ${edu.school} with a score of ${edu.score}.` });

        return context;
    };

    const findBestMatch = (query) => {
        const terms = query.toLowerCase().split(' ').filter(word => word.length > 2); // Ignore short words
        const context = getAllContext();

        let bestMatch = null;
        let maxScore = 0;

        context.forEach(item => {
            let score = 0;
            terms.forEach(term => {
                if (item.keywords.some(k => k.includes(term) || term.includes(k))) score += 3; // Keyword match
                if (item.content.toLowerCase().includes(term)) score += 1; // Content match
            });

            if (score > maxScore) {
                maxScore = score;
                bestMatch = item;
            }
        });

        return maxScore > 0 ? bestMatch.content : null;
    };

    const generateResponse = (query) => {
        const lowerQuery = query.toLowerCase();

        // Greeting check
        if (['hi', 'hello', 'hey', 'greetings'].some(w => lowerQuery.startsWith(w))) {
            return "Hello! How can I help you today?";
        }

        const match = findBestMatch(query);
        if (match) {
            return match;
        }

        return "I'm not sure about that. I can tell you about Aniketh's experience, projects, skills, or education. Try asking something specific!";
    };

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = {
            id: Date.now(),
            text: input,
            sender: 'user'
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');

        setTimeout(() => {
            const botResponse = {
                id: Date.now() + 1,
                text: generateResponse(userMessage.text),
                sender: 'bot'
            };
            setMessages(prev => [...prev, botResponse]);
        }, 500);
    };

    return (
        <>
            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-8 right-8 z-50 p-4 bg-text text-primary rounded-full shadow-lg hover:scale-110 transition-transform duration-300 ${isOpen ? 'hidden' : 'flex'}`}
            >
                <MessageCircle size={28} />
            </button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-8 right-8 z-50 w-[90vw] md:w-[400px] h-[600px] max-h-[80vh] bg-primary border border-text/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-text/10 flex justify-between items-center bg-secondary/50 backdrop-blur-sm">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-text/10 flex items-center justify-center">
                                    <Bot size={20} className="text-text" />
                                </div>
                                <div>
                                    <h3 className="font-heading font-bold text-text">Assistant</h3>
                                    <p className="text-xs text-muted flex items-center gap-1">
                                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                        Online
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-text/5 rounded-full transition-colors text-muted hover:text-text"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-text/10 scrollbar-track-transparent">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.sender === 'user'
                                            ? 'bg-text text-primary rounded-tr-none'
                                            : 'bg-text/5 text-text border border-text/10 rounded-tl-none'
                                            }`}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <form onSubmit={handleSend} className="p-4 border-t border-text/10 bg-secondary/50 backdrop-blur-sm">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Ask something..."
                                    className="flex-1 bg-text/5 border border-text/10 rounded-xl px-4 py-3 text-sm text-text focus:outline-none focus:border-text/30 transition-colors placeholder:text-muted/50"
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim()}
                                    className="p-3 bg-text text-primary rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Send size={20} />
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ChatBot;
