import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const HeroSection = () => {
    const heroRef = useRef(null);
    const nameRef = useRef(null);
    const subtitleRef = useRef(null);
    const photoRef = useRef(null);
    const ctaRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({ delay: 0.3 });

        // Animate name letters
        const letters = nameRef.current?.querySelectorAll('.hero-letter');
        if (letters) {
            gsap.set(letters, { y: 120, opacity: 0, rotateX: -90 });
            tl.to(letters, {
                y: 0, opacity: 1, rotateX: 0,
                duration: 0.8, ease: 'power3.out',
                stagger: 0.06,
            });
        }

        // Animate subtitle
        tl.fromTo(subtitleRef.current,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' },
            '-=0.3'
        );

        // Animate profile photo
        tl.fromTo(photoRef.current,
            { scale: 0.8, opacity: 0, rotate: -5 },
            { scale: 1, opacity: 1, rotate: 0, duration: 0.8, ease: 'back.out(1.7)' },
            '-=0.5'
        );

        // Animate CTA
        tl.fromTo(ctaRef.current,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
            '-=0.3'
        );
    }, []);

    const nameChars = 'AMAN RAJ'.split('');

    return (
        <section className="section hero-section" id="hero" ref={heroRef}>
            {/* Animated background particles */}
            <div className="hero-particles">
                {Array.from({ length: 20 }).map((_, i) => (
                    <div key={i} className="hero-particle" style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 5}s`,
                        animationDuration: `${3 + Math.random() * 4}s`,
                    }} />
                ))}
            </div>

            <div className="hero-content">
                <div className="hero-text-block">
                    <div className="hero-greeting">Hello, I'm</div>
                    <h1 className="hero-name" ref={nameRef}>
                        {nameChars.map((char, i) => (
                            <span key={i} className={`hero-letter ${char === ' ' ? 'hero-letter--space' : ''}`}>
                                {char === ' ' ? '\u00A0' : char}
                            </span>
                        ))}
                    </h1>
                    <div className="hero-subtitle" ref={subtitleRef}>
                        <span className="hero-role-badge">AI Engineer</span>
                        <span className="hero-role-sep">·</span>
                        <span className="hero-role-badge">Technical Consultant</span>
                        <span className="hero-role-sep">·</span>
                        <span className="hero-role-badge">Azure AI-102 Certified</span>
                    </div>
                    <p className="hero-tagline">
                        Delivering production AI solutions in the Microsoft ecosystem: Azure OpenAI,
                        AI Foundry, AI Search, Copilot Studio and Power Platform. I own each solution
                        end-to-end, from requirements to deployment, governance and cost control.
                    </p>
                    <div className="hero-cta" ref={ctaRef}>
                        <a href="#projects" className="hero-btn hero-btn--primary">
                            View Projects
                            <span className="hero-btn-arrow">→</span>
                        </a>
                        <a href="#contact" className="hero-btn hero-btn--secondary">
                            Get in Touch
                        </a>
                    </div>
                </div>
                <div className="hero-photo-block" ref={photoRef}>
                    <div className="hero-photo-wrapper">
                        <img src="/img/profile.jpg" alt="Aman Raj" className="hero-photo" />
                        <div className="hero-photo-ring"></div>
                        <div className="hero-photo-ring hero-photo-ring--2"></div>
                    </div>
                    <div className="hero-photo-stats">
                        <div className="hero-stat">
                            <span className="hero-stat-num">800+</span>
                            <span className="hero-stat-label">Candidates Screened</span>
                        </div>
                        <div className="hero-stat">
                            <span className="hero-stat-num">7–10</span>
                            <span className="hero-stat-label">Team Led</span>
                        </div>
                        <div className="hero-stat">
                            <span className="hero-stat-num">AI-102</span>
                            <span className="hero-stat-label">Certified</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="hero-scroll-indicator">
                <div className="scroll-line"></div>
                <span>Scroll</span>
            </div>
        </section>
    );
};

export default HeroSection;
