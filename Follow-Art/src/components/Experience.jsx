import React, { useLayoutEffect, useRef } from 'react';
import Expandable from './Expandable';
import SectionHead from './SectionHead';
import { EXPERIENCES } from '../data/content';
import { gsap, ScrollTrigger } from '../lib/motion';

// Points shown before the phone-only "more" toggle.
const LEAD_POINTS = 3;

const Experience = () => {
    const rootRef = useRef(null);

    useLayoutEffect(() => {
        const mm = gsap.matchMedia(rootRef);

        mm.add('(prefers-reduced-motion: no-preference)', () => {
            // The spine fills as you read down the timeline.
            gsap.fromTo('.xp__fill', { scaleY: 0 }, {
                scaleY: 1,
                ease: 'none',
                scrollTrigger: { trigger: '.xp', start: 'top 62%', end: 'bottom 62%', scrub: 0.4 },
            });

            gsap.utils.toArray('.xp__item', rootRef.current).forEach((item) => {
                ScrollTrigger.create({
                    trigger: item,
                    start: 'top 62%',
                    onEnter: () => item.classList.add('is-reached'),
                    onLeaveBack: () => item.classList.remove('is-reached'),
                });
            });

            // Points folded away on phones are skipped: they must not stay invisible once opened.
            const points = gsap.utils.toArray('.xp__points li', rootRef.current).filter((li) => li.offsetParent !== null);
            gsap.set(points, { opacity: 0, x: 26 });
            ScrollTrigger.batch(points, {
                start: 'top 88%',
                once: true,
                onEnter: (batch) => gsap.to(batch, { opacity: 1, x: 0, duration: 0.8, ease: 'expo.out', stagger: 0.09, overwrite: true }),
            });
        });

        return () => mm.revert();
    }, []);

    return (
        <section className="section experience" id="experience" ref={rootRef}>
            <SectionHead index="04" eyebrow="Career" title={['Experience']}>
                Professional journey across <em>AI engineering</em>, Power Platform delivery,
                and <em>cloud governance</em>.
            </SectionHead>

            <div className="xp">
                <div className="xp__spine" aria-hidden="true"><span className="xp__fill" /></div>
                <ol className="xp__list">
                {EXPERIENCES.map((exp) => (
                    <li className={`xp__item ${exp.current ? 'is-current' : ''}`} key={exp.period}>
                        <div className="xp__when">
                            <span className="xp__period">{exp.period}</span>
                            {exp.current && <span className="live"><i aria-hidden="true" />Current</span>}
                            <span className="xp__place">{exp.location}</span>
                        </div>
                        <span className="xp__node" aria-hidden="true" />
                        <div className="xp__what">
                            <h3 className="xp__role" data-reveal>{exp.role}</h3>
                            <p className="xp__company" data-reveal>{exp.company}</p>
                            <ul className="xp__points">
                                {exp.points.slice(0, LEAD_POINTS).map((point) => <li key={point}>{point}</li>)}
                            </ul>
                            {exp.points.length > LEAD_POINTS && (
                                <Expandable more={`${exp.points.length - LEAD_POINTS} more`}>
                                    <ul className="xp__points">
                                        {exp.points.slice(LEAD_POINTS).map((point) => <li key={point}>{point}</li>)}
                                    </ul>
                                </Expandable>
                            )}
                            <ul className="chips" data-reveal>
                                {exp.tech.map((tech) => <li className="chip" key={tech}>{tech}</li>)}
                            </ul>
                        </div>
                    </li>
                ))}
                </ol>
            </div>
        </section>
    );
};

export default Experience;
