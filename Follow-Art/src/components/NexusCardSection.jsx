import React, { useState } from 'react';

const EXPERIENCES = [
    {
        role: 'Technical Consultant (AI Engineer)',
        company: 'Hosho Digital',
        location: 'Indore, Madhya Pradesh',
        period: 'July 2025 — Present',
        type: 'current',
        points: [
            'Turn client and internal business problems into working AI products, owning each from requirements to live deployment',
            'Design and build multi-agent AI systems, where specialised agents split up a problem and work together to solve it',
            'Work AI-first with Claude Code, shipping MVPs in days, not weeks, with performance, security and cost checks built in',
            'Work with clients to shape requirements; write solution designs, architecture documents, BRDs and AI strategies',
            'Designed the UAT → PROD release process: sign-offs from QA, Tech Lead and PM, a separate production environment, and Entra PIM for time-limited admin access',
            'Run cloud provisioning and cost governance across Azure, GCP and Alibaba Cloud: least-privilege access, approved cost estimates, and budget alerts that stop resources at the limit',
        ],
        tech: ['Azure OpenAI', 'AI Foundry', 'Multi-Agent Systems', 'Claude Code', 'Entra PIM', 'Azure · GCP · Alibaba Cloud'],
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
            </svg>
        ),
        color: 'var(--accent)',
    },
    {
        role: 'Technical Consultant Intern',
        company: 'Hosho Digital',
        location: 'Indore, Madhya Pradesh',
        period: 'Jan 2025 — June 2025',
        type: 'past',
        points: [
            'Delivered Power Platform solutions (Canvas and Model-Driven Apps, Power Automate, Power BI, Dataverse) and Copilot Studio agents, automating client business workflows',
            "Built an autonomous voice AI agent with Copilot Studio and Microsoft Graph that acts on the user's Microsoft 365 account from spoken requests, such as sending emails and scheduling meetings, with Entra ID sign-in",
        ],
        tech: ['Power Apps', 'Power Automate', 'Power BI', 'Dataverse', 'Copilot Studio', 'Microsoft Graph'],
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
            </svg>
        ),
        color: 'var(--blue)',
    },
];

const NexusCardSection = () => {
    const [activeIdx, setActiveIdx] = useState(0);

    return (
        <section className="section experience-section" id="experience">
            <div className="experience-inner">
                <div className="experience-header reveal">
                    <h2 className="experience-title">EXPERIENCE</h2>
                    <p className="experience-subtitle">
                        Professional journey across <span className="uline">AI engineering</span>,
                        Power Platform delivery, and <span className="uline">cloud governance</span>.
                    </p>
                </div>

                <div className="experience-layout">
                    {/* Tab Navigation */}
                    <div className="experience-tabs reveal">
                        {EXPERIENCES.map((exp, i) => (
                            <button
                                key={i}
                                className={`experience-tab ${i === activeIdx ? 'experience-tab--active' : ''}`}
                                onClick={() => setActiveIdx(i)}
                                style={{ '--tab-color': exp.color }}
                            >
                                <div className="experience-tab-icon">{exp.icon}</div>
                                <div className="experience-tab-info">
                                    <span className="experience-tab-role">{exp.role}</span>
                                    <span className="experience-tab-company">{exp.company}</span>
                                </div>
                                {exp.type === 'current' && <span className="experience-tab-live">CURRENT</span>}
                            </button>
                        ))}
                    </div>

                    {/* Detail Panel */}
                    <div className="experience-detail reveal" key={activeIdx}>
                        <div className="experience-detail-header">
                            <div>
                                <h3 className="experience-detail-role">{EXPERIENCES[activeIdx].role}</h3>
                                <div className="experience-detail-company">
                                    <span className="experience-detail-company-name">{EXPERIENCES[activeIdx].company}</span>
                                    <span className="experience-detail-sep">·</span>
                                    <span className="experience-detail-location">{EXPERIENCES[activeIdx].location}</span>
                                </div>
                            </div>
                            <div className="experience-detail-period-badge" style={{ '--tab-color': EXPERIENCES[activeIdx].color }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                                {EXPERIENCES[activeIdx].period}
                            </div>
                        </div>

                        <div className="experience-detail-divider" style={{ '--tab-color': EXPERIENCES[activeIdx].color }}></div>

                        <ul className="experience-detail-points">
                            {EXPERIENCES[activeIdx].points.map((point, j) => (
                                <li key={j} style={{ animationDelay: `${j * 0.1}s` }}>
                                    <span className="experience-point-icon" style={{ color: EXPERIENCES[activeIdx].color }}>▹</span>
                                    {point}
                                </li>
                            ))}
                        </ul>

                        <div className="experience-detail-tech">
                            {EXPERIENCES[activeIdx].tech.map((t) => (
                                <span key={t} className="experience-tech-chip" style={{ '--tab-color': EXPERIENCES[activeIdx].color }}>{t}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NexusCardSection;
