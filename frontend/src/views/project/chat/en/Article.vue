<script setup lang="ts">
import { getSectionTitleAndSlug } from "@/utils/helper"
import Section from "../../Section.vue"
import { h2Style, orderedListStyle, paragraphStyle, unorderedListStyle } from "../../CommonStyle"
import ExternalLink from "../../ExternalLink.vue"

const sectionTitle = [
  "Project Overview",
  "Motivation",
  "My Role",
  "Development Process",
  "Tech Stack",
  "Key Features",
  "Challenges & Solutions",
  "What I Learned",
  "Future Improvements",
  "Summary",
  "Live Demo & Source Code",
]

const section = getSectionTitleAndSlug(sectionTitle)

defineExpose({ section })
</script>

<template>
  <article class="mx-auto w-full transition-colors text-neutral-400">
    <div>
      <Section :id="section[0].slug">
        <h2 :class="h2Style">
          {{ section[0].title }}
        </h2>
        <p :class="paragraphStyle">
          Chatify is a real-time communication app that supports text messaging, audio calls, and
          video calls. Initially built using Next.js and
          <ExternalLink href="https://www.convex.dev/">Convex</ExternalLink>, I rebuilt the entire
          backend with Golang and PostgreSQL to overcome performance bottlenecks and gain more
          control over database operations. The project demonstrates my ability to optimize systems,
          handle scalability challenges, and integrate modern web technologies.
        </p>
      </Section>
      <Section :id="section[1].slug">
        <h2 :class="h2Style">
          {{ section[1].title }}
        </h2>
        <p :class="paragraphStyle">
          This project started as a course project, but I saw an opportunity to take it further. The
          original version, while functional, suffered from significant performance issues—mainly
          due to inefficient database queries and limitations of using a third-party
          backend-as-a-service. I wanted to challenge myself by improving its architecture, making
          it more robust, performant, and production-ready.
        </p>
      </Section>
      <Section :id="section[2].slug">
        <h2 :class="h2Style">
          {{ section[2].title }}
        </h2>
        <p :class="paragraphStyle">
          I was responsible for the full-stack development of the application. This included:
        </p>
        <ul :class="unorderedListStyle">
          <li>Rewriting the backend from scratch using Golang and PostgreSQL.</li>
          <li>Designing and implementing raw SQL queries for optimal performance.</li>
          <li>Managing Docker-based deployment and environment configurations.</li>
          <li>Building real-time chat functionality with custom WebSocket logic in Go.</li>
          <li>Integrating third-party services like Clerk for authentication.</li>
          <li>Maintaining and enhancing the existing frontend using Next.js and Tailwind CSS.</li>
        </ul>
      </Section>
      <Section :id="section[3].slug">
        <h2 :class="h2Style">
          {{ section[3].title }}
        </h2>
        <ol :class="orderedListStyle">
          <li>
            Identifying Bottlenecks: Noticed database bandwidth consumption hitting 2GB in one week
            and over 400,000 query calls.
          </li>
          <li>
            Root Cause Analysis: Discovered the N+1 query problem caused by the Convex backend which
            doesn't support SQL joins.
          </li>
          <li>
            System Redesign: Decided to switch to a custom backend using Golang and PostgreSQL.
          </li>
          <li>
            Backend Development:
            <ul :class="unorderedListStyle">
              <li>
                Used raw SQL with <ExternalLink href="https://sqlc.dev/">sqlc</ExternalLink> to
                generate type-safe database access code.
              </li>
              <li>
                Managed schema migrations with
                <ExternalLink href="https://github.com/golang-migrate/migrate"
                  >golang-migrate</ExternalLink
                >.
              </li>
              <li>
                Leveraged
                <ExternalLink href="https://github.com/air-verse/air">air</ExternalLink> for
                live-reloading during development.
              </li>
              <li>
                Protected environment variables using
                <ExternalLink href="https://direnv.net/">direnv</ExternalLink>.
              </li>
            </ul>
          </li>
          <li>
            Deployment Setup: Created a Dockerfile and used docker-compose to unify the app's
            services.
          </li>
          <li>
            Authentication Integration: Used Clerk and implemented webhook support to store user
            authentication data in the backend.
          </li>
          <li>
            Real-Time Communication: Wrote custom WebSocket logic using
            <ExternalLink href="https://gorilla.github.io/">gorilla/websocket</ExternalLink> and
            goRoutines.
          </li>
        </ol>
      </Section>
      <Section :id="section[4].slug">
        <h2 :class="h2Style">
          {{ section[4].title }}
        </h2>
        <ul :class="unorderedListStyle">
          <li>Frontend: Next.js, Tailwind CSS</li>
          <li>Backend: Golang (with sqlc, air, direnv)</li>
          <li>Database: PostgreSQL (schema managed via golang-migrate)</li>
          <li>WebSocket Library: gorilla/websocket</li>
          <li>Authentication: Clerk + Webhooks</li>
          <li>Containerization & Deployment: Docker, docker-compose, and Caddy</li>
        </ul>
      </Section>
      <Section :id="section[5].slug">
        <h2 :class="h2Style">
          {{ section[5].title }}
        </h2>
        <ul :class="unorderedListStyle">
          <li>Real-time chat with message persistence</li>
          <li>Audio and video calling support</li>
          <li>Custom WebSocket implementation using Go</li>
          <li>Secure user authentication via Clerk</li>
          <li>Type-safe database access using raw SQL and sqlc</li>
          <li>Docker-based local and production deployment setup</li>
        </ul>
      </Section>
      <Section :id="section[6].slug">
        <h2 :class="h2Style">
          {{ section[6].title }}
        </h2>
        <ul :class="unorderedListStyle">
          <li>
            Convex's Limitations: Unable to solve N+1 queries due to lack of SQL join support →
            Solved by switching to PostgreSQL and using raw SQL.
          </li>
          <li>
            WebSocket Integration in Go: Socket.io is Node.js-centric → Solved by writing my own
            WebSocket logic using gorilla/websocket and goRoutines.
          </li>
          <li>
            Efficient Development Workflow: Needed quick iteration during backend development →
            Solved with tools like air, direnv, and Docker.
          </li>
        </ul>
      </Section>
      <Section :id="section[7].slug">
        <h2 :class="h2Style">
          {{ section[7].title }}
        </h2>
        <ul :class="unorderedListStyle">
          <li>How to diagnose and resolve N+1 query issues in real-world applications.</li>
          <li>Writing and optimizing raw SQL queries for high-performance APIs.</li>
          <li>
            Managing backend schema migrations and maintaining environment configurations securely.
          </li>
          <li>Creating a custom WebSocket server from scratch in Golang.</li>
          <li>End-to-end application deployment with Docker, docker-compose and Caddy.</li>
        </ul>
      </Section>
      <Section :id="section[8].slug">
        <h2 :class="h2Style">
          {{ section[8].title }}
        </h2>
        <ol :class="orderedListStyle">
          <li>Add unit and integration testing for backend services.</li>
          <li>Implement Redis caching to reduce database load.</li>
          <li>Set up message broker (e.g., NATS or Kafka) for decoupled real-time messaging.</li>
          <li>Add rate limiting and load balancing for production readiness.</li>
          <li>Improve error handling and refactor code for better readability.</li>
          <li>Introduce CI/CD pipeline using Jenkins or GitHub Actions.</li>
          <li>Add internationalization (i18n) support.</li>
          <li>Integrate monitoring tools (e.g., Prometheus, Grafana) for system health checks.</li>
        </ol>
      </Section>
      <Section :id="section[9].slug">
        <h2 :class="h2Style">
          {{ section[9].title }}
        </h2>
        <p :class="paragraphStyle">
          Chatify reflects my journey from identifying critical backend limitations to building a
          robust and scalable chat system. It showcases my backend development skills, ability to
          optimize performance, and knowledge of full-stack deployment practices. This project not
          only met the initial course requirements but also evolved into a professional-grade
          application through thoughtful redesign and execution.
        </p>
      </Section>
      <Section :id="section[10].slug">
        <h2 :class="h2Style">
          {{ section[10].title }}
        </h2>
      </Section>
    </div>
  </article>
</template>
