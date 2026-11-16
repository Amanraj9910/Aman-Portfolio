import { useEffect, useRef } from 'react';
import { gsap, MQ } from '../lib/motion';

/*
 * A ring that trails the real cursor and reacts to what is under it.
 * The native cursor stays visible: this is an accent, never a replacement.
 * Elements opt into a labelled state with data-cursor="Text".
 */
const Cursor = () => {
    const ringRef = useRef(null);
    const labelRef = useRef(null);

    useEffect(() => {
        const ring = ringRef.current;
        const label = labelRef.current;
        const mm = gsap.matchMedia();

        mm.add(`${MQ.desktop} and (prefers-reduced-motion: no-preference)`, () => {
            gsap.set(ring, { xPercent: -50, yPercent: -50 });
            const xTo = gsap.quickTo(ring, 'x', { duration: 0.5, ease: 'power3' });
            const yTo = gsap.quickTo(ring, 'y', { duration: 0.5, ease: 'power3' });
            let shown = false;

            const onMove = (e) => {
                if (!shown) {
                    // First sighting: jump to the pointer instead of flying in from the corner.
                    gsap.set(ring, { x: e.clientX, y: e.clientY });
                    ring.classList.add('is-on');
                    shown = true;
                }
                xTo(e.clientX);
                yTo(e.clientY);
            };

            const onOver = (e) => {
                const target = e.target instanceof Element ? e.target : null;
                const labelled = target?.closest('[data-cursor]');
                const field = target?.closest('input, textarea');
                const link = target?.closest('a, button, [role="button"], summary');
                ring.classList.toggle('is-label', Boolean(labelled));
                ring.classList.toggle('is-link', !labelled && !field && Boolean(link));
                ring.classList.toggle('is-field', Boolean(field));
                if (labelled) label.textContent = labelled.dataset.cursor;
            };

            const onLeave = () => {
                ring.classList.remove('is-on');
                shown = false;
            };
            const onDown = () => ring.classList.add('is-down');
            const onUp = () => ring.classList.remove('is-down');

            window.addEventListener('pointermove', onMove, { passive: true });
            document.addEventListener('pointerover', onOver, { passive: true });
            document.documentElement.addEventListener('pointerleave', onLeave);
            window.addEventListener('pointerdown', onDown, { passive: true });
            window.addEventListener('pointerup', onUp, { passive: true });

            return () => {
                window.removeEventListener('pointermove', onMove);
                document.removeEventListener('pointerover', onOver);
                document.documentElement.removeEventListener('pointerleave', onLeave);
                window.removeEventListener('pointerdown', onDown);
                window.removeEventListener('pointerup', onUp);
                ring.className = 'cursor';
            };
        });

        return () => mm.revert();
    }, []);

    return (
        <div className="cursor" ref={ringRef} aria-hidden="true">
            <span className="cursor__label" ref={labelRef} />
        </div>
    );
};

export default Cursor;
