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
    category: 'Commerce / Multi-app system',
    status: 'In development',
    description:
      'An e-commerce system composed of a storefront, an admin application and an Express API, covering product discovery, carts, orders, reviews, realtime support and payments.',
    engineeringFocus:
      'Coordinate user, product, order and conversation data across three applications, using Redux, Socket.IO and MongoDB to connect transactional and realtime flows.',
    highlights: [
      'Separated storefront, admin and API applications',
      'Bidirectional support chat with Socket.IO',
      'Cart, order and review domain flows',
      'Stripe payment and webhook flow',
    ],
  },
  {
    ...portfolioProjects[3],
    category: 'Mobile / Media',
    status: 'Prototype complete',
    description:
      'A React Native music application without Expo, including playlists, favorites, listening history, file uploads, email verification and password recovery.',
    engineeringFocus:
      'Handle native audio modules, player state and file caching on mobile, backed by a Node.js API for user and media data.',
    highlights: [
      'Playback controls with React Native Track Player',
      'Audio file caching with react-native-fs',
      'Layered Redux and React Query state',
      'JWT, email verification and password recovery',
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
  }
  return getProjectCaseStudy(slug);
}
