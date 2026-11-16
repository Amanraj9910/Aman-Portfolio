import React, { useState } from 'react';
import Magnetic from './Magnetic';
import Marquee from './Marquee';
import SectionHead from './SectionHead';
import { ArrowUpRight, CheckIcon, CopyIcon, GitHubIcon, LinkedInIcon, MailIcon, PhoneIcon } from './Icons';
import { CONTACT, PROFILE } from '../data/content';
import { copyText } from '../lib/toast';

const LINKS = [
    { label: 'Email', value: PROFILE.email, href: `mailto:${PROFILE.email}`, icon: <MailIcon /> },
    { label: 'Phone', value: PROFILE.phone, href: PROFILE.phoneHref, icon: <PhoneIcon /> },
    { label: 'LinkedIn', value: PROFILE.linkedinHandle, href: PROFILE.linkedin, icon: <LinkedInIcon />, external: true },
    { label: 'GitHub', value: PROFILE.githubHandle, href: PROFILE.github, icon: <GitHubIcon />, external: true },
];

const Contact = () => {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [sent, setSent] = useState(false);

    const update = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

    // No backend: hand the message to the visitor's own mail app.
    const handleSubmit = (e) => {
        e.preventDefault();
        const subject = `Portfolio Contact from ${form.name}`;
        const body = `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`;
        window.location.href = `mailto:${PROFILE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        setSent(true);
        setTimeout(() => setSent(false), 3000);
    };

    return (
        <section className="contact" id="contact">
            <Marquee variant="display" items={["Let's build something", 'Say hello', "Let's talk AI"]} />

            <div className="section contact__inner">
                <SectionHead index="00" eyebrow="Contact" title={["Let's", 'Connect']}>
                    {CONTACT.blurb}
                </SectionHead>

                <div className="contact__mail" data-reveal>
                    <Magnetic strength={0.15}>
                        <a href={`mailto:${PROFILE.email}`} className="contact__address" data-cursor="Write">
                            {PROFILE.email}
                        </a>
                    </Magnetic>
                    <button type="button" className="contact__copy" onClick={() => copyText(PROFILE.email, 'Email copied')}>
                        <CopyIcon width="15" height="15" /> Copy
                    </button>
                </div>

                <div className="contact__grid">
                    <ul className="contact__links">
                        {LINKS.map((link) => (
                            <li key={link.label} data-reveal>
                                <a
                                    href={link.href}
                                    className="clink"
                                    {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                                >
                                    <span className="clink__icon">{link.icon}</span>
                                    <span className="clink__text">
                                        <small>{link.label}</small>
                                        <span>{link.value}</span>
                                    </span>
                                    <ArrowUpRight className="clink__arrow" />
                                </a>
                            </li>
                        ))}
                    </ul>

                    <form className="form" onSubmit={handleSubmit} data-reveal>
                        <h3 className="form__title">Send me a message</h3>
                        <label className="field">
                            <input type="text" name="name" value={form.name} onChange={update('name')} placeholder=" " autoComplete="name" required />
                            <span>Your name</span>
                        </label>
                        <label className="field">
                            <input type="email" name="email" value={form.email} onChange={update('email')} placeholder=" " autoComplete="email" required />
                            <span>Your email</span>
                        </label>
                        <label className="field">
                            <textarea name="message" value={form.message} onChange={update('message')} placeholder=" " rows="4" required data-lenis-prevent />
                            <span>Your message</span>
                        </label>
                        <button type="submit" className={`btn btn--solid form__submit ${sent ? 'is-sent' : ''}`}>
                            <span>{sent ? 'Opening your mail app' : 'Send Message'}</span>
                            {sent ? <CheckIcon /> : <ArrowUpRight />}
                        </button>
                    </form>
                </div>
            </div>

            {/* The footer opened the page, so the masthead closes it. */}
            <div className="endcap">
                <a href="#hero" className="endcap__brand" aria-label="Aman Raj, back to the intro">
                    <span className="nav__mark" aria-hidden="true">AR</span>
                    <span className="endcap__name">{PROFILE.name}</span>
                </a>
                <div className="endcap__meta">
                    <span>{PROFILE.role} · Built with React &amp; GSAP</span>
                    <a href="#top">Back to the footer ↑</a>
                </div>
            </div>
        </section>
    );
};

export default Contact;
