<script setup lang="ts">
import { getSectionTitleAndSlug, getSectionTitleAndSlugChinese } from "@/utils/helper"
import { h2Style, h3Style, h4Style, paragraphStyle, unorderedListStyle } from "../../CommonStyle"
import Section from "../../Section.vue"
import { useActiveSection } from "@/hooks/useActiveSection"
import { computed, ref, watch } from "vue"

const { activeSection } = useActiveSection()

const sectionTitle = ["简短说明", "功能特点", "技术栈", "我的收获", "最终思考"]

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
          CabinFy
          是一个功能全面的住宿预订平台，连接旅行者与独特的木屋租赁。它为客人提供直观的体验，帮助他们发现和预订木屋，同时通过安全的管理员后台为房东提供强大的管理工具。尽管最初受到
          React 课程的启发，我完全重构了它，使用自定义的 Node.js/Express 后端、PostgreSQL
          数据库和使用 Tailwind CSS 现代化的
          UI，将其转变为一款具有多语言支持和响应式设计的生产级应用。
        </p>
      </Section>

      <Section :id="section[1].slug">
        <h2 :class="h2Style">
          {{ section[1].title }}
        </h2>
        <p :class="paragraphStyle">
          CabinFy is a full-stack web application inspired by Airbnb, designed for booking and
          managing cabin rentals. It delivers a seamless experience for both guests and
          administrators, with a strong focus on performance, usability, and modern development
          practices. Key features include:
        </p>
        <ul :class="unorderedListStyle">
          <li>
            <p>
              Multilingual Support: Available in both English and Chinese, making the platform
              accessible to a broader audience.
            </p>
          </li>
          <li>
            <p>
              Responsive Design & Accessibility: The UI is fully optimized for desktop, tablet, and
              mobile devices, with built-in dark mode support and accessibility features ensuring a
              comfortable experience for all users regardless of device or viewing preferences.
            </p>
          </li>
          <li>
            <p>
              Guest Booking Interface: Users can browse available cabins, view detailed listings,
              and make bookings through an intuitive and modern interface.
            </p>
          </li>
          <li>
            <p>Admin Dashboard: Admins have access to a secure dashboard where they can:</p>
            <ul :class="unorderedListStyle">
              <li><p>View, manage, and process bookings</p></li>
              <li><p>Submit new cabin listings or edit existing ones</p></li>
              <li><p>Monitor booking activity and cabin availability</p></li>
            </ul>
          </li>
          <li>
            <p>
              Advanced Data Management: Supports filtering, sorting, and pagination for easy
              browsing and efficient data interaction
            </p>
          </li>
          <li>
            <p>
              Authentication &amp; Authorization: Secure user authentication with access control to
              protect admin functionalities and private data.
            </p>
          </li>
        </ul>
      </Section>
      <Section :id="section[2].slug">
        <h2 :class="h2Style">
          {{ section[2].title }}
        </h2>
        <p :class="paragraphStyle">
          CabinFy is built using a modern and scalable full-stack architecture, combining powerful
          libraries and tools on both the frontend and backend to ensure performance,
          maintainability, and a smooth developer experience.
        </p>
        <h3 :class="h3Style">Core Technologies</h3>
        <h4 :class="h4Style">Frontend</h4>
        <ul :class="unorderedListStyle">
          <li>React – Core library for building dynamic user interfaces</li>
          <li>Tailwind CSS – Utility-first CSS framework for building fast and responsive UIs</li>
          <li>
            React Query – Selected over Redux for its optimized data fetching and caching
            capabilities
          </li>
        </ul>
        <h4 :class="h4Style">Backend</h4>
        <ul :class="unorderedListStyle">
          <li>
            Node.js & Express – Lightweight yet powerful server framework enabling rapid API
            development
          </li>
          <li>
            PostgreSQL & Prisma – Combination provides type-safe database operations without the
            need to write raw SQL
          </li>
          <li>
            Zod – Implements thorough runtime validation at API boundaries, preventing data
            corruption
          </li>
        </ul>
        <h3 :class="h3Style">Technical Highlights</h3>
        <h4 :class="h4Style">Authentication System</h4>
        <p :class="paragraphStyle">
          Built a secure authentication flow combining Passport.js with custom middleware that
          integrates seamlessly with Prisma's user model, supporting both traditional and OAuth
          authentication methods.
        </p>
        <h4 :class="h4Style">Deployment Infrastructure</h4>
        <ul :class="unorderedListStyle">
          <li>
            Docker – Containerized application components for consistent environments across
            development and production
          </li>
          <li>
            Caddy – Configured as both a static file server for the frontend and reverse proxy for
            backend services, simplifying the deployment architecture
          </li>
          <li>
            Makefile – Automated common development tasks and deployment procedures, reducing errors
            when typing Linux commands
          </li>
        </ul>
      </Section>
      <Section :id="section[3].slug">
        <h2 :class="h2Style">
          {{ section[3].title }}
        </h2>
        <p :class="paragraphStyle">
          Building CabinFy was a comprehensive learning experience that challenged me to apply both
          frontend and backend skills in a real-world, full-stack project. Here are some of the key
          takeaways:
        </p>
        <ul :class="unorderedListStyle">
          <li>
            End-to-End Development Workflow: I gained hands-on experience managing an entire
            development lifecycle—from designing UI components to building a custom backend and
            deploying the full application using Docker and Caddy.
          </li>
          <li>
            Custom Backend Architecture: Instead of relying on prebuilt backend services like
            Supabase, I built a complete backend from scratch using PostgreSQL, Prisma, Express, and
            Zod, which taught me how to better handle data modeling, validation, and RESTful API
            design.
          </li>
          <li>
            Authentication &amp; Authorization: Implementing secure login logic with Passport and
            JWT gave me a deeper understanding of access control and session management in web
            applications.
          </li>
          <li>
            Frontend Architecture &amp; Optimization: Using React and React Query helped me
            understand efficient state management and data fetching strategies in large-scale apps.
          </li>
          <li>
            Internationalization: Integrating react-i18next gave me insight into structuring
            multilingual applications and managing locale-specific content.
          </li>
          <li>
            DevOps &amp; Automation: I learned how to automate repetitive tasks using Makefile, and
            improved deployment workflows by using Docker. I created custom Dockerfiles and a
            docker-compose setup to containerize the backend and database, streamlining local
            development and deployment. Additionally, I used Caddy as both a reverse proxy and
            static file server to simplify routing and secure backend services.
          </li>
          <li>
            Responsive Design &amp; UX: Implementing dark mode, responsive layouts, and
            device-friendly interfaces helped me build a polished and accessible user experience
            across platforms.
          </li>
        </ul>
        <p :class="paragraphStyle">
          This project was not only a technical exercise but also a chance to think critically about
          architecture, performance, and maintainability—skills I’ll carry forward into future
          projects.
        </p>
      </Section>
      <Section :id="section[4].slug">
        <h2 :class="h2Style">
          {{ section[4].title }}
        </h2>
        <p :class="paragraphStyle">
          CabinFy was more than just a portfolio piece—it was a deep dive into building a
          full-stack, production-ready web application from the ground up. Through this project, I
          explored modern development practices, honed my skills across the stack, and gained
          hands-on experience with everything from multilingual support and authentication to
          responsive design and containerized deployment.
        </p>
        <p :class="paragraphStyle">This project reflects my ability to:</p>
        <ul :class="unorderedListStyle">
          <li>Take initiative beyond course content</li>
          <li>Architect scalable, maintainable systems</li>
          <li>Embrace modern tooling across frontend, backend, and DevOps</li>
          <li>Prioritize user experience across languages and devices</li>
        </ul>
        <p :class="paragraphStyle">
          Most importantly, CabinFy gave me a clearer vision of how real-world web applications are
          designed, built, and deployed—and the confidence to take on even more complex,
          user-centric projects in the future.
        </p>
      </Section>
    </div>
  </article>
</template>
