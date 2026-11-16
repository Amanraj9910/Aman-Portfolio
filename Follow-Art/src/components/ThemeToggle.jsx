import React from 'react';
import { useTheme } from '../ThemeContext';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();
    const next = theme === 'dark' ? 'light' : 'dark';

    return (
        <button
            type="button"
            className="icon-btn theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${next} mode`}
            title={`Switch to ${next} mode`}
        >
            <svg className="theme-toggle__icon" data-mode={theme} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                <circle className="theme-toggle__core" cx="12" cy="12" r="4.5" />
                <g className="theme-toggle__rays">
                    <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" />
                </g>
            </svg>
        </button>
    );
};

export default ThemeToggle;
