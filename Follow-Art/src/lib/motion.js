import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

// Mobile browsers resize the viewport as the address bar hides; don't recalculate on that.
ScrollTrigger.config({ ignoreMobileResize: true });

// One place for the media conditions every animation branches on.
// `desktop` means a real pointer AND room to use it; everything else is `compact`.
const DESKTOP = '(min-width: 1024px) and (hover: hover) and (pointer: fine)';

export const MQ = {
    desktop: DESKTOP,
    compact: `not all and ${DESKTOP}`,
    reduce: '(prefers-reduced-motion: reduce)',
};

export const matches = (query) => typeof window !== 'undefined' && window.matchMedia(query).matches;

export { gsap, ScrollTrigger, SplitText };
