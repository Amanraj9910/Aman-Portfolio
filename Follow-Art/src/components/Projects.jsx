import React, { useLayoutEffect, useRef, useState } from 'react';
import Expandable from './Expandable';
import SectionHead from './SectionHead';
import { ArrowUpRight } from './Icons';
import { PROFILE, PROJECTS } from '../data/content';
import { gsap, ScrollTrigger } from '../lib/motion';

const pad = (n) => String(n).padStart(2, '0');

/*
 * Wide screens: a sticky stage on the left shows a giant project number and the headline
 * result, and swaps as each write-up on the right scrolls through the middle of the screen.
 * Narrow screens: each project is a self-contained card.
 * The layout switch is pure CSS; the script only tracks which project is active.
 */
const Projects = () => {
    const rootRef = useRef(null);
    const [active, setActive] = useState(0);

    useLayoutEffect(() => {
        const mm = gsap.matchMedia(rootRef);
        const items = gsap.utils.toArray('.proj', rootRef.current);

        const triggers = items.map((item, i) => ScrollTrigger.create({
            trigger: item,
            start: 'top 55%',
            end: 'bottom 55%',
            onToggle: (self) => self.isActive && setActive(i),
        }));

        mm.add('(prefers-reduced-motion: no-preference)', () => {
            items.forEach((item) => {
                gsap.from(item.querySelectorAll('.proj__copy > *'), {
                    opacity: 0,
                    y: 30,
                    duration: 0.9,
                    ease: 'expo.out',
                    stagger: 0.07,
                    scrollTrigger: { trigger: item, start: 'top 80%', once: true },
                });
                gsap.from(item, {
                    '--rule': 0,
                    duration: 1.3,
                    ease: 'expo.out',
                    scrollTrigger: { trigger: item, start: 'top 88%', once: true },
                });
            });

            // The giant number drifts slower than the page for a sense of depth.
            gsap.fromTo('.stage__num', { yPercent: 9 }, {
                yPercent: -9,
                ease: 'none',
                scrollTrigger: { trigger: '.work__grid', start: 'top bottom', end: 'bottom top', scrub: true },
            });
        });

        return () => {
            triggers.forEach((t) => t.kill());
            mm.revert();
        };
    }, []);

    const current = PROJECTS[active];

    return (
        <section className="section work" id="projects" ref={rootRef}>
            <SectionHead index="06" eyebrow="Selected work" title={['Projects']}>
                AI products shipped to production, from computer vision to multi-agent systems on Azure.
            </SectionHead>

            <div className="work__grid">
                <div className="work__stage" aria-hidden="true">
                    <div className="stage">
                        <div className="stage__num">
                            <span className="stage__digits">
                                <span style={{ transform: `translateY(${(-active * 100) / PROJECTS.length}%)` }}>
                                    {PROJECTS.map((p, i) => <b key={p.id}>{pad(i + 1)}</b>)}
                                </span>
                            </span>
                        </div>
                        <div className="stage__head">
                            <small>{pad(active + 1)} / {pad(PROJECTS.length)}</small>
                            <span className="stage__bar"><i style={{ transform: `scaleX(${(active + 1) / PROJECTS.length})` }} /></span>
                            <span className="tag" key={current.id}>{current.badge}</span>
                        </div>
                        <div className="stage__impact">
                            <small>Result</small>
                            <strong key={current.id}>{current.impact}</strong>
                        </div>
                    </div>
                </div>

                <ol className="work__list">
                    {PROJECTS.map((project, i) => (
                        <li className={`proj ${i === active ? 'is-active' : ''}`} key={project.id}>
                            <div className="proj__copy">
                                <div className="proj__top">
                                    <span className="proj__num">{pad(i + 1)}</span>
                                    <span className="tag">{project.badge}</span>
                                </div>
                                <h3 className="proj__title">{project.title}</h3>
                                <p className="proj__impact"><small>Result</small>{project.impact}</p>
                                <p className="proj__desc">{project.description}</p>
                                {project.highlights && (
                                    <Expandable more="How it was built">
                                        <ul className="proj__points">
                                            {project.highlights.map((point) => <li key={point}>{point}</li>)}
                                        </ul>
                                    </Expandable>
                                )}
                                <ul className="chips">
                                    {project.tech.map((tech) => <li className="chip" key={tech}>{tech}</li>)}
                                </ul>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>

            <a className="work__more" href={PROFILE.github} target="_blank" rel="noopener noreferrer" data-reveal>
                <span>More on GitHub</span>
                <ArrowUpRight width="22" height="22" />
            </a>
        </section>
    );
};

export default Projects;
