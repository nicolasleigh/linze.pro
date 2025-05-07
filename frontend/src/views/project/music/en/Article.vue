<script setup lang="ts">
import { getSectionTitleAndSlug } from "@/utils/helper"
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
  "Project Overview",
  "Project Goals",
  "Tech Stack",
  "Demo Video & Screenshots",
  "What I Learned",
  "Future Improvements",
  "Source Code",
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
          MusicFy is a full-stack mobile music streaming application built using bare React Native,
          with a backend powered by Node.js, Express, and MongoDB. Designed as a course project,
          this app was developed to deepen my understanding of mobile app development beyond the
          Expo framework.
        </p>
        <p :class="paragraphStyle">
          MusicFy enables authenticated users to upload, manage, and stream music, offering features
          such as email verification, password reset, playlists, favorites, listening history, and
          user following. To enhance performance, the app utilizes the mobile device’s caching
          system to store audio files locally for smoother playback.
        </p>
      </Section>
      <Section :id="section[1].slug">
        <h2 :class="h2Style">
          {{ section[1].title }}
        </h2>
        <p :class="paragraphStyle">
          The primary goal of MusicFy was to gain hands-on experience in building a full-stack
          mobile application from the ground up using bare React Native, beyond the convenience of
          Expo. This project served both as a practical learning experience and a portfolio-worthy
          app with real-world features.
        </p>
        <ul :class="unorderedListStyle">
          <li>
            Explore bare React Native to understand native module integration and app deployment
            processes.
          </li>
          <li>
            Implement secure user authentication, including email verification and password reset
            functionality.
          </li>
          <li>
            Enable music uploads and streaming, including support for audio files and cover images.
          </li>
          <li>Support playlist creation and management, favorites, and user-curated content.</li>
          <li>Build a simple recommendation system based on users’ listening history.</li>
          <li>
            Optimize app performance by using the device’s local cache for storing and streaming
            audio files.
          </li>
          <li>Design a scalable backend API using Node.js, Express, and MongoDB.</li>
        </ul>
      </Section>
      <Section :id="section[2].slug">
        <h2 :class="h2Style">
          {{ section[2].title }}
        </h2>
        <p :class="paragraphStyle">
          MusicFy was built with a robust and modern full-stack setup, combining essential tools for
          mobile development, backend services, state management, and deployment.
        </p>
        <h3 :class="h3Style">Frontend (Mobile App)</h3>
        <ul :class="unorderedListStyle">
          <li>React Native – for building cross-platform mobile apps without Expo</li>
          <li>React Navigation – for handling navigation between screens</li>
          <li>Redux – for managing global app state</li>
          <li>React Query – for efficient data fetching, caching, and syncing with the server</li>
          <li>Axios – for making HTTP requests to the backend API</li>
          <li>AsyncStorage – for local caching of audio files for performance</li>
        </ul>
        <h3 :class="h3Style">Backend</h3>
        <ul :class="unorderedListStyle">
          <li>Node.js + Express – for building the RESTful API and handling server logic</li>
          <li>
            MongoDB + Mongoose – as the NoSQL database and ODM for storing and managing users, music
            entries, playlists, and more
          </li>
          <li>Formidable – for handling file uploads (music and cover images)</li>
          <li>Nodemailer – for sending email verification and password reset links</li>
          <li>JWT (JSON Web Tokens) – for authentication and secure session management</li>
          <li>Bcrypt – for password hashing</li>
        </ul>
        <h3 :class="h3Style">Deployment & DevOps</h3>
        <ul :class="unorderedListStyle">
          <li>
            Docker – for containerizing the backend application for consistent and portable
            deployment
          </li>
          <li>
            Caddy – as a web server and reverse proxy with automatic HTTPS support for serving the
            backend API
          </li>
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
          Building MusicFy was a hands-on journey that helped me grow both as a developer and as a
          problem solver. By stepping outside of Expo and using bare React Native, I gained deeper
          insight into how mobile apps interact with native components and system-level features.
        </p>
        <ul :class="unorderedListStyle">
          <li>
            Bare React Native Experience: I learned how to configure native iOS and Android
            environments, link native modules manually, and handle platform-specific setups without
            relying on Expo.
          </li>
          <li>
            State Management Strategies: Working with Redux and React Query taught me how to manage
            global state and server state efficiently, especially in a complex app with
            authentication, playlists, and recommendations.
          </li>
          <li>
            Full-Stack Integration: I built a complete backend system with Node.js, Express, and
            MongoDB, which helped me understand how to structure APIs, handle file uploads, and
            manage user authentication securely.
          </li>
          <li>
            Authentication Flows: Implementing email verification and password reset mechanisms gave
            me real-world experience with user flows and secure token management.
          </li>
          <li>
            Audio Caching: Leveraging the device’s local file system improved performance and taught
            me how caching strategies can enhance the mobile user experience.
          </li>
          <li>
            DevOps & Deployment: Using Docker and Caddy introduced me to modern deployment
            practices, including containerization, reverse proxy configuration, and HTTPS setup.
          </li>
        </ul>
        <p :class="paragraphStyle">
          This project strengthened my confidence in building scalable, real-world applications and
          deepened my understanding of the full development lifecycle—from design to deployment.
        </p>
      </Section>
      <Section :id="section[5].slug">
        <h2 :class="h2Style">
          {{ section[5].title }}
        </h2>
        <p :class="paragraphStyle">
          While MusicFy is fully functional on both Android and iOS devices, there are several
          enhancements and optimizations I plan to implement to improve both the user experience and
          the system architecture.
        </p>
        <ol :class="orderedListStyle">
          <li>
            Automated Testing: Introduce unit, integration, and end-to-end testing to ensure
            stability and prevent regressions.
          </li>
          <li>
            CI/CD Pipeline: Set up continuous integration and deployment to automate testing,
            builds, and releases.
          </li>
          <li>
            Redis / CDN Caching: Use Redis or a Content Delivery Network to cache frequently
            accessed audio and metadata for better performance and reduced server load.
          </li>
          <li>
            Rate Limiting & Load Balancing: Add security and scalability by implementing request
            rate limiting and using load balancers for high availability.
          </li>
          <li>
            Localization / Internationalization: Add multi-language support to make the app
            accessible to users from different regions.
          </li>
          <li>
            Lyrics Support: Allow users to view synced or static lyrics while listening to songs for
            a more immersive experience.
          </li>
          <li>
            Enhanced Recommendation Engine: Improve the existing recommendation system with more
            advanced algorithms(e.g., collaborative filtering or ML-based suggestions).
          </li>
          <li>
            User Notifications: Add push notifications for follows, playlist updates, or featured
            tracks.
          </li>
          <li>
            Social Sharing: Let users share songs or playlists outside the app, enhancing
            discoverability.
          </li>
        </ol>
        <p :class="paragraphStyle">
          These future additions will help make MusicFy more polished, scalable, and user-friendly
          across platforms.
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
            <!-- <p class="mt-2 text-sm text-neutral-200">
            </p> -->
          </a>
        </div>
      </Section>
    </div>
  </article>
</template>
