<script setup lang="ts">
import { getSectionTitleAndSlug, getSectionTitleAndSlugChinese } from "@/utils/helper"
import {
  h2Style,
  h3Style,
  h4Style,
  h5Style,
  orderedListStyle,
  paragraphStyle,
  unorderedListStyle,
} from "../../CommonStyle"
import Section from "../../Section.vue"
import { useActiveSection } from "@/hooks/useActiveSection"
import IconGithub2 from "@/components/icons/IconGithub2.vue"
import IconChrome from "@/components/icons/IconChrome.vue"
import ImageDialog from "@/components/ImageDialog.vue"

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
          MovieFy
          是一款功能齐全的电影应用程序，设计有两个不同的界面：一个面向普通用户，另一个面向管理员。该平台允许用户观看电影，探索详细信息，如演员阵容和电影类型，阅读和撰写带有星级评分的评论，并可以在多种语言和主题中享受体验。在管理员方面，该应用程序提供工具来管理电影数据库，包括添加和编辑电影及演员资料。
        </p>
      </Section>

      <Section :id="section[1].slug">
        <h2 :class="h2Style">
          {{ section[1].title }}
        </h2>
        <p :class="paragraphStyle">
          MovieFy
          的理念是构建一个模仿真实世界电影流媒体和评论应用的平台，整合用户体验设计和内容管理功能。它是作为个人项目创建的，旨在深化我的全栈开发技能，特别注重多语言支持和现代
          UI/UX 实践。
        </p>
      </Section>

      <Section :id="section[2].slug">
        <h2 :class="h2Style">
          {{ section[2].title }}
        </h2>
        <p :class="paragraphStyle">这是一个独立项目，我负责整个开发生命周期。我的主要贡献包括：</p>
        <ul :class="unorderedListStyle">
          <li>为用户和管理员界面设计直观、响应式的 UI/UX。</li>
          <li>开发全栈应用程序，包括前端和后端逻辑。</li>
          <li>实现安全的用户认证，以保护用户数据并限制管理员访问。</li>
          <li>使用 Docker 容器化应用程序，以简化开发和部署。</li>
          <li>配置 Caddy 作为静态文件服务器和反向代理，确保高效且安全的路由。</li>
        </ul>
      </Section>

      <Section :id="section[3].slug">
        <h2 :class="h2Style">
          {{ section[3].title }}
        </h2>
        <ol :class="orderedListStyle">
          <li>设计：创建了用户和管理员界面的响应式 UI 模型，注重可访问性、可读性和连贯性。</li>
          <li>
            前端开发：使用 React 和 Tailwind CSS
            构建用户和管理员界面，确保现代、简洁且响应式的体验。
          </li>
          <li>
            后端开发：使用 Node.js、Express 和 MongoDB 开发了一套 RESTful
            API，用于处理电影、演员和评论。
          </li>
          <li>
            本地化与主题：支持英语和中文的语言切换，并添加了深色/浅色模式切换，以提供个性化的用户体验。
          </li>
          <li>
            部署：使用 Docker 容器化应用程序并将其部署在 Linux 服务器上，使用 Caddy
            作为静态文件服务器和反向代理，实现无缝路由。
          </li>
        </ol>
      </Section>

      <Section :id="section[4].slug">
        <h2 :class="h2Style">
          {{ section[4].title }}
        </h2>
        <ul :class="unorderedListStyle">
          <li>前端：React</li>
          <li>样式与主题：Tailwind CSS，shadcn/ui（组件库）</li>
          <li>后端：Node.js，Express</li>
          <li>数据库：MongoDB</li>
          <li>认证：JSON Web Tokens (JWT)</li>
          <li>国际化：react-i18next</li>
        </ul>
      </Section>

      <Section :id="section[5].slug">
        <h2 :class="h2Style">
          {{ section[5].title }}
        </h2>
        <h3 :class="h3Style">用户端</h3>
        <ul :class="unorderedListStyle">
          <li>观看电影并按标题搜索</li>
          <li>查看详细的电影信息，包括主演、类型和相关电影</li>
          <li>阅读和撰写带有交互式星级评分的评论</li>
        </ul>
        <h3 :class="h3Style">管理员端</h3>
        <ul :class="unorderedListStyle">
          <li>创建、编辑和删除电影条目</li>
          <li>管理演员资料，包括姓名和图片</li>
          <li>查看和监控用户最近提交的评论</li>
        </ul>
      </Section>

      <Section :id="section[6].slug">
        <h2 :class="h2Style">
          {{ section[6].title }}
        </h2>
        <video controls>
          <source src="https://file.linze.pro/videos/moviefy/1.mp4" type="video/mp4" />
        </video>
        <div class="grid grid-cols-2 gap-2 mt-2">
          <ImageDialog v-for="(item, index) in demoImages" :key="index" :url="item" />
        </div>
      </Section>

      <Section :id="section[7].slug">
        <h2 :class="h2Style">
          {{ section[7].title }}
        </h2>
        <p :class="paragraphStyle">
          在MovieFy的开发过程中，我遇到并解决了几个复杂的技术挑战，这些挑战显著塑造了应用程序的稳健性和用户体验。
        </p>
        <h4 :class="h4Style">功能丰富的复杂管理员表单</h4>
        <h5 :class="h5Style">挑战：</h5>
        <p :class="paragraphStyle">在管理员面板中构建一个需要处理以下内容的高级电影表单：</p>
        <ul :class="unorderedListStyle">
          <li>清晰、响应式的UI和流畅的用户体验</li>
          <li>表单验证</li>
          <li>多语言支持（英文和中文）</li>
          <li>实时演员搜索</li>
          <li>视频和图片上传</li>
        </ul>
        <h5 :class="h5Style">解决方案：</h5>
        <p :class="paragraphStyle">我通过结合几种现代工具来解决这些问题：</p>
        <ul :class="unorderedListStyle">
          <li>UI/UX：使用 shadcn/ui 组件构建，以获得统一的外观和感觉</li>
          <li>表单验证：将 Zod 与 react-hook-form 集成，实现基于数据库模式的验证和控制</li>
          <li>本地化：使用 react-i18next 实现无缝语言切换</li>
          <li>实时搜索：实现了一个防抖搜索功能，以高效获取演员数据</li>
          <li>文件上传：通过集成到提交流程中的自定义表单控件处理视频和图片上传</li>
        </ul>
        <h4 :class="h4Style">自定义认证和授权</h4>
        <h5 :class="h5Style">挑战：</h5>
        <p :class="paragraphStyle">实现安全的用户认证和基于角色的访问，包括：</p>
        <ul :class="unorderedListStyle">
          <li>电子邮件验证</li>
          <li>仅向已验证用户开放某些功能</li>
          <li>登录状态跟踪</li>
          <li>密码重置功能</li>
        </ul>
        <h5 :class="h5Style">解决方案：</h5>
        <ul :class="unorderedListStyle">
          <li>电子邮件验证：使用 Nodemailer 自动发送带有验证令牌的账户激活电子邮件</li>
          <li>访问控制：将评论和评分功能仅限于已验证用户</li>
          <li>会话管理：使用 JWT 管理认证状态</li>
          <li>密码恢复：实现了一个密码重置流程，安全地向用户的电子邮件发送重置链接</li>
        </ul>
      </Section>

      <Section :id="section[8].slug">
        <h2 :class="h2Style">
          {{ section[8].title }}
        </h2>
        <p :class="paragraphStyle">
          开发 MovieFy
          项目是一次非常有价值的经历，它挑战我同时以全栈开发者、产品设计师和系统架构师的身份思考。以下是这个项目中的一些关键收获：
        </p>
        <ul :class="unorderedListStyle">
          <li>
            平衡复杂性与可用性：设计功能丰富的管理员界面教会了我如何在保持清晰直观的用户体验的同时构建复杂表单。
          </li>
          <li>
            整合现代开发工具：我在 react-hook-form、Zod 和 shadcn/ui
            等工具方面获得了更深入的知识，这使我能够构建可扩展和可维护的界面。
          </li>
          <li>
            国际化的重要性：支持多种语言使我更加注重内容结构、动态UI调整，以及从一开始就为全球用户规划的重要性。
          </li>
          <li>
            安全性和用户体验相辅相成：实施带有电子邮件验证和密码恢复的自定义认证，强化了我对身份验证流程的可靠性及用户友好的理解。
          </li>
          <li>
            部署和 DevOps 基础：使用 Docker 并配置带有 Caddy
            的生产就绪设置，让我获得了部署、管理和高效开发全栈应用程序的实践经验。
          </li>
        </ul>
        <p :class="paragraphStyle">
          总体而言，MovieFy
          不仅提升了我的技术技能，还加深了我对构建精致、可投入生产且能够扩展和服务于真实用户的软件的理解。
        </p>
      </Section>

      <Section :id="section[9].slug">
        <h2 :class="h2Style">
          {{ section[9].title }}
        </h2>
        <p :class="paragraphStyle">
          虽然 MovieFy 成功展示了我的全栈开发能力，但该项目在未来迭代中仍然有几个需要改进的领域：
        </p>
        <ol :class="orderedListStyle">
          <li>
            自动化测试
            <ul :class="unorderedListStyle">
              <li>添加全面的单元测试和集成测试以确保可靠性</li>
              <li>实施端到端测试以验证关键用户流程</li>
              <li>设置测试覆盖率报告以维持代码质量</li>
            </ul>
          </li>
          <li>
            增强错误处理
            <ul :class="unorderedListStyle">
              <li>开发标准化的错误代码系统，以支持多语言错误消息</li>
              <li>在前端和后端实施一致的错误处理模式</li>
              <li>创建用户友好的错误提示，即使在出现问题时也能保持出色的用户体验</li>
            </ul>
          </li>
          <li>
            应用程序监控
            <ul :class="unorderedListStyle">
              <li>集成日志和监控以跟踪应用程序性能</li>
              <li>为关键错误和性能瓶颈设置警报系统</li>
              <li>实施分析以获取有关用户行为和功能使用的见解</li>
            </ul>
          </li>
          <li>
            使用 Jenkins 的 CI/CD 流水线
            <ul :class="unorderedListStyle">
              <li>建立自动化构建、测试和部署工作流</li>
              <li>配置 Jenkins 以简化从开发到生产的过程</li>
              <li>实施质量门，确保只有经过验证的代码才能进入生产环境</li>
            </ul>
          </li>
          <li>
            代码重构
            <ul :class="unorderedListStyle">
              <li>改进组件结构和可重用性</li>
              <li>增强状态管理模式</li>
              <li>优化数据库查询和API端点</li>
            </ul>
          </li>
          <li>
            服务器性能优化
            <ul :class="unorderedListStyle">
              <li>实施速率限制以防止滥用</li>
              <li>添加负载均衡以高效分配流量</li>
              <li>增强缓存策略以加快内容交付</li>
            </ul>
          </li>
        </ol>
      </Section>

      <Section :id="section[10].slug">
        <h2 :class="h2Style">
          {{ section[10].title }}
        </h2>
        <p :class="paragraphStyle">
          MovieFy
          是一款全栈电影应用程序，旨在为用户和管理员提供无缝体验。用户可以观看电影，探索详细信息，并通过撰写带有评分的评论参与互动。在后端，管理员可以通过定制的界面高效管理电影和演员数据。
        </p>
        <p :class="paragraphStyle">
          在这个项目中，我设计和开发了整个系统——从用户界面到身份验证流程和部署——获得了现代前端和后端技术、国际化、DevOps
          和用户体验最佳实践的实际经验。
        </p>
        <p :class="paragraphStyle">
          这个项目是一次宝贵的学习经历，也是我作为全栈开发者旅程中向前迈出的重要一步
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
            href="https://movie.linze.pro"
            class="!block max-w-xl px-4 py-3 rounded-lg border border-neutral-800 scale-100 transform-gpu hover:scale-[1.02] active:scale-[0.97] transition duration-200 cursor-newtab"
          >
            <div class="flex items-center gap-2 text-sm md:text-base">
              <IconChrome class="size-5" />
              <span class="text-accent font-semibold">movie.linze.pro</span>
            </div>
          </a>

          <a
            target="_blank"
            referrerpolicy="no-referrer"
            href="https://github.com/nicolasleigh/moviefy"
            class="!block max-w-xl px-4 py-3 rounded-lg border border-neutral-800 scale-100 transform-gpu hover:scale-[1.02] active:scale-[0.97] transition duration-200 cursor-newtab"
          >
            <div class="flex items-center gap-2 text-sm md:text-base">
              <IconGithub2 class="size-5" />
              <span class="truncate overflow-ellipsis font-semibold text-accent"
                >nicolasleigh/moviefy</span
              >
            </div>
            <p class="mt-2 text-sm text-neutral-200">
              一个全栈电影平台，包含用户端和管理端界面，支持电影播放、评论功能及内容管理。
            </p>
          </a>
        </div>
      </Section>
    </div>
  </article>
</template>
