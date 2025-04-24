<script setup lang="ts">
import ExternalLink from "../../ExternalLink.vue"
import Section from "../../Section.vue"
const sectionTitle = [
  "Short Explanation",
  "Features",
  "Tech Stack",
  "What I Learned",
  "Final Thoughts",
]
const sectionSlug = sectionTitle.map((e, i) => e.trim().toLowerCase().split(" ").join("-"))
const section = sectionTitle.map((e, i) => ({ title: e, slug: sectionSlug[i] }))

const h2Style =
  "text-2xl text-neutral-100 font-semibold mb-6 before:border before:border-accent before:mr-4 before:border-2 pointer-events-none"
const h3Style =
  "text-lg text-neutral-100 font-semibold mt-6 mb-5 before:border before:border-accent before:mr-4 before:border-2 pointer-events-none"
const h4Style = "text-base text-neutral-100 font-semibold mt-6 mb-5  pointer-events-none"
const paragraphStyle = "my-4 leading-relaxed text-base"
const unorderedListStyle =
  "list-disc [&_ul]:list-[revert] marker:text-xl marker:text-accent pl-5 [&>li]:my-4 [&>li]:leading-relaxed text-base"

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
          <strong>CabinFy</strong> is a full-featured accommodation booking platform that connects
          travelers with unique cabin rentals. It offers an intuitive experience for guests to
          discover and book cabins, while providing owners with powerful management tools through a
          secure admin dashboard. Though initially inspired by a React course, I completely rebuilt
          it with a custom Node.js/Express backend, PostgreSQL database, and modernized UI using
          Tailwind CSS—transforming it into a production-quality application with multilingual
          support and responsive design. This project was developed as part of my learning journey
          through
        </p>
      </Section>

      <Section :id="section[1].slug">
        <h2 :class="h2Style">
          {{ section[1].title }}
        </h2>
        <p :class="paragraphStyle">
          <strong>CabinFy</strong> is a full-stack web application inspired by Airbnb, designed for
          booking and managing cabin rentals. It delivers a seamless experience for both guests and
          administrators, with a strong focus on performance, usability, and modern development
          practices. Key features include:
        </p>
        <ul :class="unorderedListStyle">
          <li>
            <p>
              <strong>Multilingual Support:</strong> Available in both <strong>English</strong> and
              <strong>Chinese</strong>, making the platform accessible to a broader audience.
            </p>
          </li>
          <li>
            <p>
              <strong>Responsive Design & Accessibility:</strong> The UI is fully optimized for
              desktop, tablet, and mobile devices, with built-in dark mode support and accessibility
              features ensuring a comfortable experience for all users regardless of device or
              viewing preferences.
            </p>
          </li>
          <li>
            <p>
              <strong>Guest Booking Interface:</strong> Users can browse available cabins, view
              detailed listings, and make bookings through an intuitive and modern interface.
            </p>
          </li>
          <li>
            <p>
              <strong>Admin Dashboard:</strong> Admins have access to a secure dashboard where they
              can:
            </p>
            <ul :class="unorderedListStyle">
              <li><p>View, manage, and process bookings</p></li>
              <li><p>Submit new cabin listings or edit existing ones</p></li>
              <li><p>Monitor booking activity and cabin availability</p></li>
            </ul>
          </li>
          <li>
            <p>
              <strong>Advanced Data Management:</strong> Supports <strong>filtering</strong>,
              <strong>sorting</strong>, and <strong>pagination</strong> for easy browsing and
              efficient data interaction
            </p>
          </li>
          <li>
            <p>
              <strong>Authentication &amp; Authorization:</strong> Secure user authentication with
              access control to protect admin functionalities and private data.
            </p>
          </li>
        </ul>
      </Section>
      <Section :id="section[2].slug">
        <h2 :class="h2Style">
          {{ section[2].title }}
        </h2>
        <p :class="paragraphStyle">
          <strong>CabinFy</strong> is built using a modern and scalable full-stack architecture,
          combining powerful libraries and tools on both the frontend and backend to ensure
          performance, maintainability, and a smooth developer experience.
        </p>
        <h3 :class="h3Style">Core Technologies</h3>
        <h4 :class="h4Style">Frontend</h4>
        <ul :class="unorderedListStyle">
          <li><strong>React</strong> – Core library for building dynamic user interfaces</li>
          <li>
            <strong>Tailwind CSS</strong>
            – Utility-first CSS framework for building fast and responsive UIs
          </li>
          <li>
            <strong>React Query</strong>
            – Selected over Redux for its optimized data fetching and caching capabilities
          </li>
        </ul>
        <h4 :class="h4Style">Backend</h4>
        <ul :class="unorderedListStyle">
          <li>
            <strong>Node.js & Express</strong>
            – Lightweight yet powerful server framework enabling rapid API development
          </li>
          <li>
            <strong>PostgreSQL & Prisma</strong>
            – Combination provides type-safe database operations without the need to write raw SQL
          </li>
          <li>
            <strong>Zod</strong> – Implements thorough runtime validation at API boundaries,
            preventing data corruption
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
            <strong>Docker</strong> – Containerized application components for consistent
            environments across development and production
          </li>
          <li>
            <strong>Caddy</strong> – Configured as both a static file server for the frontend and
            reverse proxy for backend services, simplifying the deployment architecture
          </li>
          <li>
            <strong>Makefile</strong> – Automated common development tasks and deployment
            procedures, reducing errors when typing Linux commands
          </li>
        </ul>
      </Section>
      <Section :id="section[3].slug">
        <h2 :class="h2Style">
          {{ section[3].title }}
        </h2>
        <p :class="paragraphStyle">
          Building <strong>CabinFy</strong> was a comprehensive learning experience that challenged
          me to apply both frontend and backend skills in a real-world, full-stack project. Here are
          some of the key takeaways:
        </p>
        <ul :class="unorderedListStyle">
          <li>
            <strong>End-to-End Development Workflow:</strong> I gained hands-on experience managing
            an entire development lifecycle—from designing UI components to building a custom
            backend and deploying the full application using Docker and Caddy.
          </li>
          <li>
            <strong>Custom Backend Architecture:</strong> Instead of relying on prebuilt backend
            services like Supabase, I built a complete backend from scratch using
            <strong>PostgreSQL</strong>, <strong>Prisma</strong>, <strong>Express</strong>, and
            <strong>Zod</strong>, which taught me how to better handle data modeling, validation,
            and RESTful API design.
          </li>
          <li>
            <strong>Authentication &amp; Authorization:</strong> Implementing secure login logic
            with <strong>Passport</strong> and <strong>JWT</strong> gave me a deeper understanding
            of access control and session management in web applications.
          </li>
          <li>
            <strong>Frontend Architecture &amp; Optimization:</strong> Using
            <strong>React</strong> and <strong>React Query</strong> helped me understand efficient
            state management and data fetching strategies in large-scale apps.
          </li>
          <li>
            <strong>Internationalization:</strong> Integrating <strong>react-i18next</strong> gave
            me insight into structuring multilingual applications and managing locale-specific
            content.
          </li>
          <li>
            <strong>DevOps &amp; Automation:</strong> I learned how to automate repetitive tasks
            using <strong>Makefile</strong>, and improved deployment workflows by using
            <strong>Docker</strong>. I created custom <strong>Dockerfiles</strong> and a
            <strong>docker-compose</strong> setup to containerize the backend and database,
            streamlining local development and deployment. Additionally, I used
            <strong>Caddy</strong> as both a reverse proxy and static file server to simplify
            routing and secure backend services.
          </li>
          <li>
            <strong>Responsive Design &amp; UX:</strong> Implementing dark mode, responsive layouts,
            and device-friendly interfaces helped me build a polished and accessible user experience
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
          <strong>CabinFy</strong> was more than just a portfolio piece—it was a deep dive into
          building a full-stack, production-ready web application from the ground up. Through this
          project, I explored modern development practices, honed my skills across the stack, and
          gained hands-on experience with everything from multilingual support and authentication to
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
          Most importantly, <strong>CabinFy</strong> gave me a clearer vision of how real-world web
          applications are designed, built, and deployed—and the confidence to take on even more
          complex, user-centric projects in the future.
        </p>
      </Section>
    </div>
  </article>
</template>
