<script setup lang="ts">
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

const titleStyle =
  "text-2xl text-neutral-100 font-semibold mb-6 before:border before:border-accent before:mr-4 before:border-2 pointer-events-none"
const paragraphStyle = "my-4 leading-relaxed text-base"
const unorderedListStyle = "list-disc ml-6 [&>li]:my-4 [&>li]:leading-relaxed"

defineExpose({ section })
</script>

<template>
  <article class="mx-auto w-full transition-colors text-neutral-400">
    <div>
      <Section :id="section[0].slug">
        <h2 :class="titleStyle">
          {{ section[0].title }}
        </h2>
        <p :class="paragraphStyle">
          This project was developed as part of my learning journey through
          <a href="https://www.udemy.com/course/the-ultimate-react-course/"
            ><em>The Ultimate React Course</em></a
          >
          on Udemy, which explores modern technologies such as React, Next.js, and Redux. The
          primary goal was to deepen my full-stack development skills by implementing best practices
          in component-based architecture, state management, routing, and responsive design.
        </p>
        <p :class="paragraphStyle">
          Beyond the course material, I extended the project significantly by introducing several
          custom implementations and enhancements:
        </p>
        <ul :class="unorderedListStyle">
          <li>
            <strong>Custom Backend:</strong> Instead of using
            <a href="https://supabase.com/">Supabase</a> as provided in the course, I rebuilt the
            entire backend from scratch using
            <a href="https://www.postgresql.org/">PostgreSQL</a> for the database,
            <a href="https://www.prisma.io/">Prisma</a> as the ORM,
            <a href="https://zod.dev/">Zod</a> for schema validation, and a custom API built with
            <a href="https://nodejs.org/">Node.js</a> and
            <a href="https://expressjs.com/">Express</a>.
          </li>
          <li>
            <strong>UI Overhaul:</strong> I also redesigned the frontend styling by replacing
            <a href="https://styled-components.com/">styled-components</a> with a utility-first
            approach using <a href="https://tailwindcss.com/">Tailwind CSS</a> and component
            abstractions from <a href="https://ui.shadcn.com/">shadcn/ui</a>.
          </li>
        </ul>
      </Section>

      <Section :id="section[1].slug">
        <h2 :class="titleStyle">
          {{ section[1].title }}
        </h2>
        <p>
          <strong>CabinFy</strong> is a full-stack web application inspired by
          <a href="https://www.airbnb.com">Airbnb</a>, designed for booking and managing cabin
          rentals. It delivers a seamless experience for both guests and administrators, with a
          strong focus on performance, usability, and modern development practices. Key features
          include:
        </p>
        <ul>
          <li>
            <p>
              <strong>Multilingual Support:</strong> Available in both <strong>English</strong> and
              <strong>Chinese</strong>, making the platform accessible to a broader audience.
            </p>
          </li>
          <li>
            <p>
              <strong>Responsive Design:</strong> The UI is fully optimized for
              <strong>desktop, tablet, and mobile</strong> devices, ensuring a smooth and visually
              consistent experience across screen sizes.
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
            <ul>
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
          <li>
            <p>
              <strong>Dark Mode:</strong> Built-in dark theme toggle for a better user experience,
              especially in low-light environments.
            </p>
          </li>
        </ul>
      </Section>
      <Section :id="section[2].slug">
        <h2 :class="titleStyle">
          {{ section[2].title }}
        </h2>
        <p>
          <strong>CabinFy</strong> is built using a modern and scalable full-stack architecture,
          combining powerful libraries and tools on both the frontend and backend to ensure
          performance, maintainability, and a smooth developer experience.
        </p>
        <h4 id="frontend">Frontend</h4>
        <ul>
          <li>
            <a href="https://react.dev/"><strong>React</strong></a> – Core library for building
            dynamic user interfaces
          </li>
          <li>
            <a href="https://reactrouter.com/"><strong>React Router</strong></a> – Handles
            client-side routing and navigation between pages
          </li>
          <li>
            <a href="https://tailwindcss.com/"><strong>Tailwind CSS</strong></a> – Utility-first CSS
            framework for building fast and responsive UIs
          </li>
          <li>
            <a href="https://ui.shadcn.com/"><strong>shadcn/ui</strong></a
            >– Component library for clean, accessible UI elements
          </li>
          <li>
            <a href="https://tanstack.com/query/latest"><strong>React Query</strong></a> – Powerful
            data-fetching and state management solution
          </li>
          <li>
            <a href="https://react.i18next.com/"><strong>react-i18next</strong></a> –
            Internationalization support for English and Chinese
          </li>
          <li>
            <a href="https://axios-http.com/"><strong>Axios</strong></a> – Promise-based HTTP client
            for API communication
          </li>
          <li>
            <a href="https://recharts.org/"><strong>Recharts</strong></a> – Elegant charting library
            used for visualizing sales and analytics
          </li>
          <li>
            <strong>Makefile</strong> – Automates the build process and deployment of frontend
            assets
          </li>
          <li>
            <a href="https://caddyserver.com/"><strong>Caddy</strong></a> – Lightweight static file
            server used to serve optimized frontend builds
          </li>
        </ul>
        <h4 id="backend">Backend</h4>
        <ul>
          <li>
            <a href="https://nodejs.org/"><strong>Node.js</strong></a> – JavaScript runtime used for
            the backend server
          </li>
          <li>
            <a href="https://expressjs.com/"><strong>Express</strong></a> – Lightweight web
            framework for handling routing and server logic
          </li>
          <li>
            <a href="https://www.passportjs.org/"><strong>Passport</strong></a> – Extremely flexible
            and modular authentication middleware for Node.js
          </li>
          <li>
            <a href="https://www.postgresql.org/"><strong>PostgreSQL</strong></a> – Relational
            database system for structured data storage
          </li>
          <li>
            <a href="https://www.prisma.io/"><strong>Prisma</strong></a> – Type-safe ORM for
            database management and queries
          </li>
          <li>
            <a href="https://zod.dev/"><strong>Zod</strong></a> – Runtime schema validation for data
            safety
          </li>
          <li>
            <a href="https://www.docker.com/"><strong>Docker</strong></a> – Containerization tool
            for consistent development and deployment environments
          </li>
          <li>
            <strong>Makefile</strong> – Streamlines repetitive tasks like database migration and
            seeding
          </li>
          <li>
            <a href="https://caddyserver.com/"><strong>Caddy</strong></a> – Reverse proxy server to
            avoid exposing backend servers
          </li>
        </ul>
      </Section>
      <Section :id="section[3].slug">
        <h2 :class="titleStyle">
          {{ section[3].title }}
        </h2>
        <p>
          Building <strong>CabinFy</strong> was a comprehensive learning experience that challenged
          me to apply both frontend and backend skills in a real-world, full-stack project. Here are
          some of the key takeaways:
        </p>
        <ul>
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
        <p>
          This project was not only a technical exercise but also a chance to think critically about
          architecture, performance, and maintainability—skills I’ll carry forward into future
          projects.
        </p>
      </Section>
      <Section :id="section[4].slug">
        <h2 :class="titleStyle">
          {{ section[4].title }}
        </h2>
        <p>
          <strong>CabinFy</strong> was more than just a portfolio piece—it was a deep dive into
          building a full-stack, production-ready web application from the ground up. Through this
          project, I explored modern development practices, honed my skills across the stack, and
          gained hands-on experience with everything from multilingual support and authentication to
          responsive design and containerized deployment.
        </p>
        <p>This project reflects my ability to:</p>
        <ul>
          <li>Take initiative beyond course content</li>
          <li>Architect scalable, maintainable systems</li>
          <li>Embrace modern tooling across frontend, backend, and DevOps</li>
          <li>Prioritize user experience across languages and devices</li>
        </ul>
        <p>
          Most importantly, <strong>CabinFy</strong> gave me a clearer vision of how real-world web
          applications are designed, built, and deployed—and the confidence to take on even more
          complex, user-centric projects in the future.
        </p>
      </Section>
    </div>
  </article>
</template>
