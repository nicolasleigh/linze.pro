export const aboutContent = {
  introduction: {
    eyebrow: 'ABOUT / BACKGROUND',
    title: '从财务审计，到全栈软件工程',
    description:
      '我是一名转行自学的全栈开发者，目前生活在北京。拥有财经教育背景与中国注册会计师（CPA）专业资质，日常主力技术栈是 Go、React / Next.js 与 TypeScript。热衷于构建清晰、健壮的端到端应用，深入钻研系统架构与工程交付，并积极将现代 AI 工具融入真实的研发与个人项目工作流中。',
  },
  profile: [
    { label: 'FOCUS', value: 'Go 后端 · React/Next.js' },
    { label: 'BUILDING', value: '全栈系统 · 现代 AI 工具链' },
    { label: 'LEARNING', value: '系统架构 · 性能优化 · 可观测性' },
    { label: 'BASE', value: '中国 · 北京' },
  ],
  education: {
    title: '教育背景与专业资质',
    entries: [
      {
        index: '01',
        title: '中南财经政法大学',
        subtitle: '财政学 · 经济学学士',
        description: '系统的财政学与经济学训练，培养了我对宏观体系、统计数据与公共政策底层逻辑的认知能力。',
        tags: ['财政学', '经济学学士', '“211工程”重点高校'],
      },
      {
        index: '02',
        title: '中国注册会计师（CPA）',
        subtitle: 'Certified Public Accountant · 全科合格',
        description:
          '通关 CPA 专业阶段全部科目。财务与审计背景让我对账目逻辑、数据一致性和潜在漏洞有天然的防范意识；在设计后端 API、数据库约束和处理业务状态时，总会下意识多做一步防御性考量。',
        tags: ['会计与审计准则', '财税与商事法规', '财务与成本管理', '战略与风险控制'],
      },
    ],
  },
  capabilities: [
    {
      index: '01',
      title: '服务端与数据底座',
      description:
        '以 Go 为主力后端语言，基于 chi / Gin 构建结构清晰的 RESTful API 与实时链路。熟练进行 PostgreSQL 关系建模、索引优化与事务控制，配合 Redis 实现缓存与限流。',
      stack: ['Go', 'PostgreSQL', 'Redis', 'Node.js', 'REST', 'WebSocket'],
    },
    {
      index: '02',
      title: '现代 Web 与跨端界面',
      description:
        '精通 React、TypeScript 与 Next.js App Router，注重服务端渲染（SSR/SSG）、SEO 与首屏性能；具备 React Native 移动端开发经验，关注组件状态隔离与交互体验。',
      stack: ['Next.js', 'React', 'Vue', 'TypeScript', 'React Native', 'Tailwind CSS'],
    },
    {
      index: '03',
      title: '工程化与运维交付',
      description:
        '坚持把“可交付、可观测”视为开发闭环。熟练使用 Docker / Docker Compose 组织服务网络，配置 Caddy 反向代理与自动 HTTPS，搭建 Prometheus + Jaeger 监控与 GitHub Actions 自动化部署。',
      stack: ['Docker', 'Caddy', 'Prometheus', 'Jaeger', 'GitHub Actions'],
    },
    {
      index: '04',
      title: 'AI 工具链与落地实践',
      description:
        '不满足于仅仅把 AI 当做聊天问答，更探索其在真实工程中的集成。曾独立设计面向本地知识库的 ObsAgent CLI 工具，实践过 RAG 混合检索、受限 Agent 决策与安全的文件事务回滚。',
      stack: ['ObsAgent CLI', 'RAG', 'Tool Calling', 'LangGraph', 'Local LLM'],
    },
  ],
  principles: [
    {
      title: '可维护性优于捷径',
      description:
        '清晰的模块边界、严谨的类型定义与见名知意的命名，远比少写两行代码重要。代码是写给人看的，顺便由机器执行。',
    },
    {
      title: '防御性设计与边界意识',
      description:
        '从审计经历延续下来的工程习惯：永远不要盲目信任外部输入。把数据校验、唯一约束与业务状态机收拢在服务端，优雅处理每一个可能的错误路径。',
    },
    {
      title: '完成度与持续复盘',
      description:
        '不盲目追逐时髦框架，聚焦于解决真实业务痛点。上线之后，依靠日志、指标监控与工程复盘推动系统持续平稳演进。',
    },
  ],
} as const;
