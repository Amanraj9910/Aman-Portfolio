import React, { useState } from 'react';

const SKILL_CATEGORIES = [
    {
        num: '01',
        title: 'AI & ML',
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="5" width="14" height="14" rx="2" /><rect x="9" y="9" width="6" height="6" />
                <path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" />
            </svg>
        ),
        color: 'var(--accent)',
        skills: ['Azure OpenAI', 'AI Foundry', 'RAG', 'LLM Agents', 'MCP', 'STT / TTS', 'YOLO', 'RF-DETR', 'D-FINE', 'OCR'],
    },
    {
        num: '02',
        title: 'Microsoft & Power Platform',
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="8" height="8" rx="1" /><rect x="13" y="3" width="8" height="8" rx="1" />
                <rect x="3" y="13" width="8" height="8" rx="1" /><rect x="13" y="13" width="8" height="8" rx="1" />
            </svg>
        ),
        color: 'var(--blue)',
        skills: ['Copilot Studio', 'Microsoft Graph', 'Power Automate', 'Power Apps', 'Dataverse', 'Power BI'],
    },
    {
        num: '03',
        title: 'Engineering',
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
            </svg>
        ),
        color: 'var(--purple)',
        skills: ['Python', 'TypeScript', 'React', 'FastAPI', 'Node.js', 'PostgreSQL', 'Redis', 'REST APIs'],
    },
    {
        num: '04',
        title: 'Cloud & Governance',
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" />
            </svg>
        ),
        color: 'var(--teal)',
        skills: ['Azure App Service', 'Container Apps', 'AI Search', 'Document Intelligence', 'Entra ID (PIM, RBAC)', 'Docker', 'CI/CD'],
    },
];

const FollowArtSection = () => {
    const [expanded, setExpanded] = useState(null);

    return (
        <section className="section skills-section" id="skills">
            <div className="skills-inner">
                <div className="skills-header">
                    <div className="skills-title reveal">
                        <h2>TECH<br />SKILLS</h2>
                    </div>
                    <p className="skills-desc reveal">
                        A toolkit spanning <span className="uline">AI engineering</span>, the Microsoft
                        and Power Platform stack, and <span className="uline">cloud governance</span>.
                    </p>
                </div>
                <div className="skills-grid">
                    {SKILL_CATEGORIES.map((cat, idx) => (
                        <div
                            className={`skill-card reveal ${expanded === idx ? 'skill-card--expanded' : ''}`}
                            key={cat.num}
                            onMouseEnter={() => setExpanded(idx)}
                            onMouseLeave={() => setExpanded(null)}
                            style={{ '--card-color': cat.color, animationDelay: `${idx * 0.1}s` }}
                        >
                            <div className="skill-card-header">
                                <div className="skill-card-icon-wrap">
                                    {cat.icon}
                                </div>
                                <span className="skill-card-num">{cat.num}</span>
                            </div>
                            <h3 className="skill-card-title">{cat.title}</h3>
                            <div className="skill-card-tags">
                                {cat.skills.map((skill, i) => (
                                    <span
                                        key={skill}
                                        className="skill-tag"
                                        style={{ animationDelay: `${i * 0.04}s` }}
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                            <div className="skill-card-glow"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FollowArtSection;
