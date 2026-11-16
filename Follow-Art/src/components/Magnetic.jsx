import { useEffect, useRef } from 'react';
import { gsap, MQ } from '../lib/motion';

// Pulls its child toward the cursor while hovered, then springs back. Desktop only.
const Magnetic = ({ children, strength = 0.35, className = '' }) => {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        const mm = gsap.matchMedia();

        mm.add(`${MQ.desktop} and (prefers-reduced-motion: no-preference)`, () => {
            const xTo = gsap.quickTo(el, 'x', { duration: 0.9, ease: 'elastic.out(1, 0.45)' });
            const yTo = gsap.quickTo(el, 'y', { duration: 0.9, ease: 'elastic.out(1, 0.45)' });

            const onMove = (e) => {
                const r = el.getBoundingClientRect();
                xTo((e.clientX - (r.left + r.width / 2)) * strength);
                yTo((e.clientY - (r.top + r.height / 2)) * strength);
            };
            const onLeave = () => {
                xTo(0);
                yTo(0);
            };

            el.addEventListener('pointermove', onMove);
            el.addEventListener('pointerleave', onLeave);
            return () => {
                el.removeEventListener('pointermove', onMove);
                el.removeEventListener('pointerleave', onLeave);
                gsap.set(el, { clearProps: 'transform' });
            };
        });

        return () => mm.revert();
    }, [strength]);

    return (
        <span ref={ref} className={`magnetic ${className}`}>
            {children}
        </span>
    );
};

export default Magnetic;
