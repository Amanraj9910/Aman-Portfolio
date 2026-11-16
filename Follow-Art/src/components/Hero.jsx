import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Magnetic from './Magnetic';
import StreamText from './StreamText';
import { ArrowRight } from './Icons';
import { HERO_STATS, PROFILE } from '../data/content';
import { gsap, MQ, ScrollTrigger } from '../lib/motion';

const NAME_WORDS = ['AMAN', 'RAJ'];
const HEAVY = 800;

const LocalTime = () => {
    const [time, setTime] = useState(() => formatTime());
    useEffect(() => {
        const id = setInterval(() => setTime(formatTime()), 20000);
        return () => clearInterval(id);
    }, []);
    return <time dateTime={time}>{time} IST</time>;
};

function formatTime() {
    return new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: PROFILE.timeZone }).format(new Date());
}

const Hero = ({ ready }) => {
    const rootRef = useRef(null);
    const [introDone, setIntroDone] = useState(false);

    // Entrance: plays once the preloader lifts.
    useLayoutEffect(() => {
        const mm = gsap.matchMedia(rootRef);

        mm.add('(prefers-reduced-motion: no-preference)', () => {
            gsap.set('.hero__glyph', { yPercent: 115 });
            gsap.set('[data-hero-fade]', { opacity: 0, y: 24 });
            gsap.set('.hero__photo', { clipPath: 'inset(100% 0% 0% 0%)' });
            gsap.set('.hero__photo img', { scale: 1.3 });
            if (!ready) return;

            gsap.timeline({ defaults: { ease: 'expo.out' }, delay: 0.15 })
                .to('.hero__glyph', { yPercent: 0, duration: 1.2, stagger: 0.055 })
                .add(() => setIntroDone(true), 0.9)
                .to('.hero__photo', { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3 }, 0.35)
                .to('.hero__photo img', { scale: 1, duration: 1.6 }, 0.35)
                .to('[data-hero-fade]', { opacity: 1, y: 0, duration: 1, stagger: 0.07 }, 0.5);
        });

        mm.add('(prefers-reduced-motion: reduce)', () => {
            if (ready) setIntroDone(true);
        });

        return () => mm.revert();
    }, [ready]);

    // After the entrance (desktop only): the name reacts to the pointer,
    // and the hero drifts apart as the reader scrolls away.
    useEffect(() => {
        if (!introDone) return undefined;
        const root = rootRef.current;
        const glyphs = Array.from(root.querySelectorAll('.hero__glyph'));
        const weights = glyphs.map(() => HEAVY);
        const mm = gsap.matchMedia(rootRef);
        let inView = true;

        const apply = (target) => {
            glyphs.forEach((glyph, i) => {
                const next = weights[i] + (target(i) - weights[i]) * 0.16;
                if (Math.abs(next - weights[i]) > 0.4) {
                    weights[i] = next;
                    glyph.style.fontWeight = Math.round(next);
                }
            });
        };

        const visibility = ScrollTrigger.create({
            trigger: root,
            start: 'top bottom',
            end: 'bottom top',
            onToggle: (self) => { inView = self.isActive; },
        });

        mm.add(`${MQ.desktop} and (prefers-reduced-motion: no-preference)`, () => {
            // Letters thin out where the cursor is: the name behaves like part of the field.
            let centres = [];
            let radius = 200;
            const pointer = { x: -9999, y: -9999 };

            const measure = () => {
                centres = glyphs.map((glyph) => {
                    const r = glyph.getBoundingClientRect();
                    return { x: r.left + r.width / 2, y: r.top + r.height / 2 + window.scrollY };
                });
                radius = glyphs[0].getBoundingClientRect().height * 0.95;
            };
            const onMove = (e) => {
                pointer.x = e.clientX;
                pointer.y = e.clientY + window.scrollY;
            };
            const tick = () => {
                if (!inView) return;
                apply((i) => {
                    const d = Math.hypot(pointer.x - centres[i].x, pointer.y - centres[i].y);
                    return HEAVY - 560 * Math.exp(-(d * d) / (radius * radius));
                });
            };

            measure();
            window.addEventListener('pointermove', onMove, { passive: true });
            window.addEventListener('resize', measure);
            gsap.ticker.add(tick);

            gsap.to('.hero__photo-wrap', {
                yPercent: -14,
                ease: 'none',
                scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: true },
            });
            gsap.to('.hero__name', {
                yPercent: 10,
                ease: 'none',
                scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: true },
            });

            return () => {
                window.removeEventListener('pointermove', onMove);
                window.removeEventListener('resize', measure);
                gsap.ticker.remove(tick);
            };
        });

        // Touch screens: the name simply rests. A constant pulse was tiring on a small screen.

        return () => {
            visibility.kill();
            mm.revert();
            glyphs.forEach((glyph) => { glyph.style.fontWeight = ''; });
        };
    }, [introDone]);

    return (
        <section className={`hero ${introDone ? 'is-in' : ''}`} id="hero" ref={rootRef}>
            <div className="hero__meta">
                <span className="hero__status" data-hero-fade>
                    <i aria-hidden="true" /> Open to AI engineering work
                </span>
                <span data-hero-fade>{PROFILE.location} — <LocalTime /></span>
            </div>

            <h1 className="hero__name" aria-label={PROFILE.name}>
                {NAME_WORDS.map((word) => (
                    <span className="hero__word" key={word} aria-hidden="true">
                        {word.split('').map((char, i) => (
                            <span className="hero__glyph" key={i}>{char}</span>
                        ))}
                    </span>
                ))}
            </h1>

            <div className="hero__body">
                <div className="hero__pitch">
                    <ul className="hero__roles" data-hero-fade>
                        {PROFILE.roles.map((role) => <li key={role}>{role}</li>)}
                    </ul>
                    <StreamText className="hero__tagline hero__tagline--full" segments={PROFILE.tagline} play={introDone} speed={30} />
                    <StreamText className="hero__tagline hero__tagline--short" segments={PROFILE.taglineShort} play={introDone} speed={30} />
                    <div className="hero__cta" data-hero-fade>
                        <Magnetic>
                            <a href="#projects" className="btn btn--solid">
                                <span>View Projects</span>
                                <ArrowRight />
                            </a>
                        </Magnetic>
                        <Magnetic>
                            <a href="#contact" className="btn btn--ghost">
                                <span>Get in Touch</span>
                            </a>
                        </Magnetic>
                    </div>
                </div>

                <dl className="hero__stats">
                    {HERO_STATS.map((stat) => (
                        <div key={stat.label} data-hero-fade>
                            <dt>{stat.label}</dt>
                            <dd>{stat.value}</dd>
                        </div>
                    ))}
                </dl>

                <figure className="hero__photo-wrap">
                    <div className="hero__photo" data-cursor="Hello">
                        <img src={PROFILE.photo} alt="Portrait of Aman Raj" width="720" height="840" fetchPriority="high" />
                    </div>
                    <figcaption data-hero-fade>
                        <span>Fig. 01</span>
                        <span>{PROFILE.name}</span>
                    </figcaption>
                </figure>
            </div>

            <a href="#kinetic" className="hero__scroll" data-hero-fade aria-label="Scroll to the next section">
                <span>Scroll</span>
                <i aria-hidden="true" />
            </a>
        </section>
    );
};

export default Hero;
