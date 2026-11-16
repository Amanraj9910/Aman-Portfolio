import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { flushSync } from 'react-dom';

const ThemeContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeContext);

const THEME_COLOR = { dark: '#080A0F', light: '#EEF1F6' };

const readSaved = () => {
    try {
        const saved = localStorage.getItem('portfolio-theme');
        return saved === 'light' || saved === 'dark' ? saved : 'dark';
    } catch {
        return 'dark';
    }
};

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(readSaved);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[theme]);
        try {
            localStorage.setItem('portfolio-theme', theme);
        } catch {
            /* storage unavailable: the choice just won't persist */
        }
    }, [theme]);

    // Pass the click event to grow the new theme out of the toggle as a circle.
    const toggleTheme = useCallback((event) => {
        const next = theme === 'dark' ? 'light' : 'dark';
        const apply = () => {
            flushSync(() => setTheme(next));
            document.documentElement.setAttribute('data-theme', next);
        };

        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!document.startViewTransition || reduce) {
            apply();
            return;
        }

        const x = event?.clientX ?? window.innerWidth / 2;
        const y = event?.clientY ?? 0;
        const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

        const transition = document.startViewTransition(apply);
        transition.ready
            .then(() => {
                document.documentElement.animate(
                    { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
                    { duration: 650, easing: 'cubic-bezier(0.7, 0, 0.2, 1)', pseudoElement: '::view-transition-new(root)' },
                );
            })
            .catch(() => { /* transition skipped: the theme has still been applied */ });
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
