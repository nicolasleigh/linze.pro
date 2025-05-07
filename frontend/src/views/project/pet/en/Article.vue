<script setup lang="ts">
import { getSectionTitleAndSlug } from "@/utils/helper"
import Section from "../../Section.vue"
import {
  h2Style,
  h3Style,
  orderedListStyle,
  paragraphStyle,
  unorderedListStyle,
} from "../../CommonStyle"
import { useActiveSection } from "@/hooks/useActiveSection"
import ImageDialog from "@/components/ImageDialog.vue"
import IconGithub2 from "@/components/icons/IconGithub2.vue"
import IconChrome from "@/components/icons/IconChrome.vue"

const sectionTitle = [
  "Project Overview",
  "Motivation",
  "My Role",
  "Tech Stack",
  "Key Features",
  "Demo Video & Screenshots",
  "What I Learned",
  "Future Improvements",
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
          Petify is a full-stack e-commerce platform designed for buying and selling pets online. It
          offers a user-friendly shopping experience with features like smart filtering, real-time
          chat, and detailed order tracking. The platform is divided into three independent parts: a
          user-facing web app, an admin dashboard, and a backend API server. Each part was built
          with scalability, usability, and performance in mind.
        </p>
      </Section>
      <Section :id="section[1].slug">
        <h2 :class="h2Style">
          {{ section[1].title }}
        </h2>
        <p :class="paragraphStyle">
          The main motivation behind building Petify was to deepen my understanding of full-stack
          development and gain hands-on experience with building a complete, real-world web
          application from scratch. I wanted to challenge myself to work across the entire
          development stack — from crafting interactive and responsive user interfaces, to building
          a scalable backend API, and finally deploying the application in a production-ready
          environment using Docker and Caddy.
        </p>
        <p :class="paragraphStyle">
          By choosing an e-commerce platform as the project type, I was able to explore a wide range
          of features such as authentication, product filtering, shopping cart logic, real-time
          messaging, admin tools, and data visualization. This project gave me the opportunity to
          not only reinforce what I already knew, but also to explore new tools, best practices, and
          architectural patterns across frontend, backend, and deployment.
        </p>
      </Section>
      <Section :id="section[2].slug">
        <h2 :class="h2Style">
          {{ section[2].title }}
        </h2>
        <p :class="paragraphStyle">
          I was solely responsible for the entire development of Petify, from concept to deployment.
          This included:
        </p>
        <ul :class="unorderedListStyle">
          <li>
            Frontend Development: Building responsive user and admin interfaces using React, Redux,
            and Tailwind CSS.
          </li>
          <li>
            Backend Development: Designing and implementing a RESTful API with Node.js and Express,
            handling authentication, file uploads, and real-time chat with Socket.IO.
          </li>
          <li>
            Database Design: Structuring and managing data using MongoDB, including schema design
            and data relationships.
          </li>
          <li>
            Deployment & DevOps: Containerizing the application with Docker and docker-compose,
            configuring reverse proxy and HTTPS with Caddy, and deploying all services in a unified
            stack.
          </li>
        </ul>
        <p :class="paragraphStyle">
          This project gave me end-to-end ownership, allowing me to practice problem-solving at
          every layer of the application and gain valuable experience in full-stack development.
        </p>
      </Section>
      <Section :id="section[3].slug">
        <h2 :class="h2Style">
          {{ section[3].title }}
        </h2>
        <h3 :class="h3Style">Frontend:</h3>
        <ul :class="unorderedListStyle">
          <li>React – For building dynamic and interactive user interfaces.</li>
          <li>
            Redux – For managing global application state across both the user and admin apps.
          </li>
          <li>Tailwind CSS – For utility-first styling and responsive UI design.</li>
        </ul>
        <h3 :class="h3Style">Backend:</h3>
        <ul :class="unorderedListStyle">
          <li>Node.js & Express – For building the RESTful API and handling server-side logic.</li>
          <li>
            MongoDB – As the NoSQL database for storing users, products, orders, reviews, and chat
            data.
          </li>
          <li>Formidable – For handling file uploads such as product images.</li>
          <li>Socket.IO – For implementing real-time chat between users and admins.</li>
        </ul>
        <h3 :class="h3Style">DevOps & Deployment:</h3>
        <ul :class="unorderedListStyle">
          <li>
            Docker – To containerize the frontend and backend applications for consistent and
            portable deployment.
          </li>
          <li>
            docker-compose – To orchestrate multi-container setups during development and
            deployment.
          </li>
          <li>
            Caddy – As a reverse proxy and web server that automatically provides HTTPS and routes
            requests to the correct services.
          </li>
        </ul>
      </Section>
      <Section :id="section[4].slug">
        <h2 :class="h2Style">
          {{ section[4].title }}
        </h2>
        <h3 :class="h3Style">User App</h3>
        <ul :class="unorderedListStyle">
          <li>
            Product Browsing: Users can explore pets by category and view detailed product
            information.
          </li>
          <li>
            Smart Search & Filtering:
            <ul :class="unorderedListStyle">
              <li>Search by product name or category.</li>
              <li>Filter by category, price range, and rating.</li>
              <li>Sort products by price.</li>
            </ul>
          </li>
          <li>
            Wishlist & Cart: Add pets to a wishlist or shopping cart for later viewing or checkout.
          </li>
          <li>Order Management: Place orders, view order details, and track status.</li>
          <li>Product Reviews: Leave star ratings and written reviews on product pages.</li>
          <li>
            Real-Time Chat: Communicate instantly with the seller through a real-time chat system
            powered by Socket.IO.
          </li>
        </ul>
        <h3 :class="h3Style">Admin App</h3>
        <ul :class="unorderedListStyle">
          <li>
            Dashboard Overview:
            <ul :class="unorderedListStyle">
              <li>
                View sales-related statistics including total sales, orders, customers, and
                products.
              </li>
              <li>Visual bar chart showing sales and order count per category.</li>
              <li>Live updates of recent orders and customer messages.</li>
            </ul>
          </li>
          <li>
            Product & Category Management: Add, edit, and remove categories and product listings.
          </li>
          <li>Order Tracking: Access detailed order and payment information.</li>
          <li>Customer Chat: Respond to customer messages in real time.</li>
          <li>Profile Management: Update admin profile and change password securely.</li>
          <li>
            Advanced Search Tools:
            <ul :class="unorderedListStyle">
              <li>Search products by name or category.</li>
              <li>Search orders by order ID.</li>
            </ul>
          </li>
        </ul>
      </Section>

      <Section :id="section[5].slug">
        <h2 :class="h2Style">
          {{ section[5].title }}
        </h2>
        <video controls>
          <source src="https://file.linze.pro/videos/petify/1.mp4" type="video/mp4" />
        </video>
        <div class="grid grid-cols-2 gap-2 mt-2">
          <ImageDialog v-for="(item, index) in demoImages" :key="index" :url="item" />
        </div>
      </Section>

      <Section :id="section[6].slug">
        <h2 :class="h2Style">
          {{ section[6].title }}
        </h2>
        <p :class="paragraphStyle">
          Building Petify was a valuable hands-on experience that allowed me to deepen my
          understanding of full-stack development. Throughout the process, I learned how to:
        </p>
        <ul :class="unorderedListStyle">
          <li>
            Design and structure full-stack applications with a clear separation of concerns across
            the frontend, backend, and admin interface.
          </li>
          <li>
            Work with real-time technologies like Socket.IO to build interactive features such as
            live chat.
          </li>
          <li>Manage complex state across different React apps using Redux.</li>
          <li>
            Implement robust API endpoints and connect them seamlessly to the frontend with secure
            data flow.
          </li>
          <li>
            Build user-friendly and responsive UIs using Tailwind CSS with a component-driven design
            approach.
          </li>
          <li>Handle file uploads and manage media using Formidable on the server side.</li>
          <li>
            Containerize applications with Docker and orchestrate services using docker-compose.
          </li>
          <li>
            Deploy full-stack apps in production, set up HTTPS, and manage routing using Caddy as a
            reverse proxy.
          </li>
        </ul>
        <p :class="paragraphStyle">
          This project helped me strengthen both my frontend and backend skills, and gave me
          practical experience in DevOps and deployment — turning abstract knowledge into real,
          working solutions.
        </p>
      </Section>
      <Section :id="section[7].slug">
        <h2 :class="h2Style">
          {{ section[7].title }}
        </h2>
        <p :class="paragraphStyle">
          While Petify is already a functional and scalable e-commerce platform, there are several
          improvements and features I plan to implement in the future to enhance its performance,
          usability, and maintainability:
        </p>
        <ol :class="orderedListStyle">
          <li>
            Testing: Introduce comprehensive unit, integration, and end-to-end tests to ensure code
            reliability and stability.
          </li>
          <li>
            Message Broker: Implement a message broker (e.g., RabbitMQ or Kafka) to decouple
            services and improve communication between components.
          </li>
          <li>
            Load Balancing & Rate Limiting: Add load balancing for distributing traffic efficiently
            and implement rate limiting to prevent abuse and ensure fair usage of the API.
          </li>
          <li>
            Redis Caching: Integrate Redis for caching frequently accessed data, improving app
            performance and reducing database load.
          </li>
          <li>
            Database Optimization: Apply indexing and other database optimizations to improve query
            performance, especially for large datasets.
          </li>
          <li>
            Internationalization (i18n): Add multi-language support to cater to a global audience
            and improve accessibility.
          </li>
          <li>
            React Server-Side Rendering (SSR): Implement server-side rendering with React to improve
            SEO and page load performance.
          </li>
          <li>
            CI/CD Pipeline: Set up a continuous integration and continuous deployment (CI/CD)
            pipeline using Jenkins to automate testing, builds, and deployments.
          </li>
          <li>
            App Monitoring: Integrate app monitoring tools like Prometheus or New Relic to track
            performance, identify bottlenecks, and ensure system health.
          </li>
          <li>
            Better Error Handling & Code Refactoring: Improve error handling and refactor code for
            better readability, maintainability, and scalability.
          </li>
          <li>
            Additional Enhancements: Implement features like product recommendation systems,
            advanced analytics for admins, and AI-driven chat support to further enhance user
            experience.
          </li>
        </ol>
        <p :class="paragraphStyle">
          These improvements will ensure that Petify remains a modern, high-performing, and scalable
          solution as it evolves to meet growing user demands.
        </p>
      </Section>
      <Section :id="section[8].slug">
        <h2 :class="h2Style">
          {{ section[8].title }}
        </h2>
        <div class="space-y-2">
          <a
            target="_blank"
            referrerpolicy="no-referrer"
            href="https://seller.pet.linze.pro"
            class="!block max-w-xl px-4 py-3 rounded-lg border border-neutral-800 scale-100 transform-gpu hover:scale-[1.02] active:scale-[0.97] transition duration-200 cursor-newtab"
          >
            <div class="flex items-center gap-2 text-sm md:text-base">
              <IconChrome class="size-5" />
              <span class="text-accent font-semibold">seller.pet.linze.pro</span>
            </div>
          </a>

          <a
            target="_blank"
            referrerpolicy="no-referrer"
            href="https://pet.linze.pro"
            class="!block max-w-xl px-4 py-3 rounded-lg border border-neutral-800 scale-100 transform-gpu hover:scale-[1.02] active:scale-[0.97] transition duration-200 cursor-newtab"
          >
            <div class="flex items-center gap-2 text-sm md:text-base">
              <IconChrome class="size-5" />
              <span class="text-accent font-semibold">pet.linze.pro</span>
            </div>
          </a>

          <a
            target="_blank"
            referrerpolicy="no-referrer"
            href="https://github.com/nicolasleigh/petify"
            class="!block max-w-xl px-4 py-3 rounded-lg border border-neutral-800 scale-100 transform-gpu hover:scale-[1.02] active:scale-[0.97] transition duration-200 cursor-newtab"
          >
            <div class="flex items-center gap-2 text-sm md:text-base">
              <IconGithub2 class="size-5" />
              <span class="truncate overflow-ellipsis font-semibold text-accent"
                >nicolasleigh/petify</span
              >
            </div>
            <p class="mt-2 text-sm text-neutral-200">
              A full-stack e-commerce platform for browsing and purchasing pets, featuring real-time
              chat, advanced product filtering, and a scalable, secure backend architecture.
            </p>
          </a>
        </div>
      </Section>
    </div>
  </article>
</template>
