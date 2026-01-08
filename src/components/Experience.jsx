import React from 'react';
import { motion } from 'framer-motion';

import { portfolioData } from '../data/portfolioData';

const { education, certifications, experience } = portfolioData;

const Experience = () => {
    return (
        <section id="experience" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-primary transition-colors duration-300">
            <div className="max-w-[90rem] mx-auto">
                {/* Work Experience */}
                <div className="mb-20">
                    <h2 className="font-heading text-4xl md:text-5xl font-bold text-text mb-12">
                        EXPERIENCE
                    </h2>
                    <div className="space-y-12">
                        {experience.map((job, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative border-l-2 border-text/10 pl-8 md:pl-12 py-2 hover:border-text transition-colors duration-500"
                            >
                                <div className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-secondary border-2 border-text/10 group-hover:border-text group-hover:scale-125 transition-all duration-500" />

                                <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-8 mb-4">
                                    <h3 className="text-2xl md:text-3xl font-heading font-bold text-text">{job.title}</h3>
                                    <span className="text-lg text-muted font-medium">{job.company}</span>
                                    <span className="text-sm text-muted/60 font-mono bg-text/5 px-3 py-1 rounded-full">{job.date}</span>
                                </div>

                                <ul className="space-y-4 max-w-4xl">
                                    {job.description.map((desc, i) => (
                                        <li key={i} className="flex items-start gap-3 text-lg text-muted/80">
                                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-text/40 shrink-0" />
                                            {desc}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="mb-20">
                    <h2 className="font-heading text-4xl md:text-5xl font-bold text-text mb-12">
                        CERTIFICATIONS
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {certifications.map((cert, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="p-8 border border-text/10 hover:bg-text/5 transition-colors duration-300"
                            >
                                <h3 className="text-xl font-heading font-bold text-text mb-2">{cert.name}</h3>
                                <div className="flex justify-between items-center text-sm text-muted">
                                    <span>{cert.issuer}</span>
                                    <span>{cert.date}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div>
                    <h2 className="font-heading text-4xl md:text-5xl font-bold text-text mb-12">
                        EDUCATION
                    </h2>

                    <div className="space-y-12">
                        {education.map((edu, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group border-l-2 border-text/10 pl-8 hover:border-text transition-colors duration-500"
                            >
                                <span className="text-sm text-muted font-medium tracking-widest uppercase mb-2 block">{edu.date}</span>
                                <h3 className="text-2xl font-heading font-bold text-text mb-1 group-hover:text-text/80 transition-colors">{edu.school}</h3>
                                <p className="text-lg text-muted/80">{edu.degree}</p>
                                <p className="text-sm text-muted/50 mt-2">{edu.score}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
