import React from 'react';
import SectionHead from './SectionHead';
import StreamText from './StreamText';
import { ABOUT } from '../data/content';

const About = () => (
    <section className="section about" id="about">
        <SectionHead index="01" eyebrow="Profile, last on purpose" title={['About', 'Me']}>
            Most portfolios open with this. Here the work went first.
        </SectionHead>

        <div className="about__grid">
            <StreamText className="about__lead" segments={ABOUT.lead} speed={46} />
            <p className="about__body" data-reveal>{ABOUT.body}</p>
        </div>

        <dl className="stats">
            {ABOUT.stats.map((stat) => (
                <div className="stats__item" key={stat.label} data-reveal>
                    <dt>{stat.label}</dt>
                    <dd>
                        <span data-count={stat.value} data-suffix={stat.suffix}>
                            {stat.value}{stat.suffix}
                        </span>
                    </dd>
                </div>
            ))}
        </dl>
    </section>
);

export default About;
