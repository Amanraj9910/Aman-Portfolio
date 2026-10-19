import React from 'react';

const ArtistCarousel = () => {
    return (
        <section className="section education-section" id="education">
            <div className="education-inner">
                <div className="education-header reveal">
                    <h2 className="education-title">EDUCATION &<br />CERTIFICATIONS</h2>
                </div>
                <div className="education-cards">
                    {/* Education Card */}
                    <div className="education-card reveal">
                        <div className="education-card-icon">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                                <path d="M6 12v5c0 1.657 2.686 3 6 3s6-1.343 6-3v-5" />
                            </svg>
                        </div>
                        <div className="education-card-content">
                            <h3 className="education-card-degree">B.Tech in Information Technology</h3>
                            <div className="education-card-school">Jabalpur Engineering College</div>
                            <div className="education-card-location">Jabalpur, Madhya Pradesh</div>
                            <div className="education-card-period">Aug 2021 — June 2025</div>
                        </div>
                        <div className="education-card-accent education-card-accent--blue"></div>
                    </div>

                    {/* Azure AI-102 */}
                    <div className="education-card education-card--cert reveal">
                        <div className="education-card-icon">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <circle cx="12" cy="8" r="6" />
                                <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12" />
                            </svg>
                        </div>
                        <div className="education-card-content">
                            <h3 className="education-card-degree">Azure AI Engineer Associate</h3>
                            <div className="education-card-school">Microsoft Certified · AI-102</div>
                            <div className="education-card-location">Credential ID: 98FB3C1050E5496D</div>
                            <div className="education-card-period">Oct 2025 — Oct 2026</div>
                            <div className="education-card-badge">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>
                                Verified Certification
                            </div>
                        </div>
                        <div className="education-card-accent education-card-accent--orange"></div>
                    </div>

                    {/* Claude Certified Architect */}
                    <div className="education-card education-card--progress reveal">
                        <div className="education-card-icon">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <circle cx="12" cy="12" r="9" />
                                <path d="M12 7v5l3 2" />
                            </svg>
                        </div>
                        <div className="education-card-content">
                            <h3 className="education-card-degree">Claude Certified Architect — Foundations</h3>
                            <div className="education-card-school">Anthropic · CCAF</div>
                            <div className="education-card-badge education-card-badge--progress">
                                In Progress
                            </div>
                        </div>
                        <div className="education-card-accent education-card-accent--purple"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ArtistCarousel;
