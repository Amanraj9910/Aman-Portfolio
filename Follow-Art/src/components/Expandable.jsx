import React, { useState } from 'react';
import { ScrollTrigger } from '../lib/motion';

/*
 * Keeps secondary detail out of the way on phones. On wide screens the content is
 * always shown and the button is hidden (pure CSS); on phones it sits behind one tap.
 */
const Expandable = ({ more = 'Show details', less = 'Show less', children }) => {
    const [open, setOpen] = useState(false);

    const toggle = () => {
        setOpen((value) => !value);
        // The page height changes, so every scroll trigger below needs re-measuring.
        requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    return (
        <div className={`xpand ${open ? 'is-open' : ''}`}>
            <div className="xpand__body">{children}</div>
            <button type="button" className="xpand__btn" aria-expanded={open} onClick={toggle}>
                <span>{open ? less : more}</span>
                <i aria-hidden="true" />
            </button>
        </div>
    );
};

export default Expandable;
