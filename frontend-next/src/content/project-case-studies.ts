export type ProjectCaseStudy = {
  projectSlug: string;
  heroKicker: string;
  title: string;
  description: string;
  problem: string;
  sections: {
    problem: { kicker: string; title: string };
    flow: { kicker: string; title: string };
    decisions: { kicker: string; title: string };
    boundaries: { kicker: string; title: string; intro: string };
    next: { kicker: string; title: string };
  };
  goals: readonly string[];
  flow: readonly {
    label: string;
    title: string;
    description: string;
  }[];
  decisions: readonly {
    title: string;
    implementation: string;
    value: string;
  }[];
  boundaries: readonly {
    level: "高" | "中";
    title: string;
    description: string;
  }[];
  nextSteps: readonly string[];
};

export const projectCaseStudies = {
  chatify: {
    projectSlug: "chatify",
    heroKicker: "CASE STUDY / REALTIME SYSTEM",
    title: "从 BaaS 原型到 Go 实时消息链路",
    description:
      "围绕数据库访问成本和 N+1 查询问题，为 Chatify 增加 Go、PostgreSQL 与 WebSocket 后端，并保留迁移期间仍在工作的 Next.js / Convex 能力。",
    problem:
      "旧实现将会话与消息数据主要放在 Convex。随着关系查询增多，缺少 SQL JOIN 的数据访问方式容易把一次页面加载拆成大量查询。重构目标不是简单换语言，而是重新建立会话、成员、消息和未读状态之间的关系模型，同时让消息能够持久化后再实时分发。",
    sections: {
      problem: { kicker: "01 / PROBLEM", title: "为什么要重构后端" },
      flow: { kicker: "02 / MESSAGE FLOW", title: "一条消息如何完成持久化与分发" },
      decisions: { kicker: "03 / ENGINEERING DECISIONS", title: "代码中真实存在的设计" },
      boundaries: {
        kicker: "04 / CURRENT BOUNDARIES",
        title: "尚不能包装成生产级的部分",
        intro: "这些问题都能从当前代码直接确认，也是下一轮重构必须先处理的风险。",
      },
      next: { kicker: "05 / NEXT ITERATION", title: "下一轮应该怎么做" },
    },
    goals: [
      "用关系模型表达会话、成员、好友和消息",
      "消息先持久化，再向同一会话的连接广播",
      "用生成代码连接原生 SQL 与 Go 类型系统",
      "保留 Clerk 身份与 LiveKit 音视频能力",
    ],
    flow: [
      {
        label: "01",
        title: "Identity",
        description: "Next.js 从 Clerk 获取会话令牌；Clerk Webhook 经 Svix 验签后同步用户资料。",
      },
      {
        label: "02",
        title: "History",
        description: "React Query 通过 REST API 获取历史消息，并对返回数据执行 Zod 运行时校验。",
      },
      {
        label: "03",
        title: "Connect",
        description: "浏览器以 Clerk 令牌作为 WebSocket subprotocol 建立连接，Go 中间件解析身份。",
      },
      {
        label: "04",
        title: "Persist",
        description: "readPump 解析消息，sqlc 调用 CTE 写入消息并更新会话的最后消息引用。",
      },
      {
        label: "05",
        title: "Broadcast",
        description: "Hub 按 conversation ID 维护客户端集合，再由每个连接的 writePump 完成下行发送。",
      },
    ],
    decisions: [
      {
        title: "关系型数据模型替代多次拼装",
        implementation:
          "PostgreSQL 将 users、conversations、conversation_members、messages 与 friends 分表建模，查询通过 CTE 和 JOIN 一次返回会话成员、最后消息和未读数量。",
        value:
          "将隐式的数据依赖变成数据库约束和可审查 SQL，为定位 N+1、索引和一致性问题提供明确入口。",
      },
      {
        title: "SQL 作为契约，Go 类型由代码生成",
        implementation:
          "查询集中维护在 queries 目录，由 sqlc 生成参数和结果类型；结构变化通过 golang-migrate 的顺序迁移记录。",
        value:
          "保留原生 SQL 的控制力，同时减少手写 Scan、字段错位以及模型和查询不同步的问题。",
      },
      {
        title: "持久化成功后再进行实时广播",
        implementation:
          "WebSocket readPump 收到消息后先执行 CreateMessage，再读取包含发送者信息的完整消息，最后写入 Hub 的 broadcast channel。",
        value:
          "客户端收到的消息已经拥有数据库 ID 和创建时间，避免先广播后写入失败造成的幽灵消息。",
      },
      {
        title: "按会话隔离连接与广播范围",
        implementation:
          "Hub 使用 conversation ID 到 Client 集合的映射；每个客户端拥有独立的 256 容量发送通道和读写 goroutine。",
        value:
          "广播只遍历当前会话连接，并通过独立写协程避免单个网络写操作直接阻塞消息读取。",
      },
      {
        title: "音视频与文字消息链路解耦",
        implementation:
          "文字消息由自建 WebSocket 与 PostgreSQL 处理；音视频房间交给 LiveKit，Next.js Route Handler 仅签发短期房间令牌并禁用缓存。",
        value:
          "自建可控的数据链路，同时避免在业务服务中重复实现 WebRTC 媒体基础设施。",
      },
      {
        title: "前端区分服务端状态和表单状态",
        implementation:
          "React Query 管理历史消息缓存，Zod 校验 REST 响应，React Hook Form 处理输入；收到 WebSocket 消息后定向更新对应会话缓存。",
        value:
          "减少消息列表、请求状态和输入交互之间的状态耦合，为后续补充重连和乐观更新留下边界。",
      },
    ],
    boundaries: [
      {
        level: "高",
        title: "会话级授权尚未真正落地",
        description:
          "WebSocket 握手虽然会校验 Clerk 身份，但 hasAccessToConversation 当前直接返回 true；发送者 ID 也来自客户端消息体。需要从令牌映射数据库用户，并在升级连接前查询 conversation_members。",
      },
      {
        level: "高",
        title: "WebSocket 信任边界过宽",
        description:
          "Upgrader 的 CheckOrigin 当前允许任意来源。应配置可信 Origin，并避免把客户端提供的 sender_id 作为持久化依据。",
      },
      {
        level: "中",
        title: "连接生命周期与投递语义不完整",
        description:
          "当前没有 ping/pong、读写 deadline、自动重连、消息确认或幂等键；前端发送时会重设 onmessage，也可能覆盖已有监听器。",
      },
      {
        level: "中",
        title: "Hub 只适用于单实例",
        description:
          "连接表与广播 channel 都在进程内；横向扩容后不同实例无法互相投递，需要 Redis Pub/Sub、NATS 等跨节点通道，并重新定义消息顺序和重试策略。",
      },
      {
        level: "中",
        title: "并发保护和可观测性仍较薄弱",
        description:
          "广播路径在读锁范围内删除客户端，数据库写入使用 context.Background；目前也只有基础日志，缺少连接数、投递失败和消息延迟指标。",
      },
    ],
    nextSteps: [
      "首先补齐会话成员授权、可信 Origin 和服务端 sender ID 推导",
      "重构前端 WebSocket Provider，统一消息监听、重连、退避和状态恢复",
      "为 Hub 和消息写入增加 race test、集成测试与故障场景测试",
      "定义消息幂等键、确认机制和离线补偿策略",
      "加入结构化日志和连接、广播、数据库延迟指标后再讨论水平扩展",
    ],
  },
  "linze-pro": {
    projectSlug: "linze-pro",
    heroKicker: "CASE STUDY / CONTENT PLATFORM",
    title: "从 Vue 博客到 Next.js 双语内容平台",
    description:
      "在保留 Go/chi 内容 API 与既有文章模型的前提下，使用 Next.js App Router 重建公开前端，补齐 Markdown 发布、双语回退、SEO、文章互动与后台内容管理链路。",
    problem:
      "旧 Vue 前端的组件结构和渲染边界不适合继续扩展，文章展示、语言切换、SEO 与互动逻辑也逐渐耦合。重构目标不是把 Vue 文件逐个翻译成 React，而是在保留 Go 后端和内容数据的前提下，重新建立从 Markdown 编辑、版本保存到公开阅读的完整内容链路。",
    sections: {
      problem: { kicker: "01 / MIGRATION BRIEF", title: "为什么要重构博客前端" },
      flow: { kicker: "02 / CONTENT LIFECYCLE", title: "一篇文章如何从 Markdown 走到公开页面" },
      decisions: { kicker: "03 / ENGINEERING DECISIONS", title: "代码中真实存在的设计" },
      boundaries: {
        kicker: "04 / CURRENT BOUNDARIES",
        title: "当前仍需继续收敛的边界",
        intro: "这些限制都能从当前代码和部署方式确认，也是下一轮内容平台演进的具体入口。",
      },
      next: { kicker: "05 / NEXT ITERATION", title: "下一轮应该怎么做" },
    },
    goals: [
      "保留 Go 内容 API 与既有文章数据，渐进式替换公开前端",
      "让 Markdown Front-matter 成为可校验、可版本化的内容入口",
      "用独立的语言版本与明确的回退状态支持中英双语",
      "把 SEO、阅读体验、互动和可观测性纳入同一条交付链路",
    ],
    flow: [
      {
        label: "01",
        title: "Authoring",
        description:
          "管理员在 Next.js 后台上传或编辑 Markdown 文件，通过 JWT 与 RBAC 保护文章发布和更新接口。",
      },
      {
        label: "02",
        title: "Validate",
        description:
          "Go 后端解析 Front-matter，校验 slug、标题、正文长度、标签数量和日期格式，并清洗重复标签。",
      },
      {
        label: "03",
        title: "Persist",
        description:
          "发布或更新在同一事务中写入 post_translations、修订快照和互动统计，同时双写旧 posts 字段保持兼容。",
      },
      {
        label: "04",
        title: "Resolve",
        description:
          "Next.js Server Component 请求目标语言版本；Go 存储层优先精确匹配，缺失时回退到中文，并返回可用语言和回退状态。",
      },
      {
        label: "05",
        title: "Render",
        description:
          "服务端渲染 Markdown、目录、代码高亮和结构化数据；浏览器再通过独立互动接口记录阅读量并处理游客点赞。",
      },
    ],
    decisions: [
      {
        title: "渐进式迁移，而不是重写后端",
        implementation:
          "公开前端迁移到 Next.js App Router，继续复用 Go/chi REST API、PostgreSQL 和现有文章数据；后端保留旧版 Vue 兼容路由，降低切换期间的破坏性变更。",
        value:
          "把迁移风险限制在前端渲染和内容边界，同时让旧站、新站和数据层可以在过渡期共同运行。",
      },
      {
        title: "用语言子表承载双语内容",
        implementation:
          "post_translations 以 (post_slug, locale) 作为联合主键，post_translation_revisions 保存每个语言版本的历史快照；读取时由存储层返回 requestedLocale、resolvedLocale 和 fallback。",
        value:
          "中英文可以独立发布和更新，语言缺失时不会由前端猜测，而是由后端明确表达回退结果。",
      },
      {
        title: "Markdown 解析与版本控制放在后端边界",
        implementation:
          "Go 统一解析 YAML Front-matter，执行 slug、字段长度、标签和时间校验；更新语句携带旧 version，成功后递增版本并写入修订快照。",
        value:
          "内容格式和并发更新规则集中在服务端，避免多个管理端同时编辑时发生静默覆盖。",
      },
      {
        title: "服务端优先渲染公开内容",
        implementation:
          "Next.js 使用 Server Component 获取文章数据，按语言生成 Metadata、Canonical、alternate、Open Graph、Article JSON-LD、Sitemap 和 RSS；Markdown 通过 GFM、heading slug、代码高亮和目录组件渲染。",
        value:
          "把 SEO、首屏内容和阅读结构放回服务端，同时将点赞等个性化互动隔离到客户端请求。",
      },
      {
        title: "匿名互动也保持幂等和可控",
        implementation:
          "后端为游客签发 HttpOnly 签名 Cookie，并只在 Redis 与 PostgreSQL 中保存 HMAC 脱敏哈希；点赞由唯一约束和事务保证幂等，浏览量使用日粒度去重，Redis 负责快速过滤和限流。",
        value:
          "不要求注册即可回显点赞状态，同时降低刷新、连击和脚本请求对统计数据的影响。",
      },
      {
        title: "把可观测性纳入内容服务",
        implementation:
          "Go API 暴露 Prometheus HTTP、数据库和业务指标，并通过可选的 OpenTelemetry OTLP/gRPC 导出 HTTP、数据库和 Redis Span；健康检查、readiness、超时与优雅停机共同管理服务生命周期。",
        value:
          "文章请求、翻译回退、互动写入和基础设施瓶颈都有可追踪入口，而不是只依赖用户反馈定位问题。",
      },
    ],
    boundaries: [
      {
        level: "高",
        title: "旧模型与新模型仍处于双写过渡期",
        description:
          "post_translations 已成为多语言读取和版本管理的主要入口，但 posts 中仍保留旧的中英文列，并在发布更新时同步写入。后续需要确定唯一事实来源并逐步退出兼容双写。",
      },
      {
        level: "中",
        title: "文章列表的搜索和筛选仍有扩展空间",
        description:
          "当前前端会获取有限数量的文章后完成部分筛选。文章规模扩大后，应将搜索、标签、年份和分页下沉到 Go API，并配合稳定的排序和索引策略。",
      },
      {
        level: "中",
        title: "内容图片还没有完整的尺寸与优化链路",
        description:
          "Markdown 图片目前以普通 img 渲染，内容没有固有宽高信息。后续需要补充尺寸元数据、响应式加载和 CDN/缓存策略，以继续改善 CLS 和移动端加载。",
      },
      {
        level: "中",
        title: "Redis 限流是可降级的防护，而不是绝对防刷",
        description:
          "互动接口在 Redis 不可用时会 fail-open，以优先保证博客可用；游客 Cookie 也可能被清除。因此它提供的是基础去重和限流，不应包装成强身份认证或完全防刷系统。",
      },
      {
        level: "中",
        title: "AI 目前是开发工作流，不是产品能力",
        description:
          "项目可以使用 AI 协助拆解问题、比较方案和验证实现，但当前没有接入 LLM API、RAG、Embedding 或 Agent。案例页不会把这些未实现能力描述成系统功能。",
      },
    ],
    nextSteps: [
      "逐步收敛 post_translations 为唯一内容事实来源，结束旧字段双写",
      "将搜索、标签筛选、归档和分页下沉到 Go API，并补齐缓存失效策略",
      "为 Markdown 图片补充尺寸元数据、响应式加载和可观测的 Core Web Vitals 指标",
      "增加文章发布、语言回退、版本冲突和互动幂等的端到端测试",
      "完善后台发布审计、回滚和内容发布后的精确缓存刷新流程",
    ],
  },
} as const satisfies Record<string, ProjectCaseStudy>;

export type ProjectCaseStudySlug = keyof typeof projectCaseStudies;

export function getProjectCaseStudy(slug: string): ProjectCaseStudy | undefined {
  return projectCaseStudies[slug as ProjectCaseStudySlug];
}
