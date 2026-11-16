import { MQ, matches } from './motion';

// The Lenis instance, when smooth scrolling is active (desktop only).
let lenis = null;

export const setLenis = (instance) => {
    lenis = instance;
};

export const getLenis = () => lenis;

export function scrollToTarget(target) {
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    if (!el) return;
    if (lenis) {
        lenis.scrollTo(el, { duration: 1.3 });
    } else {
        el.scrollIntoView({ behavior: matches(MQ.reduce) ? 'auto' : 'smooth', block: 'start' });
    }
}

// Pause/resume page scrolling while an overlay (menu, palette, preloader) is open.
export function lockScroll(locked) {
    document.documentElement.classList.toggle('is-locked', locked);
    if (lenis) {
        if (locked) lenis.stop();
        else lenis.start();
    }
}
