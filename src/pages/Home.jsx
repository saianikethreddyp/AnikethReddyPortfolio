import React from 'react';
import Hero from '../components/Hero';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import Contact from '../components/Contact';
import About from '../components/About';

const Home = () => {
    return (
        <div className="flex flex-col gap-20 sm:gap-32">
            <section id="hero">
                <Hero />
            </section>
            <section id="about">
                <About />
            </section>
            <section id="skills">
                <Skills />
            </section>
            <section id="projects">
                <Projects />
            </section>
            <section id="experience">
                <Experience />
            </section>
            <section id="contact">
                <Contact />
            </section>
        </div>
    );
};

export default Home;
