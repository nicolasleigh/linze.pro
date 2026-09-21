import { aboutContent } from '@/content/about';
import { getProjectCaseStudy, type ProjectCaseStudy } from '@/content/project-case-studies';
import { portfolioProjects, type PortfolioProject } from '@/content/projects';
import { siteContent } from '@/content/site';
import type { BlogLocale } from '@/types/post';

const englishProjects: readonly PortfolioProject[] = [
  {
    ...portfolioProjects[0],
    category: 'Realtime / Backend migration',
    status: 'Active refactor',
    description:
      'A realtime text, voice and video application. Its core backend is being migrated from Convex to Go and PostgreSQL to address N+1 queries and bandwidth-heavy data access.',
    engineeringFocus:
      'Separate realtime connections, message persistence, identity synchronization and media services into explicit boundaries while keeping the legacy path operational during migration.',
    highlights: [
      'Realtime messaging with gorilla/websocket',
      'Native PostgreSQL queries and sqlc generation',
      'Clerk webhook identity synchronization',
      'LiveKit audio and video rooms',
    ],
  },
  {
    ...portfolioProjects[1],
    category: 'Content platform / Full stack',
    status: 'Current project',
    description:
      'A personal publishing and portfolio platform. It retains the Go content API and bilingual article model while rebuilding the public experience with Next.js App Router.',
    engineeringFocus:
      'Turn a client-rendered blog into a server-first content system and tighten backend boundaries around uploads, authorization, optimistic locking and API contracts.',
    highlights: [
      'Next.js Server Components and ISR',
      'Markdown, table of contents and structured data',
      'Go / chi REST API and PostgreSQL',
      'JWT, RBAC and article versioning',
    ],
  },
  {
    ...portfolioProjects[2],
    category: 'Product engineering / Full stack',
    status: 'Active iteration',
    description:
      'A bilingual cabin-booking platform for guests and administrators. React, React Query and Tailwind CSS shape the booking experience and admin workspace, while Node.js, Express, Prisma and PostgreSQL support the core domain flows.',
    engineeringFocus:
      'Organise guest and admin experiences around one business data model, with particular attention to server state, form validation, responsive interaction, internationalisation and operational workflows.',
    highlights: [
      'Server state and mutations with React Query',
      'Separated guest and admin route boundaries',
      'React Hook Form and Zod validation',
      'Bilingual, dark-mode and responsive interface',
    ],
  },
  {
    ...portfolioProjects[3],
    category: 'Media platform / Admin tooling',
    status: 'Active iteration',
    description:
      'A two-sided movie content platform for viewers and administrators. React, Tailwind CSS and shadcn/ui shape discovery, playback, reviews and content operations, while Node.js, Express, MongoDB and JWT support the API and auth flows.',
    engineeringFocus:
      'Organise complex movie forms, media uploads, cast relationships, localisation and the admin workspace into a coherent frontend experience backed by a focused content and authentication API.',
    highlights: [
      'Complex movie forms with React Hook Form and Zod',
      'Debounced actor search and multi-select relationships',
      'Cloudinary poster and video uploads',
      'Bilingual, light/dark and responsive UI',
    ],
  },
  {
    ...portfolioProjects[4],
    category: 'Commerce / Multi-app system',
    status: 'Active iteration',
    description:
      'A pet commerce system composed of a customer storefront, seller operations dashboard and Express API, covering product discovery, carts, orders, reviews, realtime support and operational analytics.',
    engineeringFocus:
      'Coordinate user, product, order and chat data across three applications, with particular attention to Redux state boundaries, responsive shopping, operations workflows and Socket.IO communication.',
    highlights: [
      'Separated storefront, admin and API applications',
      'Redux Toolkit for cart, order and chat state',
      'Customer, seller and admin support chat with Socket.IO',
      'Product discovery, order management and dashboard analytics',
      'React i18next, dark mode and responsive UI',
    ],
  },
  {
    ...portfolioProjects[5],
    category: 'Mobile / Media',
    status: 'Prototype complete',
    description:
      'A full-stack mobile music application built without Expo, organised around cross-screen playback, local device audio caching and user-generated content.',
    engineeringFocus:
      'Use native player modules, Redux, React Query and RNFS to separate playback state, server data and device files, backed by a Node.js API for users and media.',
    highlights: [
      'Playback controls with React Native Track Player',
      'Audio file caching with react-native-fs',
      'Layered Redux and React Query state',
      'JWT, email verification and password recovery',
    ],
  },
  {
    ...portfolioProjects[6],
    category: 'Go Backend / Transaction system',
    status: 'Core transaction path complete',
    description:
      'A WeChat Mini Program homestay-booking MVP. Go, Gin, MySQL, Redis and WeChat Pay API v3 support inventory calendars, daily pricing, server-side quotes, idempotent orders, stock locking, expiration recovery and payment notification confirmation.',
    engineeringFocus:
      'Keep pricing, inventory, order and payment boundaries on the server, then protect the transaction path with database transactions, row locks, unique constraints and invalidatable caching.',
    highlights: [
      'Daily inventory and price model',
      'Idempotent checkout with Idempotency-Key',
      'MySQL row locks against overselling',
      'WeChat Pay API v3 notification confirmation',
      'Versioned Redis room-calendar cache',
    ],
  },
  {
    ...portfolioProjects[7],
    category: 'Local AI / Developer tooling',
    status: 'V1 available',
    description:
      'A local-first AI workflow for Obsidian Vaults. ObsAgent CLI combines safe Markdown parsing, rebuildable SQLite indexes, hybrid retrieval and evidence-bounded answers with approval-gated file edits.',
    engineeringFocus:
      'Put RAG, Agent execution and file writes behind explicit privacy and safety boundaries: the Vault remains the source of truth, remote calls require consent and budgets, and writes require diffs, approval, optimistic concurrency checks and recoverable transactions.',
    highlights: [
      'Context-aware Markdown chunking and incremental indexing',
      'SQLite FTS5 and sqlite-vec hybrid retrieval',
      'RRF fusion and evidence-bounded answers',
      'Bounded LangGraph Agent with human approval',
      'Safe writes, OCC, rollback and recovery journal',
      'OpenAI and Ollama provider adapters',
    ],
  },
];

const englishAbout = {
  introduction: {
    eyebrow: 'ABOUT / BACKGROUND',
    title: 'Finance-informed software engineering',
    description:
      'I focus on Go backends, React/Next.js and AI-assisted full-stack work. I use AI to explore problems, compare approaches and accelerate validation, while grounding final decisions in clear boundaries, working code and real results.',
  },
  profile: [
    { label: 'FOCUS', value: 'Go backends · React/Next.js' },
    { label: 'BUILDING', value: 'Full-stack products · AI-assisted workflows' },
    { label: 'LEARNING', value: 'Projects · experiments · reviews' },
    { label: 'BASE', value: 'Beijing, China' },
  ],
  education: {
    title: 'Education & Credentials',
    entries: [
      {
        index: '01',
        title: 'Zhongnan University of Economics and Law',
        subtitle: 'Public Finance · Bachelor of Economics',
        description:
          'Training in public finance taught me to look at complex problems through data, constraints and outcomes.',
        tags: ['Bachelor of Economics', 'Public Finance', 'Project 211 University'],
      },
      {
        index: '02',
        title: 'Certified Public Accountant (CPA)',
        subtitle: 'Professional Stage Passed · China',
        description:
          'CPA training strengthened my attention to evidence, boundaries and risk—habits I carry into API design, data modelling and delivery.',
        tags: [
          'Accounting & Auditing',
          'Tax & Commercial Law',
          'Financial & Cost Management',
          'Strategy & Risk Management',
        ],
      },
    ],
  },
  capabilities: [
    {
      index: '01',
      title: 'Interface and product experience',
      description:
        'Turn complex information into clear, usable interfaces, with attention to hierarchy, accessibility and long-term maintenance.',
      stack: ['React', 'Next.js', 'TypeScript', 'React Native', 'Vue'],
    },
    {
      index: '02',
      title: 'Services and data boundaries',
      description:
        'Break domains into clear APIs, data models and service boundaries, then work through queries, state and consistency.',
      stack: ['Go', 'Node.js', 'PostgreSQL', 'MongoDB', 'REST', 'WebSocket'],
    },
    {
      index: '03',
      title: 'Engineering delivery',
      description:
        'Make features more than locally runnable: testable, deployable, observable and ready to improve.',
      stack: ['Testing', 'Docker', 'Caddy', 'Git'],
    },
    {
      index: '04',
      title: 'AI-assisted problem solving',
      description:
        'Use AI to break down problems, compare architectural options, draft implementations and surface edge cases, then verify the output through code, tests and real execution.',
      stack: ['AI-assisted workflow', 'Prompt design', 'Edge cases', 'Verification'],
    },
  ],
  principles: [
    {
      title: 'Define the problem first',
      description: 'Before choosing a stack, clarify the goal, constraints and problem that actually needs solving.',
    },
    {
      title: 'Put boundaries and details into the design',
      description:
        'Pay attention to naming, permissions, failure paths, loading states and data boundaries so reliability becomes concrete.',
    },
    {
      title: 'Let AI accelerate exploration; let review drive progress',
      description:
        'Let AI participate in exploration, summarising and drafting, while final judgment stays grounded in boundaries, tests and real execution. Every review becomes a starting point for the next improvement.',
    },
  ],
} as const;

const englishChatifyCase: ProjectCaseStudy = {
  projectSlug: 'chatify',
  heroKicker: 'CASE STUDY / REALTIME SYSTEM',
  title: 'From a BaaS prototype to a Go realtime messaging path',
  description:
    "A Go, PostgreSQL and WebSocket backend added around Chatify's query-cost and N+1 problems while preserving the Next.js and Convex capabilities still needed during migration.",
  problem:
    'The original implementation kept most conversation and message data in Convex. As relational reads grew, the lack of SQL joins turned a page load into many queries. The goal is not a language swap: it is to establish an explicit model for conversations, members, messages and unread state, then persist each message before realtime delivery.',
  media: [
    {
      src: '/projects/chatify/architecture.svg',
      alt: 'Chatify architecture showing Next.js, Clerk, Go WebSocket, PostgreSQL and LiveKit boundaries',
      caption: 'Boundaries for identity sync, history reads, message persistence, realtime broadcast and media rooms.',
      width: 1600,
      height: 900,
      role: 'architecture',
    },
  ],
  sections: {
    problem: { kicker: '01 / PROBLEM', title: 'Why rebuild the backend?' },
    flow: { kicker: '02 / MESSAGE FLOW', title: 'How a message is persisted and delivered' },
    decisions: { kicker: '03 / ENGINEERING DECISIONS', title: 'Decisions visible in the code' },
    boundaries: {
      kicker: '04 / CURRENT BOUNDARIES',
      title: 'What is not production-ready yet',
      intro: 'These risks are verifiable in the current code and should be addressed before the next production-oriented iteration.',
    },
    next: { kicker: '05 / NEXT ITERATION', title: 'What to improve next' },
  },
  goals: [
    'Represent conversations, members, friendships and messages relationally',
    'Persist messages before broadcasting them to active connections',
    "Connect native SQL to Go's type system through generated code",
    'Retain Clerk identity and LiveKit media capabilities',
  ],
  flow: [
    {
      label: '01',
      title: 'Identity',
      description:
        'Next.js obtains a Clerk session token; Clerk webhooks synchronize user profiles after Svix signature verification.',
    },
    {
      label: '02',
      title: 'History',
      description: 'React Query loads message history through REST and validates the response at runtime with Zod.',
    },
    {
      label: '03',
      title: 'Connect',
      description:
        'The browser opens a WebSocket using the Clerk token as a subprotocol, and Go middleware resolves the identity.',
    },
    {
      label: '04',
      title: 'Persist',
      description:
        "readPump parses the message, then sqlc executes a CTE that stores it and updates the conversation's last-message reference.",
    },
    {
      label: '05',
      title: 'Broadcast',
      description:
        "The Hub groups clients by conversation ID and each connection's writePump delivers outbound messages.",
    },
  ],
  decisions: [
    {
      title: 'Replace repeated assembly with a relational model',
      implementation:
        'PostgreSQL models users, conversations, members, messages and friends in separate tables. CTEs and joins return members, the latest message and unread counts together.',
      value:
        'Implicit data dependencies become database constraints and reviewable SQL, giving N+1, indexing and consistency work a concrete entry point.',
    },
    {
      title: 'Keep SQL as the contract and generate Go types',
      implementation:
        'Queries live in a dedicated directory; sqlc generates parameter and result types, while ordered golang-migrate migrations record schema changes.',
      value:
        'This retains control over SQL while reducing handwritten scans, field-order mistakes and model/query drift.',
    },
    {
      title: 'Persist successfully before realtime broadcast',
      implementation:
        'After readPump receives a message, it runs CreateMessage, loads the complete row with sender data, and only then writes to the Hub broadcast channel.',
      value:
        'Clients receive a message that already has a database ID and timestamp, preventing ghost messages caused by broadcasting before a failed write.',
    },
    {
      title: 'Isolate connections and broadcast scope by conversation',
      implementation:
        'The Hub maps conversation IDs to client sets. Each client owns an independent buffered send channel and read/write goroutines.',
      value:
        'Broadcasting only scans the relevant conversation, and a dedicated writer keeps one network operation from directly blocking reads.',
    },
    {
      title: 'Decouple media from text messaging',
      implementation:
        'The custom WebSocket and PostgreSQL path owns text. LiveKit owns audio/video, while a non-cacheable Next.js handler only signs short-lived room tokens.',
      value:
        'The application controls its data path without rebuilding WebRTC media infrastructure inside the business service.',
    },
    {
      title: 'Separate server state from form state',
      implementation:
        'React Query manages message history, Zod validates REST responses and React Hook Form manages input. WebSocket events update the targeted conversation cache.',
      value:
        'This reduces coupling among request state, message lists and input, leaving clearer boundaries for reconnection and optimistic updates.',
    },
  ],
  boundaries: [
    {
      level: '高',
      title: 'Conversation authorization is incomplete',
      description:
        'The handshake validates Clerk identity, but hasAccessToConversation currently returns true and sender ID comes from the client. The server must map the token to a database user and query conversation_members before upgrading.',
    },
    {
      level: '高',
      title: 'The WebSocket trust boundary is too broad',
      description:
        'CheckOrigin currently accepts every origin. Trusted origins must be configured and sender identity must be derived server-side.',
    },
    {
      level: '中',
      title: 'Connection lifecycle and delivery semantics are incomplete',
      description:
        'There is no ping/pong, deadline, automatic reconnect, acknowledgement or idempotency key. The frontend may also replace an existing onmessage handler when sending.',
    },
    {
      level: '中',
      title: 'The Hub is single-instance only',
      description:
        'Connections and broadcast channels live in process memory. Horizontal scaling needs Redis Pub/Sub, NATS or another cross-node channel plus explicit ordering and retry semantics.',
    },
    {
      level: '中',
      title: 'Concurrency safeguards and observability are thin',
      description:
        'The broadcast path removes clients while holding a read lock and database writes use context.Background. Metrics for connections, delivery failures and latency are also missing.',
    },
  ],
  nextSteps: [
    'Implement conversation membership authorization, trusted origins and server-derived sender IDs',
    'Refactor the frontend WebSocket provider around shared listeners, reconnect, backoff and recovery',
    'Add race tests, integration tests and failure scenarios for the Hub and message writes',
    'Define message idempotency keys, acknowledgement and offline compensation',
    'Add structured logs and connection, broadcast and database latency metrics before horizontal scaling',
  ],
};

const englishLinzeProCase: ProjectCaseStudy = {
  projectSlug: 'linze-pro',
  heroKicker: 'CASE STUDY / CONTENT PLATFORM',
  title: 'From a Vue Blog to a Bilingual Next.js Content Platform',
  description:
    'A server-first rebuild of a Vue blog with Next.js App Router, keeping the Go/chi content API and existing article model while adding Markdown publishing, bilingual fallback, SEO, article engagement and content administration flows.',
  problem:
    'The old Vue frontend had component and rendering boundaries that were difficult to extend, while article display, language switching, SEO and engagement logic were becoming coupled. The goal was not to translate Vue files one by one, but to rebuild the content path from Markdown editing and versioning to public reading without replacing the existing Go backend or article data.',
  media: [
    {
      src: '/projects/linze-pro/architecture.svg',
      alt: 'Linze.pro content architecture showing Markdown authoring, Go API, PostgreSQL, Next.js rendering and SEO delivery',
      caption: 'The path from Markdown authoring through the Go API and PostgreSQL to Next.js server rendering and SEO output.',
      width: 1600,
      height: 900,
      role: 'architecture',
    },
  ],
  sections: {
    problem: { kicker: '01 / MIGRATION BRIEF', title: 'Why rebuild the blog frontend?' },
    flow: { kicker: '02 / CONTENT LIFECYCLE', title: 'How an article moves from Markdown to a public page' },
    decisions: { kicker: '03 / ENGINEERING DECISIONS', title: 'Decisions visible in the code' },
    boundaries: {
      kicker: '04 / CURRENT BOUNDARIES',
      title: 'What still needs to converge',
      intro: 'These limitations are verifiable in the current code and provide concrete entry points for the next iteration of the content platform.',
    },
    next: { kicker: '05 / NEXT ITERATION', title: 'What to improve next' },
  },
  goals: [
    'Keep the Go content API and existing article data while replacing the public frontend incrementally',
    'Make Markdown Front-matter a validated and versioned content entry point',
    'Support Chinese and English through independent versions and explicit fallback state',
    'Treat SEO, reading experience, engagement and observability as one delivery path',
  ],
  flow: [
    {
      label: '01',
      title: 'Authoring',
      description:
        'An authenticated Next.js admin workspace uploads or edits Markdown files, while JWT and RBAC protect publishing and update endpoints.',
    },
    {
      label: '02',
      title: 'Validate',
      description:
        'The Go backend parses Front-matter, validates the slug, title, content length, tag count and dates, then normalises duplicate tags.',
    },
    {
      label: '03',
      title: 'Persist',
      description:
        'Publishing and updates write post_translations, revision snapshots and engagement records in a transaction, while synchronising legacy posts fields for compatibility.',
    },
    {
      label: '04',
      title: 'Resolve',
      description:
        'A Next.js Server Component requests the target locale; the Go store prefers an exact match, falls back to Chinese when needed and returns the available locales and fallback state.',
    },
    {
      label: '05',
      title: 'Render',
      description:
        'The server renders Markdown, the table of contents, highlighted code and structured data. The browser then uses a separate engagement endpoint for views and anonymous likes.',
    },
  ],
  decisions: [
    {
      title: 'Migrate incrementally instead of rewriting the backend',
      implementation:
        'The public frontend moves to Next.js App Router while continuing to use the Go/chi REST API, PostgreSQL and existing article data. Legacy Vue-compatible endpoints remain available during the transition.',
      value:
        'Migration risk stays within frontend rendering and content boundaries, allowing the old site, new site and data layer to coexist while the system changes.',
    },
    {
      title: 'Model bilingual content as translation records',
      implementation:
        'post_translations uses (post_slug, locale) as a composite key, while post_translation_revisions stores snapshots for each language. Reads return requestedLocale, resolvedLocale and fallback explicitly.',
      value:
        'Chinese and English can be published independently, and missing content is handled by the backend instead of guessed by the frontend.',
    },
    {
      title: 'Keep Markdown parsing and version rules at the backend boundary',
      implementation:
        'Go centrally parses YAML Front-matter and validates slugs, field lengths, tags and dates. Updates include the previous version, increment it on success and append a revision snapshot.',
      value:
        'Content format and concurrent update rules stay in one service boundary, preventing silent overwrites between admin sessions.',
    },
    {
      title: 'Render public content server-first',
      implementation:
        'Next.js Server Components fetch article data and generate Metadata, Canonical, alternate links, Open Graph, Article JSON-LD, sitemap and RSS output. Markdown uses GFM, heading slugs, code highlighting and a table of contents.',
      value:
        'SEO, first-screen content and reading structure remain available on the server, while personalised likes are isolated to client-side requests.',
    },
    {
      title: 'Make anonymous engagement idempotent and bounded',
      implementation:
        'The backend issues a signed HttpOnly visitor cookie and stores only an HMAC-derived hash in Redis and PostgreSQL. A unique constraint and transaction make likes idempotent, while daily views use deduplication and Redis provides fast filtering and rate limiting.',
      value:
        'Visitors can like without creating an account and see their state again without treating a client-side counter as the source of truth.',
    },
    {
      title: 'Treat observability as part of the content service',
      implementation:
        'The Go API exposes Prometheus HTTP, database and business metrics and optionally exports HTTP, database and Redis spans through OpenTelemetry OTLP/gRPC. Health, readiness, timeouts and graceful shutdown manage the service lifecycle.',
      value:
        'Article requests, translation fallbacks, engagement writes and infrastructure bottlenecks have traceable entry points instead of relying only on user reports.',
    },
  ],
  boundaries: [
    {
      level: '高',
      title: 'The legacy and new content models still coexist',
      description:
        'post_translations is now the main path for localised reads and versioning, but the legacy posts columns remain and are synchronised on publish and update. The next step is to define one source of truth and retire the compatibility write path.',
    },
    {
      level: '中',
      title: 'Search and filtering need a server-side path at scale',
      description:
        'The frontend currently fetches a bounded set of posts and performs part of the filtering locally. A larger archive should move search, tags, years and pagination into the Go API with stable ordering and indexes.',
    },
    {
      level: '中',
      title: 'Content images do not yet have a complete optimisation path',
      description:
        'Markdown images currently render as ordinary img elements without intrinsic dimensions. Dimensions, responsive loading and CDN or cache policy should be added to improve CLS and mobile loading.',
    },
    {
      level: '中',
      title: 'Redis rate limiting is a degradable guard, not absolute anti-abuse',
      description:
        'Engagement requests fail open when Redis is unavailable to preserve blog availability, and visitors can clear their cookie. This provides baseline deduplication and throttling, not strong identity or complete abuse prevention.',
    },
    {
      level: '中',
      title: 'AI is a development workflow, not a product capability here',
      description:
        'AI can assist problem decomposition, option comparison and implementation review, but this project does not currently integrate an LLM API, RAG, embeddings or an agent. The case study does not present those as implemented features.',
    },
  ],
  nextSteps: [
    'Converge on post_translations as the single content source and retire legacy dual writes',
    'Move search, tag filtering, archive and pagination into the Go API with precise cache invalidation',
    'Add image dimensions, responsive loading and observable Core Web Vitals metrics for Markdown media',
    'Add end-to-end coverage for publishing, locale fallback, version conflicts and engagement idempotency',
    'Complete publishing audit, rollback and targeted cache refresh flows in the admin workspace',
  ],
};

const englishCabinFyCase: ProjectCaseStudy = {
  projectSlug: 'cabinfy',
  heroKicker: 'CASE STUDY / PRODUCT ENGINEERING',
  title: 'From a course prototype to a bilingual cabin-booking platform',
  description:
    'A React, React Query and Tailwind CSS rebuild of a guest booking experience and admin workspace, backed by Node.js, Express, Prisma and PostgreSQL for cabins, bookings, reviews and operational settings.',
  problem:
    'CabinFy serves two audiences: guests who want to discover and book cabins, and administrators who need to manage listings, reservations and check-in workflows. The challenge was not simply rendering a list of cabins, but organising two user experiences around one business data model, including routes, server state, forms, tables and responsive interaction.',
  media: [
    {
      src: 'https://file.linze.pro/images/cabinfy/1.webp',
      alt: 'CabinFy accommodation application interface screenshot 1',
      caption: 'Real CabinFy interface screenshot (1).',
      width: 1600,
      height: 900,
      role: 'screen',
    },
    {
      src: 'https://file.linze.pro/images/cabinfy/5.webp',
      alt: 'CabinFy accommodation application interface screenshot 5',
      caption: 'Real CabinFy interface screenshot (5).',
      width: 1600,
      height: 900,
      role: 'screen',
    },
  ],
  sections: {
    problem: { kicker: '01 / PRODUCT SCOPE', title: 'Why build a two-sided accommodation product?' },
    flow: { kicker: '02 / BOOKING FLOW', title: 'How a booking moves from discovery to operations' },
    decisions: { kicker: '03 / ENGINEERING DECISIONS', title: 'Frontend and full-stack decisions visible in the code' },
    boundaries: {
      kicker: '04 / CURRENT BOUNDARIES',
      title: 'Backend boundaries that still need to converge',
      intro: 'The frontend and business flows have a clear shape, while authorization, booking consistency and production safeguards remain the next engineering focus.',
    },
    next: { kicker: '05 / NEXT ITERATION', title: 'What to improve next' },
  },
  goals: [
    'Organise guest and admin experiences around one cabin and booking data model',
    'Separate server state from local interaction state with React Query',
    'Keep the frontend maintainable through validation, reusable primitives and lazy loading',
    'Provide a consistent experience across languages, themes and screen sizes',
  ],
  flow: [
    {
      label: '01',
      title: 'Discover',
      description: 'Guests browse the cabin catalogue and use filtering, sorting and pagination to find available stays.',
    },
    {
      label: '02',
      title: 'Decide',
      description: 'The cabin detail page brings together images, description, price, location and reviews while guests choose dates and capacity.',
    },
    {
      label: '03',
      title: 'Calculate',
      description: 'The booking form presents an estimate based on dates, nights, guests and breakfast options before submission.',
    },
    {
      label: '04',
      title: 'Book',
      description: 'After signing in, the frontend uses the JWT cookie to call the protected booking endpoint and submit the form.',
    },
    {
      label: '05',
      title: 'Operate',
      description: 'Administrators use the dashboard, bookings, cabins and check-in screens to handle reservations, listings and stay status.',
    },
  ],
  decisions: [
    {
      title: 'Use React Query for server state',
      implementation:
        'Cabins, bookings, reviews and settings are fetched through dedicated query hooks, while create, update and delete operations use mutation hooks with shared loading, error and update states.',
      value:
        'Server data stays separate from local UI state instead of coupling request results, form input and modal state in one global container.',
    },
    {
      title: 'Organise the frontend by business boundaries',
      implementation:
        'The features directory separates authentication, bookings, cabins, check-in/out, dashboard, guests and settings, combining page components, forms and data hooks within each domain.',
      value:
        'Business entry points are easier to find, while lists, forms, dialogs and request logic can be reused within a coherent domain boundary.',
    },
    {
      title: 'Separate guest and admin route boundaries',
      implementation:
        'React Router keeps /admin/* apart from the guest-facing pages. The admin workspace has its own layout and ProtectedRoute, while the guest flow centres on discovery, cabin details and booking.',
      value:
        'The two audiences get different information hierarchies and operation boundaries while sharing the same API and domain data.',
    },
    {
      title: 'Use lazy routes and skeletons for transitions',
      implementation:
        'Dashboard, bookings, cabins, home and cabin pages load through React.lazy and Suspense, with dedicated skeletons for cabin lists and details.',
      value:
        'Route-level code splitting reduces the initial JavaScript payload, while stable placeholders reduce blank states and layout movement during requests.',
    },
    {
      title: 'Keep validation and UI primitives consistent',
      implementation:
        'React Hook Form manages form state, Zod handles runtime validation, and shared Table, Dialog, Select, Form and Sheet primitives support both guest and admin interactions.',
      value:
        'Different flows—cabins, bookings, authentication and settings—share predictable validation and feedback patterns instead of bespoke form logic.',
    },
    {
      title: 'Treat language, theme and responsiveness as product capabilities',
      implementation:
        'react-i18next detects the browser language and loads English and Chinese JSON locales, while Tailwind responsive styles, DarkModeProvider and mobile layouts cover different devices and preferences.',
      value:
        'Internationalisation and accessible visual choices are part of the interface foundation rather than a final-page patch.',
    },
  ],
  boundaries: [
    {
      level: '高',
      title: 'Backend authorization is not consistent yet',
      description:
        'ProtectedRoute guards the admin UI, but some cabin mutations, booking operations and settings updates still lack a single server-side authentication and ADMIN role boundary. The backend should be the final authority.',
    },
    {
      level: '高',
      title: 'Booking consistency cannot rely on client forms alone',
      description:
        'The create-booking path validates input, but date overlap checks, concurrent booking protection, server-side price calculation and transaction boundaries still need strengthening to avoid duplicate reservations or tampered totals.',
    },
    {
      level: '中',
      title: 'Session and JWT authentication are used together',
      description:
        'Administrators and guests use Passport sessions and JWT cookies respectively. This can work, but cookie security, refresh and revocation, CORS, rate limiting and a unified error contract need further convergence.',
    },
    {
      level: '中',
      title: 'Testing and observability are still thin',
      description:
        'The current system mainly relies on Morgan and application logs. A fuller health, metrics and tracing layer, together with tests for booking conflicts, authorization and failure recovery, is still needed.',
    },
    {
      level: '中',
      title: 'Money and deployment configuration need stricter production constraints',
      description:
        'Money fields use Float and deployment files contain environment-specific paths and security options. Decimal values, environment-driven configuration and explicit production cookie and CORS settings should come next.',
    },
  ],
  nextSteps: [
    'Add consistent authentication and ADMIN role middleware to cabin, booking and settings writes',
    'Recalculate totals on the server and use transactions plus date-overlap checks for booking consistency',
    'Converge Session and JWT security policy with Secure Cookie, SameSite, CORS and login rate limiting',
    'Add API integration, frontend interaction and end-to-end booking tests',
    'Add health checks, structured logs and baseline metrics before evaluating cache or asynchronous work',
  ],
};

const englishMovieFyCase: ProjectCaseStudy = {
  projectSlug: 'moviefy',
  heroKicker: 'CASE STUDY / MEDIA PLATFORM',
  title: 'From a movie review app to a two-sided content platform',
  description:
    'A movie content platform for viewers and administrators. React, Tailwind CSS and shadcn/ui shape discovery, playback, cast, reviews and content operations, while Node.js, Express, MongoDB and JWT support the content and authentication paths.',
  problem:
    'MovieFy serves two audiences: viewers who want to discover, watch and review movies, and administrators who maintain movies, actors, media files and user reviews. The challenge was not simply building a movie list, but organising two information hierarchies around one content model: a smooth discovery experience for users and a complex, relational content workspace for administrators.',
  sections: {
    problem: { kicker: '01 / PRODUCT SCOPE', title: 'Why does a movie app need two experiences?' },
    flow: { kicker: '02 / MOVIE EXPERIENCE', title: 'How a movie moves from content management to viewing' },
    decisions: { kicker: '03 / ENGINEERING DECISIONS', title: 'Frontend and full-stack decisions visible in the code' },
    boundaries: {
      kicker: '04 / CURRENT BOUNDARIES',
      title: 'Backend and state boundaries that still need to converge',
      intro: 'The frontend product and content flows have a clear shape, while authentication safety, data consistency and error contracts remain the next engineering focus.',
    },
    next: { kicker: '05 / NEXT ITERATION', title: 'What to improve next' },
  },
  goals: [
    'Organise viewer and admin experiences around one movie, actor and review model',
    'Handle movie metadata, cast relationships and media uploads through composable forms',
    'Support search, playback, ratings, reviews, related movies and localised content',
    'Keep interactions consistent across themes, mobile layouts and dense admin tables',
  ],
  flow: [
    {
      label: '01',
      title: 'Discover',
      description: 'The home page uses a hero carousel, latest uploads and genre-based top-rated lists to help viewers find movies.',
    },
    {
      label: '02',
      title: 'Search',
      description: 'Viewers search by title while Search Context and debounce logic reduce repeated requests and expose result states.',
    },
    {
      label: '03',
      title: 'Explore',
      description: 'The movie detail page brings together video, story, director, writer, cast, genres, language, release date and related movies.',
    },
    {
      label: '04',
      title: 'Review',
      description: 'Signed-in viewers can submit ratings, read reviews, and edit or remove their own review.',
    },
    {
      label: '05',
      title: 'Operate',
      description: 'Administrators use the dashboard, movies, actors and search screens to manage media, people and publication status.',
    },
  ],
  decisions: [
    {
      title: 'Use composable forms for complex movie data',
      implementation:
        'MovieForm combines React Hook Form and Zod for title, storyline, genres, tags, director, writer, cast, release date, language, status, poster and video fields.',
      value:
        'A form that could easily become unmaintainable is split into validated fields and reusable selectors, with shared interaction for create and edit modes.',
    },
    {
      title: 'Connect cast relationships through debounced search',
      implementation:
        'LiveSearch, LiveSearchCast, DirectorSelector and WriterSelector provide live search, keyboard navigation, multi-select presentation and duplicate filtering for people relationships.',
      value:
        'Administrators can build movie relationships during content entry instead of manually finding and entering database identifiers.',
    },
    {
      title: 'Treat viewer and admin surfaces as two product experiences',
      implementation:
        'App switches between the user routes and AdminNavigator based on the authenticated role. The user side centres on discovery, playback and reviews, while the admin side centres on dashboards, movies and actors.',
      value:
        'Each audience gets an appropriate information hierarchy, navigation and interaction density while sharing movie, actor and review APIs.',
    },
    {
      title: 'Make media upload part of content publishing',
      implementation:
        'The backend receives images and videos through Multer, uploads them to Cloudinary, and stores URLs, public IDs and responsive poster variants. The frontend validates file types and sizes in the form.',
      value:
        'Movies are more than text CRUD: posters, video assets, CDN resources and metadata move through one publishing workflow.',
    },
    {
      title: 'Use Context boundaries for cross-page state',
      implementation:
        'AuthProvider restores login state and tokens, MoviesProvider handles paginated movie data, SearchProvider manages search results and ThemeProvider persists the selected theme.',
      value:
        'Shared authentication, search, movie list and theme state have explicit boundaries instead of being recreated independently on every page.',
    },
    {
      title: 'Batch rating aggregation for list views',
      implementation:
        'MongoDB aggregation calculates average ratings, review counts, related movies and top-rated movies. getAverageRatingsMap combines multiple rating lookups into one aggregation instead of repeating a query per movie.',
      value:
        'The flexible document model remains useful while homepage lists and related content get a more controlled data access path.',
    },
  ],
  boundaries: [
    {
      level: '高',
      title: 'JWT storage and lifecycle need strengthening',
      description:
        'The frontend currently stores the JWT in localStorage, while the backend does not visibly set an expiry, refresh or revocation strategy when signing tokens. HttpOnly cookies, short-lived access tokens and refresh-token rotation should be evaluated next.',
    },
    {
      level: '高',
      title: 'Email verification is not enforced by the review endpoint',
      description:
        'The project implements OTP email verification and an isVerified field, but the review controller still contains a commented verification check. Reviews should not be described as restricted to verified users yet.',
    },
    {
      level: '中',
      title: 'Review and movie references lack a transaction boundary',
      description:
        'Adding or removing a review updates both the Review document and Movie.reviews array, but there is no MongoDB session transaction or unique index to guard concurrent duplicate reviews and partial failures.',
    },
    {
      level: '中',
      title: 'Error contracts and status codes are not fully consistent',
      description:
        'Some validation failures return an error payload with a successful status, while JWT failures need explicit mapping to authentication errors. The frontend currently consumes mostly string errors through toast notifications.',
    },
    {
      level: '中',
      title: 'Frontend server state and search state are simplified',
      description:
        'Several Context providers and module-level pagination or debounce variables hold state. As the dataset grows, server state can move to React Query and search or pagination state can become URL-addressable.',
    },
  ],
  nextSteps: [
    'Move JWT authentication to a secure, expiring cookie strategy with refresh and revocation support',
    'Enforce email verification in the review endpoint and add a unique owner-plus-movie constraint',
    'Use a MongoDB session transaction to keep Review and Movie references consistent',
    'Unify 4xx/5xx error codes and localised frontend messages, with request-level structured logs',
    'Move movie, search and pagination data to React Query and add end-to-end viewer and admin flows',
  ],
};

const englishPetifyCase: ProjectCaseStudy = {
  projectSlug: 'petify',
  heroKicker: 'CASE STUDY / COMMERCE SYSTEM',
  title: 'From a storefront to a three-surface commerce system',
  description:
    'Petify separates a customer storefront, seller operations dashboard and Express API into three independent applications. It covers product discovery, filtering, carts, orders, reviews, realtime support and operational analytics with React, Redux, Tailwind CSS, Node.js, MongoDB, Cloudinary, Docker and Caddy.',
  problem:
    'Petify was not simply a product list. It had to organise three different experiences around the same users, products, orders and conversations: customers need a clear path from discovery to purchase, sellers need a dense operations workspace, and support needs low-latency communication. The project therefore separates the storefront, seller surface and API, then connects commerce and conversations through REST, Redux and Socket.IO.',
  media: [
    {
      src: 'https://file.linze.pro/images/petify/3.webp',
      alt: 'Petify commerce application interface screenshot 3',
      caption: 'Real Petify interface screenshot (3).',
      width: 1600,
      height: 900,
      role: 'screen',
    },
    {
      src: 'https://file.linze.pro/images/petify/7.webp',
      alt: 'Petify commerce application interface screenshot 7',
      caption: 'Real Petify interface screenshot (7).',
      width: 1600,
      height: 900,
      role: 'screen',
    },
    {
      src: 'https://file.linze.pro/images/petify/10.webp',
      alt: 'Petify commerce application interface screenshot 10',
      caption: 'Real Petify interface screenshot (10).',
      width: 1600,
      height: 900,
      role: 'screen',
    },
  ],
  sections: {
    problem: { kicker: '01 / PRODUCT SURFACES', title: 'Why split commerce into three applications?' },
    flow: { kicker: '02 / COMMERCE FLOW', title: 'How a purchase moves from discovery to operations' },
    decisions: { kicker: '03 / FRONTEND ENGINEERING', title: 'Product and engineering decisions visible in the code' },
    boundaries: {
      kicker: '04 / CURRENT BOUNDARIES',
      title: 'A complete frontend experience, with transaction boundaries still to close',
      intro: 'The storefront and seller workspace form a clear product skeleton. Identity boundaries, order consistency, realtime connections and the payment path are the most important next engineering problems.',
    },
    next: { kicker: '05 / NEXT ITERATION', title: 'What to improve next' },
  },
  goals: [
    'Separate the customer storefront, seller operations dashboard and Express API into independent application boundaries',
    'Create a continuous customer experience across discovery, carts, orders, reviews and support',
    'Use Redux, React Router and Tailwind to organise cross-screen state and responsive interfaces',
    'Give sellers one workspace for products, orders, metrics and customer conversations',
  ],
  flow: [
    {
      label: '01',
      title: 'Discover',
      description:
        'Customers start with the home banner, categories and product lists. The API returns latest, top-rated and discounted products, while the frontend shapes the discovery path.',
    },
    {
      label: '02',
      title: 'Filter',
      description:
        'The shop combines category, price range, rating, keyword and price sorting while keeping the same filters across grid/list views and pagination.',
    },
    {
      label: '03',
      title: 'Decide',
      description:
        'Product details bring together images, description, stock, discount, rating, reviews, related products and more products from the same seller.',
    },
    {
      label: '04',
      title: 'Cart',
      description:
        'Customers add products to a cart or wishlist, adjust quantities, check stock and provide shipping information at checkout.',
    },
    {
      label: '05',
      title: 'Order',
      description:
        'The order path creates a customer order and seller sub-orders, removes cart items and exposes status through the customer dashboard.',
    },
    {
      label: '06',
      title: 'Operate',
      description:
        'Sellers use the dashboard, products, categories, orders, payment stats and support views for daily operations, while Socket.IO surfaces active customers and messages.',
    },
  ],
  decisions: [
    {
      title: 'Treat storefront, seller surface and API as product boundaries',
      implementation:
        'The frontend and dashboard are independent Vite React applications. The backend owns the Express REST API, MongoDB, uploads and Socket.IO, while Caddy routes pet.linze.pro and seller.pet.linze.pro to the corresponding static assets and API.',
      value:
        'The storefront and seller workspace can have different information density, navigation and interaction models while sharing one business data layer.',
    },
    {
      title: 'Organise cross-screen commerce state with Redux Toolkit',
      implementation:
        'The storefront keeps separate auth, home, cart, order, dashboard and chat reducers. The dashboard has auth, product, category, seller, order and chat state of its own.',
      value:
        'Product details, carts, orders, dashboards and conversations have stable state entry points instead of rebuilding the same cross-screen interactions in each page.',
    },
    {
      title: 'Design the seller workspace around daily operations',
      implementation:
        'The dashboard combines protected routes, lazy loading, product and order tables, search, pagination, charts and a react-window virtual list for product, order, payment and support views.',
      value:
        'The dashboard is not just an extension of the storefront: it gives product management, order processing, sales metrics and support their own high-density workflow.',
    },
    {
      title: 'Combine REST persistence with Socket.IO delivery',
      implementation:
        'Chat controllers save Customer, Seller and Admin messages to MongoDB. Socket.IO tracks in-process connections and delivers messages to active recipients, while Redux updates the conversation state in the clients.',
      value:
        'Queryable history and low-latency interaction have separate responsibilities: REST provides durable reads and Socket.IO handles the online feedback path.',
    },
    {
      title: 'Make localisation, theme and responsiveness part of the UI foundation',
      implementation:
        'The storefront uses react-i18next and browser-language detection for English and Chinese copy. Tailwind covers product, detail, cart and mobile layouts, while the dashboard uses ThemeProvider and a responsive sidebar.',
      value:
        'The product is not limited to one language or desktop viewport; language, device size and visual preference have explicit places in the interface structure.',
    },
    {
      title: 'Include media and deployment in the delivery path',
      implementation:
        'Formidable receives product images and profile uploads, Cloudinary hosts media URLs, Docker Compose runs MongoDB and the backend, Makefile builds the two static applications, and Caddy provides HTTPS, SPA fallback and proxying.',
      value:
        'The project covers content entry, static asset publishing, API routing and server deployment instead of stopping at a local development setup.',
    },
  ],
  boundaries: [
    {
      level: '高',
      title: 'The order API still trusts too much client data',
      description:
        'placeOrder receives userId, product structures, price and shipping information from the client. The code does not yet fully show server-side price reloading, stock validation, atomic inventory decrement, idempotency or a transaction boundary. The cart-to-order flow works, but it should not be presented as a strongly consistent transaction system.',
    },
    {
      level: '高',
      title: 'Customer API and role boundaries are not unified yet',
      description:
        'Some cart, wishlist, review and order endpoints use a userId from the URL or request body, while dashboard routes mainly rely on a shared auth middleware. The next step is deriving identity from the token and converging Customer, Seller and Admin authorization.',
    },
    {
      level: '高',
      title: 'Socket.IO is single-instance and lacks connection authentication',
      description:
        'Online customers, sellers and the admin are stored in process arrays and one admin variable, while connection events depend on client-provided IDs. There is no Redis adapter, acknowledgement, retry, offline queue or multi-instance broadcast path.',
    },
    {
      level: '中',
      title: 'Product filtering and dashboard analytics need a database path at scale',
      description:
        'Public product filtering first loads all products and then performs category, price, rating, search, sorting and pagination in Node memory. Dashboard metrics also read broad order sets. Larger data should move into MongoDB queries, aggregations and indexes.',
    },
    {
      level: '中',
      title: 'Payments and production safeguards are not a complete loop yet',
      description:
        'The Stripe code mainly creates a Seller Connect onboarding link; Checkout, Payment Intent and Webhook confirmation are not visible. The project also needs a fuller test suite, rate limiting, health checks, structured logs and CI/CD.',
    },
  ],
  nextSteps: [
    'Derive customer identity from authenticated tokens and complete server-side Customer, Seller and Admin RBAC',
    'Recalculate totals and stock on the server, then protect checkout with MongoDB transactions, atomic updates and idempotency keys',
    'Add JWT handshake auth, trusted origins, rooms, acknowledgements, reconnection and a Redis Socket.IO adapter',
    'Move filters, pagination and dashboard metrics into MongoDB queries and aggregations with supporting indexes',
    'Add Stripe Payment Intent and Webhook flows, order audit events, integration tests, health checks and structured observability',
  ],
};

const englishHomestayCase: ProjectCaseStudy = {
  projectSlug: 'homestay',
  heroKicker: 'CASE STUDY / GO TRANSACTION SYSTEM',
  title: 'From inventory calendars to idempotent payments in Go',
  description:
    'A WeChat Mini Program homestay-booking MVP. Homestay uses Go, Gin, GORM, MySQL, Redis and WeChat Pay API v3 to connect daily inventory, dynamic pricing, server-side quotes, idempotent orders, inventory locking, order expiration and payment notification confirmation.',
  problem:
    'Homestay booking is more than listing CRUD: inventory changes by stay date, prices can vary night by night, and retries, expiration and payment notifications can modify the same order and stock concurrently. The project keeps MySQL as the source of truth for money and inventory, limits Redis to invalidatable calendar reads, and puts pricing, stock locking and payment confirmation behind explicit server-side transaction boundaries.',
  media: [
    {
      src: '/projects/homestay/architecture.svg',
      alt: 'Homestay booking architecture showing the WeChat Mini Program, Nginx, Go API, MySQL, Redis, worker and WeChat Pay',
      caption: 'Boundaries between the Mini Program, Go API, MySQL source of truth, Redis calendar cache, expiry worker and WeChat Pay.',
      width: 1600,
      height: 900,
      role: 'architecture',
    },
  ],
  sections: {
    problem: { kicker: '01 / BACKEND BRIEF', title: 'Why this booking backend deserves a closer look' },
    flow: { kicker: '02 / BOOKING FLOW', title: 'How one booking moves through inventory and payment' },
    decisions: { kicker: '03 / ENGINEERING DECISIONS', title: 'Backend decisions visible in the code' },
    boundaries: {
      kicker: '04 / CURRENT BOUNDARIES',
      title: 'Current implementation boundaries and risks',
      intro: 'These limitations are directly verifiable in the Go code, deployment configuration and runtime model; they should not be presented as completed production capabilities.',
    },
    next: { kicker: '05 / NEXT ITERATION', title: 'What to improve next' },
  },
  goals: [
    'Represent availability and price with a daily inventory model instead of one total room count',
    'Recalculate quotes on the server and protect concurrent checkout with transactions and row locks',
    'Use Idempotency-Key and unique constraints to handle retries and repeated submissions',
    'Connect WeChat Pay preparation, notification verification and payment confirmation to order state',
    'Use Redis for calendar reads without making it the source of truth for money or inventory',
  ],
  flow: [
    {
      label: '01',
      title: 'Discover',
      description:
        'The Mini Program loads homestays, room types and a date-range calendar through Gin routes. Calendar reads prefer Redis and fall back to MySQL on misses or cache errors.',
    },
    {
      label: '02',
      title: 'Preview',
      description:
        'The client submits dates and room count; Order Service reads daily prices and inventory from the database, calculates the total on the server and checks each night’s availability.',
    },
    {
      label: '03',
      title: 'Create',
      description:
        'Checkout requires an Idempotency-Key. Inside a transaction the service looks for an existing idempotent order, locks inventory rows in ascending date order, increments locked_stock and writes the order and night snapshots.',
    },
    {
      label: '04',
      title: 'Expire',
      description:
        'A separate worker scans pending orders past their expiry every five seconds, reuses the cancellation path to release locked_stock and invalidates the related calendar cache.',
    },
    {
      label: '05',
      title: 'Pay',
      description:
        'In production the payment preparation path calls WeChat Pay API v3 to create a JSAPI prepay order; an explicit mock path is available only in development.',
    },
    {
      label: '06',
      title: 'Confirm',
      description:
        'After API v3 signature verification and decryption, the notification enters a confirmation transaction. The service locks the order and inventory, moves locked_stock to sold_stock, creates a unique payment record and returns duplicate notifications idempotently.',
    },
  ],
  decisions: [
    {
      title: 'Use a modular monolith for the transaction domain',
      implementation:
        'server/internal is organised into auth, user, homestay, room, order and payment packages, each with model, repository, service and handler boundaries. The Gin router only composes dependencies and routes.',
      value:
        'The deployment stays simple while booking, inventory and payment rules remain in explicit boundaries that can later be replaced or split without starting from an unstructured CRUD service.',
    },
    {
      title: 'Keep MySQL as the source of truth for money and stock',
      implementation:
        'Amounts use int64 cents, and orders snapshot property, room and nightly prices. Redis stores only versioned room calendars, fails open to MySQL and never becomes the authority for settlement.',
      value:
        'This avoids floating-point money errors and cache-write failures changing inventory, while payment amount checks can compare against persisted order data.',
    },
    {
      title: 'Model sellable availability per night',
      implementation:
        'room_inventory_daily stores total_stock, locked_stock, sold_stock, daily_price and closed for each room type and date. Checkout is exclusive, previews are capped at 93 days and bookings at 30 nights.',
      value:
        'Variable prices, closed dates and multi-night reservations can be validated with one server-side model rather than a collection of client-side assumptions.',
    },
    {
      title: 'Protect checkout with idempotency and a unique index',
      implementation:
        'orders has a composite unique constraint on user_id and idempotency_key. The service looks up an existing order inside the transaction and, after a concurrent unique-key race, reads and returns the order that won.',
      value:
        'Network retries, button double-clicks and client timeouts are much less likely to create duplicate orders because the guarantee is shared by application logic and the database.',
    },
    {
      title: 'Prevent overselling with ordered row locks',
      implementation:
        'Create, cancel and payment confirmation lock inventory rows in ascending date order with SELECT ... FOR UPDATE, check available stock, move locked_stock / sold_stock and verify expected RowsAffected.',
      value:
        'Concurrent reservations for the same room type serialize the critical inventory decision, while a fixed lock order reduces deadlock risk across multi-night bookings.',
    },
    {
      title: 'Invalidate calendars with a versioned cache key',
      implementation:
        'Calendar keys include roomTypeID, version, start and end dates. Inventory mutations increment the Redis version; old ranges naturally become unreachable, and cache failures do not block the main transaction.',
      value:
        'Order creation, cancellation and payment confirmation can invalidate every overlapping range without enumerating and deleting every date-range key.',
    },
    {
      title: 'Separate the payment gateway from local confirmation',
      implementation:
        'Payment Service uses a WechatGateway abstraction for production payment creation and notification verification. Local confirmation still validates order amount, merchant identity, AppID and trade status before changing inventory.',
      value:
        'The third-party SDK does not directly mutate business stock, and duplicate callbacks, amount mismatches and expired orders have explicit local decisions.',
    },
    {
      title: 'Separate migration and runtime roles',
      implementation:
        'Embedded SQL migrations record versions in schema_migrations and run as a separate production role. API and worker are deployed independently, keeping expiration scans out of HTTP request handling.',
      value:
        'Schema changes are decoupled from application startup, and background expiry has its own runtime and scaling boundary.',
    },
  ],
  boundaries: [
    {
      level: '高',
      title: 'Domain services still depend on HTTP response types',
      description:
        'Some services return response.Error or net/http semantics directly, so domain rules and transport concerns are not fully separated. Reusing the domain from RPC or asynchronous jobs would first require a unified error mapping.',
    },
    {
      level: '高',
      title: 'Identity and CORS remain MVP-oriented',
      description:
        'JWT uses a custom HS256 implementation without a refresh or revocation path, and CORS currently permits any origin. Production use needs trusted origins, request limiting and a clearer token lifecycle.',
    },
    {
      level: '中',
      title: 'Runtime lifecycle and observability are incomplete',
      description:
        'Gin Logger and the standard logger are mixed, with no request ID, metrics or distributed tracing. API and worker context cancellation, readiness, draining and explicit database/Redis closure also need to converge.',
    },
    {
      level: '中',
      title: 'Expiration recovery is polling, not a durable task queue',
      description:
        'The worker scans the database on a fixed interval and reuses cancellation logic. This keeps the MVP simple, but there is no lease, retry backoff, failure alert or multi-instance claim semantics.',
    },
    {
      level: '中',
      title: 'The order state model is reserved but only partly driven',
      description:
        'The model includes CHECKED_IN, COMPLETED and refund-related states, while the current core path mainly covers pending, confirmed, cancelled and payment notification transitions. State rules still need a single transition boundary.',
    },
  ],
  nextSteps: [
    'Unify domain errors, request IDs, structured logs, metrics and traces into an observable transaction path',
    'Use signal.NotifyContext, readiness/draining and cancellable workers, with explicit database and Redis shutdown',
    'Tighten JWT, CORS and payment-notification security, then add request limiting and sensitive-action auditing',
    'Add an OpenAPI contract, cache response headers and ETags so frontend and backend evolution does not rely on implicit conventions',
    'Add retry backoff, failure records and alerting for expiration recovery and payment reconciliation, with a clear manual handling path',
  ],
};

const englishMusicFyCase: ProjectCaseStudy = {
  projectSlug: 'musicfy',
  heroKicker: 'CASE STUDY / MOBILE MEDIA',
  title: 'From bare React Native to a complete music playback path',
  description:
    'A full-stack mobile music app built without Expo. MusicFy uses React Native, React Navigation, Redux and React Query for the mobile experience, while React Native Track Player and RNFS handle cross-screen playback, queues and local audio files.',
  problem:
    'MusicFy was not just about putting a list of songs on a phone. Starting with a bare React Native setup meant defining boundaries between the player, navigation, authentication, user-generated content and the device file system. The product needed registration, email verification, uploads, playlists, favourites, listening history and follows while keeping playback alive as users moved between screens.',
  sections: {
    problem: { kicker: '01 / MOBILE PRODUCT SCOPE', title: 'Why design the mobile product around playback?' },
    flow: { kicker: '02 / PLAYBACK FLOW', title: 'How a track moves from the content API to the device' },
    decisions: { kicker: '03 / ENGINEERING DECISIONS', title: 'Mobile decisions visible in the code' },
    boundaries: {
      kicker: '04 / CURRENT BOUNDARIES',
      title: 'A complete prototype still has engineering edges to close',
      intro: 'The mobile playback and content flows form a working product skeleton. Download timing, token lifecycle, history writes and backend constraints are the most valuable next improvements.',
    },
    next: { kicker: '05 / NEXT ITERATION', title: 'What to improve next' },
  },
  goals: [
    'Integrate native React Native modules without relying on Expo',
    'Keep the player, queue, mini player and system media controls working across screens',
    'Separate Redux global state, React Query server state and device file caching',
    'Cover authentication, uploads, playlists, favourites, history and follows in one mobile product',
  ],
  flow: [
    {
      label: '01',
      title: 'Authenticate',
      description:
        'The app restores a token from AsyncStorage, calls /auth/is-auth to validate the session, and lets the auth slice select the auth or tab navigator.',
    },
    {
      label: '02',
      title: 'Discover',
      description:
        'Home uses React Query to fetch latest uploads, recommendations, playlists and recently played tracks without coupling server data to navigation state.',
    },
    {
      label: '03',
      title: 'Cache',
      description:
        'Before playback, useAudioController checks the RNFS cache directory. On a miss it starts a background download from the API audio URL before handing the file to the player.',
    },
    {
      label: '04',
      title: 'Queue',
      description:
        'AudioData is mapped into a Track Player queue that owns the current track, previous and next actions, playback rate, progress and artwork.',
    },
    {
      label: '05',
      title: 'Control',
      description:
        'MiniAudioPlayer, AudioPlayer and playbackService share the same Track Player, so screen controls and Android media controls operate on one playback path.',
    },
    {
      label: '06',
      title: 'History',
      description:
        'The playback service listens for progress events and sends audio, progress and date to /history, bringing recently played and listening history back to the server.',
    },
  ],
  decisions: [
    {
      title: 'Create a continuous playback boundary with Track Player',
      implementation:
        'InitPlayer configures Track Player capabilities and Android media notifications. useAudioController manages queues and playback operations, while playbackService handles remote play, pause and skip events.',
      value:
        'Playback no longer belongs to one screen: users can move between Home, Profile and content views while the same playback path continues.',
    },
    {
      title: 'Separate two kinds of state with Redux and React Query',
      implementation:
        'Auth, player and playlist modal state live in Redux. Latest uploads, recommendations, favourites, history, public profiles and follows are fetched through React Query hooks.',
      value:
        'Cross-screen state such as the active track and authentication has a stable home, while server data that changes over time is not copied into the global store.',
    },
    {
      title: 'Keep device caching in the file system, not a state container',
      implementation:
        'RNFS derives a cache path from the public ID, checks for an existing file and downloads the remote audio on a miss. AsyncStorage is used for the authentication token rather than audio binaries.',
      value:
        'Audio data does not enter Redux or AsyncStorage, reducing memory and serialisation pressure while leaving a clear local boundary for replay.',
    },
    {
      title: 'Use nested navigators to express the mobile information hierarchy',
      implementation:
        'Auth, Home, Profile and upload flows are composed through AuthNavigator, HomeNavigator, ProfileNavigator and TabNavigator. AppView renders the shared player outside individual screens.',
      value:
        'Navigation follows product areas and the common player is implemented once instead of being rebuilt by each screen.',
    },
    {
      title: 'Connect user-generated content into a complete product loop',
      implementation:
        'AudioForm combines Yup, native document/image pickers and multipart upload. The Express backend uses Formidable, Cloudinary and MongoDB for audio, artwork, playlists and user relationships.',
      value:
        'The project is more than a player demo: authentication, creation, media publishing, favourites, history and social relationships form an operable product flow.',
    },
    {
      title: 'Start recommendations with explainable rules',
      implementation:
        'The backend extracts categories from a user’s recent history, filters matching audio and uses a scheduled task to generate automatic playlists. The frontend consumes the result through React Query.',
      value:
        'Without introducing a machine-learning stack, the project establishes an understandable recommendation entry point that can be evaluated with real usage data.',
    },
  ],
  boundaries: [
    {
      level: '高',
      title: 'The download helper does not fully await completion',
      description:
        'downLoadFile starts RNFS.downloadFile but does not return or await its promise, while onAudioPress continues into the playback flow. On a cold start or weak network the file may not be ready when Track Player receives it; await, failure fallback and duplicate-download control should be added.',
    },
    {
      level: '高',
      title: 'JWT lifecycle and mobile storage need strengthening',
      description:
        'The token is stored in AsyncStorage and the server signing path does not visibly define expiry, rotation or bounded device-token cleanup. This is suitable for prototype validation, but not a complete production session-security story.',
    },
    {
      level: '中',
      title: 'Playback writes and the history model need to converge',
      description:
        'playbackService writes /history from progress events, while the history document maintains both last and an embedded all array. Event frequency, idempotency, array growth and offline compensation need a deliberate design before the catalogue grows.',
    },
    {
      level: '中',
      title: 'Media uploads and relationship writes need stronger server constraints',
      description:
        'Formidable file limits, cross-document consistency between favourites and audio likes, transaction boundaries for follows, and access checks for private playlists all have room to converge.',
    },
    {
      level: '中',
      title: 'Localisation, testing and observability are not complete capabilities yet',
      description:
        'The current code does not show an integrated react-i18next layer, Redis/CDN, push notifications or a full test suite. Recommendations are history-and-category rules, not a machine-learning recommendation system.',
    },
  ],
  nextSteps: [
    'Make audio downloads awaitable, cancellable and retryable, with cache cleanup and concurrent-request deduplication',
    'Add short-lived JWTs, refresh rotation, revocation and device limits, then evaluate safer credential storage',
    'Batch or throttle history writes, cap document growth and design offline event compensation',
    'Add upload limits, unique constraints and MongoDB transactions, with one authorization rule for private content',
    'Add unit and integration coverage for playback, uploads, auth and recommendations before evaluating Redis, a CDN or push notifications',
  ],
};

const englishObsaiCase: ProjectCaseStudy = {
  projectSlug: 'obsai-cli',
  heroKicker: 'CASE STUDY / LOCAL AI SYSTEM',
  title: 'An evidence-bounded local AI workflow for Obsidian',
  description:
    'ObsAgent CLI is a local-first AI workflow for Obsidian Vaults. It combines safe Markdown parsing, context-aware chunking, rebuildable SQLite indexes and hybrid retrieval with citation-bounded answers and approval-gated file edits protected by optimistic concurrency and recovery transactions.',
  problem:
    'Plain full-text search is not enough for cross-document questions, while uploading an entire Vault to a remote model creates privacy, cost and context-control risks. ObsAgent CLI is not just another chat box: it turns parsing, indexing, retrieval, evidence-grounded answering and file writes into one local-first, verifiable and recoverable workflow.',
  media: [
    {
      src: '/projects/obsai-cli/architecture.svg',
      alt: 'ObsAgent CLI architecture showing the Obsidian Vault, Python application, SQLite retrieval index, local or remote models and approval-gated write path',
      caption: 'The Vault remains the source of truth; retrieval and answering are separated from approval-gated file writes.',
      width: 1600,
      height: 900,
      role: 'architecture',
    },
  ],
  sections: {
    problem: { kicker: '01 / PRODUCT BRIEF', title: 'Why local knowledge AI should be more than a chat box' },
    flow: { kicker: '02 / SYSTEM FLOW', title: 'How a question and a file edit are completed' },
    decisions: { kicker: '03 / ENGINEERING DECISIONS', title: 'AI engineering decisions visible in the code' },
    boundaries: {
      kicker: '04 / CURRENT BOUNDARIES',
      title: 'What the current implementation does and does not claim',
      intro:
        'The project connects local retrieval, evidence constraints and safe writes into a complete workflow, but it remains a local single-user system rather than a cloud multi-tenant or distributed AI platform.',
    },
    next: { kicker: '05 / NEXT ITERATION', title: 'What to improve next' },
  },
  goals: [
    'Keep Obsidian Markdown as the source of truth while making the index fully rebuildable',
    'Combine keyword, vector and graph retrieval to reduce the blind spots of any single strategy',
    'Bind answers to bounded evidence and abstain when evidence or citations are not reliable',
    'Keep Agent steps, tool calls and error loops within explicit limits',
    'Require previews, approval, concurrency checks and recoverable transactions for every file write',
  ],
  flow: [
    {
      label: '01',
      title: 'Parse',
      description:
        'The scanner reads the Vault without executing Markdown HTML, JavaScript or Dataview, while extracting front matter, headings, paragraphs, code blocks, callouts, WikiLinks and tags.',
    },
    {
      label: '02',
      title: 'Index',
      description:
        'The context-aware chunker preserves heading breadcrumbs and paragraph boundaries, then writes SQLite metadata, FTS5 records and sqlite-vec embeddings. Content hashes drive incremental updates and move detection.',
    },
    {
      label: '03',
      title: 'Retrieve',
      description:
        'A query can use keyword, vector or graph search. Hybrid retrieval fuses rankings with RRF and reports visible degradation when semantic capabilities are unavailable.',
    },
    {
      label: '04',
      title: 'Answer',
      description:
        'ContextBuilder reloads original content from SQLite, bounds evidence, context and output sizes, labels sources such as [S1], then validates and repairs model citations or abstains.',
    },
    {
      label: '05',
      title: 'Approve',
      description:
        'Write tools first produce a ChangeSet and Diff, pause for explicit human approval, then validate paths and original hashes before applying a transactional Vault change.',
    },
  ],
  decisions: [
    {
      title: 'Keep the Vault as the source of truth',
      implementation:
        'Markdown files are authoritative; SQLite, FTS5 and sqlite-vec are derived indexes that can be deleted and rebuilt. Incremental indexing skips unchanged content and recognizes unique moves or renames through content hashes.',
      value:
        'Recovery is designed around restoring the source files rather than trusting an opaque database, reducing the risk of index corruption and migration lock-in.',
    },
    {
      title: 'Preserve Markdown semantics during chunking',
      implementation:
        'Chunks retain heading breadcrumbs and keep code blocks, callouts and Block ID paragraphs atomic. The chunker splits at paragraph boundaries and produces stable raw_content and embedding_text values.',
      value:
        'Code and explanation are less likely to be separated by arbitrary character limits, while stable content supports embedding reuse, citations and incremental indexing.',
    },
    {
      title: 'Use hybrid retrieval instead of vector search alone',
      implementation:
        'SQLite FTS5 handles keyword search, sqlite-vec handles semantic search, WikiLink relationships provide graph retrieval, and Hybrid mode fuses the rankings with Reciprocal Rank Fusion.',
      value:
        'Exact terminology, natural-language intent and document relationships each have a suitable retrieval path without introducing a separate vector database or search cluster.',
    },
    {
      title: 'Constrain answers to verifiable evidence',
      implementation:
        'Answering reloads original content instead of relying on FTS snippets, bounds evidence, context and output, annotates sources and validates citations. It abstains when the evidence is insufficient.',
      value:
        'The system makes an answer auditable instead of merely plausible, reducing unsupported claims, context contamination and citation hallucinations.',
    },
    {
      title: 'Make the LangGraph Agent bounded by design',
      implementation:
        'Deterministic intent routing selects direct search or a planning path. Agent limits cover steps, retrieval calls, repeated tools, consecutive errors and no-progress loops, while state stores references and artifact IDs instead of copying large content.',
      value:
        'Execution remains predictable, resumable and reviewable, which is a safer fit for local file operations than letting the model decide when it is finished.',
    },
    {
      title: 'Treat file writes as approved transactions',
      implementation:
        'safe_write validates Vault-relative paths, reserved directories and symlink traversal. The transaction service stores snapshots and checks original hashes with optimistic concurrency control before replacement, with rollback and recovery records on failure.',
      value:
        'A bad Agent plan cannot silently overwrite a user file; every change has a preview, conflict detection and a recovery path.',
    },
  ],
  boundaries: [
    {
      level: '高',
      title: 'This is local single-user software, not a cloud multi-tenant platform',
      description:
        'The FastAPI adapter, React UI and Agent runtime operate around a local Vault. There is no account system, cross-user isolation, cloud sync or multi-instance task scheduler, so the project should not be presented as an AI SaaS platform.',
    },
    {
      level: '高',
      title: 'Remote model calls still depend on consent and network conditions',
      description:
        'OpenAI embedding or LLM calls are gated by consent and budgets and send only the selected text required for the operation, but provider availability, network latency and answer quality are outside the local retrieval benchmark.',
    },
    {
      level: '中',
      title: 'The benchmark is synthetic and local, not a production SLA',
      description:
        'The release notes record a local test with 10,000 notes and 100,000 chunks. It excludes remote network time and the distribution of a real Vault, so it cannot be used to claim production QPS or end-to-end latency.',
    },
    {
      level: '中',
      title: 'Reranking and evaluation are still basic',
      description:
        'A reranker interface exists, but the current implementation is primarily NoOpReranker. A real Vault evaluation set is still needed to measure recall, citation correctness and abstention quality rather than retrieval latency alone.',
    },
    {
      level: '中',
      title: 'The local threat model does not isolate a malicious same-user process',
      description:
        'The system focuses on Agent mistakes, path traversal, symlinks and concurrent overwrites. Another local process with the same file permissions can still modify the Vault outside the application threat boundary.',
    },
  ],
  nextSteps: [
    'Build a real Obsidian Vault evaluation set for retrieval, citation and abstention quality',
    'Add exact tokenizer accounting and provider latency, cost and budget telemetry',
    'Implement a stronger reranker and explainable retrieval diagnostics',
    'Add integration coverage for multi-process locks, recovery and external file changes',
    'Evaluate a Tauri desktop shell while keeping the local-first boundary instead of adding cloud multi-tenancy prematurely',
  ],
};

export function getSiteContent(locale: BlogLocale) {
  if (locale === 'zh-CN') return siteContent;
  return {
    ...siteContent,
    description:
      "Nicolas Leigh's technical writing and project portfolio, covering React, Next.js, Go and full-stack engineering.",
    introduction: {
      eyebrow: 'Finance background · Building software since 2021',
      title: 'Go Backend & AI Full-stack Engineer',
      tagline: 'Thoughtful architecture. Reliable delivery.',
      body: 'I have an educational and professional background in finance, and focus on Go backends, React/Next.js and full-stack engineering. I am also exploring how AI can be applied to real products. This site documents architectural trade-offs, implementation details and lessons learned from real projects.',
    },
  } as const;
}

export function getAboutContent(locale: BlogLocale) {
  return locale === 'zh-CN' ? aboutContent : englishAbout;
}

export function getPortfolioProjects(locale: BlogLocale) {
  return locale === 'zh-CN' ? portfolioProjects : englishProjects;
}

export function getProjectCaseStudyLocalized(slug: string, locale: BlogLocale) {
  if (locale === 'en-US') {
    if (slug === 'chatify') return englishChatifyCase;
    if (slug === 'linze-pro') return englishLinzeProCase;
    if (slug === 'cabinfy') return englishCabinFyCase;
    if (slug === 'moviefy') return englishMovieFyCase;
    if (slug === 'petify') return englishPetifyCase;
    if (slug === 'musicfy') return englishMusicFyCase;
    if (slug === 'homestay') return englishHomestayCase;
    if (slug === 'obsai-cli') return englishObsaiCase;
  }
  return getProjectCaseStudy(slug);
}
