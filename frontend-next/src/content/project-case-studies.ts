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
    level: '高' | '中';
    title: string;
    description: string;
  }[];
  nextSteps: readonly string[];
};

export const projectCaseStudies = {
  chatify: {
    projectSlug: 'chatify',
    heroKicker: 'CASE STUDY / REALTIME SYSTEM',
    title: '从 BaaS 原型到 Go 实时消息链路',
    description:
      '围绕数据库访问成本和 N+1 查询问题，为 Chatify 增加 Go、PostgreSQL 与 WebSocket 后端，并保留迁移期间仍在工作的 Next.js / Convex 能力。',
    problem:
      '旧实现将会话与消息数据主要放在 Convex。随着关系查询增多，缺少 SQL JOIN 的数据访问方式容易把一次页面加载拆成大量查询。重构目标不是简单换语言，而是重新建立会话、成员、消息和未读状态之间的关系模型，同时让消息能够持久化后再实时分发。',
    sections: {
      problem: { kicker: '01 / PROBLEM', title: '为什么要重构后端' },
      flow: { kicker: '02 / MESSAGE FLOW', title: '一条消息如何完成持久化与分发' },
      decisions: { kicker: '03 / ENGINEERING DECISIONS', title: '代码中真实存在的设计' },
      boundaries: {
        kicker: '04 / CURRENT BOUNDARIES',
        title: '尚不能包装成生产级的部分',
        intro: '这些问题都能从当前代码直接确认，也是下一轮重构必须先处理的风险。',
      },
      next: { kicker: '05 / NEXT ITERATION', title: '下一轮应该怎么做' },
    },
    goals: [
      '用关系模型表达会话、成员、好友和消息',
      '消息先持久化，再向同一会话的连接广播',
      '用生成代码连接原生 SQL 与 Go 类型系统',
      '保留 Clerk 身份与 LiveKit 音视频能力',
    ],
    flow: [
      {
        label: '01',
        title: 'Identity',
        description: 'Next.js 从 Clerk 获取会话令牌；Clerk Webhook 经 Svix 验签后同步用户资料。',
      },
      {
        label: '02',
        title: 'History',
        description: 'React Query 通过 REST API 获取历史消息，并对返回数据执行 Zod 运行时校验。',
      },
      {
        label: '03',
        title: 'Connect',
        description: '浏览器以 Clerk 令牌作为 WebSocket subprotocol 建立连接，Go 中间件解析身份。',
      },
      {
        label: '04',
        title: 'Persist',
        description: 'readPump 解析消息，sqlc 调用 CTE 写入消息并更新会话的最后消息引用。',
      },
      {
        label: '05',
        title: 'Broadcast',
        description: 'Hub 按 conversation ID 维护客户端集合，再由每个连接的 writePump 完成下行发送。',
      },
    ],
    decisions: [
      {
        title: '关系型数据模型替代多次拼装',
        implementation:
          'PostgreSQL 将 users、conversations、conversation_members、messages 与 friends 分表建模，查询通过 CTE 和 JOIN 一次返回会话成员、最后消息和未读数量。',
        value: '将隐式的数据依赖变成数据库约束和可审查 SQL，为定位 N+1、索引和一致性问题提供明确入口。',
      },
      {
        title: 'SQL 作为契约，Go 类型由代码生成',
        implementation:
          '查询集中维护在 queries 目录，由 sqlc 生成参数和结果类型；结构变化通过 golang-migrate 的顺序迁移记录。',
        value: '保留原生 SQL 的控制力，同时减少手写 Scan、字段错位以及模型和查询不同步的问题。',
      },
      {
        title: '持久化成功后再进行实时广播',
        implementation:
          'WebSocket readPump 收到消息后先执行 CreateMessage，再读取包含发送者信息的完整消息，最后写入 Hub 的 broadcast channel。',
        value: '客户端收到的消息已经拥有数据库 ID 和创建时间，避免先广播后写入失败造成的幽灵消息。',
      },
      {
        title: '按会话隔离连接与广播范围',
        implementation:
          'Hub 使用 conversation ID 到 Client 集合的映射；每个客户端拥有独立的 256 容量发送通道和读写 goroutine。',
        value: '广播只遍历当前会话连接，并通过独立写协程避免单个网络写操作直接阻塞消息读取。',
      },
      {
        title: '音视频与文字消息链路解耦',
        implementation:
          '文字消息由自建 WebSocket 与 PostgreSQL 处理；音视频房间交给 LiveKit，Next.js Route Handler 仅签发短期房间令牌并禁用缓存。',
        value: '自建可控的数据链路，同时避免在业务服务中重复实现 WebRTC 媒体基础设施。',
      },
      {
        title: '前端区分服务端状态和表单状态',
        implementation:
          'React Query 管理历史消息缓存，Zod 校验 REST 响应，React Hook Form 处理输入；收到 WebSocket 消息后定向更新对应会话缓存。',
        value: '减少消息列表、请求状态和输入交互之间的状态耦合，为后续补充重连和乐观更新留下边界。',
      },
    ],
    boundaries: [
      {
        level: '高',
        title: '会话级授权尚未真正落地',
        description:
          'WebSocket 握手虽然会校验 Clerk 身份，但 hasAccessToConversation 当前直接返回 true；发送者 ID 也来自客户端消息体。需要从令牌映射数据库用户，并在升级连接前查询 conversation_members。',
      },
      {
        level: '高',
        title: 'WebSocket 信任边界过宽',
        description:
          'Upgrader 的 CheckOrigin 当前允许任意来源。应配置可信 Origin，并避免把客户端提供的 sender_id 作为持久化依据。',
      },
      {
        level: '中',
        title: '连接生命周期与投递语义不完整',
        description:
          '当前没有 ping/pong、读写 deadline、自动重连、消息确认或幂等键；前端发送时会重设 onmessage，也可能覆盖已有监听器。',
      },
      {
        level: '中',
        title: 'Hub 只适用于单实例',
        description:
          '连接表与广播 channel 都在进程内；横向扩容后不同实例无法互相投递，需要 Redis Pub/Sub、NATS 等跨节点通道，并重新定义消息顺序和重试策略。',
      },
      {
        level: '中',
        title: '并发保护和可观测性仍较薄弱',
        description:
          '广播路径在读锁范围内删除客户端，数据库写入使用 context.Background；目前也只有基础日志，缺少连接数、投递失败和消息延迟指标。',
      },
    ],
    nextSteps: [
      '首先补齐会话成员授权、可信 Origin 和服务端 sender ID 推导',
      '重构前端 WebSocket Provider，统一消息监听、重连、退避和状态恢复',
      '为 Hub 和消息写入增加 race test、集成测试与故障场景测试',
      '定义消息幂等键、确认机制和离线补偿策略',
      '加入结构化日志和连接、广播、数据库延迟指标后再讨论水平扩展',
    ],
  },
  'linze-pro': {
    projectSlug: 'linze-pro',
    heroKicker: 'CASE STUDY / CONTENT PLATFORM',
    title: '从 Vue 博客到 Next.js 双语内容平台',
    description:
      '在保留 Go/chi 内容 API 与既有文章模型的前提下，使用 Next.js App Router 重建公开前端，补齐 Markdown 发布、双语回退、SEO、文章互动与后台内容管理链路。',
    problem:
      '旧 Vue 前端的组件结构和渲染边界不适合继续扩展，文章展示、语言切换、SEO 与互动逻辑也逐渐耦合。重构目标不是把 Vue 文件逐个翻译成 React，而是在保留 Go 后端和内容数据的前提下，重新建立从 Markdown 编辑、版本保存到公开阅读的完整内容链路。',
    sections: {
      problem: { kicker: '01 / MIGRATION BRIEF', title: '为什么要重构博客前端' },
      flow: { kicker: '02 / CONTENT LIFECYCLE', title: '一篇文章如何从 Markdown 走到公开页面' },
      decisions: { kicker: '03 / ENGINEERING DECISIONS', title: '代码中真实存在的设计' },
      boundaries: {
        kicker: '04 / CURRENT BOUNDARIES',
        title: '当前仍需继续收敛的边界',
        intro: '这些限制都能从当前代码和部署方式确认，也是下一轮内容平台演进的具体入口。',
      },
      next: { kicker: '05 / NEXT ITERATION', title: '下一轮应该怎么做' },
    },
    goals: [
      '保留 Go 内容 API 与既有文章数据，渐进式替换公开前端',
      '让 Markdown Front-matter 成为可校验、可版本化的内容入口',
      '用独立的语言版本与明确的回退状态支持中英双语',
      '把 SEO、阅读体验、互动和可观测性纳入同一条交付链路',
    ],
    flow: [
      {
        label: '01',
        title: 'Authoring',
        description: '管理员在 Next.js 后台上传或编辑 Markdown 文件，通过 JWT 与 RBAC 保护文章发布和更新接口。',
      },
      {
        label: '02',
        title: 'Validate',
        description: 'Go 后端解析 Front-matter，校验 slug、标题、正文长度、标签数量和日期格式，并清洗重复标签。',
      },
      {
        label: '03',
        title: 'Persist',
        description:
          '发布或更新在同一事务中写入 post_translations、修订快照和互动统计，同时双写旧 posts 字段保持兼容。',
      },
      {
        label: '04',
        title: 'Resolve',
        description:
          'Next.js Server Component 请求目标语言版本；Go 存储层优先精确匹配，缺失时回退到中文，并返回可用语言和回退状态。',
      },
      {
        label: '05',
        title: 'Render',
        description:
          '服务端渲染 Markdown、目录、代码高亮和结构化数据；浏览器再通过独立互动接口记录阅读量并处理游客点赞。',
      },
    ],
    decisions: [
      {
        title: '渐进式迁移，而不是重写后端',
        implementation:
          '公开前端迁移到 Next.js App Router，继续复用 Go/chi REST API、PostgreSQL 和现有文章数据；后端保留旧版 Vue 兼容路由，降低切换期间的破坏性变更。',
        value: '把迁移风险限制在前端渲染和内容边界，同时让旧站、新站和数据层可以在过渡期共同运行。',
      },
      {
        title: '用语言子表承载双语内容',
        implementation:
          'post_translations 以 (post_slug, locale) 作为联合主键，post_translation_revisions 保存每个语言版本的历史快照；读取时由存储层返回 requestedLocale、resolvedLocale 和 fallback。',
        value: '中英文可以独立发布和更新，语言缺失时不会由前端猜测，而是由后端明确表达回退结果。',
      },
      {
        title: 'Markdown 解析与版本控制放在后端边界',
        implementation:
          'Go 统一解析 YAML Front-matter，执行 slug、字段长度、标签和时间校验；更新语句携带旧 version，成功后递增版本并写入修订快照。',
        value: '内容格式和并发更新规则集中在服务端，避免多个管理端同时编辑时发生静默覆盖。',
      },
      {
        title: '服务端优先渲染公开内容',
        implementation:
          'Next.js 使用 Server Component 获取文章数据，按语言生成 Metadata、Canonical、alternate、Open Graph、Article JSON-LD、Sitemap 和 RSS；Markdown 通过 GFM、heading slug、代码高亮和目录组件渲染。',
        value: '把 SEO、首屏内容和阅读结构放回服务端，同时将点赞等个性化互动隔离到客户端请求。',
      },
      {
        title: '匿名互动也保持幂等和可控',
        implementation:
          '后端为游客签发 HttpOnly 签名 Cookie，并只在 Redis 与 PostgreSQL 中保存 HMAC 脱敏哈希；点赞由唯一约束和事务保证幂等，浏览量使用日粒度去重，Redis 负责快速过滤和限流。',
        value: '不要求注册即可回显点赞状态，同时降低刷新、连击和脚本请求对统计数据的影响。',
      },
      {
        title: '把可观测性纳入内容服务',
        implementation:
          'Go API 暴露 Prometheus HTTP、数据库和业务指标，并通过可选的 OpenTelemetry OTLP/gRPC 导出 HTTP、数据库和 Redis Span；健康检查、readiness、超时与优雅停机共同管理服务生命周期。',
        value: '文章请求、翻译回退、互动写入和基础设施瓶颈都有可追踪入口，而不是只依赖用户反馈定位问题。',
      },
    ],
    boundaries: [
      {
        level: '高',
        title: '旧模型与新模型仍处于双写过渡期',
        description:
          'post_translations 已成为多语言读取和版本管理的主要入口，但 posts 中仍保留旧的中英文列，并在发布更新时同步写入。后续需要确定唯一事实来源并逐步退出兼容双写。',
      },
      {
        level: '中',
        title: '文章列表的搜索和筛选仍有扩展空间',
        description:
          '当前前端会获取有限数量的文章后完成部分筛选。文章规模扩大后，应将搜索、标签、年份和分页下沉到 Go API，并配合稳定的排序和索引策略。',
      },
      {
        level: '中',
        title: '内容图片还没有完整的尺寸与优化链路',
        description:
          'Markdown 图片目前以普通 img 渲染，内容没有固有宽高信息。后续需要补充尺寸元数据、响应式加载和 CDN/缓存策略，以继续改善 CLS 和移动端加载。',
      },
      {
        level: '中',
        title: 'Redis 限流是可降级的防护，而不是绝对防刷',
        description:
          '互动接口在 Redis 不可用时会 fail-open，以优先保证博客可用；游客 Cookie 也可能被清除。因此它提供的是基础去重和限流，不应包装成强身份认证或完全防刷系统。',
      },
      {
        level: '中',
        title: 'AI 目前是开发工作流，不是产品能力',
        description:
          '项目可以使用 AI 协助拆解问题、比较方案和验证实现，但当前没有接入 LLM API、RAG、Embedding 或 Agent。案例页不会把这些未实现能力描述成系统功能。',
      },
    ],
    nextSteps: [
      '逐步收敛 post_translations 为唯一内容事实来源，结束旧字段双写',
      '将搜索、标签筛选、归档和分页下沉到 Go API，并补齐缓存失效策略',
      '为 Markdown 图片补充尺寸元数据、响应式加载和可观测的 Core Web Vitals 指标',
      '增加文章发布、语言回退、版本冲突和互动幂等的端到端测试',
      '完善后台发布审计、回滚和内容发布后的精确缓存刷新流程',
    ],
  },
  cabinfy: {
    projectSlug: 'cabinfy',
    heroKicker: 'CASE STUDY / PRODUCT ENGINEERING',
    title: '从课程原型到双端住宿预订平台',
    description:
      '使用 React、React Query 与 Tailwind CSS 重建面向旅客和管理员的住宿预订体验，并通过 Node.js、Express、Prisma 与 PostgreSQL 支撑房源、预订、评价和运营设置等核心流程。',
    problem:
      'CabinFy 同时服务希望发现并预订小木屋的旅客，以及需要管理房源、预订和入住流程的管理员。项目的挑战不只是完成一个房源列表，而是在同一套数据模型上组织两类用户的路由、服务端状态、表单、数据表格和响应式交互，让一个课程原型逐步具备完整产品的结构。',
    sections: {
      problem: { kicker: '01 / PRODUCT SCOPE', title: '为什么需要一个双端住宿产品' },
      flow: { kicker: '02 / BOOKING FLOW', title: '一次预订如何从浏览走到后台处理' },
      decisions: { kicker: '03 / ENGINEERING DECISIONS', title: '代码中真实存在的前端与全栈设计' },
      boundaries: {
        kicker: '04 / CURRENT BOUNDARIES',
        title: '后端仍需继续收敛的边界',
        intro: '前端体验和业务流程已经形成清晰骨架，但认证、授权和预订一致性仍需要在下一轮迭代中加强。',
      },
      next: { kicker: '05 / NEXT ITERATION', title: '下一轮应该怎么做' },
    },
    goals: [
      '在同一套房源与预订数据上组织游客端和管理员端体验',
      '使用 React Query 分离服务端状态与本地交互状态',
      '通过表单校验、可复用组件和懒加载保持前端可维护性',
      '在多语言、暗色模式和不同屏幕尺寸下保持一致的使用体验',
    ],
    flow: [
      {
        label: '01',
        title: 'Discover',
        description: '游客在首页浏览房源，通过筛选、排序和分页获取可用的小木屋列表。',
      },
      {
        label: '02',
        title: 'Decide',
        description: '房源详情页集中展示图片、描述、价格、位置和评价，用户选择日期与入住人数。',
      },
      {
        label: '03',
        title: 'Calculate',
        description: 'Booking Form 根据入住日期、住宿晚数、人数和早餐选项展示预估价格与预订信息。',
      },
      {
        label: '04',
        title: 'Book',
        description: '游客完成登录后，前端通过 JWT Cookie 访问受保护的创建预订接口并提交表单。',
      },
      {
        label: '05',
        title: 'Operate',
        description: '管理员在 Dashboard、Bookings、Cabins 和 Check-in 页面中处理预订、房源和入住状态。',
      },
    ],
    decisions: [
      {
        title: '用 React Query 管理服务端状态',
        implementation:
          '房源、预订、评价和设置分别通过 Query Hook 获取，新增、修改和删除由 Mutation Hook 承担；页面消费统一的加载、错误和更新状态。',
        value: '将服务端数据与本地 UI 状态分离，避免把请求结果、表单输入和弹窗状态耦合到一个全局状态容器中。',
      },
      {
        title: '按业务边界组织前端模块',
        implementation:
          'features 目录按 authentication、bookings、cabins、check-in-out、dashboard、guests 和 settings 拆分，每个模块组合页面组件、表单和数据 Hook。',
        value: '业务规则和交互入口更容易定位，列表、表单、弹窗和数据请求也能在同一领域内复用。',
      },
      {
        title: '隔离游客端与管理端路由',
        implementation:
          'React Router 将 /admin/* 与游客端页面分开，管理后台使用独立布局和 ProtectedRoute，游客端则围绕房源浏览、详情和预订组织导航。',
        value: '两类用户拥有不同的信息层级和操作边界，同时保留一套可复用的 API 和领域数据。',
      },
      {
        title: '用懒加载和骨架屏处理页面切换',
        implementation:
          'Dashboard、Bookings、Cabins、Home 和 Cabin 等页面通过 React.lazy 与 Suspense 按路由加载，并为房源列表和详情页提供专用 Skeleton。',
        value: '减少初始 JavaScript 负担，并用稳定的布局占位降低异步请求带来的空白和跳动。',
      },
      {
        title: '让表单校验和基础组件保持一致',
        implementation:
          'React Hook Form 管理表单状态，Zod 负责运行时校验，Table、Dialog、Select、Form、Sheet 等组件为游客端和后台提供统一交互基础。',
        value: '减少重复表单逻辑，让房源、预订、登录和设置等不同业务流程拥有一致的错误反馈和交互习惯。',
      },
      {
        title: '将多语言、暗色和响应式作为产品能力',
        implementation:
          'react-i18next 通过浏览器语言检测和 JSON locale 文件加载中英文文案；Tailwind 响应式样式、DarkModeProvider 和移动端布局共同覆盖不同设备与偏好。',
        value: '国际化和可访问的视觉体验不再是页面完成后的补丁，而是贯穿游客端与管理端的界面基础。',
      },
    ],
    boundaries: [
      {
        level: '高',
        title: '管理接口的后端授权还不统一',
        description:
          '前端通过 ProtectedRoute 限制管理页面，但后端部分房源写操作、预订操作和设置更新路由仍缺少统一的认证与 ADMIN 角色校验。下一步应以服务端权限为最终边界。',
      },
      {
        level: '高',
        title: '预订一致性不能只依赖客户端表单',
        description:
          '当前创建预订的核心流程完成了参数校验，但日期重叠、并发预订、服务端重新计算金额和事务级保护仍需要加强，否则高并发下可能出现重复预订或价格被篡改。',
      },
      {
        level: '中',
        title: '认证方案同时使用 Session 和 JWT',
        description:
          '管理员和游客分别使用 Passport Session 与 JWT Cookie。方案可以工作，但 Cookie 安全属性、刷新与撤销、CORS、限流和统一错误响应仍需进一步收敛。',
      },
      {
        level: '中',
        title: '后端可观测性和自动化测试仍较薄',
        description:
          '当前主要依赖 Morgan 和应用日志，没有看到完整的健康检查、指标、链路追踪及覆盖预订冲突、权限和失败恢复的测试体系。',
      },
      {
        level: '中',
        title: '金额与部署配置还需要更严格的生产约束',
        description:
          '金额字段使用 Float，部署配置中也存在环境相关的路径和安全选项。下一步应使用 Decimal、环境变量和显式的生产 Cookie/CORS 配置。',
      },
    ],
    nextSteps: [
      '为房源、预订和设置写操作增加统一认证与 ADMIN 角色中间件',
      '在服务端重新计算预订金额，并用事务和日期重叠检查保证预订一致性',
      '统一 Session/JWT 的安全策略，补齐 Secure Cookie、SameSite、CORS 与登录限流',
      '为核心业务增加 API 集成测试、前端交互测试和端到端预订流程测试',
      '补充健康检查、结构化日志和基础指标，再评估缓存与异步任务的必要性',
    ],
  },
  moviefy: {
    projectSlug: 'moviefy',
    heroKicker: 'CASE STUDY / MEDIA PLATFORM',
    title: '从电影评论应用到双端内容管理平台',
    description:
      '面向观影用户与管理员的双端电影内容平台。使用 React、Tailwind CSS 与 shadcn/ui 构建电影发现、视频播放、演员信息、评论评分和内容管理流程，并以 Node.js、Express、MongoDB 与 JWT 支撑内容与认证链路。',
    problem:
      'MovieFy 同时服务希望发现、观看和评价电影的用户，以及需要维护电影、演员、媒体文件和评论数据的管理员。项目的核心挑战不是单独完成一个电影列表，而是围绕同一套内容模型组织两种信息层级：用户需要流畅的发现与观看体验，管理员则需要能够承载复杂关联字段和文件上传的内容工作台。',
    sections: {
      problem: { kicker: '01 / PRODUCT SCOPE', title: '为什么电影应用需要两套体验' },
      flow: { kicker: '02 / MOVIE EXPERIENCE', title: '一部电影如何从内容管理走到用户观看页面' },
      decisions: { kicker: '03 / ENGINEERING DECISIONS', title: '代码中真实存在的前端与全栈设计' },
      boundaries: {
        kicker: '04 / CURRENT BOUNDARIES',
        title: '后端和状态边界仍需继续收敛',
        intro: '前端产品体验和核心内容流程已经形成完整骨架，但认证安全、数据一致性和错误契约仍是下一轮工程化重点。',
      },
      next: { kicker: '05 / NEXT ITERATION', title: '下一轮应该怎么做' },
    },
    goals: [
      '在同一套电影、演员和评论数据上组织用户端与管理员端体验',
      '通过组合式表单处理电影元数据、演员关联和媒体文件上传',
      '支持搜索、视频播放、评分评论、相关推荐和多语言展示',
      '在明暗主题、移动端布局和复杂后台表格中保持一致的交互体验',
    ],
    flow: [
      {
        label: '01',
        title: 'Discover',
        description: '首页通过 Hero Carousel、最新上传和按 Genre 的高评分列表帮助用户发现电影。',
      },
      {
        label: '02',
        title: 'Search',
        description: '用户通过标题搜索电影，Search Context 结合防抖逻辑减少重复请求并展示结果状态。',
      },
      {
        label: '03',
        title: 'Explore',
        description: '电影详情页集中展示视频、剧情、导演、编剧、演员、类型、语言、上映日期和相关电影。',
      },
      {
        label: '04',
        title: 'Review',
        description: '登录用户可以提交星级评分，查看电影评论，并编辑或删除自己的评论。',
      },
      {
        label: '05',
        title: 'Operate',
        description: '管理员通过 Dashboard、Movies、Actors 和 Search 管理电影、演员、海报、视频及内容状态。',
      },
    ],
    decisions: [
      {
        title: '用组合式表单承载复杂电影数据',
        implementation:
          'MovieForm 使用 React Hook Form 和 Zod 管理电影标题、剧情、Genre、标签、导演、编剧、演员、上映日期、语言、状态以及海报和视频文件。',
        value: '把一个容易失控的后台表单拆成可验证的字段和可复用的选择器，让创建与编辑共享同一套交互基础。',
      },
      {
        title: '用防抖搜索连接演员关系',
        implementation:
          'LiveSearch、LiveSearchCast 以及 DirectorSelector、WriterSelector 为导演、编剧和演员提供实时搜索、键盘导航、多选展示和重复过滤。',
        value: '管理员不需要在长列表中手动查找 ObjectId，可以在内容录入过程中直接建立电影与人物资料的关系。',
      },
      {
        title: '将用户端与管理员端作为两种产品体验',
        implementation:
          'App 根据认证用户角色切换普通用户路由与 AdminNavigator；用户端围绕发现、播放和评论组织页面，后台则围绕 Dashboard、Movies 和 Actors 组织操作。',
        value: '两类用户拥有不同的信息层级、导航和操作密度，同时共享电影、演员和评论 API。',
      },
      {
        title: '把媒体上传纳入内容发布流程',
        implementation:
          '后端使用 Multer 接收图片和视频，再通过 Cloudinary 保存 URL、public ID 和响应式海报地址；前端在表单中提供文件类型、大小和上传状态反馈。',
        value: '电影内容不再只是文本 CRUD，而是把海报、视频、CDN 资源和元数据作为一条完整的发布链路处理。',
      },
      {
        title: '通过 Context 组织跨页面状态',
        implementation:
          'AuthProvider 负责登录状态和 Token 恢复，MoviesProvider 管理电影分页数据，SearchProvider 管理搜索结果，ThemeProvider 持久化明暗主题。',
        value: '将跨页面共享的认证、搜索、电影列表和主题状态集中到明确的边界中，降低导航切换时的重复处理。',
      },
      {
        title: '用聚合查询批量计算评分',
        implementation:
          'MongoDB 聚合负责平均评分、评论数量、相关推荐和高评分电影；getAverageRatingsMap 将多个电影的评分统计合并为一次查询，避免列表场景中的 N+1 读取。',
        value: '保留 MongoDB 文档模型的灵活性，同时为首页榜单和相关推荐建立更可控的数据访问路径。',
      },
    ],
    boundaries: [
      {
        level: '高',
        title: 'JWT 存储和生命周期仍需加强',
        description:
          '当前前端将 JWT 保存在 localStorage，后端签发 Token 时没有明显的过期时间、刷新和撤销机制。下一步应评估 HttpOnly Cookie、短期 Access Token 和 Refresh Token Rotation。',
      },
      {
        level: '高',
        title: '邮箱验证状态尚未真正约束评论接口',
        description:
          '项目实现了 OTP 邮箱验证和 isVerified 字段，但评论控制器中验证用户状态的检查仍是注释代码，因此不能将评论描述成已严格限制给验证用户。',
      },
      {
        level: '中',
        title: '评论与电影引用更新缺少事务边界',
        description:
          '新增和删除评论会分别更新 Review 文档与 Movie.reviews 数组，但当前没有 MongoDB Session 事务或唯一索引来兜底并发重复评论和部分失败。',
      },
      {
        level: '中',
        title: '错误契约和参数状态码仍不统一',
        description:
          '部分校验错误以 JSON error 返回但仍使用成功状态码，JWT 校验异常也需要进一步映射为明确的认证错误；前端目前主要通过 Toast 消费字符串错误。',
      },
      {
        level: '中',
        title: '前端服务端状态和搜索状态仍有简化实现',
        description:
          '当前使用多个 Context 和模块级分页、debounce 变量维护状态。数据规模扩大后，可将服务端状态迁移到 React Query，并把搜索和分页状态同步到 URL。',
      },
    ],
    nextSteps: [
      '将 JWT 改为带过期和刷新策略的安全 Cookie 方案，并补齐 Token 撤销能力',
      '在评论接口真正校验邮箱验证状态，并增加 owner + movie 的唯一约束',
      '使用 MongoDB Session 事务保证 Review 与 Movie 引用的一致性',
      '统一 4xx/5xx 错误响应、错误码和前端多语言提示，并补充请求级日志',
      '将电影、搜索和分页数据迁移到 React Query，增加核心用户与管理员流程的端到端测试',
    ],
  },
  petify: {
    projectSlug: "petify",
    heroKicker: "CASE STUDY / COMMERCE SYSTEM",
    title: "从用户商城到卖家后台的三端电商系统",
    description:
      "Petify 将用户商城、卖家运营后台和 Express API 拆成三个独立应用，覆盖商品发现、筛选、购物车、订单、评价、实时客服和运营数据看板。项目使用 React、Redux、Tailwind CSS、Node.js、MongoDB、Cloudinary、Docker 与 Caddy 完成从界面到部署的全栈实践。",
    problem:
      "Petify 的挑战不是完成一个商品列表，而是在同一套用户、商品、订单和聊天数据上组织三种不同的使用场景：用户需要清晰的发现和购买流程，卖家需要高密度的商品与订单工作台，客服又需要低延迟的实时沟通。项目因此将用户端、卖家端和 API 独立出来，再通过 REST、Redux 和 Socket.IO 连接交易与沟通流程。",
    sections: {
      problem: { kicker: "01 / PRODUCT SURFACES", title: "为什么把电商拆成三个应用" },
      flow: { kicker: "02 / COMMERCE FLOW", title: "一次购买如何从商品发现进入后台协作" },
      decisions: { kicker: "03 / FRONTEND ENGINEERING", title: "代码中真实存在的产品与工程设计" },
      boundaries: {
        kicker: "04 / CURRENT BOUNDARIES",
        title: "前端体验完整，但交易后端仍需收敛",
        intro: "用户商城和卖家工作台已经形成较完整的产品骨架；身份边界、订单一致性、实时连接和支付闭环是下一轮更重要的工程问题。",
      },
      next: { kicker: "05 / NEXT ITERATION", title: "下一轮应该怎么做" },
    },
    goals: [
      "将用户商城、卖家运营后台和 Express API 拆成独立的应用边界",
      "为商品发现、购物车、订单、评价和客服建立连续的用户体验",
      "使用 Redux、React Router 和 Tailwind 组织跨页面状态与响应式界面",
      "让卖家能够在同一个工作台中处理商品、订单、统计和客户消息",
    ],
    flow: [
      {
        label: "01",
        title: "Discover",
        description:
          "用户从首页 Banner、分类和商品列表开始浏览，API 返回最新、评分和折扣商品，前端通过卡片和详情页组织发现路径。",
      },
      {
        label: "02",
        title: "Filter",
        description:
          "Shop 页面组合分类、价格区间、评分、关键词和价格排序，并在 Grid/List 视图和分页之间保持同一组筛选状态。",
      },
      {
        label: "03",
        title: "Decide",
        description:
          "商品详情聚合图片、描述、库存、折扣、评分、评论、同类商品和同一卖家的更多商品，帮助用户完成购买判断。",
      },
      {
        label: "04",
        title: "Cart",
        description:
          "用户可以将商品加入购物车或心愿单，调整数量，检查库存，并在结算页面填写配送信息。",
      },
      {
        label: "05",
        title: "Order",
        description:
          "下单接口创建客户订单和卖家子订单，删除购物车项目，并通过订单状态和 Dashboard 让用户追踪处理进度。",
      },
      {
        label: "06",
        title: "Operate",
        description:
          "卖家在 Dashboard、商品、分类、订单、支付统计和客服页面中完成日常运营，Socket.IO 同步在线客户与消息变化。",
      },
    ],
    decisions: [
      {
        title: "将用户端、卖家端与 API 作为三个产品边界",
        implementation:
          "frontend 和 dashboard 是两个独立的 Vite React 应用，backend 负责 Express REST API、MongoDB、文件上传和 Socket.IO；Caddy 根据 pet.linze.pro 与 seller.pet.linze.pro 路由静态资源和 API。",
        value:
          "用户商城和卖家后台可以拥有不同的信息密度、导航和交互方式，同时共享同一套业务数据和后端能力。",
      },
      {
        title: "用 Redux Toolkit 组织跨页面交易状态",
        implementation:
          "用户端分别维护 auth、home、cart、order、dashboard 和 chat reducer；后台则拆分 auth、product、category、seller、order 和 chat 状态。",
        value:
          "商品详情、购物车、订单、Dashboard 和聊天页面之间拥有稳定的状态入口，减少跨页面交互中的重复请求和局部状态拼装。",
      },
      {
        title: "围绕卖家日常操作设计后台工作台",
        implementation:
          "dashboard 使用独立路由、ProtectedRoute、Lazy Loading、商品与订单表格、搜索分页、图表和 react-window 虚拟列表组织商品、订单、支付和客服页面。",
        value:
          "后台不只是用户端的附属页面，而是针对商品管理、订单处理、销售统计和客户沟通建立了更高密度的操作流。",
      },
      {
        title: "用 REST 持久化与 Socket.IO 即时分发协作",
        implementation:
          "聊天控制器将 Customer、Seller 和 Admin 消息写入 MongoDB，Socket.IO 维护当前进程中的在线连接并向目标用户推送消息；前端 Redux 接收事件后更新会话列表。",
        value:
          "历史数据和实时交互拥有不同的职责边界：REST 负责可查询的消息记录，Socket.IO 负责在线场景中的低延迟反馈。",
      },
      {
        title: "将国际化、主题和响应式作为界面基础",
        implementation:
          "用户端使用 react-i18next 和浏览器语言检测加载中英文文案，Tailwind CSS 负责商品筛选、详情、购物车和移动端布局；后台通过 ThemeProvider 支持明暗主题和响应式 Sidebar。",
        value:
          "用户体验不局限于桌面端单语言商城，语言、设备尺寸和视觉偏好都在界面结构中拥有明确入口。",
      },
      {
        title: "把媒体上传和部署纳入交付链路",
        implementation:
          "Formidable 接收商品图片和头像上传，Cloudinary 托管媒体 URL；Docker Compose 编排 MongoDB 与后端，Makefile 构建前端和后台静态资源，Caddy 提供 HTTPS、SPA fallback 和反向代理。",
        value:
          "项目覆盖了从商品内容录入到静态资源发布、API 代理和服务器部署的完整交付路径，而不止停留在本地开发环境。",
      },
    ],
    boundaries: [
      {
        level: "高",
        title: "订单接口仍然信任较多客户端数据",
        description:
          "placeOrder 接收客户端传入的 userId、商品结构、价格和配送信息，当前没有充分体现服务端重新读取价格、校验库存、原子扣减、订单幂等和事务边界。它已经打通购物车到订单的业务流程，但还不能包装成强一致交易系统。",
      },
      {
        level: "高",
        title: "Customer API 和后台角色边界还不统一",
        description:
          "部分购物车、心愿单、评论和订单接口直接使用 URL 或 Body 中的 userId，后台路由也主要依赖通用 authMiddleware。下一步需要让服务端从 Token 推导身份，并统一 Customer、Seller 和 Admin 的授权策略。",
      },
      {
        level: "高",
        title: "Socket.IO 当前是单实例且缺少连接鉴权",
        description:
          "在线客户、卖家和管理员保存在 Node.js 进程内的数组与单个 admin 变量中，连接事件也依赖客户端传入的 ID；没有 Redis Adapter、ACK、重试、离线队列或多实例广播能力。",
      },
      {
        level: "中",
        title: "商品筛选和 Dashboard 统计仍有查询扩展空间",
        description:
          "公开商品筛选先读取全部商品，再在 Node.js 内存中完成分类、价格、评分、搜索、排序和分页；Dashboard 统计也有多次读取全部订单的实现。数据量增长后应下沉到 MongoDB 查询、聚合和索引。",
      },
      {
        level: "中",
        title: "支付与生产保障尚未形成完整闭环",
        description:
          "当前 Stripe 代码主要完成 Seller Connect 账户开户链接，尚未看到 Checkout、Payment Intent 和 Webhook 支付确认；同时缺少完整测试、限流、健康检查、结构化日志和 CI/CD。",
      },
    ],
    nextSteps: [
      "让所有 Customer API 从认证 Token 推导用户身份，并补齐 Customer、Seller、Admin 的服务端 RBAC",
      "服务端重新计算订单金额和库存，用 MongoDB Transaction、原子扣减和幂等键保护下单流程",
      "为 Socket.IO 增加 JWT 握手鉴权、可信 Origin、room、ACK、重连和 Redis Adapter",
      "将筛选、分页和 Dashboard 统计下沉到 MongoDB 查询与聚合，并补充必要索引",
      "接入 Stripe Payment Intent/Webhook，增加订单审计、集成测试、健康检查和结构化可观测性",
    ],
  },
  musicfy: {
    projectSlug: 'musicfy',
    heroKicker: 'CASE STUDY / MOBILE MEDIA',
    title: '从原生 React Native 到完整音乐播放链路',
    description:
      '一个不依赖 Expo 的全栈移动音乐应用。MusicFy 使用 React Native、React Navigation、Redux 和 React Query 组织移动端体验，并通过 React Native Track Player 与 RNFS 处理跨页面播放、播放队列和设备本地音频缓存。',
    problem:
      'MusicFy 的重点不是把一个音乐列表搬到手机上，而是从原生 React Native 环境开始，处理播放器、导航、认证、用户内容和设备文件系统之间的边界。项目需要让用户完成注册、邮箱验证、上传音乐、管理播放列表、收藏、查看收听历史和关注用户，同时保持播放控件能够跨页面持续工作。',
    sections: {
      problem: { kicker: '01 / MOBILE PRODUCT SCOPE', title: '为什么从播放链路开始设计移动应用' },
      flow: { kicker: '02 / PLAYBACK FLOW', title: '一首音乐如何从内容 API 走到设备播放' },
      decisions: { kicker: '03 / ENGINEERING DECISIONS', title: '代码中真实存在的移动端设计' },
      boundaries: {
        kicker: '04 / CURRENT BOUNDARIES',
        title: '原型已经完整，但仍有几条工程边界',
        intro:
          '移动端播放与内容流程已经形成可运行的骨架；下载时序、Token 生命周期、历史写入和后端约束是下一轮迭代更值得投入的地方。',
      },
      next: { kicker: '05 / NEXT ITERATION', title: '下一轮应该怎么做' },
    },
    goals: [
      '在不依赖 Expo 的前提下完成 React Native 原生模块接入',
      '让播放器、队列、迷你播放器和系统媒体控制跨页面协同工作',
      '区分 Redux 全局状态、React Query 服务端状态与设备文件缓存',
      '覆盖认证、音乐上传、播放列表、收藏、历史和关注等用户内容流程',
    ],
    flow: [
      {
        label: '01',
        title: 'Authenticate',
        description:
          '应用从 AsyncStorage 恢复 Token，请求 /auth/is-auth 校验会话，再由 auth slice 决定进入认证导航还是主 Tab 导航。',
      },
      {
        label: '02',
        title: 'Discover',
        description:
          'Home 通过 React Query 获取最新上传、推荐音频、播放列表和最近播放内容，并将服务端状态与页面渲染解耦。',
      },
      {
        label: '03',
        title: 'Cache',
        description:
          '播放前由 useAudioController 检查 RNFS 缓存目录中的本地文件；缺失时从 API 返回的音频 URL 发起后台下载，再交给播放器使用。',
      },
      {
        label: '04',
        title: 'Queue',
        description: 'AudioData 被转换为 Track Player 队列，统一承载当前曲目、上下首切换、播放速率、进度和海报信息。',
      },
      {
        label: '05',
        title: 'Control',
        description:
          'MiniAudioPlayer、AudioPlayer 和 playbackService 共享同一个 Track Player，页面按钮与 Android 系统媒体控制都能操作当前播放。',
      },
      {
        label: '06',
        title: 'History',
        description: '播放服务监听进度事件，将音频、进度和时间写入 /history，让最近播放和收听历史回到服务端数据链路。',
      },
    ],
    decisions: [
      {
        title: '用原生 Track Player 建立持续播放边界',
        implementation:
          'InitPlayer 配置 Track Player 能力与 Android 媒体通知，useAudioController 负责队列和播放操作，playbackService 处理远程播放、暂停、上下首等系统事件。',
        value: '播放器不再依附某一个页面，用户切换 Home、Profile 或详情内容时仍可以保持同一条播放链路。',
      },
      {
        title: '用 Redux 与 React Query 分开两类状态',
        implementation:
          'auth、player 和 playlistModal 进入 Redux；最新上传、推荐、收藏、历史、公开资料和关注状态通过 React Query Hook 请求与缓存。',
        value: '当前播放曲目和认证状态等跨页面状态拥有稳定入口，而会随服务端变化的列表不需要复制进全局 store。',
      },
      {
        title: '把设备缓存放在文件系统而不是状态容器',
        implementation:
          'RNFS 使用 publicId 生成缓存文件路径，播放前检查文件是否存在，未命中时下载远程音频；AsyncStorage 只保存认证 Token。',
        value: '音频二进制不会进入 Redux 或 AsyncStorage，减少内存和序列化压力，也为离线重播留下了清晰的本地存储边界。',
      },
      {
        title: '用嵌套导航表达移动端信息层级',
        implementation:
          '认证流程、Home 内容流、Profile 内容和上传功能分别由 AuthNavigator、HomeNavigator、ProfileNavigator 与 TabNavigator 组合。',
        value:
          '导航结构与产品区域保持一致，公共播放器则通过 AppView 在页面外层持续出现，避免每个页面各自实现播放控件。',
      },
      {
        title: '把用户生成内容串成完整业务闭环',
        implementation:
          'AudioForm 结合 Yup、原生文件/图片选择器和 multipart 上传；后端用 Express、Formidable、Cloudinary、MongoDB 处理音频、封面、播放列表和用户关系。',
        value: '项目不只是一个播放器 Demo，而是把认证、创作、媒体发布、收藏、历史和社交关系连接成可操作的产品流程。',
      },
      {
        title: '推荐逻辑先保持可解释和可验证',
        implementation:
          '后端根据用户近 30 天历史中出现的分类筛选音频，并通过定时任务生成自动播放列表；前端以 React Query 请求推荐结果。',
        value:
          '在没有引入机器学习基础设施的情况下，先用用户行为和内容分类建立可理解的推荐入口，便于后续用真实数据评估效果。',
      },
    ],
    boundaries: [
      {
        level: '高',
        title: '下载辅助函数没有完整等待下载完成',
        description:
          'downLoadFile 发起 RNFS.downloadFile 后没有返回或等待 promise，而 onAudioPress 仍然继续后续播放流程。弱网或首次播放时可能出现文件尚未准备好就进入 Track Player 的竞态，需要补齐 await、失败回退和重复下载去重。',
      },
      {
        level: '高',
        title: 'JWT 生命周期和移动端存储仍需加强',
        description:
          'Token 当前保存在 AsyncStorage，服务端签发时没有看到明确的过期时间、刷新轮换或有限的设备 Token 清理策略。它适合原型验证，但不能直接包装成完整的生产级会话安全方案。',
      },
      {
        level: '中',
        title: '播放进度写入与历史模型需要收敛',
        description:
          'playbackService 会根据进度事件写入 /history，历史文档同时维护 last 与嵌入式 all 数组。事件频率、写入幂等、数组增长和离线补偿都需要在音频规模扩大前重新设计。',
      },
      {
        level: '中',
        title: '媒体上传和关系写入缺少更强的服务端约束',
        description:
          'Formidable 文件类型与大小限制、收藏与音频 likes 的跨文档一致性、关注关系的事务边界以及私有播放列表的访问校验仍有进一步收敛空间。',
      },
      {
        level: '中',
        title: '多语言、测试和可观测性尚未形成完整能力',
        description:
          '当前代码中没有看到已接入的 react-i18next、Redis/CDN、推送通知或完整测试套件。推荐逻辑也是基于历史与分类的规则实现，而不是机器学习推荐系统。',
      },
    ],
    nextSteps: [
      '让音频下载真正可等待、可取消、可重试，并增加缓存清理和并发去重',
      '为 JWT 增加短期过期、刷新轮换、撤销和设备数量控制，评估更安全的凭证存储方案',
      '将播放历史改为批量或节流写入，限制单文档增长并设计离线事件补偿',
      '补齐上传大小/类型校验、唯一索引和 MongoDB 事务，统一私有内容授权',
      '为播放、上传、认证和推荐增加单元/集成测试，再评估 Redis、CDN 和推送通知',
    ],
  },
} as const satisfies Record<string, ProjectCaseStudy>;

export type ProjectCaseStudySlug = keyof typeof projectCaseStudies;

export function getProjectCaseStudy(slug: string): ProjectCaseStudy | undefined {
  return projectCaseStudies[slug as ProjectCaseStudySlug];
}
