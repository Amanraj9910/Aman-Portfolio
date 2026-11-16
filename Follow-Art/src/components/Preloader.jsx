import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from '../lib/motion';
import { lockScroll } from '../lib/scroll';

const LOG = ['init agent runtime', 'load context: aman_raj.profile', 'mount interface', 'ready'];

/*
 * A short boot sequence (about 1.5s) shown once per browser session.
 * `onReveal` fires as the curtain starts lifting so the hero can animate in underneath.
 */
const Preloader = ({ onReveal }) => {
    const rootRef = useRef(null);
    const countRef = useRef(null);
    const [gone, setGone] = useState(false);

    useLayoutEffect(() => {
        const root = rootRef.current;
        lockScroll(true);
        const counter = { v: 0 };
        const lines = root.querySelectorAll('.boot__line');

        const ctx = gsap.context(() => {
            gsap.set(lines, { opacity: 0, x: -8 });
            gsap.timeline({ defaults: { ease: 'power2.out' } })
                .to(counter, {
                    v: 100,
                    duration: 1.35,
                    ease: 'power2.inOut',
                    onUpdate: () => {
                        countRef.current.textContent = String(Math.round(counter.v)).padStart(3, '0');
                    },
                }, 0)
                .to('.boot__bar i', { scaleX: 1, duration: 1.35, ease: 'power2.inOut' }, 0)
                .to(lines, { opacity: 1, x: 0, duration: 0.3, stagger: 0.3 }, 0.05)
                .add(() => {
                    lockScroll(false);
                    onReveal();
                })
                .to('.boot__inner', { yPercent: -12, opacity: 0, duration: 0.45, ease: 'power2.in' }, '+=0.1')
                .to(root, { yPercent: -100, duration: 0.85, ease: 'power4.inOut' }, '<0.1')
                .add(() => setGone(true));
        }, root);

        return () => {
            ctx.revert();
            lockScroll(false);
        };
    }, [onReveal]);

    if (gone) return null;

    return (
        <div className="boot" ref={rootRef} role="status" aria-label="Loading portfolio">
            <div className="boot__inner">
                <ul className="boot__log" aria-hidden="true">
                    {LOG.map((line) => (
                        <li className="boot__line" key={line}>
                            <span>&gt;</span> {line}
                        </li>
                    ))}
                </ul>
                <div className="boot__foot">
                    <span className="boot__name">Aman Raj — Portfolio</span>
                    <span className="boot__count" ref={countRef} aria-hidden="true">000</span>
                </div>
                <div className="boot__bar" aria-hidden="true"><i /></div>
            </div>
        </div>
    );
};

export default Preloader;
