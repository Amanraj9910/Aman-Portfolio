import React from 'react';
import { CopyIcon } from './Icons';
import { PROFILE } from '../data/content';
import { copyText } from '../lib/toast';

/*
 * The footer, placed first. Contact details are what a hiring reader comes for,
 * so they should not cost a full scroll. The page ends with the masthead instead.
 */
const TopFooter = () => (
    <footer className="tfoot" id="top" aria-label="Footer, placed at the top of the page">
        <span>© {new Date().getFullYear()} {PROFILE.name}</span>
        <nav className="tfoot__links" aria-label="Contact">
            <button type="button" onClick={() => copyText(PROFILE.email, 'Email copied')}>
                <CopyIcon width="13" height="13" /> {PROFILE.email}
            </button>
            <a href={PROFILE.phoneHref}>{PROFILE.phone}</a>
            <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href={PROFILE.github} target="_blank" rel="noopener noreferrer">GitHub</a>
        </nav>
    </footer>
);

export default TopFooter;
