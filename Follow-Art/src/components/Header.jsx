import React, { useEffect, useState } from 'react';
import ThemeToggle from './ThemeToggle';
import { GitHubIcon, LinkedInIcon, SearchIcon } from './Icons';
import useActiveSection from '../hooks/useActiveSection';
import { NAV_LINKS, PROFILE, SECTIONS } from '../data/content';
import { lockScroll } from '../lib/scroll';

const SECTION_IDS = SECTIONS.map((s) => s.id);
const IS_MAC = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);

const Header = ({ onOpenPalette }) => {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [hidden, setHidden] = useState(false);
    const active = useActiveSection(SECTION_IDS);

    // Solid background once scrolled; tuck away while reading down, return on the way up.
    useEffect(() => {
        let last = window.scrollY;
        let ticking = false;
        const update = () => {
            const y = window.scrollY;
            setScrolled(y > 40);
            if (y < 120) setHidden(false);
            else if (y - last > 6) setHidden(true);
            else if (last - y > 6) setHidden(false);
            last = y;
            ticking = false;
        };
        const onScroll = () => {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(update);
            }
        };
        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // While the mobile menu is open: lock scroll, close on Escape or when widening to desktop.
    useEffect(() => {
        if (!open) return undefined;
        lockScroll(true);
        const onKey = (e) => e.key === 'Escape' && setOpen(false);
        const wide = window.matchMedia('(min-width: 1024px)');
        const onWide = (e) => e.matches && setOpen(false);
        window.addEventListener('keydown', onKey);
        wide.addEventListener('change', onWide);
        return () => {
            lockScroll(false);
            window.removeEventListener('keydown', onKey);
            wide.removeEventListener('change', onWide);
        };
    }, [open]);

    const close = () => setOpen(false);

    return (
        <>
            <header className={`nav ${scrolled ? 'is-scrolled' : ''} ${hidden && !open ? 'is-hidden' : ''} ${open ? 'is-open' : ''}`}>
                <a href="#hero" className="nav__brand" onClick={close} aria-label="Aman Raj, back to top">
                    <span className="nav__mark" aria-hidden="true">AR</span>
                    <span className="nav__id">
                        <strong>{PROFILE.name}</strong>
                        <small>{PROFILE.role}</small>
                    </span>
                </a>

                <nav className="nav__links" aria-label="Primary">
                    {NAV_LINKS.map((link) => (
                        <a
                            key={link.id}
                            href={`#${link.id}`}
                            className={active === link.id ? 'is-active' : ''}
                            aria-current={active === link.id ? 'true' : undefined}
                        >
                            <span className="roll"><span data-text={link.label}>{link.label}</span></span>
                        </a>
                    ))}
                </nav>

                <div className="nav__actions">
                    <button type="button" className="nav__search" onClick={onOpenPalette} aria-label="Open command menu">
                        <SearchIcon width="15" height="15" />
                        <span>Search</span>
                        <kbd>{IS_MAC ? '⌘K' : 'Ctrl K'}</kbd>
                    </button>
                    <ThemeToggle />
                    <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="icon-btn nav__social" aria-label="GitHub">
                        <GitHubIcon />
                    </a>
                    <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="icon-btn nav__social" aria-label="LinkedIn">
                        <LinkedInIcon />
                    </a>
                    <button
                        type="button"
                        className="nav__burger"
                        onClick={() => setOpen((v) => !v)}
                        aria-label={open ? 'Close menu' : 'Open menu'}
                        aria-expanded={open}
                        aria-controls="mobile-menu"
                    >
                        <span /><span />
                    </button>
                </div>
            </header>

            <div id="mobile-menu" className={`menu ${open ? 'is-open' : ''}`} inert={!open}>
                <nav className="menu__links" aria-label="Mobile">
                    {NAV_LINKS.map((link, i) => (
                        <a key={link.id} href={`#${link.id}`} onClick={close} style={{ '--i': i }} className={active === link.id ? 'is-active' : ''}>
                            <small>{String(i + 1).padStart(2, '0')}</small>
                            <span>{link.label}</span>
                        </a>
                    ))}
                </nav>
                <div className="menu__foot" style={{ '--i': NAV_LINKS.length }}>
                    <a href={`mailto:${PROFILE.email}`} className="menu__mail">{PROFILE.email}</a>
                    <div className="menu__social">
                        <a href={PROFILE.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                        <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
