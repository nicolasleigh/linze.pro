export const aboutContent = {
  introduction: {
    eyebrow: "ABOUT / BACKGROUND",
    title: "从理解数字与风险，到设计清晰、可靠的软件。",
    description:
      "我的职业起点是财经与审计。那段经历训练了我对证据、边界和异常的敏感度；转向软件工程后，我把这些习惯带进产品设计、代码实现与系统交付。",
  },
  profile: [
    { label: "FOCUS", value: "Web 产品与全栈工程" },
    { label: "BUILDING", value: "React / Next.js · Go" },
    { label: "BASE", value: "China · UTC+8" },
  ],
  journey: [
    {
      year: "2017",
      title: "财经训练",
      description: "毕业于中南财经政法大学财政学专业，建立了财务、经济与商业分析基础。",
    },
    {
      year: "2020",
      title: "审计与专业判断",
      description: "在财务审计工作中训练证据意识与风险判断，并通过注册会计师专业阶段六门考试。",
    },
    {
      year: "2021",
      title: "转向软件工程",
      description: "从 C、Java 入门，逐步转向 JavaScript 生态，并将学习范围扩展到 Go 与 Node.js。",
    },
    {
      year: "NOW",
      title: "用项目建立完整能力",
      description: "围绕真实产品持续实践前端体验、后端接口、数据建模、实时通信与部署交付。",
    },
  ],
  capabilities: [
    {
      index: "01",
      title: "界面与产品体验",
      description:
        "使用 React、Next.js、TypeScript 与 React Native 构建 Web 和移动端界面，关注信息层级、可访问性、渲染策略与长期可维护性。",
      stack: ["React", "Next.js", "TypeScript", "React Native", "Vue"],
    },
    {
      index: "02",
      title: "服务与数据边界",
      description:
        "使用 Go、Node.js 设计 REST API 与 WebSocket 链路，围绕 PostgreSQL、MongoDB 处理业务模型、查询与一致性问题。",
      stack: ["Go", "Node.js", "PostgreSQL", "MongoDB", "REST", "WebSocket"],
    },
    {
      index: "03",
      title: "工程交付",
      description:
        "把类型约束、错误处理、测试、容器化与反向代理视为产品的一部分，让功能从本地实现走到可验证、可运行的系统。",
      stack: ["Testing", "Docker", "Caddy", "Git"],
    },
  ],
  principles: [
    {
      title: "先理解问题，再选择技术",
      description: "从用户目标、数据流和约束出发，不用框架清单替代设计判断。",
    },
    {
      title: "用证据描述系统",
      description: "通过代码、请求链路和失败场景验证结论，也坦诚标记尚未完成的能力边界。",
    },
    {
      title: "同时维护体验与工程质量",
      description: "把界面反馈、API 契约、性能、安全和可运维性放进同一条交付链路。",
    },
  ],
} as const;
