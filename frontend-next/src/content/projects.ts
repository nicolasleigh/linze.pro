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
    slug: 'obsai-cli',
    name: 'ObsAgent CLI',
    category: 'Local AI / Developer Tooling',
    status: 'V1 可用',
    description:
      '面向 Obsidian Vault 的本地优先 AI 工作流工具，使用安全 Markdown 解析、可重建索引、混合检索和带证据引用的问答，支持经过人工审批的文件修改。',
    engineeringFocus:
      '把 RAG、Agent 和文件写入放进可验证的隐私与安全边界：Vault 是唯一事实来源，远程调用需要同意与预算，写入必须经过 Diff、审批、乐观并发控制和可恢复事务。',
    highlights: [
      '上下文感知的 Markdown 分块与增量索引',
      'SQLite FTS5 + sqlite-vec 混合检索',
      'RRF 排序融合与证据约束式问答',
      'LangGraph 受限 Agent 与人工审批',
      '安全写入、OCC、回滚与恢复日志',
      'OpenAI / Ollama Provider 抽象',
    ],
    stack: [
      'Python',
      'Typer',
      'FastAPI',
      'SQLite FTS5',
      'sqlite-vec',
      'LangGraph',
      'OpenAI / Ollama',
      'React',
      'TypeScript',
      'Vite',
    ],
    repository: 'https://github.com/nicolasleigh/obsai',
    website: undefined,
    caseStudyPath: '/projects/obsai-cli',
    featured: false,
  },

  {
    slug: 'linze-pro',
    name: 'Linze.pro',
    category: 'Content platform / Full stack',
    status: '当前项目',
    description:
      '个人内容与作品平台。保留 Go 内容 API 和中英文文章模型，使用 Next.js App Router 重构公开前端，并围绕文章渲染、SEO、缓存和错误边界重新设计访问链路。',
    engineeringFocus:
      '把原先客户端渲染的博客升级为服务端优先的内容系统，同时修正上传鉴权、乐观锁和 API 契约等后端边界问题。',
    highlights: [
      'Next.js Server Component 与 ISR',
      'Markdown、目录和结构化数据',
      'Go / chi REST API 与 PostgreSQL',
      'JWT、RBAC 与文章版本控制',
    ],
    stack: ['Next.js', 'TypeScript', 'Go', 'PostgreSQL', 'Docker', 'Caddy'],
    repository: 'https://github.com/nicolasleigh/linze.pro',
    website: 'https://linze.pro',
    caseStudyPath: '/projects/linze-pro',
    featured: true,
  },
  {
    slug: 'homestay',
    name: 'Homestay',
    category: 'Go Backend / Transaction System',
    status: '核心交易链路完成',
    description:
      '面向微信小程序的民宿预订 MVP。使用 Go、Gin、MySQL、Redis 与微信支付 API v3 构建房态日历、动态价格、服务端计价、幂等下单、库存锁定、订单过期释放和支付回调确认链路。',
    engineeringFocus:
      '把民宿预订中最容易出错的价格、库存、订单和支付边界放回服务端，并用事务、行锁、唯一约束和可失效缓存保护交易状态。',
    highlights: [
      '按日房态库存与价格模型',
      'Idempotency-Key 幂等下单',
      'MySQL 行锁防止超卖',
      '微信支付 API v3 回调确认',
      'Redis 版本化房态缓存',
    ],
    stack: ['Go', 'Gin', 'GORM', 'MySQL', 'Redis', 'JWT', 'WeChat Pay API v3', 'Docker Compose', 'Nginx'],
    repository: 'https://github.com/nicolasleigh/homestay',
    website: undefined,
    caseStudyPath: '/projects/homestay',
    featured: false,
  },
  {
    slug: 'chatify',
    name: 'Chatify',
    category: 'Realtime / Backend migration',
    status: '持续重构',
    description:
      '面向文字、语音和视频沟通的实时应用。针对原有 Convex 数据链路中的 N+1 查询和带宽问题，引入 Go、PostgreSQL 与类型安全 SQL，逐步迁移核心后端能力。',
    engineeringFocus:
      '将实时连接、消息持久化、身份同步和音视频服务拆成边界清晰的链路，同时保留迁移期间可工作的旧实现。',
    highlights: [
      'gorilla/websocket 实时消息通道',
      'PostgreSQL 原生查询与 sqlc 代码生成',
      'Clerk Webhook 用户同步',
      'LiveKit 音视频房间',
    ],
    stack: ['Next.js', 'Go', 'PostgreSQL', 'WebSocket', 'sqlc', 'Clerk'],
    repository: 'https://github.com/nicolasleigh/chatify',
    website: undefined,
    caseStudyPath: '/projects/chatify',
    featured: true,
  },
  {
    slug: 'cabinfy',
    name: 'CabinFy',
    category: 'Product engineering / Full stack',
    status: '持续迭代',
    description:
      '面向旅客与管理员的双端住宿预订平台。使用 React、React Query 与 Tailwind CSS 组织预订体验和运营工作台，并以 Node.js、Express、Prisma 与 PostgreSQL 支撑房源、预订、评价和设置流程。',
    engineeringFocus:
      '围绕同一套业务数据模型拆分游客端与管理端，重点打磨服务端状态、表单校验、响应式交互、国际化和后台运营体验。',
    highlights: [
      'React Query 服务端状态与数据更新',
      '游客端与管理后台路由隔离',
      'React Hook Form + Zod 表单校验',
      '中英文、暗色模式与响应式界面',
    ],
    stack: [
      'React',
      'TypeScript',
      'React Query',
      'Tailwind CSS',
      'Node.js',
      'Express',
      'Prisma',
      'PostgreSQL',
      'Docker',
      'Caddy',
    ],
    repository: 'https://github.com/nicolasleigh/hotel-app',
    website: undefined,
    caseStudyPath: '/projects/cabinfy',
    featured: true,
  },
  {
    slug: 'moviefy',
    name: 'MovieFy',
    category: 'Media platform / Admin tooling',
    status: '持续迭代',
    description:
      '面向观影用户与管理员的双端电影内容平台。使用 React、Tailwind CSS 与 shadcn/ui 构建电影发现、视频播放、演员信息、评论评分和内容管理流程。',
    engineeringFocus:
      '围绕复杂电影表单、媒体上传、演员关联、多语言展示和管理员工作台组织前端体验，并以 Node.js、Express、MongoDB 与 JWT 支撑内容与认证链路。',
    highlights: [
      'React Hook Form + Zod 复杂电影表单',
      '防抖演员搜索与多选关联',
      'Cloudinary 海报与视频上传',
      '中英文、明暗主题与响应式 UI',
    ],
    stack: [
      'React',
      'TypeScript',
      'Tailwind CSS',
      'shadcn/ui',
      'Node.js',
      'Express',
      'MongoDB',
      'JWT',
      'Cloudinary',
      'Docker',
      'Caddy',
    ],
    repository: 'https://github.com/nicolasleigh/movie-review-app',
    website: undefined,
    caseStudyPath: '/projects/moviefy',
    featured: false,
  },
  {
    slug: 'petify',
    name: 'Petify',
    category: 'Commerce / Multi-app system',
    status: '功能迭代',
    description:
      '由用户商城、卖家运营后台和 Express API 组成的宠物电商系统，覆盖商品发现、购物车、订单、评价、实时客服和运营数据看板。',
    engineeringFocus:
      '在三个独立应用间组织用户、商品、订单和聊天数据，重点处理 Redux 状态边界、响应式购物体验、后台运营工作流和 Socket.IO 实时通信。',
    highlights: [
      '用户端、管理端与 API 职责拆分',
      'Redux Toolkit 管理购物车、订单和聊天状态',
      'Socket.IO Customer / Seller / Admin 实时客服',
      '商品筛选、订单管理与后台数据可视化',
      'React i18next、Dark Mode 与响应式界面',
    ],
    stack: [
      'React',
      'TypeScript',
      'Redux Toolkit',
      'React Router',
      'Tailwind CSS',
      'i18next',
      'Node.js',
      'Express',
      'MongoDB',
      'Mongoose',
      'Socket.IO',
      'Cloudinary',
      'Stripe Connect',
      'Docker',
      'Caddy',
    ],
    repository: 'https://github.com/nicolasleigh/ecommerce',
    website: 'https://pet.linze.pro',
    caseStudyPath: '/projects/petify',
    featured: false,
  },
  {
    slug: 'musicfy',
    name: 'MusicFy',
    category: 'Mobile / Media',
    status: '已完成原型',
    description: '不依赖 Expo 的全栈移动音乐应用，围绕跨页面播放、设备本地音频缓存和用户生成内容构建完整的移动端体验。',
    engineeringFocus:
      '用原生播放器模块、Redux、React Query 与 RNFS 分离播放状态、服务端数据和设备文件缓存，并由 Node.js API 管理用户与媒体数据。',
    highlights: [
      'React Native Track Player 播放控制',
      'react-native-fs 音频文件缓存',
      'Redux 与 React Query 状态分层',
      'JWT、邮箱验证与密码重置',
    ],
    stack: [
      'React Native',
      'TypeScript',
      'React Navigation',
      'Redux Toolkit',
      'React Query',
      'Track Player',
      'RNFS',
      'Node.js',
      'Express',
      'MongoDB',
      'Cloudinary',
      'Docker',
    ],
    repository: 'https://github.com/nicolasleigh/audio-app',
    website: undefined,
    caseStudyPath: '/projects/musicfy',
    featured: false,
  },
] as const satisfies readonly PortfolioProject[];

export const featuredProjects = portfolioProjects.filter((project) => project.featured);
