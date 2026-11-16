import React, { useLayoutEffect, useRef } from 'react';
import SectionHead from './SectionHead';
import { ACHIEVEMENTS, LEADERSHIP } from '../data/content';
import { gsap } from '../lib/motion';

// The team diagram: one lead in the middle, ten seats around it. Seven are always
// filled and three are dashed, because the team runs at 7 to 10 people.
const SEATS = 10;
const CORE_SEATS = 7;
const C = 200;
const R = 150;

const seats = Array.from({ length: SEATS }, (_, i) => {
    const angle = ((-90 + i * (360 / SEATS)) * Math.PI) / 180;
    return { x: C + R * Math.cos(angle), y: C + R * Math.sin(angle), flex: i >= CORE_SEATS };
});

const Leadership = () => {
    const rootRef = useRef(null);

    useLayoutEffect(() => {
        const mm = gsap.matchMedia(rootRef);

        mm.add('(prefers-reduced-motion: no-preference)', () => {
            // The lead appears, then each line reaches out and its seat fills.
            gsap.timeline({
                defaults: { ease: 'expo.out' },
                scrollTrigger: { trigger: '.team', start: 'top 75%', once: true },
            })
                .from('.team__core', { scale: 0, transformOrigin: 'center', duration: 0.9 })
                .from('.team__orbit', { opacity: 0, duration: 0.8 }, 0.2)
                .from('.team__link', { strokeDashoffset: 1, duration: 0.8, stagger: 0.07 }, 0.3)
                .from('.team__seat', { scale: 0, transformOrigin: 'center', duration: 0.7, stagger: 0.07 }, 0.55);
        });

        return () => mm.revert();
    }, []);

    return (
        <section className="section lead" id="leadership" ref={rootRef}>
            <SectionHead index="05" eyebrow="Leadership" title={['Leading', 'The Team']}>
                I build, and I lead the people who build: <em>planning</em> their work, <em>reviewing</em> it,
                and <em>training</em> the next intake.
            </SectionHead>

            <div className="lead__grid">
                <figure className="team">
                    <svg viewBox="0 0 400 400" role="img" aria-label="One team lead connected to a team of seven to ten engineers and interns">
                        <circle className="team__orbit" cx={C} cy={C} r={R} />
                        {seats.map((seat, i) => (
                            <line
                                key={`l${i}`}
                                className={`team__link ${seat.flex ? 'is-flex' : ''}`}
                                x1={C} y1={C} x2={seat.x} y2={seat.y}
                                pathLength="1"
                            />
                        ))}
                        {seats.map((seat, i) => (
                            <circle
                                key={`s${i}`}
                                className={`team__seat ${seat.flex ? 'is-flex' : ''}`}
                                cx={seat.x} cy={seat.y} r="13"
                            />
                        ))}
                        <g className="team__core">
                            <circle cx={C} cy={C} r="40" />
                            <text x={C} y={C}>AR</text>
                        </g>
                    </svg>
                    <figcaption>
                        <span>Fig. 02</span>
                        <span>One lead · 7 to 10 engineers and interns</span>
                    </figcaption>
                </figure>

                <div className="lead__copy">
                    <p className="lead__num" data-reveal>
                        <span data-count="7">7</span>–<span data-count="10">10</span>
                        <small>people on the team I lead</small>
                    </p>
                    <h3 className="lead__role" data-reveal>{LEADERSHIP.title}</h3>
                    <p className="lead__sub" data-reveal>{LEADERSHIP.subtitle}</p>

                    <ol className="lead__verbs">
                        {LEADERSHIP.verbs.map((item) => (
                            <li key={item.verb} data-reveal>
                                <b>{item.verb}</b>
                                <span>{item.text}</span>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>

            <h3 className="lead__earlier" data-reveal>Earlier</h3>
            <ul className="honours__list">
                {ACHIEVEMENTS.map((item) => (
                    <li className="honour" key={item.title} data-reveal>
                        <span className="honour__tag">{item.highlight}</span>
                        <div className="honour__main">
                            <h3>{item.title}</h3>
                            <p className="honour__sub">{item.subtitle}</p>
                        </div>
                        <p className="honour__desc">{item.desc}</p>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default Leadership;
