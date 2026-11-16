import React from 'react';

// Numbered section heading. `title` is an array of lines; `children` is the optional intro line.
const SectionHead = ({ index, eyebrow, title, children }) => (
    <header className="shead">
        <span className="shead__ghost" data-parallax="22" aria-hidden="true">{index}</span>
        <div className="shead__meta" data-reveal>
            <span className="shead__index">{index}</span>
            <span className="shead__rule" aria-hidden="true" />
            <span>{eyebrow}</span>
        </div>
        <h2 className="shead__title" data-split>
            {title.map((line, i) => (
                <React.Fragment key={line}>
                    {i > 0 && <br />}
                    {line}
                </React.Fragment>
            ))}
        </h2>
        {children && <p className="shead__sub" data-reveal>{children}</p>}
    </header>
);

export default SectionHead;
