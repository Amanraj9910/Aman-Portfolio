import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import Lenis from 'lenis';

import Backdrop from './components/Backdrop';
import Cursor from './components/Cursor';
import Preloader from './components/Preloader';
import Header from './components/Header';
import CommandPalette from './components/CommandPalette';
import ScrollChrome from './components/ScrollChrome';
import Toast from './components/Toast';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Credentials from './components/Credentials';
import Leadership from './components/Leadership';
import Kinetic from './components/Kinetic';
import TopFooter from './components/TopFooter';
import Contact from './components/Contact';

import { TICKER } from './data/content';
import { gsap, MQ, matches, ScrollTrigger, SplitText } from './lib/motion';
import { scrollToTarget, setLenis } from './lib/scroll';

const MOTION_OK = '(prefers-reduced-motion: no-preference)';
const INTRO_KEY = 'portfolio-intro-seen';

// The boot sequence plays once per browser session, and never with reduced motion.
const shouldPlayIntro = () => {
    try {
        return !matches(MQ.reduce) && sessionStorage.getItem(INTRO_KEY) !== '1';
    } catch {
        return false;
    }
};

function App() {
    const [playIntro] = useState(shouldPlayIntro);
    const [ready, setReady] = useState(!playIntro);
    const [paletteOpen, setPaletteOpen] = useState(false);

    const reveal = useCallback(() => {
        setReady(true);
        try {
            sessionStorage.setItem(INTRO_KEY, '1');
        } catch {
            /* storage unavailable: the intro just plays again next visit */
        }
    }, []);

    const openPalette = useCallback(() => setPaletteOpen(true), []);
    const closePalette = useCallback(() => setPaletteOpen(false), []);

    // Smooth wheel scrolling on desktop only; touch devices keep native scrolling.
    useEffect(() => {
        const mm = gsap.matchMedia();
        mm.add(`${MQ.desktop} and ${MOTION_OK}`, () => {
            const lenis = new Lenis({ lerp: 0.11 });
            setLenis(lenis);
            lenis.on('scroll', ScrollTrigger.update);
            const raf = (time) => lenis.raf(time * 1000);
            gsap.ticker.add(raf);
            gsap.ticker.lagSmoothing(0);
            if (document.documentElement.classList.contains('is-locked')) lenis.stop();
            return () => {
                gsap.ticker.remove(raf);
                lenis.destroy();
                setLenis(null);
            };
        });
        return () => mm.revert();
    }, []);

    // In-page links scroll with the active scroller; Ctrl/Cmd+K opens the command menu.
    useEffect(() => {
        const onClick = (e) => {
            if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
            const link = e.target instanceof Element ? e.target.closest('a[href^="#"]') : null;
            const hash = link?.getAttribute('href');
            if (!hash || hash.length < 2) return;
            const target = document.querySelector(hash);
            if (!target) return;
            e.preventDefault();
            window.history.replaceState(null, '', hash);
            // Let any overlay that this click closes release its scroll lock first.
            setTimeout(() => scrollToTarget(target), 30);
        };
        const onKey = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                setPaletteOpen((open) => !open);
            }
        };
        document.addEventListener('click', onClick);
        window.addEventListener('keydown', onKey);
        return () => {
            document.removeEventListener('click', onClick);
            window.removeEventListener('keydown', onKey);
        };
    }, []);

    // Shared scroll reveals: any element can opt in with a data attribute.
    useLayoutEffect(() => {
        const mm = gsap.matchMedia();

        mm.add(MOTION_OK, () => {
            // [data-split]: headings rise line by line from behind a mask.
            const splits = gsap.utils.toArray('[data-split]').map((el) => SplitText.create(el, {
                type: 'lines',
                mask: 'lines',
                linesClass: 'split-line',
                autoSplit: true,
                onSplit: (self) => gsap.from(self.lines, {
                    yPercent: 110,
                    duration: 1.2,
                    ease: 'expo.out',
                    stagger: 0.1,
                    scrollTrigger: { trigger: el, start: 'top 88%', once: true },
                }),
            }));

            // [data-reveal]: fade up, staggered with whatever enters alongside.
            const items = gsap.utils.toArray('[data-reveal]');
            // Smaller, quicker moves on touch screens, where a long rise feels heavy.
            const compact = !matches(MQ.desktop);
            const rise = compact ? 14 : 30;
            gsap.set(items, { opacity: 0, y: rise });
            ScrollTrigger.batch(items, {
                start: 'top 90%',
                once: true,
                onEnter: (batch) => gsap.to(batch, {
                    opacity: 1,
                    y: 0,
                    duration: compact ? 0.6 : 1,
                    ease: compact ? 'power2.out' : 'expo.out',
                    stagger: compact ? 0.04 : 0.08,
                    overwrite: true,
                }),
            });

            // [data-count]: numbers count up from zero.
            const counters = gsap.utils.toArray('[data-count]');
            counters.forEach((el) => {
                const end = Number(el.dataset.count);
                const suffix = el.dataset.suffix || '';
                const state = { value: 0 };
                el.textContent = `0${suffix}`;
                gsap.to(state, {
                    value: end,
                    duration: 1.8,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: el, start: 'top 90%', once: true },
                    onUpdate: () => { el.textContent = `${Math.round(state.value)}${suffix}`; },
                });
            });

            // [data-parallax="n"]: drifts n% of its own height against the scroll, for depth.
            const drift = (el) => {
                const amount = Number(el.dataset.parallax ?? el.dataset.parallaxDesktop);
                gsap.fromTo(el, { yPercent: amount }, {
                    yPercent: -amount,
                    ease: 'none',
                    scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
                });
            };
            if (!compact) gsap.utils.toArray('[data-parallax], [data-parallax-desktop]').forEach(drift);

            return () => {
                splits.forEach((split) => split.revert());
                counters.forEach((el) => { el.textContent = `${el.dataset.count}${el.dataset.suffix || ''}`; });
            };
        });

        // Web fonts change text metrics: re-measure every trigger once they are in.
        document.fonts?.ready.then(() => ScrollTrigger.refresh());

        return () => mm.revert();
    }, []);

    return (
        <>
            <a className="skip" href="#main">Skip to content</a>
            <Backdrop />
            {playIntro && <Preloader onReveal={reveal} />}
            <Cursor />
            <Header onOpenPalette={openPalette} />

            {/* The page is deliberately inverted: footer first, proof before biography,
                section numbers counting down to Contact, and the masthead at the very end. */}
            <TopFooter />
            <main id="main">
                <Hero ready={ready} />
                <Marquee items={TICKER} />
                <Kinetic />
                <Projects />
                <Leadership />
                <Experience />
                <Skills />
                <Credentials />
                <About />
                <Contact />
            </main>

            <ScrollChrome />
            {paletteOpen && <CommandPalette onClose={closePalette} />}
            <Toast />
        </>
    );
}

export default App;
