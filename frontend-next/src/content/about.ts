export const aboutContent = {
  introduction: {
    eyebrow: 'ABOUT / BACKGROUND',
    title: '财经思维，工程实践',
    description:
      '我专注 Go 后端、React/Next.js 与 AI 辅助的全栈实践。AI 帮我探索问题、比较方案和加速验证，但最终判断仍然来自清晰的边界、可运行的代码与真实结果。',
  },
  profile: [
    { label: 'FOCUS', value: 'Go 后端 · React/Next.js' },
    { label: 'BUILDING', value: '全栈产品 · AI 辅助工作流' },
    { label: 'LEARNING', value: '项目实验 · 工程复盘' },
    { label: 'BASE', value: '中国 · 北京' },
  ],
  education: {
    title: '教育背景与专业资质',
    entries: [
      {
        index: '01',
        title: '中南财经政法大学',
        subtitle: '财政学 · 经济学学士',
        description: '财政学训练让我习惯从数据、约束和结果出发，理解复杂问题背后的运行逻辑。',
        tags: ['财政学', '经济学学士', '“211工程”重点高校'],
      },
      {
        index: '02',
        title: '中国注册会计师（CPA）',
        subtitle: 'Certified Public Accountant',
        description:
          'CPA 训练强化了我对证据、边界与风险的敏感度；这些习惯也影响我设计 API、数据模型和交付流程的方式。',
        tags: ['会计与审计准则', '财税与商事法规', '财务与成本管理', '战略与风险控制'],
      },
    ],
  },
  capabilities: [
    {
      index: '01',
      title: '界面与产品体验',
      description:
        '把复杂信息整理成清晰、好用的界面，关注信息层级、可访问性和长期维护。',
      stack: ['React', 'Next.js', 'TypeScript', 'React Native', 'Vue'],
    },
    {
      index: '02',
      title: '服务与数据边界',
      description:
        '把业务拆成清晰的 API、数据模型与服务边界，处理查询、状态和一致性问题。',
      stack: ['Go', 'Node.js', 'PostgreSQL', 'MongoDB', 'REST', 'WebSocket'],
    },
    {
      index: '03',
      title: '工程交付',
      description:
        '让功能不止在本地跑起来，还能被测试、部署、观察和持续迭代。',
      stack: ['Testing', 'Docker', 'Caddy', 'Git'],
    },
    {
      index: '04',
      title: 'AI 辅助的问题解决',
      description:
        '用 AI 协助拆解问题、比较架构方案、生成实现初稿和补充边界场景，再通过代码、测试与实际运行结果完成验证。',
      stack: ['AI-assisted workflow', 'Prompt design', 'Edge cases', 'Verification'],
    },
  ],
  principles: [
    {
      title: '先把问题说清楚',
      description: '技术选型之前，先确认目标、约束和真正需要解决的问题。',
    },
    {
      title: '把边界和细节写进设计',
      description: '关注命名、权限、错误路径、加载状态和数据边界，让可靠性落到具体细节。',
    },
    {
      title: '让 AI 加速探索，让复盘推动进步',
      description: '让 AI 参与探索、总结和生成，但把最终判断交给问题边界、测试结果和实际运行；每次复盘都成为下一次改进的起点。',
    },
  ],
} as const;
