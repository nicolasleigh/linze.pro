<script setup lang="ts">
import { getSectionTitleAndSlug, getSectionTitleAndSlugChinese } from "@/utils/helper"
import Section from "../../Section.vue"
import { h2Style, orderedListStyle, paragraphStyle, unorderedListStyle } from "../../CommonStyle"
import ExternalLink from "../../ExternalLink.vue"
import { useActiveSection } from "@/hooks/useActiveSection"
import ImageDialog from "@/components/ImageDialog.vue"
import IconGithub2 from "@/components/icons/IconGithub2.vue"
import IconChrome from "@/components/icons/IconChrome.vue"

const sectionTitle = [
  "项目概述",
  "项目动机",
  "我的角色",
  "开发过程",
  "技术栈",
  "主要功能",
  "演示视频与截图",
  "挑战与解决方案",
  "我的收获",
  "未来改进",
  "总结",
  "在线网站与源码链接",
]

const { activeSection } = useActiveSection()
const section = getSectionTitleAndSlugChinese(sectionTitle)
defineExpose({ section, activeSection })
defineProps<{ demoImages: string[] }>()
</script>

<template>
  <article class="mx-auto w-full transition-colors text-neutral-400">
    <div>
      <Section :id="section[0].slug">
        <h2 :class="h2Style">
          {{ section[0].title }}
        </h2>
        <p :class="paragraphStyle">
          Chatify 是一个支持实时通讯的应用，涵盖文字消息、语音通话和视频通话功能。项目最初使用
          Next.js 和
          <ExternalLink href="https://www.convex.dev/">Convex</ExternalLink>
          构建，为了克服性能瓶颈并提升对数据库操作的掌控力，我用 Golang 和 PostgreSQL
          重写了整个后端。这个项目展示了我在系统优化、应对可扩展性挑战以及整合现代 Web
          技术方面的能力。
        </p>
      </Section>
      <Section :id="section[1].slug">
        <h2 :class="h2Style">
          {{ section[1].title }}
        </h2>
        <p :class="paragraphStyle">
          这个项目最初是一个课程项目，但我看到了将其进一步完善的机会。虽然原版功能齐全，但由于数据库查询效率低下以及使用第三方后端即服务平台的限制，存在明显的性能问题。我希望通过这个项目挑战自己，优化其架构，使其更加健壮、高效，并达到生产环境的标准。
        </p>
      </Section>
      <Section :id="section[2].slug">
        <h2 :class="h2Style">
          {{ section[2].title }}
        </h2>
        <p :class="paragraphStyle">我负责该应用的全栈开发工作，具体包括：</p>
        <ul :class="unorderedListStyle">
          <li>使用 Golang 和 PostgreSQL 从零重写后端。</li>
          <li>设计并实现原生 SQL 查询，以优化性能。</li>
          <li>管理基于 Docker 的部署与环境配置。</li>
          <li>使用 Go 语言自定义 WebSocket 逻辑，构建实时聊天功能。</li>
          <li>集成 Clerk 等第三方服务实现用户认证。</li>
          <li>使用 Next.js 和 Tailwind CSS 技术栈，维护并优化现有的前端。</li>
        </ul>
      </Section>
      <Section :id="section[3].slug">
        <h2 :class="h2Style">
          {{ section[3].title }}
        </h2>
        <ol :class="orderedListStyle">
          <li>识别瓶颈：注意到数据库带宽一周内消耗了 2GB，查询调用次数超过 40 万次。</li>
          <li>根本原因分析：发现问题源于 Convex 后端存在 N+1 查询问题，且不支持 SQL 联表查询。</li>
          <li>系统重构：决定迁移到使用 Golang 和 PostgreSQL 构建的自定义后端。</li>
          <li>
            后端开发：
            <ul :class="unorderedListStyle">
              <li>
                使用原生 SQL 并结合
                <ExternalLink href="https://sqlc.dev/">sqlc</ExternalLink>
                工具生成类型安全的数据库访问代码。
              </li>
              <li>
                使用
                <ExternalLink href="https://github.com/golang-migrate/migrate"
                  >golang-migrate</ExternalLink
                >
                管理数据库迁移。
              </li>
              <li>
                在开发过程中利用
                <ExternalLink href="https://github.com/air-verse/air">air</ExternalLink>
                实现实时热重载。
              </li>
              <li>
                通过
                <ExternalLink href="https://direnv.net/">direnv</ExternalLink> 保护和管理环境变量。
              </li>
            </ul>
          </li>
          <li>部署配置：编写 Dockerfile 并使用 docker-compose 整合各个服务。</li>
          <li>认证系统集成：接入 Clerk，使用 webhook 将用户认证数据同步存储到后端数据库。</li>
          <li>
            实时通讯功能：使用
            <ExternalLink href="https://gorilla.github.io/">gorilla/websocket</ExternalLink> 和
            goRoutines 编写自定义的 WebSocket 通讯逻辑。
          </li>
        </ol>
      </Section>
      <Section :id="section[4].slug">
        <h2 :class="h2Style">
          {{ section[4].title }}
        </h2>
        <ul :class="unorderedListStyle">
          <li>前端：Next.js, Tailwind CSS</li>
          <li>后端：Golang（结合 sqlc、air、direnv）</li>
          <li>数据库：PostgreSQL（使用 golang-migrate 管理数据库架构）</li>
          <li>WebSocket 库：gorilla/websocket</li>
          <li>认证系统：Clerk + Webhooks</li>
          <li>容器化与部署：Docker、docker-compose 和 Caddy</li>
        </ul>
      </Section>
      <Section :id="section[5].slug">
        <h2 :class="h2Style">
          {{ section[5].title }}
        </h2>
        <ul :class="unorderedListStyle">
          <li>实时聊天与消息持久化</li>
          <li>支持语音和视频通话</li>
          <li>使用 Go 实现的自定义 WebSocket</li>
          <li>通过 Clerk 实现安全的用户认证</li>
          <li>使用原生 SQL 和 sqlc 实现类型安全的数据库访问</li>
          <li>基于 Docker 的本地和生产环境部署设置</li>
        </ul>
      </Section>

      <Section :id="section[6].slug">
        <h2 :class="h2Style">
          {{ section[6].title }}
        </h2>
        <video controls>
          <source src="https://file.linze.pro/videos/chatify/1.mp4" type="video/mp4" />
        </video>
        <div class="grid grid-cols-2 gap-2 mt-2">
          <ImageDialog v-for="(item, index) in demoImages" :key="index" :url="item" />
        </div>
      </Section>

      <Section :id="section[7].slug">
        <h2 :class="h2Style">
          {{ section[7].title }}
        </h2>
        <ul :class="unorderedListStyle">
          <li>
            Convex 的限制：由于缺乏 SQL 联表支持，无法解决 N+1 查询问题 → 通过切换到 PostgreSQL
            并使用原生 SQL 解决。
          </li>
          <li>
            Go 中的 WebSocket 集成：Socket.io 主要面向 Node.js → 通过编写自定义 WebSocket 逻辑，使用
            gorilla/websocket 和 goRoutines 解决。
          </li>
          <li>
            高效的开发工作流：后端开发过程中需要快速迭代 → 通过使用 air、direnv 和 Docker
            等工具解决。
          </li>
        </ul>
      </Section>
      <Section :id="section[8].slug">
        <h2 :class="h2Style">
          {{ section[8].title }}
        </h2>
        <ul :class="unorderedListStyle">
          <li>如何诊断并解决真实应用中的 N+1 查询问题。</li>
          <li>编写和优化高性能 API 的原生 SQL 查询。</li>
          <li>管理后端数据库架构迁移并安全地维护环境配置。</li>
          <li>使用 Golang 从零开始构建自定义 WebSocket 服务器。</li>
          <li>使用 Docker、docker-compose 和 Caddy 完成端到端的应用部署。</li>
        </ul>
      </Section>
      <Section :id="section[9].slug">
        <h2 :class="h2Style">
          {{ section[9].title }}
        </h2>
        <ol :class="orderedListStyle">
          <li>为后端服务添加单元测试和集成测试。</li>
          <li>实现 Redis 缓存，减少数据库负载。</li>
          <li>设置消息中间件（例如 NATS 或 Kafka），实现解耦的实时消息传递。</li>
          <li>为生产环境做好准备，添加速率限制和负载均衡。</li>
          <li>改进错误处理，并重构代码以提高可读性。</li>
          <li>引入 CI/CD 流水线，使用 Jenkins 或 GitHub Actions。</li>
          <li>添加国际化（i18n）支持。</li>
          <li>集成监控工具（如 Prometheus、Grafana）进行系统健康检查。</li>
        </ol>
      </Section>
      <Section :id="section[10].slug">
        <h2 :class="h2Style">
          {{ section[10].title }}
        </h2>
        <p :class="paragraphStyle">
          Chatify
          展示了我从识别关键后端限制到构建一个健壮且可扩展的聊天系统的全过程。它体现了我的后端开发技能、优化性能的能力，以及对全栈部署实践的了解。这个项目不仅满足了最初的课程要求，还通过深思熟虑的重构和执行，发展成了一个专业级的应用。
        </p>
      </Section>
      <Section :id="section[11].slug">
        <h2 :class="h2Style">
          {{ section[11].title }}
        </h2>
        <div class="space-y-2">
          <a
            target="_blank"
            referrerpolicy="no-referrer"
            href="https://chat.linze.pro"
            class="!block max-w-xl px-4 py-3 rounded-lg border border-neutral-800 scale-100 transform-gpu hover:scale-[1.02] active:scale-[0.97] transition duration-200 cursor-newtab"
          >
            <div class="flex items-center gap-2 text-sm md:text-base">
              <IconChrome class="size-5" />
              <span class="text-accent font-semibold">chat.linze.pro</span>
            </div>
          </a>

          <a
            target="_blank"
            referrerpolicy="no-referrer"
            href="https://github.com/nicolasleigh/chatify"
            class="!block max-w-xl px-4 py-3 rounded-lg border border-neutral-800 scale-100 transform-gpu hover:scale-[1.02] active:scale-[0.97] transition duration-200 cursor-newtab"
          >
            <div class="flex items-center gap-2 text-sm md:text-base">
              <IconGithub2 class="size-5" />
              <span class="truncate overflow-ellipsis font-semibold text-accent"
                >nicolasleigh/chatify</span
              >
            </div>
            <p class="mt-2 text-sm text-neutral-200">
              一个支持音频和视频通话的实时聊天应用，使用 Golang 和 PostgreSQL
              重新构建，以实现高性能、高效的数据库操作和可扩展的后端架构。
            </p>
          </a>
        </div>
      </Section>
    </div>
  </article>
</template>
