export type ProjectCaseStudy = {
  projectSlug: string;
  title: string;
  description: string;
  problem: string;
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
    title: "从 BaaS 原型到 Go 实时消息链路",
    description:
      "围绕数据库访问成本和 N+1 查询问题，为 Chatify 增加 Go、PostgreSQL 与 WebSocket 后端，并保留迁移期间仍在工作的 Next.js / Convex 能力。",
    problem:
      "旧实现将会话与消息数据主要放在 Convex。随着关系查询增多，缺少 SQL JOIN 的数据访问方式容易把一次页面加载拆成大量查询。重构目标不是简单换语言，而是重新建立会话、成员、消息和未读状态之间的关系模型，同时让消息能够持久化后再实时分发。",
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
} as const satisfies Record<string, ProjectCaseStudy>;

export type ProjectCaseStudySlug = keyof typeof projectCaseStudies;

export function getProjectCaseStudy(slug: string): ProjectCaseStudy | undefined {
  return projectCaseStudies[slug as ProjectCaseStudySlug];
}

