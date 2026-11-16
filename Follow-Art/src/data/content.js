// All portfolio copy lives here so sections stay presentational.

export const PROFILE = {
    name: 'Aman Raj',
    role: 'AI Engineer',
    roles: ['AI Engineer · Hosho Digital, Jul 2025 to now', 'Team Lead, 7–10 engineers', 'Azure AI-102 Certified'],
    location: 'Indore, IN',
    timeZone: 'Asia/Kolkata',
    tagline:
        'Delivering production AI solutions in the Microsoft ecosystem: Azure OpenAI, AI Foundry, AI Search, Copilot Studio and Power Platform. I own each solution end-to-end, from requirements to deployment, governance and cost control.',
    // Phones get the pitch in one breath.
    taglineShort: 'Production AI on Azure, owned end-to-end: from requirements to deployment, governance and cost control.',
    email: 'rajaman78167@gmail.com',
    phone: '+91 9910772433',
    phoneHref: 'tel:+919910772433',
    github: 'https://github.com/Amanraj9910',
    githubHandle: 'Amanraj9910',
    linkedin: 'https://linkedin.com/in/aman-raj-250081303/',
    linkedinHandle: 'aman-raj-250081303',
    photo: '/img/profile-720.webp',
};

export const NAV_LINKS = [
    { id: 'projects', label: 'Projects' },
    { id: 'leadership', label: 'Leadership' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'education', label: 'Education' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
];

// Every section that the progress rail and mobile dock track, in page order.
// The page runs results-first and counts down: section numbers go 07 → 00 (Contact).
export const SECTIONS = [
    { id: 'hero', label: 'Intro' },
    { id: 'kinetic', label: 'In motion' },
    { id: 'projects', label: 'Projects' },
    { id: 'leadership', label: 'Leadership' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'education', label: 'Education' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
];

// Shown in the hero and the About stats. Update this one number as more work ships.
export const PROJECTS_DELIVERED = 5;

export const HERO_STATS = [
    { value: String(PROJECTS_DELIVERED), label: 'Projects delivered' },
    { value: '7–10', label: 'Team led' },
    { value: 'AI-102', label: 'Certified' },
];

export const TICKER = [
    'Azure OpenAI',
    'AI Foundry',
    'Multi-Agent Systems',
    'RAG',
    'Copilot Studio',
    'AI Search',
    'Power Platform',
    'MCP',
    'Computer Vision',
    'Cloud Governance',
];

export const ABOUT = {
    // Segments flagged `em` render emphasised.
    lead: [
        { text: "I'm an " },
        { text: 'AI Engineer', em: true },
        {
            text: ' working as a Technical Consultant at Hosho Digital in Indore, delivering production AI solutions in the Microsoft ecosystem: Azure OpenAI, AI Foundry, AI Search, ',
        },
        { text: 'Copilot Studio and Power Platform', em: true },
        { text: '.' },
    ],
    body:
        'I own solutions end-to-end, from shaping requirements with business stakeholders to deployment, governance and cost control. With a background in DevOps and cloud security (Entra PIM, least-privilege access, release governance), I work AI-first with Claude Code and ship MVPs in days, not weeks.',
    stats: [
        { value: PROJECTS_DELIVERED, suffix: '', label: 'Projects delivered' },
        { value: 60, suffix: '%', label: 'Faster reviews' },
        { value: 80, suffix: '%', label: 'Faster lookups' },
        { value: 3, suffix: '', label: 'Clouds governed' },
    ],
};

// Azure services, highlighted wherever they appear in the skills list.
export const AZURE_STACK = [
    'Azure OpenAI', 'AI Foundry', 'AI Search', 'Azure App Service',
    'Container Apps', 'Document Intelligence', 'Entra ID (PIM, RBAC)',
];

export const SKILLS = [
    {
        num: '01',
        title: 'AI & ML',
        core: true,
        skills: ['Azure OpenAI', 'AI Foundry', 'RAG', 'LLM Agents', 'MCP', 'STT / TTS', 'YOLO', 'RF-DETR', 'D-FINE', 'OCR'],
    },
    {
        num: '02',
        title: 'Microsoft & Power Platform',
        skills: ['Copilot Studio', 'Microsoft Graph', 'Power Automate', 'Power Apps', 'Dataverse', 'Power BI'],
    },
    {
        num: '03',
        title: 'Engineering',
        skills: ['Python', 'TypeScript', 'React', 'FastAPI', 'Node.js', 'PostgreSQL', 'Redis', 'REST APIs'],
    },
    {
        num: '04',
        title: 'Cloud & Governance',
        skills: ['Azure App Service', 'Container Apps', 'AI Search', 'Document Intelligence', 'Entra ID (PIM, RBAC)', 'Docker', 'CI/CD'],
    },
];

export const EXPERIENCES = [
    {
        role: 'Technical Consultant (AI Engineer)',
        company: 'Hosho Digital',
        location: 'Indore, Madhya Pradesh',
        period: 'July 2025 — Present',
        current: true,
        points: [
            'Turn client and internal business problems into working AI products, owning each from requirements to live deployment',
            'Design and build multi-agent AI systems, where specialised agents split up a problem and work together to solve it',
            'Work AI-first with Claude Code, shipping MVPs in days, not weeks, with performance, security and cost checks built in',
            'Work with clients to shape requirements; write solution designs, architecture documents, BRDs and AI strategies',
            'Designed the UAT → PROD release process: sign-offs from QA, Tech Lead and PM, a separate production environment, and Entra PIM for time-limited admin access',
            'Run cloud provisioning and cost governance across Azure, GCP and Alibaba Cloud: least-privilege access, approved cost estimates, and budget alerts that stop resources at the limit',
        ],
        tech: ['Azure OpenAI', 'AI Foundry', 'Multi-Agent Systems', 'Claude Code', 'Entra PIM', 'Azure · GCP · Alibaba Cloud'],
    },
    {
        role: 'Technical Consultant Intern',
        company: 'Hosho Digital',
        location: 'Indore, Madhya Pradesh',
        period: 'Jan 2025 — June 2025',
        current: false,
        points: [
            'Delivered Power Platform solutions (Canvas and Model-Driven Apps, Power Automate, Power BI, Dataverse) and Copilot Studio agents, automating client business workflows',
            "Built an autonomous voice AI agent with Copilot Studio and Microsoft Graph that acts on the user's Microsoft 365 account from spoken requests, such as sending emails and scheduling meetings, with Entra ID sign-in",
        ],
        tech: ['Power Apps', 'Power Automate', 'Power BI', 'Dataverse', 'Copilot Studio', 'Microsoft Graph'],
    },
];

export const PROJECTS = [
    {
        id: 1,
        title: 'AI Electrical Drawing to Bill-of-Materials Platform',
        badge: 'Client Project',
        description:
            'AI system that reads electrical Single Line Diagrams, finds every component on the drawing and produces a draft parts list (BOM) for engineers to review, instead of counting components by hand.',
        highlights: [
            'Benchmarked YOLO, RF-DETR and D-FINE; shipped D-FINE with overlapping-tile inference for tiny symbols and Azure Document Intelligence OCR for ratings',
            '22-stage training pipeline with rare-class mining (imbalance 2,919:1 → 3:1) and a PostgreSQL SKIP LOCKED job queue feeding GPU workers',
            'Live in production: the same estimating team now turns around more tenders with consistent BOMs',
        ],
        impact: 'BOM prep: days → hours',
        tech: ['D-FINE', 'RF-DETR', 'YOLO', 'OCR', 'PostgreSQL'],
    },
    {
        id: 2,
        title: 'AI Recruitment Platform',
        badge: 'Internal Product',
        description:
            "Hosho's hiring platform where teams post jobs, screen candidates, run tests and review results in one place, plus an AI agent that runs English assessments on its own.",
        highlights: [
            'Multi-role RBAC, AI resume parsing, GitHub repo analysis and LLM scorecards with output validation',
            'Voice assessment agent built on speech-to-text, LLM evaluation and TTS that writes scores back to candidate profiles',
            'Cut technical review time by 60% (30 → 12 min per profile)',
        ],
        impact: '800+ candidates screened',
        tech: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Azure OpenAI', 'AI Search'],
    },
    {
        id: 3,
        title: 'Autonomous Voice AI Agent for Microsoft 365',
        badge: '2025',
        description:
            "Voice agent that acts on the user's Microsoft 365 account from spoken requests, such as sending emails and scheduling meetings.",
        highlights: [
            'Built with Copilot Studio and Microsoft Graph',
            'Secure Entra ID sign-in so every action runs as the signed-in user',
        ],
        impact: 'Voice → action',
        tech: ['Copilot Studio', 'Microsoft Graph', 'Entra ID'],
    },
    {
        id: 4,
        title: 'Agentic Microsoft Documentation Assistant',
        badge: '2025',
        description:
            'Chatbot that answers Microsoft technical questions with sourced answers, using a ReAct master agent that delegates research via Microsoft Learn MCP.',
        impact: '80% faster lookups',
        tech: ['Azure OpenAI', 'FastAPI', 'MCP', 'ReAct'],
    },
    {
        id: 5,
        title: 'Document Intelligence RAG Chatbot',
        badge: '2025',
        description:
            'RAG pipeline processing documents into semantic vector chunks, enabling natural-language querying with tone-adaptive responses.',
        impact: 'Hours to seconds',
        tech: ['Azure OpenAI', 'Vector DB', 'Python', 'FastAPI', 'RAG'],
    },
];

export const CREDENTIALS = [
    {
        kind: 'Degree',
        icon: 'degree',
        title: 'B.Tech in Information Technology',
        issuer: 'Jabalpur Engineering College',
        detail: 'Jabalpur, Madhya Pradesh',
        period: 'Aug 2021 — June 2025',
    },
    {
        kind: 'Certification',
        icon: 'award',
        title: 'Azure AI Engineer Associate',
        issuer: 'Microsoft Certified · AI-102',
        detail: 'Credential ID: 98FB3C1050E5496D',
        period: 'Oct 2025 — Oct 2026',
        status: 'Verified Certification',
        statusTone: 'ok',
    },
    {
        kind: 'Certification',
        icon: 'clock',
        title: 'Claude Certified Architect — Foundations',
        issuer: 'Anthropic · CCAF',
        status: 'In Progress',
        statusTone: 'progress',
    },
];

export const LEADERSHIP = {
    title: 'Team Lead & Intern Training Programme Lead',
    subtitle: 'Hosho Digital · 2025 — Present',
    verbs: [
        { verb: 'Plan', text: 'Plan the work of a 7–10 member team of engineers and interns.' },
        { verb: 'Review', text: 'Review what the team builds.' },
        { verb: 'Train', text: 'Run the intern training programme.' },
        { verb: 'Govern', text: 'Designed the UAT → PROD release process: sign-offs from QA, Tech Lead and PM.' },
    ],
};

// Earlier leadership, shown under the current role.
export const ACHIEVEMENTS = [
    {
        highlight: '1st Place',
        title: 'Shark Tank JEC',
        subtitle: 'Startup Pitching Competition — May 2023',
        desc: 'Won 1st place among 40+ teams, recognized for an innovative idea and compelling entrepreneurial pitch.',
    },
    {
        highlight: 'Campus',
        title: 'C-Cube Secretary',
        subtitle: 'Jabalpur Engineering College — 2023–2024',
        desc: 'Managed club events as Secretary & Overall Coordinator, strengthening organizational, leadership, and cross-team communication skills.',
    },
];

export const CONTACT = {
    blurb: "I'm always open to discussing new projects, creative ideas, or opportunities to be part of something amazing.",
};
