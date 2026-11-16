import React, { useLayoutEffect, useRef } from 'react';
import SectionHead from './SectionHead';
import { AZURE_STACK, SKILLS } from '../data/content';
import { gsap, MQ } from '../lib/motion';

const Skills = () => {
    const rootRef = useRef(null);

    useLayoutEffect(() => {
        const mm = gsap.matchMedia(rootRef);
        const rows = gsap.utils.toArray('.stack__row', rootRef.current);

        // Desktop: the highlight wipes in from whichever edge the cursor entered.
        mm.add(MQ.desktop, () => {
            const edgeOf = (e) => {
                const r = e.currentTarget.getBoundingClientRect();
                return e.clientY < r.top + r.height / 2 ? '0%' : '100%';
            };
            const onEnter = (e) => {
                const row = e.currentTarget;
                // Move the collapsed highlight to the entry edge without animating, then open it.
                row.classList.add('no-anim');
                row.style.setProperty('--edge', edgeOf(e));
                void row.offsetWidth;
                row.classList.remove('no-anim');
                row.classList.add('is-hover');
            };
            const onLeave = (e) => {
                const row = e.currentTarget;
                row.style.setProperty('--edge', edgeOf(e));
                row.classList.remove('is-hover');
            };
            rows.forEach((row) => {
                row.addEventListener('pointerenter', onEnter);
                row.addEventListener('pointerleave', onLeave);
            });
            return () => rows.forEach((row) => {
                row.removeEventListener('pointerenter', onEnter);
                row.removeEventListener('pointerleave', onLeave);
                row.classList.remove('is-hover', 'no-anim');
            });
        });

        // Touch: rows stay still. The core row and the Azure chips carry the emphasis instead.

        mm.add('(prefers-reduced-motion: no-preference)', () => {
            rows.forEach((row) => {
                gsap.from(row.querySelectorAll('.chip'), {
                    opacity: 0,
                    y: 14,
                    duration: 0.6,
                    ease: 'power3.out',
                    stagger: 0.035,
                    scrollTrigger: { trigger: row, start: 'top 86%', once: true },
                });
                gsap.from(row, {
                    '--rule': 0,
                    duration: 1.2,
                    ease: 'expo.out',
                    scrollTrigger: { trigger: row, start: 'top 92%', once: true },
                });
            });
        });

        return () => mm.revert();
    }, []);

    return (
        <section className="section skills" id="skills" ref={rootRef}>
            <SectionHead index="03" eyebrow="Toolkit" title={['Tech', 'Skills']}>
                <em>AI &amp; ML on Azure</em> is the core of what I do, backed by the Microsoft and
                Power Platform stack and cloud governance.
            </SectionHead>

            <p className="stack__legend" data-reveal>
                <span className="chip chip--azure">Azure service</span>
                <span>marks everything I run on Azure</span>
            </p>

            <ul className="stack">
                {SKILLS.map((group) => (
                    <li className={`stack__row ${group.core ? 'is-core' : ''}`} key={group.num}>
                        <span className="stack__num">{group.num}</span>
                        <h3 className="stack__title">
                            {group.title}
                            {group.core && <span className="stack__core">Core stack</span>}
                        </h3>
                        <ul className="stack__chips">
                            {group.skills.map((skill) => (
                                <li className={`chip ${AZURE_STACK.includes(skill) ? 'chip--azure' : ''}`} key={skill}>{skill}</li>
                            ))}
                        </ul>
                        <span className="stack__count" aria-hidden="true">{String(group.skills.length).padStart(2, '0')}</span>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default Skills;
