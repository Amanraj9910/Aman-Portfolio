import React, { useEffect, useRef } from 'react';
import Magnetic from './Magnetic';
import { ArrowUpRight } from './Icons';
import useActiveSection from '../hooks/useActiveSection';
import { PROFILE, SECTIONS } from '../data/content';
import { ScrollTrigger } from '../lib/motion';

const SECTION_IDS = SECTIONS.map((s) => s.id);

/*
 * Where-am-I indicators. Desktop gets a side rail and a floating "Hire me";
 * phones get a thumb-reach dock with the current section and progress.
 */
const ScrollChrome = () => {
    const active = useActiveSection(SECTION_IDS);
    const index = Math.max(0, SECTIONS.findIndex((s) => s.id === active));
    const barRef = useRef(null);
    const pctRef = useRef(null);

    useEffect(() => {
        const trigger = ScrollTrigger.create({
            start: 0,
            end: 'max',
            onUpdate: (self) => {
                barRef.current.style.transform = `scaleX(${self.progress})`;
                pctRef.current.textContent = `${Math.round(self.progress * 100)}%`;
            },
        });
        return () => trigger.kill();
    }, []);

    const pastIntro = index > 0;
    // The floating button would only repeat the contact section it sits on top of.
    const showHire = pastIntro && active !== 'contact';

    return (
        <>
            <div className="progress" aria-hidden="true"><i ref={barRef} /></div>

            <div className={`rail ${pastIntro ? 'is-on' : ''}`} aria-hidden="true">
                {SECTIONS.map((section) => (
                    <a
                        key={section.id}
                        href={`#${section.id}`}
                        tabIndex={-1}
                        className={section.id === active ? 'is-active' : ''}
                    >
                        <span>{section.label}</span>
                        <i />
                    </a>
                ))}
            </div>

            <div className={`dock ${pastIntro ? 'is-on' : ''}`}>
                <div className="dock__where" aria-hidden="true">
                    {/* Sections count down to Contact (00), matching the section headings. */}
                    <span className="dock__idx">{String(SECTIONS.length - 1 - index).padStart(2, '0')}</span>
                    <span className="dock__label" key={active}>{SECTIONS[index].label}</span>
                    <span className="dock__pct" ref={pctRef}>0%</span>
                </div>
                <a className="dock__cta" href={`mailto:${PROFILE.email}`} tabIndex={pastIntro ? 0 : -1}>
                    Hire me <ArrowUpRight width="14" height="14" />
                </a>
            </div>

            <div className={`hire ${showHire ? 'is-on' : ''}`}>
                <Magnetic strength={0.4}>
                    <a className="hire__btn" href={`mailto:${PROFILE.email}`} tabIndex={showHire ? 0 : -1}>
                        <ArrowUpRight width="20" height="20" />
                        <span>Hire Me</span>
                    </a>
                </Magnetic>
            </div>
        </>
    );
};

export default ScrollChrome;
