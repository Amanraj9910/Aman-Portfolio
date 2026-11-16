import React, { useLayoutEffect, useRef } from 'react';
import { MQ, matches } from '../lib/motion';

/*
 * Reveals text token by token behind a caret, the way a model streams its answer.
 * The full text is always in the DOM (hidden with opacity), so it stays readable by
 * assistive tech and is simply shown as-is when reduced motion is requested.
 *
 * `play`: true/false to control it yourself, or leave undefined to start on scroll into view.
 */
const StreamText = ({ segments, as = 'p', className = '', play, speed = 34 }) => {
    const Tag = as;
    const ref = useRef(null);
    const parts = typeof segments === 'string' ? [{ text: segments }] : segments;

    useLayoutEffect(() => {
        const root = ref.current;
        if (matches(MQ.reduce)) return undefined;

        const tokens = Array.from(root.querySelectorAll('.tok'));
        let timer;
        let observer;
        let started = false;
        root.classList.add('is-armed');

        const run = () => {
            if (started) return;
            started = true;
            let i = 0;
            const step = () => {
                if (i > 0) tokens[i - 1].classList.remove('is-head');
                if (i >= tokens.length) {
                    root.classList.add('is-done');
                    return;
                }
                tokens[i].classList.add('is-on', 'is-head');
                i += 1;
                // Uneven pacing: real token streams arrive in bursts.
                timer = setTimeout(step, speed * (0.35 + Math.random() * 1.5));
            };
            step();
        };

        if (play === true) {
            run();
        } else if (play === undefined) {
            observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        run();
                        observer.disconnect();
                    }
                },
                { rootMargin: '0px 0px -18% 0px' },
            );
            observer.observe(root);
        }

        return () => {
            clearTimeout(timer);
            observer?.disconnect();
            root.classList.remove('is-armed', 'is-done');
            tokens.forEach((t) => t.classList.remove('is-on', 'is-head'));
        };
    }, [play, speed]);

    return (
        <Tag ref={ref} className={`stream ${className}`}>
            {parts.map((part, p) => {
                const words = part.text.split(/(\s+)/).map((chunk, i) =>
                    /^\s+$/.test(chunk) || chunk === ''
                        ? chunk
                        : <span className="tok" key={i}>{chunk}</span>,
                );
                return part.em ? <em key={p}>{words}</em> : <React.Fragment key={p}>{words}</React.Fragment>;
            })}
        </Tag>
    );
};

export default StreamText;
