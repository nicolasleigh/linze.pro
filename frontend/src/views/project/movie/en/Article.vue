<script setup lang="ts">
import { getSectionTitleAndSlug } from "@/utils/helper"
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
import { Chrome, Github, GithubIcon } from "lucide-vue-next"
import IconGithub2 from "@/components/icons/IconGithub2.vue"
import IconChrome from "@/components/icons/IconChrome.vue"
import ImageDialog from "@/components/ImageDialog.vue"

const sectionTitle = [
  "Project Overview",
  "Motivation",
  "My Role",
  "Development Process",
  "Tech Stack",
  "Key Features",
  "Demo Video & Screenshots",
  "Challenges & Solutions",
  "What I Learned",
  "Future Improvements",
  "Summary",
  "Live Site & Source Code",
]
const { activeSection } = useActiveSection()
const section = getSectionTitleAndSlug(sectionTitle)
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
          MovieFy is a full-featured movie app designed with two distinct interfaces: one for
          regular users and one for administrators. The platform allows users to watch movies,
          explore detailed information like cast and genres, read and write reviews with star
          ratings, and enjoy the experience in multiple languages and themes. On the admin side, the
          app provides tools to manage the movie database, including adding and editing movies and
          actor profiles.
        </p>
      </Section>

      <Section :id="section[1].slug">
        <h2 :class="h2Style">
          {{ section[1].title }}
        </h2>
        <p :class="paragraphStyle">
          The idea behind MovieFy was to build a platform that mimics a real-world movie streaming
          and review app, integrating both user experience design and content management
          capabilities. It was created as a personal project to deepen my full-stack development
          skills, with a focus on multilingual support and modern UI/UX practices.
        </p>
      </Section>

      <Section :id="section[2].slug">
        <h2 :class="h2Style">
          {{ section[2].title }}
        </h2>
        <p :class="paragraphStyle">
          This was a solo project, and I was responsible for the entire development lifecycle. My
          key contributions included:
        </p>
        <ul :class="unorderedListStyle">
          <li>Designing intuitive, responsive UI/UX for both the user and admin interfaces.</li>
          <li>Developing the full-stack application, including both frontend and backend logic.</li>
          <li>
            Implementing secure user authentication to protect user data and restrict admin access.
          </li>
          <li>
            Containerizing the application using Docker for streamlined development and deployment.
          </li>
          <li>
            Configuring Caddy as both a static file server and reverse proxy, ensuring efficient and
            secure routing.
          </li>
        </ul>
      </Section>

      <Section :id="section[3].slug">
        <h2 :class="h2Style">
          {{ section[3].title }}
        </h2>
        <ol :class="orderedListStyle">
          <li>
            Design: Created responsive UI mockups for both user and admin views, with a strong focus
            on accessibility, readability, and consistent visual language.
          </li>
          <li>
            Frontend Development: Built the user and admin interfaces using React and Tailwind CSS,
            ensuring a modern, clean, and responsive experience.
          </li>
          <li>
            Backend Development: Developed a set of RESTful APIs using Node.js, Express, and MongoDB
            to handle movies, actors, and reviews.
          </li>
          <li>
            Localization & Theming: Implemented a dynamic language switcher supporting English and
            Chinese, and added a dark/light mode toggle for personalized user experience.
          </li>
          <li>
            Deployment: Containerized the application with Docker and deployed it on a Linux server,
            using Caddy as a static file server and reverse proxy for seamless routing.
          </li>
        </ol>
      </Section>

      <Section :id="section[4].slug">
        <h2 :class="h2Style">
          {{ section[4].title }}
        </h2>
        <ul :class="unorderedListStyle">
          <li>Frontend: React</li>
          <li>Styling & Theming: Tailwind CSS, shadcn/ui (component library)</li>
          <li>Backend: Node.js, Express</li>
          <li>Database: MongoDB</li>
          <li>Authentication: JSON Web Tokens (JWT)</li>
          <li>Internationalization: react-i18next</li>
        </ul>
      </Section>

      <Section :id="section[5].slug">
        <h2 :class="h2Style">
          {{ section[5].title }}
        </h2>
        <h3 :class="h3Style">User Side</h3>
        <ul :class="unorderedListStyle">
          <li>Watch movies and search by title</li>
          <li>View detailed movie information, including lead actors, genres, and related films</li>
          <li>Read and write reviews with interactive star-based ratings</li>
        </ul>
        <h3 :class="h3Style">Admin Side</h3>
        <ul :class="unorderedListStyle">
          <li>Create, edit, and delete movie entries</li>
          <li>Manage actor profiles, including names and images</li>
          <li>View and monitor recent user-submitted reviews</li>
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
          Throughout the development of MovieFy, I encountered and solved several complex technical
          challenges that significantly shaped the robustness and user experience of the app.
        </p>
        <h4 :class="h4Style">Complex Admin Form with Rich Functionality</h4>
        <h5 :class="h5Style">Challenge:</h5>
        <p :class="paragraphStyle">
          Building an advanced movie form in the admin panel that needed to handle:
        </p>
        <ul :class="unorderedListStyle">
          <li>A clean, responsive UI and smooth user experience</li>
          <li>Form validation</li>
          <li>Multi-language support (English & Chinese)</li>
          <li>Live actor search</li>
          <li>Video and image uploads</li>
        </ul>
        <h5 :class="h5Style">Solution:</h5>
        <p :class="paragraphStyle">I tackled this by combining several modern tools:</p>
        <ul :class="unorderedListStyle">
          <li>UI/UX: Built using shadcn/ui components for a cohesive look and feel</li>
          <li>
            Form Validation: Integrated Zod with react-hook-form for schema-based validation and
            control
          </li>
          <li>Localization: Used react-i18next for seamless language switching</li>
          <li>
            Live Search: Implemented a debounced search function to fetch actor data efficiently
          </li>
          <li>
            File Uploads: Handled video and image uploads with custom form controls integrated into
            the submission flow
          </li>
        </ul>
        <h4 :class="h4Style">Custom Authentication & Authorization</h4>
        <h5 :class="h5Style">Challenge:</h5>
        <p :class="paragraphStyle">
          Implementing secure user authentication and role-based access, including:
        </p>
        <ul :class="unorderedListStyle">
          <li>Email verification</li>
          <li>Restricting certain features to verified users only</li>
          <li>Login state tracking</li>
          <li>Password reset functionality</li>
        </ul>
        <h5 :class="h5Style">Solution:</h5>
        <ul :class="unorderedListStyle">
          <li>
            Email Verification: Used Nodemailer to automatically send account activation emails with
            verification tokens
          </li>
          <li>Access Control: Restricted review and rating features to only verified users</li>
          <li>Session Management: Managed authentication state using JWT</li>
          <li>
            Password Recovery: Implemented a password reset flow that securely sends a reset link to
            the user’s email
          </li>
        </ul>
      </Section>

      <Section :id="section[8].slug">
        <h2 :class="h2Style">
          {{ section[8].title }}
        </h2>
        <p :class="paragraphStyle">
          Working on MovieFy was an incredibly rewarding experience that challenged me to think like
          a full-stack developer, product designer, and system architect — all at once. Here are
          some of the key takeaways from this project:
        </p>
        <ul :class="unorderedListStyle">
          <li>
            Balancing complexity with usability: Designing a feature-rich admin interface taught me
            how to structure complex forms while maintaining a clean and intuitive user experience.
          </li>
          <li>
            Power of modern tooling: I gained deeper expertise in tools like react-hook-form, Zod,
            and shadcn/ui, which allowed me to build scalable and maintainable interfaces.
          </li>
          <li>
            Internationalization matters: Supporting multiple languages made me more conscious of
            content structure, dynamic UI adjustments, and the importance of planning for global
            users from the start.
          </li>
          <li>
            Security and user experience go hand-in-hand: Implementing custom authentication with
            email verification and password recovery reinforced how security features can be both
            robust and user-friendly when thoughtfully integrated.
          </li>
          <li>
            Deployment & DevOps fundamentals: Using Docker and configuring a production-ready setup
            with Caddy gave me hands-on experience in deploying, managing, and serving full-stack
            apps efficiently.
          </li>
        </ul>
        <p :class="paragraphStyle">
          Overall, MovieFy not only improved my technical skill set but also deepened my
          appreciation for building polished, production-ready software that can scale and serve
          real users.
        </p>
      </Section>

      <Section :id="section[9].slug">
        <h2 :class="h2Style">
          {{ section[9].title }}
        </h2>
        <p :class="paragraphStyle">
          While MovieFy successfully demonstrates my full-stack development capabilities, I've
          identified several areas for enhancement in future iterations:
        </p>
        <ol :class="orderedListStyle">
          <li>
            Automated Testing Implementation
            <ul :class="unorderedListStyle">
              <li>Add comprehensive unit and integration tests to ensure reliability</li>
              <li>Implement end-to-end testing to verify critical user flows</li>
              <li>Set up test coverage reporting to maintain code quality</li>
            </ul>
          </li>
          <li>
            Enhanced Error Handling
            <ul :class="unorderedListStyle">
              <li>
                Develop a standardized error code system to support multi-language error messages
              </li>
              <li>Implement consistent error handling patterns across both frontend and backend</li>
              <li>
                Create user-friendly error states that maintain excellent UX even when things go
                wrong
              </li>
            </ul>
          </li>
          <li>
            Application Monitoring
            <ul :class="unorderedListStyle">
              <li>Integrate logging and monitoring solutions to track application performance</li>
              <li>Set up alert systems for critical errors and performance bottlenecks</li>
              <li>Implement analytics to gain insights into user behavior and feature usage</li>
            </ul>
          </li>
          <li>
            CI/CD Pipeline with Jenkins
            <ul :class="unorderedListStyle">
              <li>Establish automated build, test, and deployment workflows</li>
              <li>Configure Jenkins to streamline the development-to-production process</li>
              <li>Implement quality gates to ensure only validated code reaches production</li>
            </ul>
          </li>
          <li>
            Code Refactoring
            <ul :class="unorderedListStyle">
              <li>Improve component structure and reusability</li>
              <li>Enhance state management patterns</li>
              <li>Optimize database queries and API endpoints</li>
            </ul>
          </li>
          <li>
            Server Performance Optimization
            <ul :class="unorderedListStyle">
              <li>Implement rate limiting to protect against abuse</li>
              <li>Add load balancing to distribute traffic efficiently</li>
              <li>Enhance caching strategies for faster content delivery</li>
            </ul>
          </li>
        </ol>
      </Section>

      <Section :id="section[10].slug">
        <h2 :class="h2Style">
          {{ section[10].title }}
        </h2>
        <p :class="paragraphStyle">
          MovieFy is a full-stack movie app designed to deliver a seamless experience for both users
          and administrators. Users can watch movies, explore detailed information, and engage by
          writing reviews with ratings. On the backend, admins can efficiently manage movies and
          actor data through a custom-built interface.
        </p>
        <p :class="paragraphStyle">
          Throughout this project, I designed and developed the entire system — from user interface
          to authentication flow and deployment — gaining practical experience in modern frontend
          and backend technologies, internationalization, DevOps, and UX best practices.
        </p>
        <p :class="paragraphStyle">
          This project has been an invaluable learning experience and a significant step forward in
          my journey as a full-stack developer.
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
              A full-stack movie platform with user and admin interfaces — featuring movie
              streaming, reviews, and content management.
            </p>
          </a>
        </div>
      </Section>
    </div>
  </article>
</template>
