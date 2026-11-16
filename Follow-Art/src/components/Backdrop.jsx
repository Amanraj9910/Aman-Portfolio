import { useEffect, useRef } from 'react';

/*
 * The background: large soft lights at different depths over a faint blueprint grid.
 * A pool of light follows the cursor (or a finger) and brightens the grid beneath it,
 * the lights shift against each other as the pointer and the page move (parallax),
 * and a click or tap sends out a ring. With no pointer around, the light wanders on
 * its own, so phones get motion without a cursor.
 */

const GRID = 64; // px, must match background-size in the stylesheet
const ORBS = [
    { depth: 46, scroll: 1, drift: 0.11, phase: 0 },
    { depth: -78, scroll: 1.7, drift: 0.08, phase: 2.1 },
    { depth: 120, scroll: 2.6, drift: 0.14, phase: 4.2 },
];

const Backdrop = () => {
    const ref = useRef(null);

    useEffect(() => {
        const root = ref.current;
        const orbs = Array.from(root.querySelectorAll('.backdrop__orb'));
        const glow = root.querySelector('.backdrop__glow');
        const reduceMq = window.matchMedia('(prefers-reduced-motion: reduce)');

        let w = window.innerWidth;
        let h = window.innerHeight;
        let raf = 0;
        const light = { x: w * 0.68, y: h * 0.36, tx: w * 0.68, ty: h * 0.36, energy: 0, last: -1e9 };

        const render = (now) => {
            const t = now / 1000;

            // The light follows the pointer while it is active, otherwise it wanders slowly.
            const active = now - light.last < 2600 ? 1 : 0;
            light.energy += (active - light.energy) * 0.05;
            const wx = w * (0.5 + 0.32 * Math.sin(t * 0.19));
            const wy = h * (0.45 + 0.26 * Math.sin(t * 0.27 + 1.4));
            const gx = wx + (light.tx - wx) * light.energy;
            const gy = wy + (light.ty - wy) * light.energy;
            light.x += (gx - light.x) * 0.09;
            light.y += (gy - light.y) * 0.09;

            const sy = window.scrollY;
            const gridShift = -((sy * 0.14) % GRID);

            root.style.setProperty('--lx', `${light.x.toFixed(1)}px`);
            root.style.setProperty('--ly', `${light.y.toFixed(1)}px`);
            root.style.setProperty('--gy', `${gridShift.toFixed(1)}px`);
            glow.style.transform = `translate3d(${light.x.toFixed(1)}px, ${light.y.toFixed(1)}px, 0)`;

            // Each light sits at its own depth: nearer ones travel further.
            const nx = light.x / w - 0.5;
            const ny = light.y / h - 0.5;
            orbs.forEach((orb, i) => {
                const o = ORBS[i];
                const x = -nx * o.depth + Math.sin(t * o.drift + o.phase) * 40;
                // Scrolling swings each light at its own rate, but never carries it off the page.
                const y = -ny * o.depth + Math.cos(t * o.drift * 0.8 + o.phase) * 30
                    + Math.sin(sy * 0.0011 * o.scroll + o.phase) * h * 0.26;
                orb.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
            });
        };

        const loop = (now) => {
            render(now);
            raf = requestAnimationFrame(loop);
        };

        const start = () => {
            cancelAnimationFrame(raf);
            if (reduceMq.matches) render(0); // one still frame, no motion
            else if (!document.hidden) raf = requestAnimationFrame(loop);
        };

        const onMove = (e) => {
            light.tx = e.clientX;
            light.ty = e.clientY;
            light.last = performance.now();
        };

        const onDown = (e) => {
            onMove(e);
            if (reduceMq.matches) return;
            const ring = document.createElement('span');
            ring.className = 'backdrop__ring';
            ring.style.left = `${e.clientX}px`;
            ring.style.top = `${e.clientY}px`;
            ring.addEventListener('animationend', () => ring.remove());
            root.appendChild(ring);
        };

        const onResize = () => {
            w = window.innerWidth;
            h = window.innerHeight;
            if (reduceMq.matches) render(0);
        };

        start();
        window.addEventListener('pointermove', onMove, { passive: true });
        window.addEventListener('pointerdown', onDown, { passive: true });
        window.addEventListener('resize', onResize);
        document.addEventListener('visibilitychange', start);
        reduceMq.addEventListener('change', start);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('pointermove', onMove);
            window.removeEventListener('pointerdown', onDown);
            window.removeEventListener('resize', onResize);
            document.removeEventListener('visibilitychange', start);
            reduceMq.removeEventListener('change', start);
            root.querySelectorAll('.backdrop__ring').forEach((ring) => ring.remove());
        };
    }, []);

    return (
        <div className="backdrop" ref={ref} aria-hidden="true">
            <div className="backdrop__orb backdrop__orb--a" />
            <div className="backdrop__orb backdrop__orb--b" />
            <div className="backdrop__orb backdrop__orb--c" />
            <div className="backdrop__grid" />
            <div className="backdrop__grid backdrop__grid--lit" />
            <div className="backdrop__glow" />
        </div>
    );
};

export default Backdrop;
