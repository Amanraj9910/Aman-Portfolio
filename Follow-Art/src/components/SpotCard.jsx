import React, { useEffect, useRef } from 'react';
import { gsap, MQ } from '../lib/motion';

/*
 * A card whose border lights up under the cursor and which tilts slightly toward it.
 * On touch devices it is a plain card: the tilt and spotlight are pointer-only.
 */
const SpotCard = ({ children, className = '', as = 'div', ...rest }) => {
    const Tag = as;
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        const mm = gsap.matchMedia();

        mm.add(`${MQ.desktop} and (prefers-reduced-motion: no-preference)`, () => {
            gsap.set(el, { transformPerspective: 900 });
            const rx = gsap.quickTo(el, 'rotationX', { duration: 0.6, ease: 'power3' });
            const ry = gsap.quickTo(el, 'rotationY', { duration: 0.6, ease: 'power3' });

            const onMove = (e) => {
                const r = el.getBoundingClientRect();
                const px = (e.clientX - r.left) / r.width;
                const py = (e.clientY - r.top) / r.height;
                el.style.setProperty('--mx', `${px * 100}%`);
                el.style.setProperty('--my', `${py * 100}%`);
                rx((0.5 - py) * 7);
                ry((px - 0.5) * 9);
            };
            const onLeave = () => {
                rx(0);
                ry(0);
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
    }, []);

    return (
        <Tag ref={ref} className={`spot ${className}`} {...rest}>
            {children}
        </Tag>
    );
};

export default SpotCard;
