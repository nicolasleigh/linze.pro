export const aboutContent = {
  introduction: {
    eyebrow: 'ABOUT / BACKGROUND',
    title: '从理解数字与风险，到设计清晰、可靠的软件。',
    description: '拥有财经教育与专业背景，如今专注于 Web 产品、全栈工程与可靠的软件交付。',
  },
  profile: [
    { label: 'FOCUS', value: 'Web 产品与全栈工程' },
    { label: 'BUILDING', value: 'React / Next.js · Go' },
    { label: 'BASE', value: 'China · UTC+8' },
  ],
  education: {
    title: '教育背景与专业资质',
    entries: [
      {
        index: '01',
        title: '中南财经政法大学',
        subtitle: '财政学 · 经济学学士',
        description: '接受系统的财政学与经济学专业训练，建立对宏观经济运行、财税体制、数据分析与公共政策的底层认知。',
        tags: ['财政学', '经济学学士', '“211工程”重点高校'],
      },
      {
        index: '02',
        title: '中国注册会计师（CPA）',
        subtitle: 'Certified Public Accountant',
        description:
          '熟知我国会计法、审计法、税法与经济法体系，深刻理解企业财务与成本管理，通晓公司战略与全面风险控制框架。将严谨的证据意识与合规思维融入系统架构与软件工程。',
        tags: ['会计与审计准则', '财税与商事法规', '财务与成本管理', '战略与风险控制'],
      },
    ],
  },
  capabilities: [
    {
      index: '01',
      title: '界面与产品体验',
      description:
        '使用 React、Next.js、TypeScript 与 React Native 构建 Web 和移动端界面，关注信息层级、可访问性、渲染策略与长期可维护性。',
      stack: ['React', 'Next.js', 'TypeScript', 'React Native', 'Vue'],
    },
    {
      index: '02',
      title: '服务与数据边界',
      description:
        '使用 Go、Node.js 设计 REST API 与 WebSocket 链路，围绕 PostgreSQL、MongoDB 处理业务模型、查询与一致性问题。',
      stack: ['Go', 'Node.js', 'PostgreSQL', 'MongoDB', 'REST', 'WebSocket'],
    },
    {
      index: '03',
      title: '工程交付',
      description:
        '把类型约束、错误处理、测试、容器化与反向代理视为产品的一部分，让功能从本地实现走到可验证、可运行的系统。',
      stack: ['Testing', 'Docker', 'Caddy', 'Git'],
    },
  ],
  principles: [
    {
      title: '问题定义重于技术选型',
      description: '从核心约束与数据流出发，不以技术流行度替代独立的设计判断。',
    },
    {
      title: '以证据与确定性描述系统',
      description: '用链路与失败场景验证假设，坦诚面对未知，清晰界定能力边界。',
    },
    {
      title: '体验与工程从来是同一个问题',
      description: '将交互手感、API 契约与系统可靠性，统一纳入端到端交付链路。',
    },
  ],
} as const;
