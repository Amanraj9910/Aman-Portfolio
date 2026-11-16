import React, { useLayoutEffect, useRef } from 'react';
import { gsap, MQ, matches, ScrollTrigger } from '../lib/motion';

/*
 * An endless ticker whose speed and direction follow the scroll:
 * scroll faster and it rushes and leans, scroll back and it reverses.
 */
const Marquee = ({ items, variant = 'ticker', reverse = false }) => {
    const rootRef = useRef(null);
    const trackRef = useRef(null);

    useLayoutEffect(() => {
        const track = trackRef.current;
        const mm = gsap.matchMedia(rootRef);

        mm.add('(prefers-reduced-motion: no-preference)', () => {
            const base = reverse ? -1 : 1;
            const loop = gsap.to(track, { xPercent: -50, duration: variant === 'display' ? 26 : 38, ease: 'none', repeat: -1 });
            // Start far into the loop so it can also run backwards without hitting its start.
            loop.totalTime(loop.duration() * 200);
            loop.timeScale(base);
            // Phones and tablets get the calm, constant ticker: no rushing or leaning.
            if (!matches(MQ.desktop)) return () => loop.kill();

            const skewTo = gsap.quickTo(track, 'skewX', { duration: 0.5, ease: 'power3' });

            const trigger = ScrollTrigger.create({
                trigger: rootRef.current,
                start: 'top bottom',
                end: 'bottom top',
                onUpdate: (self) => {
                    const velocity = self.getVelocity();
                    const boost = Math.min(Math.abs(velocity) / 220, 6);
                    const dir = (velocity < 0 ? -1 : 1) * base;
                    gsap.killTweensOf(loop);
                    gsap.timeline()
                        .to(loop, { timeScale: dir * (1 + boost), duration: 0.2, ease: 'power2.out' })
                        .to(loop, { timeScale: dir, duration: 1.1, ease: 'power2.out' });
                    skewTo(gsap.utils.clamp(-9, 9, velocity / -260));
                },
                onLeave: () => skewTo(0),
                onLeaveBack: () => skewTo(0),
            });

            // Settle the lean when scrolling stops.
            const settle = () => skewTo(0);
            ScrollTrigger.addEventListener('scrollEnd', settle);

            return () => {
                trigger.kill();
                loop.kill();
                ScrollTrigger.removeEventListener('scrollEnd', settle);
            };
        });

        return () => mm.revert();
    }, [variant, reverse]);

    // Each half repeats the items so it is always wider than the screen.
    const list = [...items, ...items];
    const group = (hidden) => (
        <ul className="marquee__group" aria-hidden={hidden || undefined}>
            {list.map((item, i) => (
                <li key={i} aria-hidden={i >= items.length || undefined}>
                    <span>{item}</span>
                    <i aria-hidden="true" />
                </li>
            ))}
        </ul>
    );

    return (
        <div className={`marquee marquee--${variant}`} ref={rootRef}>
            <div className="marquee__track" ref={trackRef}>
                {group(false)}
                {group(true)}
            </div>
        </div>
    );
};

export default Marquee;
