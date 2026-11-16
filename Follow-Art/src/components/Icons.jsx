import React from 'react';

const base = { width: 18, height: 18, viewBox: '0 0 24 24', 'aria-hidden': true };
const stroke = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' };

export const GitHubIcon = (props) => (
    <svg {...base} fill="currentColor" {...props}>
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
);

export const LinkedInIcon = (props) => (
    <svg {...base} fill="currentColor" {...props}>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
);

export const MailIcon = (props) => (
    <svg {...base} {...stroke} {...props}>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M22 7l-10 7L2 7" />
    </svg>
);

export const PhoneIcon = (props) => (
    <svg {...base} {...stroke} {...props}>
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
    </svg>
);

export const ArrowUpRight = (props) => (
    <svg {...base} {...stroke} {...props}>
        <path d="M7 17L17 7M8 7h9v9" />
    </svg>
);

export const ArrowRight = (props) => (
    <svg {...base} {...stroke} {...props}>
        <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
);

export const CheckIcon = (props) => (
    <svg {...base} {...stroke} {...props}>
        <path d="M20 6L9 17l-5-5" />
    </svg>
);

export const SearchIcon = (props) => (
    <svg {...base} {...stroke} {...props}>
        <circle cx="11" cy="11" r="7" />
        <path d="M20 20l-3.5-3.5" />
    </svg>
);

export const CopyIcon = (props) => (
    <svg {...base} {...stroke} {...props}>
        <rect x="9" y="9" width="12" height="12" rx="2" />
        <path d="M5 15V5a2 2 0 012-2h10" />
    </svg>
);

const CREDENTIAL_PATHS = {
    degree: (
        <>
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c0 1.657 2.686 3 6 3s6-1.343 6-3v-5" />
        </>
    ),
    award: (
        <>
            <circle cx="12" cy="8" r="6" />
            <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12" />
        </>
    ),
    clock: (
        <>
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 2" />
        </>
    ),
};

export const CredentialIcon = ({ name, ...props }) => (
    <svg {...base} width="28" height="28" {...stroke} strokeWidth="1.5" {...props}>
        {CREDENTIAL_PATHS[name]}
    </svg>
);
