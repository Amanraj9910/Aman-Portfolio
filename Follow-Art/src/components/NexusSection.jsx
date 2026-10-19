import React from 'react';

const NexusSection = () => {
    return (
        <section className="section about-section" id="about">
            <div className="about-inner">
                <div className="about-left">
                    <div className="about-photo-container reveal">
                        <img src="/img/profile.jpg" alt="Aman Raj" className="about-photo" />
                        <div className="about-photo-accent"></div>
                    </div>
                </div>
                <div className="about-right">
                    <div className="about-title reveal">
                        <h2>ABOUT<br />ME</h2>
                    </div>
                    <hr className="about-divider reveal" />
                    <p className="about-desc reveal">
                        I'm an <span className="uline">AI Engineer</span> working as a Technical Consultant at
                        Hosho Digital in Indore, delivering production AI solutions in the Microsoft ecosystem:
                        Azure OpenAI, AI Foundry, AI Search, <span className="uline">Copilot Studio and Power Platform</span>.
                    </p>
                    <p className="about-desc reveal" style={{ marginTop: '16px' }}>
                        I own solutions end-to-end, from shaping requirements with business stakeholders to
                        deployment, governance and cost control. With a background in DevOps and cloud
                        security (Entra PIM, least-privilege access, release governance), I work AI-first
                        with Claude Code and ship MVPs in days, not weeks.
                    </p>
                    <div className="about-stats reveal">
                        <div className="about-stat-item">
                            <span className="about-stat-number" data-value="800" data-suffix="+">800+</span>
                            <span className="about-stat-text">Candidates Screened</span>
                        </div>
                        <div className="about-stat-item">
                            <span className="about-stat-number" data-value="60" data-suffix="%">60%</span>
                            <span className="about-stat-text">Faster Reviews</span>
                        </div>
                        <div className="about-stat-item">
                            <span className="about-stat-number" data-value="80" data-suffix="%">80%</span>
                            <span className="about-stat-text">Faster Lookups</span>
                        </div>
                        <div className="about-stat-item">
                            <span className="about-stat-number" data-value="3">3</span>
                            <span className="about-stat-text">Clouds Governed</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NexusSection;
