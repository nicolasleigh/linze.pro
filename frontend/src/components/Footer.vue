<script setup lang="ts">
import { useTranslation } from "i18next-vue"
import { Mail, Github } from "lucide-vue-next"

const linkStyle = "hover:text-accent transition-colors"
const { t, i18next } = useTranslation()
</script>

<template>
  <footer>
    <div
      class="shrink-0 bg-neutral-800 h-[1px] w-full bg-gradient-to-r from-[#171717] via-[#525252] to-[#171717]"
    ></div>
    <div class="layout py-16 grid md:grid-cols-[1fr,1.8fr] gap-8 md:gap-32">
      <div>
        <h3 class="text-neutral-200 font-semibold text-2xl">Nicolas Leigh</h3>
        <p class="mt-3 text-neutral-500 text-base">
          {{ t("footer.about") }}
        </p>
        <div class="flex gap-5 mt-1">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="mailto:nicolas.leigh@qq.com"
            class="hover:text-neutral-100 transition-colors flex items-center h-16 text-neutral-300 cursor-newtab"
          >
            <Mail :stroke-width="1"
          /></a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/nicolasleigh"
            class="hover:text-neutral-100 transition-colors flex items-center h-16 text-neutral-300 cursor-newtab"
          >
            <Github :stroke-width="1" />
          </a>
        </div>
      </div>
      <div>
        <div class="sm:grid-cols-4 grid-cols-2 grid gap-4 gap-y-10">
          <div>
            <p class="text-sm text-neutral-500">{{ t("footer.section_1") }}</p>
            <ul class="text-neutral-300 mt-4 space-y-3 text-sm">
              <li><RouterLink :class="linkStyle" to="/">Home</RouterLink></li>
              <li><RouterLink :class="linkStyle" to="/posts">Posts</RouterLink></li>
              <li>
                <RouterLink :class="linkStyle" to="/projects">Projects</RouterLink>
              </li>
              <li><RouterLink :class="linkStyle" to="/about">About</RouterLink></li>
              <li><RouterLink :class="linkStyle" to="/editor">Create Post</RouterLink></li>
              <li><RouterLink :class="linkStyle" to="/signup">Register</RouterLink></li>
            </ul>
          </div>
          <div>
            <p class="text-sm text-neutral-500">{{ t("footer.section_2") }}</p>
            <ul class="text-neutral-300 mt-4 space-y-3 text-sm">
              <li>
                <a
                  target="_blank"
                  referrerpolicy="no-referrer"
                  :class="linkStyle"
                  class="cursor-newtab"
                  href="https://cabin.linze.pro"
                  >CabinFy</a
                >
              </li>
              <li>
                <a
                  target="_blank"
                  referrerpolicy="no-referrer"
                  :class="linkStyle"
                  class="cursor-newtab"
                  href="https://movie.linze.pro"
                  >MovieFy</a
                >
              </li>
              <li>
                <a
                  target="_blank"
                  referrerpolicy="no-referrer"
                  :class="linkStyle"
                  class="cursor-newtab"
                  href="https://pet.linze.pro"
                  >Petify</a
                >
              </li>
              <li>
                <a
                  target="_blank"
                  referrerpolicy="no-referrer"
                  :class="linkStyle"
                  class="cursor-newtab"
                  href="https://chat.linze.pro"
                  >Chatify</a
                >
              </li>
              <li>
                <a
                  target="_blank"
                  referrerpolicy="no-referrer"
                  :class="linkStyle"
                  class="cursor-newtab"
                  href="https://linze.pro"
                  >Blog</a
                >
              </li>
            </ul>
          </div>
          <div>
            <p class="text-sm text-neutral-500">{{ t("footer.section_3") }}</p>
            <ul class="text-neutral-300 mt-4 space-y-3 text-sm">
              <li>
                <a
                  target="_blank"
                  referrerpolicy="no-referrer"
                  :class="linkStyle"
                  class="cursor-newtab"
                  href="https://github.com/nicolasleigh/cabinfy"
                  >CabinFy</a
                >
              </li>
              <li>
                <a
                  target="_blank"
                  referrerpolicy="no-referrer"
                  :class="linkStyle"
                  class="cursor-newtab"
                  href="https://github.com/nicolasleigh/moviefy"
                  >MovieFy</a
                >
              </li>
              <li>
                <a
                  target="_blank"
                  referrerpolicy="no-referrer"
                  :class="linkStyle"
                  class="cursor-newtab"
                  href="https://github.com/nicolasleigh/petify"
                  >Petify</a
                >
              </li>
              <li>
                <a
                  target="_blank"
                  referrerpolicy="no-referrer"
                  :class="linkStyle"
                  class="cursor-newtab"
                  href="https://github.com/nicolasleigh/chatify"
                  >Chatify</a
                >
              </li>
              <li>
                <a
                  target="_blank"
                  referrerpolicy="no-referrer"
                  :class="linkStyle"
                  class="cursor-newtab"
                  href="https://github.com/nicolasleigh/musicfy"
                  >MusicFy</a
                >
              </li>
              <li>
                <a
                  target="_blank"
                  referrerpolicy="no-referrer"
                  :class="linkStyle"
                  class="cursor-newtab"
                  href="https://github.com/nicolasleigh/linze.pro"
                  >Blog</a
                >
              </li>
            </ul>
          </div>
          <div>
            <p class="text-sm text-neutral-500">{{ t("footer.section_4") }}</p>
            <ul class="text-neutral-300 mt-4 space-y-3 text-sm">
              <li>
                <a
                  target="_blank"
                  referrerpolicy="no-referrer"
                  href="https://github.com/nicolasleigh/NoteBooks"
                  class="cursor-newtab"
                  :class="linkStyle"
                  >Book Notes</a
                >
              </li>
              <li>
                <a
                  target="_blank"
                  referrerpolicy="no-referrer"
                  href="https://github.com/nicolasleigh/javascript-algorithms"
                  class="cursor-newtab"
                  :class="linkStyle"
                  >Algorithms</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div
      class="shrink-0 bg-neutral-800 h-[1px] w-full layout bg-gradient-to-r from-[#171717] via-[#525252] to-[#171717]"
    />
    <div class="layout py-10 text-center">
      <p class="text-neutral-500 space-x-2">
        <span>Copyright &copy;</span>
        <span>2025</span>
        <span>Nicolas Leigh. All rights reserved.</span>
        <a
          v-if="i18next.language === 'zh'"
          href="https://beian.miit.gov.cn"
          target="_blank"
          rel="noreferrer nofollow"
        >
          滇ICP备2024048511号
        </a>
      </p>
    </div>
  </footer>
</template>
