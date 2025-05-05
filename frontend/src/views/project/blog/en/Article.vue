<script setup lang="ts">
import { getSectionTitleAndSlug } from "@/utils/helper"
import Section from "../../Section.vue"
import { h2Style, orderedListStyle, paragraphStyle, unorderedListStyle } from "../../CommonStyle"
import { useActiveSection } from "@/hooks/useActiveSection"

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

const { activeSection } = useActiveSection()
const section = getSectionTitleAndSlug(sectionTitle)
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
          Linze.pro is a platform designed to showcase my portfolio projects and share technical
          articles with a wider audience. As the admin, I can create, edit, and manage blog posts,
          while users can browse the posts, view information about me, and explore my portfolio. The
          blog supports both English and Chinese, allowing users to filter posts by tags.
        </p>
      </Section>
      <Section :id="section[1].slug">
        <h2 :class="h2Style">
          {{ section[1].title }}
        </h2>
        <p :class="paragraphStyle">
          The purpose of this project was to build a versatile platform where I could not only
          display my personal and technical achievements but also engage with an audience by sharing
          valuable technical insights. I wanted to create an intuitive, multi-language blog with a
          clean, responsive UI and a robust backend to demonstrate my skills in full-stack
          development, including frontend, backend, and deployment.
        </p>
      </Section>
      <Section :id="section[2].slug">
        <h2 :class="h2Style">
          {{ section[2].title }}
        </h2>
        <p :class="paragraphStyle">
          As the sole developer on this project, I designed and implemented both the frontend and
          backend. I utilized Vue.js and Tailwind CSS to create an intuitive and aesthetically
          pleasing user interface. On the backend, I used Golang with the chi framework to build a
          secure, scalable, and efficient API. I also integrated PostgreSQL as the database and took
          care of the server-side logic, including authentication, caching, and performance
          optimization.
        </p>
      </Section>
      <Section :id="section[3].slug">
        <h2 :class="h2Style">
          {{ section[3].title }}
        </h2>
        <ol :class="orderedListStyle">
          <li>
            Frontend Development: I started by designing a user-friendly frontend with Vue.js and
            Tailwind CSS, ensuring that the UI was responsive and supported both English and
            Chinese.
          </li>
          <li>
            Backend Development: I used Golang and the chi framework for building the RESTful API.
            Key features like JWT authentication, CORS strategies, and rate-limiting middleware were
            integrated for security and scalability.
          </li>
          <li>
            Database Design: PostgreSQL was chosen for its reliability and scalability. I structured
            the database to handle blog posts, tags, user statistics (likes, views), and
            multilingual content.
          </li>
          <li>
            Deployment & DevOps: The app is dockerized for easy deployment using Docker and Docker
            Compose. Caddy is used as a reverse proxy and static file server. I set up GitHub
            actions for continuous integration and delivery.
          </li>
          <li>
            Testing & Debugging: To ensure the app’s reliability, I implemented unit and integration
            tests, while logging and monitoring were set up to keep track of any issues.
          </li>
        </ol>
      </Section>
      <Section :id="section[4].slug">
        <h2 :class="h2Style">
          {{ section[4].title }}
        </h2>
        <ul :class="unorderedListStyle">
          <li>Frontend: Vue.js, Tailwind CSS</li>
          <li>Backend: Golang, chi</li>
          <li>Database: PostgreSQL</li>
          <li>
            Middleware & Libraries: JWT-based Authentication, Redis Caching, Rate Limiting, CORS,
            Logging
          </li>
          <li>
            DevOps & Deployment: Docker, Docker Compose, GitHub Actions, Caddy (Static File Server &
            Reverse Proxy)
          </li>
          <li>Documentation: API Swagger for Backend Documentation</li>
        </ul>
      </Section>
      <Section :id="section[5].slug">
        <h2 :class="h2Style">
          {{ section[5].title }}
        </h2>
        <ul :class="unorderedListStyle">
          <li>
            Multilingual Support: The app supports both English and Chinese, making it accessible to
            a wider audience.
          </li>
          <li>
            Tag-based Filtering: Users can filter posts by tags, allowing them to find content
            relevant to their interests.
          </li>
          <li>
            Blog Post Statistics: Each post shows the number of views and likes, giving both readers
            and the admin insights into content popularity.
          </li>
          <li>
            Admin Controls: The admin can create and edit blog posts, manage content, and view
            analytics.
          </li>
        </ul>
      </Section>
      <Section :id="section[6].slug">
        <h2 :class="h2Style">
          {{ section[6].title }}
        </h2>
        <ul :class="unorderedListStyle">
          <li>
            Multilingual Content Management: Handling different languages for the blog posts
            required careful database design and logic. I used a flexible model in PostgreSQL to
            support translations without complexity.
          </li>
          <li>
            Security and Performance: Implementing secure JWT authentication and strict CORS
            policies, as well as optimizing performance with Redis caching, were critical for both
            security and the user experience.
          </li>
        </ul>
      </Section>
      <Section :id="section[7].slug">
        <h2 :class="h2Style">
          {{ section[7].title }}
        </h2>
        <ul :class="unorderedListStyle">
          <li>
            Full-Stack Development: I deepened my knowledge in building full-stack applications,
            especially with Golang as a backend technology.
          </li>
          <li>
            Deployment Practices: I learned how to effectively use Docker for containerizing
            applications and setting up efficient deployment pipelines with GitHub Actions.
          </li>
          <li>
            Multilingual App Design: Creating a multilingual platform helped me understand the
            complexities of handling multiple languages in both frontend and backend.
          </li>
        </ul>
      </Section>
      <Section :id="section[8].slug">
        <h2 :class="h2Style">
          {{ section[8].title }}
        </h2>
        <ul :class="unorderedListStyle">
          <li>
            SEO Optimization: Improving search engine optimization (SEO) for better discoverability
            of blog posts.
          </li>
        </ul>
      </Section>
      <Section :id="section[9].slug">
        <h2 :class="h2Style">
          {{ section[9].title }}
        </h2>
        <p :class="paragraphStyle">
          This Blog app serves as a platform to showcase my portfolio, share insights, and interact
          with readers. By using modern technologies like Vue.js, Golang, and Docker, I have built a
          secure, scalable, and feature-rich app. This project reflects my ability to manage both
          frontend and backend development while utilizing industry-standard tools and practices.
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
