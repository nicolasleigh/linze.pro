import { aboutContent } from "@/content/about";
import { getProjectCaseStudy, type ProjectCaseStudy } from "@/content/project-case-studies";
import { portfolioProjects, type PortfolioProject } from "@/content/projects";
import { siteContent } from "@/content/site";
import type { BlogLocale } from "@/types/post";

const englishProjects: readonly PortfolioProject[] = [
  {
    ...portfolioProjects[0],
    category: "Realtime / Backend migration",
    status: "Active refactor",
    description: "A realtime text, voice and video application. Its core backend is being migrated from Convex to Go and PostgreSQL to address N+1 queries and bandwidth-heavy data access.",
    engineeringFocus: "Separate realtime connections, message persistence, identity synchronization and media services into explicit boundaries while keeping the legacy path operational during migration.",
    highlights: ["Realtime messaging with gorilla/websocket", "Native PostgreSQL queries and sqlc generation", "Clerk webhook identity synchronization", "LiveKit audio and video rooms"],
  },
  {
    ...portfolioProjects[1],
    category: "Content platform / Full stack",
    status: "Current project",
    description: "A personal publishing and portfolio platform. It retains the Go content API and bilingual article model while rebuilding the public experience with Next.js App Router.",
    engineeringFocus: "Turn a client-rendered blog into a server-first content system and tighten backend boundaries around uploads, authorization, optimistic locking and API contracts.",
    highlights: ["Next.js Server Components and ISR", "Markdown, table of contents and structured data", "Go / chi REST API and PostgreSQL", "JWT, RBAC and article versioning"],
  },
  {
    ...portfolioProjects[2],
    category: "Commerce / Multi-app system",
    status: "In development",
    description: "An e-commerce system composed of a storefront, an admin application and an Express API, covering product discovery, carts, orders, reviews, realtime support and payments.",
    engineeringFocus: "Coordinate user, product, order and conversation data across three applications, using Redux, Socket.IO and MongoDB to connect transactional and realtime flows.",
    highlights: ["Separated storefront, admin and API applications", "Bidirectional support chat with Socket.IO", "Cart, order and review domain flows", "Stripe payment and webhook flow"],
  },
  {
    ...portfolioProjects[3],
    category: "Mobile / Media",
    status: "Prototype complete",
    description: "A React Native music application without Expo, including playlists, favorites, listening history, file uploads, email verification and password recovery.",
    engineeringFocus: "Handle native audio modules, player state and file caching on mobile, backed by a Node.js API for user and media data.",
    highlights: ["Playback controls with React Native Track Player", "Audio file caching with react-native-fs", "Layered Redux and React Query state", "JWT, email verification and password recovery"],
  },
];

const englishAbout = {
  introduction: {
    eyebrow: "ABOUT / BACKGROUND",
    title: "From understanding numbers and risk to designing clear, reliable software.",
    description: "I began in finance and audit, where I learned to care about evidence, boundaries and anomalies. I now bring those habits into product design, implementation and software delivery.",
  },
  profile: [
    { label: "FOCUS", value: "Web products and full-stack engineering" },
    { label: "BUILDING", value: "React / Next.js · Go" },
    { label: "BASE", value: "China · UTC+8" },
  ],
  journey: [
    { year: "2017", title: "Finance training", description: "Studied public finance at Zhongnan University of Economics and Law, building a foundation in finance, economics and business analysis." },
    { year: "2020", title: "Audit and professional judgment", description: "Developed an evidence-driven approach to risk through financial audit work and completed all six professional-stage CPA examinations in China." },
    { year: "2021", title: "Moving into software engineering", description: "Started with C and Java, moved into the JavaScript ecosystem, and later expanded into Go and Node.js." },
    { year: "NOW", title: "Building end-to-end capability", description: "I use real products to practise frontend experience, backend APIs, data modelling, realtime communication and deployment." },
  ],
  capabilities: [
    { index: "01", title: "Interface and product experience", description: "Build web and mobile interfaces with React, Next.js, TypeScript and React Native, with attention to information hierarchy, accessibility, rendering strategy and maintainability.", stack: ["React", "Next.js", "TypeScript", "React Native", "Vue"] },
    { index: "02", title: "Services and data boundaries", description: "Design REST APIs and WebSocket flows with Go and Node.js, using PostgreSQL and MongoDB for domain modelling, queries and consistency.", stack: ["Go", "Node.js", "PostgreSQL", "MongoDB", "REST", "WebSocket"] },
    { index: "03", title: "Engineering delivery", description: "Treat types, error handling, tests, containers and reverse proxies as part of the product, carrying features from local code to a verifiable running system.", stack: ["Testing", "Docker", "Caddy", "Git"] },
  ],
  principles: [
    { title: "Understand the problem before choosing technology", description: "Start with user goals, data flow and constraints instead of using a framework checklist as a substitute for design." },
    { title: "Describe systems with evidence", description: "Validate conclusions through code, request paths and failure scenarios, and state incomplete boundaries honestly." },
    { title: "Maintain experience and engineering quality together", description: "Treat interface feedback, API contracts, performance, security and operations as one delivery chain." },
  ],
} as const;

const englishChatifyCase: ProjectCaseStudy = {
  projectSlug: "chatify",
  title: "From a BaaS prototype to a Go realtime messaging path",
  description: "A Go, PostgreSQL and WebSocket backend added around Chatify's query-cost and N+1 problems while preserving the Next.js and Convex capabilities still needed during migration.",
  problem: "The original implementation kept most conversation and message data in Convex. As relational reads grew, the lack of SQL joins turned a page load into many queries. The goal is not a language swap: it is to establish an explicit model for conversations, members, messages and unread state, then persist each message before realtime delivery.",
  goals: ["Represent conversations, members, friendships and messages relationally", "Persist messages before broadcasting them to active connections", "Connect native SQL to Go's type system through generated code", "Retain Clerk identity and LiveKit media capabilities"],
  flow: [
    { label: "01", title: "Identity", description: "Next.js obtains a Clerk session token; Clerk webhooks synchronize user profiles after Svix signature verification." },
    { label: "02", title: "History", description: "React Query loads message history through REST and validates the response at runtime with Zod." },
    { label: "03", title: "Connect", description: "The browser opens a WebSocket using the Clerk token as a subprotocol, and Go middleware resolves the identity." },
    { label: "04", title: "Persist", description: "readPump parses the message, then sqlc executes a CTE that stores it and updates the conversation's last-message reference." },
    { label: "05", title: "Broadcast", description: "The Hub groups clients by conversation ID and each connection's writePump delivers outbound messages." },
  ],
  decisions: [
    { title: "Replace repeated assembly with a relational model", implementation: "PostgreSQL models users, conversations, members, messages and friends in separate tables. CTEs and joins return members, the latest message and unread counts together.", value: "Implicit data dependencies become database constraints and reviewable SQL, giving N+1, indexing and consistency work a concrete entry point." },
    { title: "Keep SQL as the contract and generate Go types", implementation: "Queries live in a dedicated directory; sqlc generates parameter and result types, while ordered golang-migrate migrations record schema changes.", value: "This retains control over SQL while reducing handwritten scans, field-order mistakes and model/query drift." },
    { title: "Persist successfully before realtime broadcast", implementation: "After readPump receives a message, it runs CreateMessage, loads the complete row with sender data, and only then writes to the Hub broadcast channel.", value: "Clients receive a message that already has a database ID and timestamp, preventing ghost messages caused by broadcasting before a failed write." },
    { title: "Isolate connections and broadcast scope by conversation", implementation: "The Hub maps conversation IDs to client sets. Each client owns an independent buffered send channel and read/write goroutines.", value: "Broadcasting only scans the relevant conversation, and a dedicated writer keeps one network operation from directly blocking reads." },
    { title: "Decouple media from text messaging", implementation: "The custom WebSocket and PostgreSQL path owns text. LiveKit owns audio/video, while a non-cacheable Next.js handler only signs short-lived room tokens.", value: "The application controls its data path without rebuilding WebRTC media infrastructure inside the business service." },
    { title: "Separate server state from form state", implementation: "React Query manages message history, Zod validates REST responses and React Hook Form manages input. WebSocket events update the targeted conversation cache.", value: "This reduces coupling among request state, message lists and input, leaving clearer boundaries for reconnection and optimistic updates." },
  ],
  boundaries: [
    { level: "高", title: "Conversation authorization is incomplete", description: "The handshake validates Clerk identity, but hasAccessToConversation currently returns true and sender ID comes from the client. The server must map the token to a database user and query conversation_members before upgrading." },
    { level: "高", title: "The WebSocket trust boundary is too broad", description: "CheckOrigin currently accepts every origin. Trusted origins must be configured and sender identity must be derived server-side." },
    { level: "中", title: "Connection lifecycle and delivery semantics are incomplete", description: "There is no ping/pong, deadline, automatic reconnect, acknowledgement or idempotency key. The frontend may also replace an existing onmessage handler when sending." },
    { level: "中", title: "The Hub is single-instance only", description: "Connections and broadcast channels live in process memory. Horizontal scaling needs Redis Pub/Sub, NATS or another cross-node channel plus explicit ordering and retry semantics." },
    { level: "中", title: "Concurrency safeguards and observability are thin", description: "The broadcast path removes clients while holding a read lock and database writes use context.Background. Metrics for connections, delivery failures and latency are also missing." },
  ],
  nextSteps: ["Implement conversation membership authorization, trusted origins and server-derived sender IDs", "Refactor the frontend WebSocket provider around shared listeners, reconnect, backoff and recovery", "Add race tests, integration tests and failure scenarios for the Hub and message writes", "Define message idempotency keys, acknowledgement and offline compensation", "Add structured logs and connection, broadcast and database latency metrics before horizontal scaling"],
};

export function getSiteContent(locale: BlogLocale) {
  if (locale === "zh-CN") return siteContent;
  return {
    ...siteContent,
    description: "Nicolas Leigh's technical writing and project portfolio, covering React, Next.js, Go and full-stack engineering.",
    introduction: {
      eyebrow: "Finance background · Building software since 2021",
      title: "Turning complex systems into clear, reliable products.",
      body: "I am a self-taught developer with a background in finance and audit, focused on frontend experience, Go backends and end-to-end delivery. This site documents real design decisions, implementation details and lessons learned.",
    },
  } as const;
}

export function getAboutContent(locale: BlogLocale) {
  return locale === "zh-CN" ? aboutContent : englishAbout;
}

export function getPortfolioProjects(locale: BlogLocale) {
  return locale === "zh-CN" ? portfolioProjects : englishProjects;
}

export function getProjectCaseStudyLocalized(slug: string, locale: BlogLocale) {
  return locale === "en-US" && slug === "chatify" ? englishChatifyCase : getProjectCaseStudy(slug);
}
