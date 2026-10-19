import React from 'react';

const ACHIEVEMENTS = [
    {
        icon: '🧭',
        title: 'Team Lead & Intern Training Programme Lead',
        subtitle: 'Hosho Digital — 2025–Present',
        desc: 'Lead a 7–10 member team of engineers and interns, planning and reviewing their work, and run the intern training programme.',
        highlight: 'Leadership',
    },
    {
        icon: '🏆',
        title: 'Shark Tank JEC',
        subtitle: 'Startup Pitching Competition — May 2023',
        desc: 'Won 1st place among 40+ teams, recognized for an innovative idea and compelling entrepreneurial pitch.',
        highlight: '1st Place',
    },
    {
        icon: '🎯',
        title: 'C-Cube Secretary',
        subtitle: 'Jabalpur Engineering College — 2023–2024',
        desc: 'Managed club events as Secretary & Overall Coordinator, strengthening organizational, leadership, and cross-team communication skills.',
        highlight: 'Campus',
    },
];

const TestimonialsSection = () => {
    return (
        <section className="section achievements-section" id="achievements">
            <div className="achievements-inner">
                <div className="achievements-header reveal">
                    <h2 className="achievements-title">LEADERSHIP &<br />ACHIEVEMENTS</h2>
                </div>

                {/* Achievement Cards */}
                <div className="achievements-cards">
                    {ACHIEVEMENTS.map((a, i) => (
                        <div className="achievement-card reveal" key={i}>
                            <div className="achievement-card-icon">{a.icon}</div>
                            <div className="achievement-card-content">
                                <div className="achievement-card-highlight">{a.highlight}</div>
                                <h3 className="achievement-card-title">{a.title}</h3>
                                <div className="achievement-card-subtitle">{a.subtitle}</div>
                                <p className="achievement-card-desc">{a.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
