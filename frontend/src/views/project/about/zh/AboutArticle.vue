<script setup lang="ts">
import { getSectionTitleAndSlug, getSectionTitleAndSlugChinese } from "@/utils/helper"
import {
  h2Style,
  h3Style,
  h4Style,
  orderedListStyle,
  paragraphStyle,
  unorderedListStyle,
} from "../../CommonStyle"
import Section from "../../Section.vue"
import { useActiveSection } from "@/hooks/useActiveSection"
import AboutContact from "../AboutContact.vue"
import AboutTechStack from "../AboutTechStack.vue"

const sectionTitle = [
  "背景与教育经历",
  "编程旅程",
  "学习历程",
  "当前专注方向",
  "技术栈",
  "联系方式",
]

const { activeSection } = useActiveSection()
const section = getSectionTitleAndSlugChinese(sectionTitle)
defineExpose({ section, activeSection })
</script>

<template>
  <article class="mx-auto w-full transition-colors text-neutral-400">
    <div>
      <p :class="paragraphStyle"></p>
      <Section :id="section[0].slug">
        <h2 :class="h2Style">
          {{ section[0].title }}
        </h2>
        <p :class="paragraphStyle">
          我是 Nicolas Leigh（李林泽）——
          一位拥有经济与金融背景的自学软件开发者，目前专注于构建现代全栈 Web 应用。
        </p>
        <ul :class="unorderedListStyle">
          <li>出生于 1994 年 7 月，中国云南省</li>
          <li>2013 年高考理科成绩 617 分（云南省理科第 1522 名）</li>
          <li>经济学学士，主修财政学（国家重点学科）</li>
          <li>2017 年毕业于中南财经政法大学（“211 工程”高校）</li>
          <li>中国注册会计师（于 2020 年通过全部六门专业考试）</li>
          <li>自 2021 年起自学编程至今</li>
        </ul>
      </Section>
      <Section :id="section[1].slug">
        <h2 :class="h2Style">
          {{ section[1].title }}
        </h2>
        <p :class="paragraphStyle">
          在从事财务审计工作一年后，我意识到这份职业并不符合我的个人价值观和长期发展目标。于是，在
          2021 年 10 月，也就是新冠疫情期间，我开始了一段全新的旅程：学习编程。
        </p>
        <p :class="paragraphStyle">
          我最初从 C 和 Java
          入手，为我打下了扎实的编程基础和问题解决能力。但真正改变一切的是我偶然发现了 JavaScript ——
          一门直观、富有表现力且充满创造力的语言。它带来的即时视觉反馈和构建交互式 Web
          体验的能力深深吸引了我，也让我坚定了走上前端开发之路的决心。
        </p>
        <p :class="paragraphStyle">
          随后，我拓展到了后端开发，选择了 Go（Golang）和 Node.js。由于我此前已有 C 和 Java
          的经验，这一转变变得顺理成章，同时也让我能够使用更高效的工具和并发模式。这种全栈的开发方式，使我能够独立完成从界面到数据库的完整应用构建。
        </p>
      </Section>
      <Section :id="section[2].slug">
        <h2 :class="h2Style">
          {{ section[2].title }}
        </h2>
        <p :class="paragraphStyle">
          作为一名自学开发者，我主要通过英文资源建立了自己的技术基础，学习平台包括 Udemy、Frontend
          Masters 以及 O’Reilly
          系列图书。使用英语学习不仅显著提升了我的编程能力，也加强了我阅读英文文档、与国际开发社区交流的能力。
        </p>
        <p :class="paragraphStyle">
          出于对语言和知识的热情，我还挑战自己学习法语，并通过英文作为媒介，现在已能够阅读 A2
          水平的法语内容。这样的多语言学习经历进一步增强了我的适应能力和解决问题的思维方式。
        </p>
      </Section>
      <Section :id="section[3].slug">
        <h2 :class="h2Style">
          {{ section[3].title }}
        </h2>
        <p :class="paragraphStyle">
          目前，我专注于使用 React、Vue.js、Node.js 和 Go 构建全栈 Web
          应用，注重代码整洁性、系统性能与卓越的用户体验。我特别热衷于解决问题与批判性思维，这些能力源自我早期的财务审计背景。
        </p>
        <p :class="paragraphStyle">
          我正在积极拓展对云原生架构的理解，并尝试将 Kubernetes
          纳入我的技术工具链。同时，我也不断通过重构已有项目，持续打磨自己的全栈开发能力。
        </p>
        <p :class="paragraphStyle">
          我始终相信，优秀的开发者从不停止学习，而我也将持续在每一次挑战中成长。
        </p>
      </Section>
      <Section :id="section[4].slug">
        <h2 :class="h2Style">
          {{ section[4].title }}
        </h2>
        <AboutTechStack />
      </Section>
      <Section :id="section[5].slug">
        <h2 :class="h2Style">
          {{ section[5].title }}
        </h2>
        <p :class="paragraphStyle">
          无论您对技术合作感兴趣、有工作机会，还是想要交流想法，我都非常乐意与您建立联系。
        </p>
        <p :class="paragraphStyle">您可以通过以下方式联系我：</p>
        <AboutContact />
        <p :class="paragraphStyle">期待您的来信！</p>
      </Section>
    </div>
  </article>
</template>
