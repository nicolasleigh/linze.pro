export type PortfolioProject = {
  slug: string;
  name: string;
  category: string;
  status: string;
  description: string;
  engineeringFocus: string;
  highlights: readonly string[];
  stack: readonly string[];
  repository: string;
  website?: string;
  caseStudyPath?: string;
  featured: boolean;
};

export const portfolioProjects = [
  {
    slug: "chatify",
    name: "Chatify",
    category: "Realtime / Backend migration",
    status: "持续重构",
    description:
      "面向文字、语音和视频沟通的实时应用。针对原有 Convex 数据链路中的 N+1 查询和带宽问题，引入 Go、PostgreSQL 与类型安全 SQL，逐步迁移核心后端能力。",
    engineeringFocus:
      "将实时连接、消息持久化、身份同步和音视频服务拆成边界清晰的链路，同时保留迁移期间可工作的旧实现。",
    highlights: [
      "gorilla/websocket 实时消息通道",
      "PostgreSQL 原生查询与 sqlc 代码生成",
      "Clerk Webhook 用户同步",
      "LiveKit 音视频房间",
    ],
    stack: ["Next.js", "Go", "PostgreSQL", "WebSocket", "sqlc", "Clerk"],
    repository: "https://github.com/nicolasleigh/chatify",
    website: undefined,
    caseStudyPath: "/projects/chatify",
    featured: true,
  },
  {
    slug: "linze-pro",
    name: "Linze.pro",
    category: "Content platform / Full stack",
    status: "当前项目",
    description:
      "个人内容与作品平台。保留 Go 内容 API 和中英文文章模型，使用 Next.js App Router 重构公开前端，并围绕文章渲染、SEO、缓存和错误边界重新设计访问链路。",
    engineeringFocus:
      "把原先客户端渲染的博客升级为服务端优先的内容系统，同时修正上传鉴权、乐观锁和 API 契约等后端边界问题。",
    highlights: [
      "Next.js Server Component 与 ISR",
      "Markdown、目录和结构化数据",
      "Go / chi REST API 与 PostgreSQL",
      "JWT、RBAC 与文章版本控制",
    ],
    stack: ["Next.js", "TypeScript", "Go", "PostgreSQL", "Docker", "Caddy"],
    repository: "https://github.com/nicolasleigh/linze.pro",
    website: "https://linze.pro",
    caseStudyPath: undefined,
    featured: true,
  },
  {
    slug: "petify",
    name: "Petify",
    category: "Commerce / Multi-app system",
    status: "功能迭代",
    description:
      "由用户商城、管理后台和 Express API 组成的电商系统，覆盖商品筛选、购物车、订单、评价、实时客服与支付链路。",
    engineeringFocus:
      "在三个独立应用间组织用户、商品、订单和会话数据，并通过 Redux、Socket.IO 与 MongoDB 串联交易和实时沟通流程。",
    highlights: [
      "用户端、管理端与 API 职责拆分",
      "Socket.IO 双向客服消息",
      "购物车、订单与评价领域流程",
      "Stripe 支付与 Webhook 链路",
    ],
    stack: ["React", "Redux Toolkit", "Node.js", "MongoDB", "Socket.IO", "Stripe"],
    repository: "https://github.com/nicolasleigh/petify",
    website: "https://pet.linze.pro",
    caseStudyPath: undefined,
    featured: false,
  },
  {
    slug: "musicfy",
    name: "MusicFy",
    category: "Mobile / Media",
    status: "已完成原型",
    description:
      "不依赖 Expo 的 React Native 音乐应用，包含播放列表、收藏、收听历史、文件上传以及邮箱验证和密码重置流程。",
    engineeringFocus:
      "围绕移动端音频播放处理原生模块接入、播放器状态和文件缓存，并由 Node.js API 管理用户与媒体数据。",
    highlights: [
      "React Native Track Player 播放控制",
      "react-native-fs 音频文件缓存",
      "Redux 与 React Query 状态分层",
      "JWT、邮件验证与密码重置",
    ],
    stack: ["React Native", "TypeScript", "React Query", "Express", "MongoDB"],
    repository: "https://github.com/nicolasleigh/musicfy",
    website: undefined,
    caseStudyPath: undefined,
    featured: false,
  },
] as const satisfies readonly PortfolioProject[];

export const featuredProjects = portfolioProjects.filter((project) => project.featured);
