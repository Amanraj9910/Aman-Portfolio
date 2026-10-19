import React, { useState, useEffect, useCallback, useRef } from 'react';

const AUTO_ADVANCE_MS = 8000;
const SWIPE_THRESHOLD = 50;

const PROJECTS = [
    {
        id: 1,
        title: 'AI Electrical Drawing to Bill-of-Materials Platform',
        badge: 'Client Project',
        description: 'AI system that reads electrical Single Line Diagrams, finds every component on the drawing and produces a draft parts list (BOM) for engineers to review, instead of counting components by hand.',
        highlights: [
            'Benchmarked YOLO, RF-DETR and D-FINE; shipped D-FINE with overlapping-tile inference for tiny symbols and Azure Document Intelligence OCR for ratings',
            '22-stage training pipeline with rare-class mining (imbalance 2,919:1 → 3:1) and a PostgreSQL SKIP LOCKED job queue feeding GPU workers',
            'Live in production: the same estimating team now turns around more tenders with consistent BOMs',
        ],
        impact: 'BOM prep: days → hours',
        tech: ['D-FINE', 'RF-DETR', 'YOLO', 'OCR', 'PostgreSQL'],
        image: '/img/4-SLD.png',
        color: 'var(--teal)',
    },
    {
        id: 2,
        title: 'AI Recruitment Platform',
        badge: 'Internal Product',
        description: "Hosho's hiring platform where teams post jobs, screen candidates, run tests and review results in one place, plus an AI agent that runs English assessments on its own.",
        highlights: [
            'Multi-role RBAC, AI resume parsing, GitHub repo analysis and LLM scorecards with output validation',
            'Voice assessment agent built on speech-to-text, LLM evaluation and TTS that writes scores back to candidate profiles',
            'Cut technical review time by 60% (30 → 12 min per profile)',
        ],
        impact: '800+ candidates screened',
        tech: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Azure OpenAI', 'AI Search'],
        image: '/img/1-Recrutement.png',
        color: 'var(--accent)',
    },
    {
        id: 3,
        title: 'Autonomous Voice AI Agent for Microsoft 365',
        badge: '2025',
        description: "Voice agent that acts on the user's Microsoft 365 account from spoken requests, such as sending emails and scheduling meetings.",
        highlights: [
            'Built with Copilot Studio and Microsoft Graph',
            'Secure Entra ID sign-in so every action runs as the signed-in user',
        ],
        impact: 'Voice → action',
        tech: ['Copilot Studio', 'Microsoft Graph', 'Entra ID'],
        image: '/img/2-Voice-agent.png',
        color: 'var(--blue)',
    },
    {
        id: 4,
        title: 'Agentic Microsoft Documentation Assistant',
        badge: '2025',
        description: 'Chatbot that answers Microsoft technical questions with sourced answers, using a ReAct master agent that delegates research via Microsoft Learn MCP.',
        impact: '80% faster lookups',
        tech: ['Azure OpenAI', 'FastAPI', 'MCP', 'ReAct'],
        image: '/img/3-Microsoft learn.png',
        color: 'var(--purple)',
    },
    {
        id: 5,
        title: 'Document Intelligence RAG Chatbot',
        badge: '2025',
        description: 'RAG pipeline processing documents into semantic vector chunks, enabling natural-language querying with tone-adaptive responses.',
        impact: 'Hours to seconds',
        tech: ['Azure OpenAI', 'Vector DB', 'Python', 'FastAPI', 'RAG'],
        image: '/img/5-Rag.png',
        color: 'var(--blue)',
    },
];

const ConnectorySection = () => {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState('next');
    const [paused, setPaused] = useState(false);
    const touchStart = useRef(null);
    const total = PROJECTS.length;

    const goTo = useCallback((index, dir) => {
        setDirection(dir || (index > current ? 'next' : 'prev'));
        setCurrent(index);
    }, [current]);

    const goNext = useCallback(() => {
        goTo((current + 1) % total, 'next');
    }, [current, total, goTo]);

    const goPrev = useCallback(() => {
        goTo((current - 1 + total) % total, 'prev');
    }, [current, total, goTo]);

    // Auto-advance; the timer restarts whenever the slide changes, so manual navigation resets it
    useEffect(() => {
        if (paused) return;
        const timer = setInterval(goNext, AUTO_ADVANCE_MS);
        return () => clearInterval(timer);
    }, [goNext, paused]);

    const onTouchStart = (e) => {
        const t = e.touches[0];
        touchStart.current = { x: t.clientX, y: t.clientY };
        setPaused(true);
    };

    const onTouchEnd = (e) => {
        setPaused(false);
        if (!touchStart.current) return;
        const t = e.changedTouches[0];
        const dx = t.clientX - touchStart.current.x;
        const dy = t.clientY - touchStart.current.y;
        touchStart.current = null;
        if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
            dx < 0 ? goNext() : goPrev();
        }
    };

    const project = PROJECTS[current];

    return (
        <section className="section projects-section" id="projects">
            <div className="projects-inner">
                <div className="projects-header reveal">
                    <h2 className="projects-title">PROJECTS</h2>
                    <p className="projects-subtitle">
                        AI products shipped to production, from computer vision to
                        multi-agent systems on Azure.
                    </p>
                </div>

                {/* Carousel */}
                <div
                    className="project-carousel reveal"
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                >
                    <div
                        className="project-carousel-viewport"
                        onTouchStart={onTouchStart}
                        onTouchEnd={onTouchEnd}
                    >
                        <div
                            key={project.id}
                            className={`project-carousel-slide slide-${direction}`}
                            style={{ '--card-color': project.color }}
                        >
                            <div className="project-carousel-image">
                                <img src={project.image} alt={project.title} />
                            </div>
                            <div className="project-carousel-info">
                                <div className="project-carousel-meta">
                                    <span className="project-badge">{project.badge}</span>
                                    <span className="project-impact-badge">⚡ {project.impact}</span>
                                </div>
                                <h3 className="project-carousel-card-title">{project.title}</h3>
                                <p className="project-carousel-desc">{project.description}</p>
                                {project.highlights && (
                                    <ul className="project-highlights">
                                        {project.highlights.map((h) => (
                                            <li key={h}>{h}</li>
                                        ))}
                                    </ul>
                                )}
                                <div className="project-tech-row">
                                    {project.tech.map(t => (
                                        <span key={t} className="project-tech-tag">{t}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="project-carousel-controls">
                        <button className="carousel-arrow carousel-arrow--prev" onClick={goPrev} aria-label="Previous project">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
                        </button>

                        <div className="carousel-dots">
                            {PROJECTS.map((_, i) => (
                                <button
                                    key={i}
                                    className={`carousel-dot ${i === current ? 'carousel-dot--active' : ''}`}
                                    onClick={() => goTo(i)}
                                    aria-label={`Go to project ${i + 1}`}
                                />
                            ))}
                        </div>

                        <button className="carousel-arrow carousel-arrow--next" onClick={goNext} aria-label="Next project">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
                        </button>
                    </div>

                    {/* Progress bar */}
                    <div className="carousel-progress">
                        <div className="carousel-progress-label">
                            <span>{String(current + 1).padStart(2, '0')}</span>
                            <span className="carousel-progress-sep">/</span>
                            <span>{String(total).padStart(2, '0')}</span>
                        </div>
                        <div className="carousel-progress-track">
                            <div
                                className="carousel-progress-fill"
                                style={{ width: `${((current + 1) / total) * 100}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ConnectorySection;
