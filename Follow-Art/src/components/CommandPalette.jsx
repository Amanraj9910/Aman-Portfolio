import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTheme } from '../ThemeContext';
import { SearchIcon } from './Icons';
import { NAV_LINKS, PROFILE } from '../data/content';
import { lockScroll, scrollToTarget } from '../lib/scroll';
import { copyText } from '../lib/toast';

/*
 * Ctrl/Cmd+K command menu: jump to a section, copy contact details, open profiles,
 * switch theme. Mounted only while open, so its state starts fresh every time.
 */
const CommandPalette = ({ onClose }) => {
    const { theme, toggleTheme } = useTheme();
    const [query, setQuery] = useState('');
    const [cursor, setCursor] = useState(0);
    const inputRef = useRef(null);
    const listRef = useRef(null);

    const commands = useMemo(() => [
        { id: 'top', group: 'Go to', label: 'Intro', hint: 'Top of page', run: () => scrollToTarget('#hero') },
        ...NAV_LINKS.map((link) => ({
            id: link.id,
            group: 'Go to',
            label: link.label,
            hint: `#${link.id}`,
            run: () => scrollToTarget(`#${link.id}`),
        })),
        { id: 'copy-email', group: 'Contact', label: 'Copy email address', hint: PROFILE.email, run: () => copyText(PROFILE.email, 'Email copied') },
        { id: 'mail', group: 'Contact', label: 'Write an email', hint: 'Opens your mail app', run: () => { window.location.href = `mailto:${PROFILE.email}`; } },
        { id: 'copy-phone', group: 'Contact', label: 'Copy phone number', hint: PROFILE.phone, run: () => copyText(PROFILE.phone, 'Phone number copied') },
        { id: 'github', group: 'Open', label: 'GitHub profile', hint: PROFILE.githubHandle, run: () => window.open(PROFILE.github, '_blank', 'noopener') },
        { id: 'linkedin', group: 'Open', label: 'LinkedIn profile', hint: PROFILE.linkedinHandle, run: () => window.open(PROFILE.linkedin, '_blank', 'noopener') },
        { id: 'theme', group: 'Appearance', label: `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`, hint: 'Theme', run: () => toggleTheme() },
    ], [theme, toggleTheme]);

    const results = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return commands;
        return commands.filter((c) => `${c.group} ${c.label} ${c.hint}`.toLowerCase().includes(q));
    }, [commands, query]);

    const selected = Math.min(cursor, Math.max(results.length - 1, 0));

    // Lock the page behind, focus the input, and hand focus back on close.
    useEffect(() => {
        const previous = document.activeElement;
        lockScroll(true);
        inputRef.current?.focus();
        return () => {
            lockScroll(false);
            if (previous instanceof HTMLElement) previous.focus({ preventScroll: true });
        };
    }, []);

    useEffect(() => {
        listRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' });
    }, [selected]);

    const run = (command) => {
        onClose();
        // Wait a frame so the scroll lock is released before any scroll starts.
        requestAnimationFrame(() => command.run());
    };

    const onKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setCursor(results.length ? (selected + 1) % results.length : 0);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setCursor(results.length ? (selected - 1 + results.length) % results.length : 0);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (results[selected]) run(results[selected]);
        } else if (e.key === 'Escape') {
            e.preventDefault();
            onClose();
        } else if (e.key === 'Tab') {
            e.preventDefault(); // single-field dialog: keep focus in the input
        }
    };

    let lastGroup = null;

    return (
        <div className="palette" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
            <div className="palette__panel" role="dialog" aria-modal="true" aria-label="Command menu">
                <div className="palette__field">
                    <SearchIcon />
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            setCursor(0);
                        }}
                        onKeyDown={onKeyDown}
                        placeholder="Jump to a section or run a command"
                        role="combobox"
                        aria-expanded="true"
                        aria-controls="palette-list"
                        aria-activedescendant={results[selected] ? `cmd-${results[selected].id}` : undefined}
                        autoComplete="off"
                        spellCheck="false"
                    />
                    <kbd>Esc</kbd>
                </div>
                <ul className="palette__list" id="palette-list" role="listbox" ref={listRef} data-lenis-prevent>
                    {results.length === 0 && <li className="palette__empty">No matching command</li>}
                    {results.map((command, i) => {
                        const showGroup = command.group !== lastGroup;
                        lastGroup = command.group;
                        return (
                            <React.Fragment key={command.id}>
                                {showGroup && <li className="palette__group" role="presentation">{command.group}</li>}
                                <li
                                    id={`cmd-${command.id}`}
                                    role="option"
                                    aria-selected={i === selected}
                                    className="palette__item"
                                    onMouseMove={() => setCursor(i)}
                                    onClick={() => run(command)}
                                >
                                    <span>{command.label}</span>
                                    <small>{command.hint}</small>
                                </li>
                            </React.Fragment>
                        );
                    })}
                </ul>
                <div className="palette__foot" aria-hidden="true">
                    <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
                    <span><kbd>↵</kbd> select</span>
                </div>
            </div>
        </div>
    );
};

export default CommandPalette;
