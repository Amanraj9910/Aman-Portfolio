import { useEffect, useState } from 'react';

// Returns the id of the section currently crossing the middle of the viewport.
export default function useActiveSection(ids) {
    const [active, setActive] = useState(ids[0]);

    useEffect(() => {
        const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
        if (!els.length) return undefined;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActive(entry.target.id);
                });
            },
            // A thin band just above the centre line: exactly one section owns it at a time.
            { rootMargin: '-45% 0px -54% 0px', threshold: 0 },
        );

        els.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [ids]);

    return active;
}
