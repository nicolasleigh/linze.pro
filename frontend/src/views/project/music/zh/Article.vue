<script setup lang="ts">
import { getSectionTitleAndSlug, getSectionTitleAndSlugChinese } from "@/utils/helper"
import {
  h2Style,
  h3Style,
  orderedListStyle,
  paragraphStyle,
  unorderedListStyle,
} from "../../CommonStyle"
import Section from "../../Section.vue"
import { useActiveSection } from "@/hooks/useActiveSection"
import ImageDialog from "@/components/ImageDialog.vue"
import IconGithub2 from "@/components/icons/IconGithub2.vue"

const sectionTitle = [
  "项目概述",
  "项目目标",
  "技术栈",
  "演示视频与截图",
  "我的收获",
  "未来改进",
  "源码链接",
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
          MusicFy 是一个全栈移动端音乐流媒体应用，使用原生 React Native 开发，后端由
          Node.js、Express 和 MongoDB 驱动。作为一个课程项目，这款应用旨在帮助我深入理解超越 Expo
          框架的移动应用开发。
        </p>
        <p :class="paragraphStyle">
          MusicFy
          允许经过认证的用户上传、管理和播放音乐，提供了邮箱验证、密码重置、播放列表、收藏夹、收听历史和用户关注等功能。为了提升性能，应用利用移动设备的缓存系统，将音频文件本地存储，以实现更流畅的播放体验。
        </p>
      </Section>
      <Section :id="section[1].slug">
        <h2 :class="h2Style">
          {{ section[1].title }}
        </h2>
        <p :class="paragraphStyle">
          MusicFy 的主要目标是通过使用原生 React
          Native，从零开始构建一个全栈移动应用，获得实战经验，而不仅仅依赖于 Expo
          的便捷性。这个项目既是一次实践性的学习经历，也是一个具备真实功能、可以作为作品集展示的应用。
        </p>
        <ul :class="unorderedListStyle">
          <li>探索原生 React Native，了解原生模块集成和应用部署流程。</li>
          <li>实现安全的用户认证功能，包括邮箱验证和密码重置。</li>
          <li>支持音乐上传与流媒体播放，包括音频文件和封面图片的管理。</li>
          <li>支持播放列表的创建与管理、收藏夹功能以及用户自定义内容。</li>
          <li>构建一个基于用户收听历史的简单推荐系统。</li>
          <li>通过使用设备本地缓存来优化应用性能，实现音频文件的存储与流式播放。</li>
          <li>使用 Node.js、Express 和 MongoDB 设计一个可扩展的后端 API。</li>
        </ul>
      </Section>
      <Section :id="section[2].slug">
        <h2 :class="h2Style">
          {{ section[2].title }}
        </h2>
        <p :class="paragraphStyle">
          MusicFy
          采用了稳健且现代化的全栈技术组合，涵盖了移动端开发、后端服务、状态管理以及部署等各个方面。
        </p>
        <h3 :class="h3Style">前端（移动应用）</h3>
        <ul :class="unorderedListStyle">
          <li>React Native – 用于构建跨平台移动应用（不依赖 Expo）</li>
          <li>React Navigation – 用于在不同页面之间进行导航管理</li>
          <li>Redux – 用于管理全局应用状态</li>
          <li>React Query – 用于高效的数据请求、缓存和与服务器的数据同步</li>
          <li>Axios – 用于向后端 API 发送 HTTP 请求</li>
          <li>AsyncStorage – 用于本地缓存音频文件，以提升播放性能</li>
        </ul>
        <h3 :class="h3Style">后端</h3>
        <ul :class="unorderedListStyle">
          <li>Node.js + Express – 用于构建 RESTful API 和处理服务器逻辑</li>
          <li>
            MongoDB + Mongoose – 用作 NoSQL 数据库与
            ODM，负责存储和管理用户、音乐条目、播放列表等数据
          </li>
          <li>Formidable – 用于处理文件上传（音乐文件与封面图片）</li>
          <li>Nodemailer – 用于发送邮箱验证与密码重置链接</li>
          <li>JWT（JSON Web Tokens）– 用于身份验证和安全的会话管理</li>
          <li>Bcrypt – 用于密码加密处理</li>
        </ul>
        <h3 :class="h3Style">部署与运维</h3>
        <ul :class="unorderedListStyle">
          <li>Docker – 用于将后端应用容器化，实现一致且可移植的部署</li>
          <li>Caddy – 用作 Web 服务器和反向代理，支持自动 HTTPS，用于服务后端 API</li>
        </ul>
      </Section>

      <Section :id="section[3].slug">
        <h2 :class="h2Style">
          {{ section[3].title }}
        </h2>
        <video controls>
          <source src="https://file.linze.pro/videos/musicfy/1.mp4" type="video/mp4" />
        </video>
        <div class="grid grid-cols-2 gap-2 mt-2">
          <img v-for="(item, index) in demoImages" :key="index" :src="item" />
        </div>
      </Section>

      <Section :id="section[4].slug">
        <h2 :class="h2Style">
          {{ section[4].title }}
        </h2>
        <p :class="paragraphStyle">
          构建 MusicFy 是一次实践性的旅程，帮助我在开发技能和问题解决能力上都有了显著成长。通过跳出
          Expo，直接使用原生 React Native，我更深入地理解了移动应用如何与原生组件和系统级功能交互。
        </p>
        <ul :class="unorderedListStyle">
          <li>
            原生 React Native 开发经验：学习了如何配置原生 iOS 和 Android
            开发环境，手动链接原生模块，以及在不依赖 Expo 的情况下处理平台特定设置。
          </li>
          <li>
            状态管理策略：通过使用 Redux 和 React
            Query，我掌握了在复杂应用中高效管理全局状态与服务器状态的方法，尤其是在处理认证、播放列表和推荐系统时。
          </li>
          <li>
            全栈系统整合：搭建了完整的后端系统（Node.js + Express + MongoDB），加深了我对 API
            设计、文件上传处理以及用户认证安全管理的理解。
          </li>
          <li>
            用户认证流程：实现了邮箱验证和密码重置功能，让我积累了实际的用户流程设计与安全令牌管理经验。
          </li>
          <li>
            音频缓存优化：通过利用设备的本地文件系统缓存音频文件，提升了应用性能，并学到了缓存策略在提升移动端用户体验中的重要性。
          </li>
          <li>
            DevOps 与部署实践：使用 Docker 和
            Caddy，了解了现代化部署流程，包括应用容器化、反向代理配置与 HTTPS 设置。
          </li>
        </ul>
        <p :class="paragraphStyle">
          这个项目不仅提升了我构建可扩展、真实世界应用的信心，也让我对从设计到部署的完整开发生命周期有了更深刻的理解。
        </p>
      </Section>
      <Section :id="section[5].slug">
        <h2 :class="h2Style">
          {{ section[5].title }}
        </h2>
        <p :class="paragraphStyle">
          尽管 MusicFy 已经可以在 Android 和 iOS
          设备上正常运行，但我计划在未来进行一系列优化和增强，以进一步提升用户体验和系统架构。
        </p>
        <ol :class="orderedListStyle">
          <li>自动化测试：引入单元测试、集成测试和端到端测试，以确保系统稳定性并防止功能回归。</li>
          <li>CI/CD 流水线：搭建持续集成与持续部署流程，实现测试、构建和发布的自动化。</li>
          <li>
            Redis / CDN 缓存 ：使用 Redis
            或内容分发网络（CDN）缓存常用音频文件和元数据，以提升性能并减轻服务器负载。
          </li>
          <li>
            请求限流与负载均衡：通过实施请求限流和使用负载均衡器，提升系统的安全性和可扩展性，确保高可用性。
          </li>
          <li>本地化 / 国际化支持：增加多语言支持，使应用能够服务来自不同地区的用户。</li>
          <li>歌词显示：支持在播放歌曲时同步或静态显示歌词，提升沉浸式体验。</li>
          <li>
            推荐系统增强：通过更先进的算法（如协同过滤或基于机器学习的推荐）优化现有的推荐功能。
          </li>
          <li>用户通知：增加推送通知功能，如关注动态、播放列表更新或精选歌曲推送。</li>
          <li>社交分享：允许用户将歌曲或播放列表分享到应用之外，提升内容的传播和发现。</li>
        </ol>
        <p :class="paragraphStyle">
          通过这些未来的功能和优化，MusicFy
          将变得更加完善、可扩展，并为用户提供更加出色的跨平台体验。
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
            href="https://github.com/nicolasleigh/musicfy"
            class="!block max-w-xl px-4 py-3 rounded-lg border border-neutral-800 scale-100 transform-gpu hover:scale-[1.02] active:scale-[0.97] transition duration-200 cursor-newtab"
          >
            <div class="flex items-center gap-2 text-sm md:text-base">
              <IconGithub2 class="size-5" />
              <span class="truncate overflow-ellipsis font-semibold text-accent"
                >nicolasleigh/musicfy</span
              >
            </div>
            <p class="mt-2 text-sm text-neutral-200">
              一个面向移动端的全栈音乐流媒体应用，使用纯 React Native
              构建，兼具极致性能与高度灵活性。
            </p>
          </a>
        </div>
      </Section>
    </div>
  </article>
</template>
