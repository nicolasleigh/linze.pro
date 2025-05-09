<script setup lang="ts">
import { useActiveSection } from "@/hooks/useActiveSection"
import { getSectionTitleAndSlugChinese } from "@/utils/helper"
import { h2Style, h3Style, h4Style, paragraphStyle, unorderedListStyle } from "../../CommonStyle"
import Section from "../../Section.vue"
import ImageDialog from "@/components/ImageDialog.vue"
import IconChrome from "@/components/icons/IconChrome.vue"
import IconGithub2 from "@/components/icons/IconGithub2.vue"
import VideoPlayer from "@/components/VideoPlayer.vue"

const { activeSection } = useActiveSection()

const sectionTitle = [
  "简短说明",
  "功能特点",
  "演示视频与截图",
  "技术栈",
  "我的收获",
  "最终思考",
  "在线网站与源码链接",
]

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
          CabinFy
          是一个功能齐全的住宿预订平台，将旅客与独特的小木屋租赁连接起来。它为客人提供直观的体验，以发现和预订小木屋，同时通过安全的管理员后台为业主提供强大的管理工具。虽然最初受到
          React 课程的启发，但我使用自定义的 Node.js/Express 后端、PostgreSQL 数据库和采用 Tailwind
          CSS 的现代化 UI 完全重建了它——将其转变为具有多语言支持和响应式设计的生产级应用程序。
        </p>
      </Section>

      <Section :id="section[1].slug">
        <h2 :class="h2Style">
          {{ section[1].title }}
        </h2>
        <p :class="paragraphStyle">
          CabinFy 是一个受 Airbnb
          启发的全栈网页应用程序，专为预订和管理小木屋租赁而设计。它为旅客和管理员提供了流畅的使用体验，注重性能、易用性和现代开发实践。主要功能包括：
        </p>
        <ul :class="unorderedListStyle">
          <li>
            <p>多语言支持：提供英文和中文界面，使平台能够覆盖更广泛的用户群体。</p>
          </li>
          <li>
            <p>
              响应式设计与无障碍支持：界面针对桌面、平板和移动设备进行了全面优化，内置深色模式和无障碍功能，确保所有用户在不同设备和浏览偏好下都能获得舒适体验。
            </p>
          </li>
          <li>
            <p>
              旅客预订界面：用户可以浏览可用的小木屋，查看详细列表，并通过直观、现代的界面完成预订。
            </p>
          </li>
          <li>
            <p>管理员后台：管理员可以通过安全的后台系统进行以下操作：</p>
            <ul :class="unorderedListStyle">
              <li><p>查看、管理和处理预订信息</p></li>
              <li><p>提交新的小木屋列表或编辑现有列表</p></li>
              <li><p>监控预订活动和小木屋可用情况</p></li>
            </ul>
          </li>
          <li>
            <p>高级数据管理：支持筛选、排序和分页，方便浏览和高效的数据交互。</p>
          </li>
          <li>
            <p>
              身份验证与权限管理：提供安全的用户身份验证和访问控制，保护管理员功能和私人数据的安全。
            </p>
          </li>
        </ul>
      </Section>

      <Section :id="section[2].slug">
        <h2 :class="h2Style">
          {{ section[2].title }}
        </h2>
        <!-- <video controls>
          <source src="https://file.linze.pro/videos/cabinfy/1.mp4" type="video/mp4" />
        </video> -->
        <VideoPlayer src="https://file.linze.pro/videos/cabinfy/master.m3u8" />
        <div class="grid grid-cols-2 gap-2 mt-2">
          <ImageDialog v-for="(item, index) in demoImages" :key="index" :url="item" />
        </div>
      </Section>

      <Section :id="section[3].slug">
        <h2 :class="h2Style">
          {{ section[3].title }}
        </h2>
        <p :class="paragraphStyle">
          CabinFy 基于现代且可扩展的全栈架构构建，设计时充分考虑了性能、可维护性以及开发者体验。
        </p>
        <h3 :class="h3Style">核心技术</h3>
        <h4 :class="h4Style">前端</h4>
        <ul :class="unorderedListStyle">
          <li>React – 用于构建动态用户界面的核心库</li>
          <li>Tailwind CSS – 以实用为先的 CSS 框架，帮助快速搭建响应式界面</li>
          <li>React Query – 因其高效的数据获取和缓存能力而取代 Redux</li>
        </ul>
        <h4 :class="h4Style">后端</h4>
        <ul :class="unorderedListStyle">
          <li>Node.js & Express – 轻量且强大的服务器框架，支持快速开发 API</li>
          <li>PostgreSQL & Prisma – 结合使用，提供类型安全的数据库操作，无需编写原生 SQL</li>
          <li>Zod – 对表单数据实现全面的运行时验证，有效防止非法数据</li>
        </ul>
        <h3 :class="h3Style">技术亮点</h3>
        <h4 :class="h4Style">认证系统</h4>
        <p :class="paragraphStyle">
          构建了一个安全的身份认证流程，结合 Passport.js 和自定义的中间件，与 Prisma
          的用户模型无缝集成，支持传统账号密码登录和 OAuth 第三方登录方式。
        </p>
        <h4 :class="h4Style">部署基础设施</h4>
        <ul :class="unorderedListStyle">
          <li>Docker – 通过容器化应用组件，实现开发与生产环境的一致性</li>
          <li>Caddy – 作为前端静态文件服务器和后端服务反向代理，简化部署架构</li>
          <li>Makefile – 自动化常见开发任务和部署流程，减少手动输入 Linux 命令时出错的风险</li>
        </ul>
      </Section>
      <Section :id="section[4].slug">
        <h2 :class="h2Style">
          {{ section[4].title }}
        </h2>
        <p :class="paragraphStyle">
          开发 CabinFy
          是一次全面的学习体验，促使我在一个真实的全栈项目中同时应用前端和后端技能。以下是我在项目中收获的一些关键点：
        </p>
        <ul :class="unorderedListStyle">
          <li>
            端到端开发流程：我亲自体验了完整的开发生命周期，从设计 UI 组件到构建自定义后端，再到使用
            Docker 和 Caddy 部署整个应用。
          </li>
          <li>
            自定义后端架构：没有依赖 Supabase 等预构建后端服务，而是通过 PostgreSQL、Prisma、Express
            和 Zod 从零搭建了完整的后端系统，这让我深入理解了数据建模、验证以及 RESTful API 设计。
          </li>
          <li>
            认证与权限管理：通过整合 Passport 和 JWT 实现安全登录逻辑，让我更深刻地理解了 Web
            应用中的访问控制与会话管理。
          </li>
          <li>
            前端架构与优化：使用 React 和 React Query
            加深了我对大规模应用中高效状态管理与数据获取策略的理解。
          </li>
          <li>国际化支持：整合 react-i18next，让我掌握了多语言应用的架构设计与本地化内容管理。</li>
          <li>
            DevOps 与自动化：学习了如何使用 Makefile 自动化重复性任务，并通过 Docker
            优化部署流程。编写了自定义 Dockerfile 和 docker-compose
            配置，实现后端与数据库的容器化，简化了本地开发与上线部署流程。同时，使用 Caddy
            作为反向代理和静态文件服务器，进一步简化了路由配置并保障后端服务的安全性。
          </li>
          <li>
            响应式设计与用户体验：通过实现暗黑模式、响应式布局及适配各种设备的界面设计，构建了跨平台统一、完善且易用的用户体验。
          </li>
        </ul>
        <p :class="paragraphStyle">
          这个项目不仅是一次技术实践，也是一次深入思考架构、性能与可维护性的机会，这些宝贵的经验将成为我未来项目中重要的能力积累。
        </p>
      </Section>
      <Section :id="section[5].slug">
        <h2 :class="h2Style">
          {{ section[5].title }}
        </h2>
        <p :class="paragraphStyle">
          CabinFy
          不仅仅是一个作品集项目——它更是一次从零开始构建全栈、生产就绪级别网页应用的深度实践。通过这个项目，我深入探索了现代开发实践，全面打磨了前后端技能，并获得了从多语言支持、用户认证，到响应式设计与容器化部署等多方面的实战经验。
        </p>
        <p :class="paragraphStyle">这个项目体现了我在以下方面的能力：</p>
        <ul :class="unorderedListStyle">
          <li>主动学习并超越课程内容的能力</li>
          <li>架构可扩展、可维护系统的能力</li>
          <li>在前端、后端与 DevOps 各领域灵活运用现代工具的能力</li>
          <li>重视不同语言与设备用户体验的意识</li>
        </ul>
        <p :class="paragraphStyle">
          更重要的是，CabinFy
          让我对真实世界中网页应用的设计、开发与部署有了更清晰的认识，也让我有了迎接更复杂、以用户为中心项目的信心。
        </p>
      </Section>

      <Section :id="section[6].slug">
        <h2 :class="h2Style">
          {{ section[6].title }}
        </h2>
        <div class="space-y-2">
          <a
            target="_blank"
            referrerpolicy="no-referrer"
            href="https://cabin.linze.pro"
            class="!block max-w-xl px-4 py-3 rounded-lg border border-neutral-800 scale-100 transform-gpu hover:scale-[1.02] active:scale-[0.97] transition duration-200 cursor-newtab"
          >
            <div class="flex items-center gap-2 text-sm md:text-base">
              <IconChrome class="size-5" />
              <span class="text-accent font-semibold">cabin.linze.pro</span>
            </div>
          </a>

          <a
            target="_blank"
            referrerpolicy="no-referrer"
            href="https://github.com/nicolasleigh/cabinfy"
            class="!block max-w-xl px-4 py-3 rounded-lg border border-neutral-800 scale-100 transform-gpu hover:scale-[1.02] active:scale-[0.97] transition duration-200 cursor-newtab"
          >
            <div class="flex items-center gap-2 text-sm md:text-base">
              <IconGithub2 class="size-5" />
              <span class="truncate overflow-ellipsis font-semibold text-accent"
                >nicolasleigh/cabinfy</span
              >
            </div>
            <p class="mt-2 text-sm text-neutral-200">
              现代化的小屋预订平台，支持多语言，并配备简洁高效的管理后台，实现无缝租赁管理。
            </p>
          </a>
        </div>
      </Section>
    </div>
  </article>
</template>
