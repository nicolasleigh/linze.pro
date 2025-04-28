<script setup lang="ts">
import { getSectionTitleAndSlug, getSectionTitleAndSlugChinese } from "@/utils/helper"
import Section from "../../Section.vue"
import {
  h2Style,
  h3Style,
  orderedListStyle,
  paragraphStyle,
  unorderedListStyle,
} from "../../CommonStyle"
import { useActiveSection } from "@/hooks/useActiveSection"

const sectionTitle = [
  "项目概述",
  "项目动机",
  "我的角色",
  "技术栈",
  "主要功能",
  "我的收获",
  "未来改进",
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
          Petify
          是一个全栈式电商平台，专为线上宠物交易打造。平台提供了友好的购物体验，具备智能筛选、实时聊天和详细订单跟踪等功能。整个系统分为三个独立部分：面向用户的网页应用、管理后台，以及后端
          API 服务器。每一部分的开发都充分考虑了可扩展性、易用性和高性能。
        </p>
      </Section>
      <Section :id="section[1].slug">
        <h2 :class="h2Style">
          {{ section[1].title }}
        </h2>
        <p :class="paragraphStyle">
          开发 Petify
          的主要动机是为了加深我对全栈开发的理解，并通过从零开始构建一个完整的真实世界网页应用，获得实践经验。我希望挑战自己，全面参与开发各个环节
          —— 从设计交互性强、响应迅速的用户界面，到构建可扩展的后端 API，再到使用 Docker 和 Caddy
          在生产环境中部署应用。
        </p>
        <p :class="paragraphStyle">
          选择电商平台作为项目类型，使我能够探索一系列丰富的功能，比如用户认证、产品筛选、购物车逻辑、实时消息通信、管理后台工具以及数据可视化。这个项目不仅巩固了我已有的知识，还让我有机会在前端、后端和部署等领域学习新工具、掌握最佳实践，并了解不同的架构模式。
        </p>
      </Section>
      <Section :id="section[2].slug">
        <h2 :class="h2Style">
          {{ section[2].title }}
        </h2>
        <p :class="paragraphStyle">
          在 Petify 项目中，我独立负责了从概念设计到部署上线的整个开发过程，具体包括：
        </p>
        <ul :class="unorderedListStyle">
          <li>前端开发：使用 React、Redux 和 Tailwind CSS 构建响应式的用户界面和管理后台界面。</li>
          <li>
            后端开发：使用 Node.js 和 Express 设计并实现 RESTful API，处理用户认证、文件上传以及基于
            Socket.IO 的实时聊天功能。
          </li>
          <li>数据库设计：使用 MongoDB 进行数据建模与管理，包括设计数据结构和处理数据关系。</li>
          <li>
            部署与运维：通过 Docker 和 docker-compose 对应用进行容器化，使用 Caddy 配置反向代理和
            HTTPS，并将所有服务部署为统一的应用栈。
          </li>
        </ul>
        <p :class="paragraphStyle">
          这个项目让我实现了对完整开发流程的全程掌控，在应用的每一层都锻炼了解决问题的能力，也积累了宝贵的全栈开发经验。
        </p>
      </Section>
      <Section :id="section[3].slug">
        <h2 :class="h2Style">
          {{ section[3].title }}
        </h2>
        <h3 :class="h3Style">前端：</h3>
        <ul :class="unorderedListStyle">
          <li>React – 用于构建动态、交互性强的用户界面。</li>
          <li>Redux – 用于在用户端和管理端应用中统一管理全局状态。</li>
          <li>Tailwind CSS – 采用实用优先的方式进行快速样式编写与响应式 UI 设计。</li>
        </ul>
        <h3 :class="h3Style">后端：</h3>
        <ul :class="unorderedListStyle">
          <li>Node.js & Express – 用于构建 RESTful API 并处理服务器端逻辑。</li>
          <li>MongoDB – 作为 NoSQL 数据库，存储用户、产品、订单、评论和聊天数据。</li>
          <li>Formidable – 用于处理文件上传，如产品图片。</li>
          <li>Socket.IO – 用于实现用户与管理员之间的实时聊天功能。</li>
        </ul>
        <h3 :class="h3Style">DevOps 与部署：</h3>
        <ul :class="unorderedListStyle">
          <li>Docker – 将前端和后端应用容器化，确保一致性与可移植性。</li>
          <li>docker-compose – 用于开发与部署过程中编排多容器环境。</li>
          <li>Caddy – 作为反向代理和 Web 服务器，自动配置 HTTPS 并将请求正确路由到对应服务。</li>
        </ul>
      </Section>
      <Section :id="section[4].slug">
        <h2 :class="h2Style">
          {{ section[4].title }}
        </h2>
        <h3 :class="h3Style">用户端应用</h3>
        <ul :class="unorderedListStyle">
          <li>产品浏览：用户可以按类别浏览宠物，并查看详细的产品信息。</li>
          <li>
            智能搜索与筛选：
            <ul :class="unorderedListStyle">
              <li>根据产品名称或类别进行搜索。</li>
              <li>按类别、价格范围和评分进行筛选。</li>
              <li>按价格（升序/降序）对产品进行排序。</li>
            </ul>
          </li>
          <li>心愿单与购物车：将宠物添加到心愿单或购物车，以便稍后查看或结账。</li>
          <li>订单管理：下订单、查看订单详情和跟踪订单状态。</li>
          <li>产品评价：在产品页面留下星级评分和书面评论。</li>
          <li>实时聊天：通过由 Socket.IO 提供支持的实时聊天系统与卖家即时沟通。</li>
        </ul>
        <h3 :class="h3Style">管理端应用</h3>
        <ul :class="unorderedListStyle">
          <li>
            仪表盘概览：
            <ul :class="unorderedListStyle">
              <li>查看与销售相关的统计数据，包括总销售额、订单、客户和产品信息。</li>
              <li>通过柱状图显示按类别的销售和订单数量。</li>
              <li>实时更新最近的订单和客户消息。</li>
            </ul>
          </li>
          <li>产品与类别管理：添加、编辑和删除类别及产品列表。</li>
          <li>订单跟踪：访问详细的订单和支付信息。</li>
          <li>客户聊天：实时回应客户消息。</li>
          <li>个人资料管理：更新管理员个人资料并安全更改密码。</li>
          <li>
            高级搜索工具：
            <ul :class="unorderedListStyle">
              <li>按名称或类别搜索产品。</li>
              <li>按订单 ID 搜索订单。</li>
            </ul>
          </li>
        </ul>
      </Section>
      <Section :id="section[5].slug">
        <h2 :class="h2Style">
          {{ section[5].title }}
        </h2>
        <p :class="paragraphStyle">
          构建 Petify 是一次宝贵的实践经验，让我深入理解了全栈开发。在整个过程中，我学会了如何：
        </p>
        <ul :class="unorderedListStyle">
          <li>设计和结构化全栈应用程序，确保前端、后端和管理界面之间有明确的职责分离。</li>
          <li>使用像 Socket.IO 这样的实时技术，构建交互性强的功能，如实时聊天。</li>
          <li>使用 Redux 管理不同 React 应用中的复杂状态。</li>
          <li>实现稳健的 API 端点，并将它们与前端无缝连接，确保数据流的安全性。</li>
          <li>使用 Tailwind CSS 和基于组件的设计方法构建用户友好、响应式的界面。</li>
          <li>在服务器端使用 Formidable 处理文件上传并管理媒体文件。</li>
          <li>使用 Docker 对应用程序进行容器化，并通过 docker-compose 编排服务。</li>
          <li>将全栈应用部署到生产环境，设置 HTTPS，并使用 Caddy 作为反向代理管理路由。</li>
        </ul>
        <p :class="paragraphStyle">
          这个项目帮助我强化了前端和后端的技能，并为我提供了 DevOps 和部署的实践经验 –
          将抽象的知识转化为实际可用的解决方案。
        </p>
      </Section>
      <Section :id="section[6].slug">
        <h2 :class="h2Style">
          {{ section[6].title }}
        </h2>
        <p :class="paragraphStyle">
          尽管 Petify
          已经是一个功能完善、可扩展的电商平台，但我计划在未来实施若干改进和新增功能，以提升其性能、可用性和可维护性：
        </p>
        <ol :class="orderedListStyle">
          <li>测试：引入全面的单元测试、集成测试和端到端测试，以确保代码的可靠性和稳定性。</li>
          <li>消息代理：实现消息代理（如 RabbitMQ 或 Kafka），解耦服务并改善组件之间的通信。</li>
          <li>
            负载均衡与限流：添加负载均衡以高效分配流量，并实现限流功能，防止滥用并确保 API
            的公平使用。
          </li>
          <li>Redis 缓存：集成 Redis 用于缓存频繁访问的数据，提升应用性能并减少数据库负载。</li>
          <li>
            数据库优化：应用索引和其他数据库优化措施，提高查询性能，特别是在处理大型数据集时。
          </li>
          <li>国际化（i18n）：增加多语言支持，以满足全球用户需求并提升可访问性。</li>
          <li>React 服务端渲染（SSR）：实现 React 服务端渲染（SSR），提升 SEO 和页面加载性能。</li>
          <li>
            CI/CD 流水线：使用 Jenkins
            设置持续集成与持续部署（CI/CD）流水线，自动化测试、构建和部署过程。
          </li>
          <li>
            应用监控：集成像 Prometheus 或 New Relic
            这样的应用监控工具，跟踪性能，识别瓶颈，并确保系统健康。
          </li>
          <li>
            更好的错误处理与代码重构：改进错误处理，并重构代码，以提高可读性、可维护性和可扩展性。
          </li>
          <li>
            其他增强功能：实现产品推荐系统、为管理员提供高级分析功能，以及基于 AI
            的聊天支持，进一步提升用户体验。
          </li>
        </ol>
        <p :class="paragraphStyle">
          这些改进将确保 Petify
          在不断发展的过程中，始终保持现代化、高性能和可扩展，满足日益增长的用户需求。
        </p>
      </Section>
      <Section :id="section[7].slug">
        <h2 :class="h2Style">
          {{ section[7].title }}
        </h2>
      </Section>
    </div>
  </article>
</template>
