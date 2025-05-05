<script setup lang="ts">
import { getSectionTitleAndSlug, getSectionTitleAndSlugChinese } from "@/utils/helper"
import Section from "../../Section.vue"
import { h2Style, orderedListStyle, paragraphStyle, unorderedListStyle } from "../../CommonStyle"
import { useActiveSection } from "@/hooks/useActiveSection"

const sectionTitle = [
  "项目概述",
  "项目动机",
  "我的角色",
  "开发过程",
  "技术栈",
  "主要功能",
  "挑战与解决方案",
  "我的收获",
  "未来改进",
  "总结",
  "在线演示与源码链接",
]

const { activeSection } = useActiveSection()
const section = getSectionTitleAndSlugChinese(sectionTitle)
defineExpose({ section, activeSection })
</script>

<template>
  <article class="mx-auto w-full transition-colors text-neutral-400">
    <div>
      <Section :id="section[0].slug">
        <h2 :class="h2Style">
          {{ section[0].title }}
        </h2>
        <p :class="paragraphStyle">
          Linze.pro
          是一个展示我个人项目作品和分享技术文章的平台。作为管理员，我可以创建、编辑和管理博客文章，而用户则可以浏览这些文章，查看我的信息，并探索我的项目作品。该博客支持中英文双语，用户还可以通过标签对文章进行筛选。
        </p>
      </Section>
      <Section :id="section[1].slug">
        <h2 :class="h2Style">
          {{ section[1].title }}
        </h2>
        <p :class="paragraphStyle">
          这个项目的初衷是打造一个多功能的平台，不仅能展示我的个人与技术成就，还能通过分享有价值的技术见解与读者互动。我希望创建一个直观、支持多语言的博客，拥有简洁响应的用户界面和强健的后端系统，从而全面展示我在前端、后端及部署方面的全栈开发能力。
        </p>
      </Section>
      <Section :id="section[2].slug">
        <h2 :class="h2Style">
          {{ section[2].title }}
        </h2>
        <p :class="paragraphStyle">
          作为本项目的唯一开发者，我独立设计并实现了前端和后端。前端部分使用了 Vue.js 和 Tailwind
          CSS，打造出直观且美观的用户界面。后端采用 Golang 结合 chi 框架，构建出安全、可扩展且高效的
          API。我还集成了 PostgreSQL
          数据库，并处理了服务端的逻辑，包括身份验证、缓存机制和性能优化。
        </p>
      </Section>
      <Section :id="section[3].slug">
        <h2 :class="h2Style">
          {{ section[3].title }}
        </h2>
        <ol :class="orderedListStyle">
          <li>
            前端开发：我首先使用 Vue.js 和 Tailwind CSS
            设计了一个用户友好的界面，确保其响应式设计并支持中英文双语切换。
          </li>
          <li>
            后端开发：后端使用 Golang 和 chi 框架构建 RESTful API，集成了 JWT 认证、CORS
            策略以及限流中间件，增强了安全性与可扩展性。
          </li>
          <li>
            数据库设计：选择 PostgreSQL
            作为数据库，因其稳定性与可扩展性良好。数据库结构涵盖博客文章、标签、用户统计数据（如点赞和浏览量）以及多语言内容。
          </li>
          <li>
            部署与 DevOps：应用通过 Docker 和 Docker Compose 实现容器化部署，使用 Caddy
            作为反向代理和静态文件服务器。同时，配置 GitHub Actions 实现持续集成与交付。
          </li>
          <li>
            测试与调试：为确保应用稳定性，我实现了单元测试和集成测试，同时配置日志记录与监控，以便及时追踪和解决问题。
          </li>
        </ol>
      </Section>
      <Section :id="section[4].slug">
        <h2 :class="h2Style">
          {{ section[4].title }}
        </h2>
        <ul :class="unorderedListStyle">
          <li>前端：Vue.js，Tailwind CSS</li>
          <li>后端：Golang，chi</li>
          <li>数据库：PostgreSQL</li>
          <li>中间件与库：基于 JWT 的身份认证、Redis 缓存、限流、中间件、CORS 策略、日志记录</li>
          <li>
            DevOps 与部署：Docker，Docker Compose，GitHub Actions，Caddy（静态文件服务器与反向代理）
          </li>
          <li>文档：Swagger API 后端文档</li>
        </ul>
      </Section>
      <Section :id="section[5].slug">
        <h2 :class="h2Style">
          {{ section[5].title }}
        </h2>
        <ul :class="unorderedListStyle">
          <li>多语言支持：应用支持中英文双语，提升访问人群的覆盖面。</li>
          <li>标签筛选功能：用户可通过标签筛选文章，更方便找到感兴趣的内容。</li>
          <li>文章统计信息：每篇文章展示浏览次数和点赞数，帮助读者和管理员了解内容受欢迎程度。</li>
          <li>管理员控制台：管理员可创建与编辑文章，管理内容并查看分析数据。</li>
        </ul>
      </Section>
      <Section :id="section[6].slug">
        <h2 :class="h2Style">
          {{ section[6].title }}
        </h2>
        <ul :class="unorderedListStyle">
          <li>
            多语言内容管理：支持多语言文章需要细致的数据库设计和逻辑处理，我在 PostgreSQL
            中采用了灵活的数据模型，有效支持了内容的多语言扩展。
          </li>
          <li>
            安全与性能：实现了安全的 JWT 身份验证和严格的 CORS 策略，同时通过 Redis
            缓存优化性能，确保用户体验与系统安全。
          </li>
        </ul>
      </Section>
      <Section :id="section[7].slug">
        <h2 :class="h2Style">
          {{ section[7].title }}
        </h2>
        <ul :class="unorderedListStyle">
          <li>
            全栈开发：通过本项目，我进一步提升了构建全栈应用的能力，特别是在使用 Golang
            作为后端技术方面。
          </li>
          <li>
            部署实践：掌握了如何使用 Docker 进行应用容器化，以及借助 GitHub Actions
            构建高效的部署流水线。
          </li>
          <li>
            多语言应用设计：开发一个支持多语言的平台，让我深入理解前后端处理多语言内容的复杂性。
          </li>
        </ul>
      </Section>
      <Section :id="section[8].slug">
        <h2 :class="h2Style">
          {{ section[8].title }}
        </h2>
        <ul :class="unorderedListStyle">
          <li>SEO 优化：进一步优化搜索引擎收录表现，提高博客文章的可发现性。</li>
        </ul>
      </Section>
      <Section :id="section[9].slug">
        <h2 :class="h2Style">
          {{ section[9].title }}
        </h2>
        <p :class="paragraphStyle">
          这个博客应用是我展示项目作品、分享技术见解并与读者互动的平台。借助 Vue.js、Golang 和
          Docker 等现代技术，我构建了一个安全、可扩展且功能丰富的应用。本项目展现了我在前后端开发及
          DevOps 实践中的能力，体现了我对行业标准工具和开发流程的熟练运用。
        </p>
      </Section>
    </div>
  </article>
</template>
