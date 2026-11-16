import React, { useLayoutEffect, useRef } from 'react';
import SectionHead from './SectionHead';
import { gsap, ScrollTrigger } from '../lib/motion';

const pad = (n) => String(n).padStart(2, '0');
const fmt = new Intl.NumberFormat('en-US');

/*
 * Seven lines from the résumé in which the key word acts out its own meaning.
 * Every line is written for a non-technical reader: outcome first, no model names or ratios.
 * `label` is the plain sentence for assistive tech; `body` is the animated version.
 * Styling contract: the CSS default is the finished state, so the lines read correctly
 * with reduced motion or no script. The script arms the section, then plays each line
 * as it scrolls in. Clicking a line replays it.
 */
const LINES = [
    {
        id: 'fast',
        note: 'Speed',
        label: 'MVPs in days, not weeks.',
        body: (
            <>
                MVPs in <span className="k-old">weeks</span>{' '}
                <span className="k-new"><span>days</span></span>.
            </>
        ),
    },
    {
        id: 'agents',
        note: 'How my AI systems work',
        label: 'Agents that split a problem, then solve it together.',
        body: (
            <>
                Agents that <span className="k-split"><span>sp</span><span>lit</span></span> a problem, then solve it{' '}
                <span className="k-join">
                    {'together'.split('').map((char, i) => <span key={i} style={{ '--o': i }}>{char}</span>)}
                </span>.
            </>
        ),
    },
    {
        id: 'tiny',
        note: 'Electrical drawings → parts list',
        label: 'AI that spots every tiny part on a drawing.',
        body: (
            <>
                AI that spots every <span className="k-box">tiny<i data-label="found" /></span> part on a drawing.
            </>
        ),
    },
    {
        id: 'review',
        note: 'Hiring platform',
        label: 'A candidate reviewed in 12 minutes, not 30.',
        body: (
            <>
                A candidate reviewed in <span className="k-num" data-from="30" data-to="12">12</span>{' '}
                <span className="k-accent">minutes</span>, not 30.
            </>
        ),
    },
    {
        id: 'cut',
        note: 'Client project, live in production',
        label: 'Parts-list prep, cut from days to hours.',
        body: (
            <>
                Parts-list prep, <span className="k-cut"><span>cut</span><span>cut</span></span> from days to{' '}
                <span className="k-accent">hours</span>.
            </>
        ),
    },
    {
        id: 'e2e',
        note: 'From first requirement to live product',
        label: 'Owned end-to-end.',
        body: (
            <>
                Owned
                <span className="k-span"><span>end</span><i /><span>to</span><i /><span>end</span></span>
            </>
        ),
    },
    {
        id: 'stop',
        note: 'Cloud cost control',
        label: 'When the budget runs out, spending stops.',
        body: (
            <>
                When the budget runs out, spending <span className="k-stop"><span>stop</span></span>
                <span className="k-accent">s</span>
            </>
        ),
    },
];

const Kinetic = () => {
    const rootRef = useRef(null);

    useLayoutEffect(() => {
        const mm = gsap.matchMedia(rootRef);

        mm.add('(prefers-reduced-motion: no-preference)', () => {
            const root = rootRef.current;
            const lines = gsap.utils.toArray('.kline', root);
            const counters = new Map();
            root.classList.add('is-armed');

            const setNumber = (num, value) => { num.textContent = fmt.format(Math.round(value)); };

            const stopCount = (num) => {
                counters.get(num)?.kill();
                counters.delete(num);
            };

            const play = (line) => {
                line.classList.add('is-on');
                const num = line.querySelector('.k-num');
                if (!num) return;
                stopCount(num);
                const state = { value: Number(num.dataset.from) };
                counters.set(num, gsap.to(state, {
                    value: Number(num.dataset.to),
                    duration: 1.8,
                    delay: 0.3,
                    ease: 'power3.inOut',
                    onUpdate: () => setNumber(num, state.value),
                }));
            };

            const reset = (line) => {
                line.classList.remove('is-on');
                const num = line.querySelector('.k-num');
                if (!num) return;
                stopCount(num);
                setNumber(num, Number(num.dataset.from));
            };

            // Replay: jump back to the start without animating, then play again.
            const replay = (e) => {
                const line = e.currentTarget;
                line.classList.add('is-rewinding');
                reset(line);
                void line.offsetWidth;
                line.classList.remove('is-rewinding');
                play(line);
            };

            lines.forEach((line) => {
                reset(line);
                ScrollTrigger.create({
                    trigger: line,
                    start: 'top 78%',
                    onEnter: () => play(line),
                    onLeaveBack: () => reset(line),
                });
                line.addEventListener('click', replay);
            });

            return () => {
                root.classList.remove('is-armed');
                lines.forEach((line) => {
                    line.removeEventListener('click', replay);
                    line.classList.remove('is-on', 'is-rewinding');
                    const num = line.querySelector('.k-num');
                    if (num) {
                        stopCount(num);
                        setNumber(num, Number(num.dataset.to));
                    }
                });
            };
        });

        return () => mm.revert();
    }, []);

    return (
        <section className="section kin" id="kinetic" ref={rootRef}>
            <SectionHead index="07" eyebrow="The résumé, in motion" title={['Words', 'That Work']}>
                Seven results from my work, in plain words. In each one, the word that matters{' '}
                <em>does what it says</em>.
            </SectionHead>

            <ol className="kin__list">
                {LINES.map((line, i) => (
                    <li className="kline" key={line.id} data-cursor="Replay">
                        <span className="kline__meta"><b>{pad(i + 1)}</b>{line.note}</span>
                        <p className="kline__text">
                            <span className="sr-only">{line.label}</span>
                            <span aria-hidden="true">{line.body}</span>
                        </p>
                    </li>
                ))}
            </ol>
        </section>
    );
};

export default Kinetic;
