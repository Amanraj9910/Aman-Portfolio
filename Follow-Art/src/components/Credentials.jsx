import React from 'react';
import SectionHead from './SectionHead';
import SpotCard from './SpotCard';
import { CheckIcon, CredentialIcon } from './Icons';
import { CREDENTIALS } from '../data/content';

const Credentials = () => (
    <section className="section creds" id="education">
        <SectionHead index="02" eyebrow="Credentials" title={['Education &', 'Certifications']} />

        <ul className="creds__grid">
            {CREDENTIALS.map((item, i) => (
                <li key={item.title} data-reveal data-parallax-desktop={i === 1 ? -7 : 7}>
                    <SpotCard className="cred">
                        <div className="cred__top">
                            <span className="cred__icon"><CredentialIcon name={item.icon} /></span>
                            <span className="cred__kind">{pad(i + 1)} · {item.kind}</span>
                        </div>
                        <h3 className="cred__title">{item.title}</h3>
                        <p className="cred__issuer">{item.issuer}</p>
                        <div className="cred__foot">
                            {item.detail && <span>{item.detail}</span>}
                            {item.period && <span>{item.period}</span>}
                            {item.status && (
                                <span className={`badge badge--${item.statusTone}`}>
                                    {item.statusTone === 'ok' ? <CheckIcon width="14" height="14" /> : <i aria-hidden="true" />}
                                    {item.status}
                                </span>
                            )}
                        </div>
                    </SpotCard>
                </li>
            ))}
        </ul>
    </section>
);

const pad = (n) => String(n).padStart(2, '0');

export default Credentials;
