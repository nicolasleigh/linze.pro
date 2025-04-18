<script setup lang="ts">
import { Mail, Github } from "lucide-vue-next"

const linkStyle = "hover:text-accent transition-colors"
</script>

<template>
  <footer>
    <div
      class="shrink-0 bg-neutral-800 h-[1px] w-full bg-gradient-to-r from-[#171717] via-[#525252] to-[#171717]"
    ></div>
    <div class="layout py-24 grid md:grid-cols-[1fr,1.8fr] gap-8 md:gap-52">
      <div>
        <h3 class="text-neutral-200 font-semibold text-2xl">Nicolas Leigh</h3>
        <p class="mt-3 text-neutral-500 text-xs">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto, recusandae.
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
        <div class="sm:grid-cols-3 grid-cols-2 grid gap-4 gap-y-10">
          <div>
            <p class="text-sm text-neutral-500">General</p>
            <ul class="text-neutral-300 mt-4 space-y-3 text-sm">
              <li><a :class="linkStyle" href="/">Home</a></li>
              <li><a :class="linkStyle" href="/blog">Blog</a></li>
              <li>
                <a :class="linkStyle" href="/projects">Projects</a>
              </li>
              <li><a :class="linkStyle" href="/about">About</a></li>
            </ul>
          </div>
          <div>
            <p class="text-sm text-neutral-500">The Website</p>
            <ul class="text-neutral-300 mt-4 space-y-3 text-sm">
              <li><a :class="linkStyle" href="/uses">Uses</a></li>
              <li>
                <a :class="linkStyle" href="/statistics">Statistics</a>
              </li>
              <li>
                <a :class="linkStyle" href="/guestbook">Guest Book</a>
              </li>
            </ul>
          </div>
          <div>
            <p class="text-sm text-neutral-500">Resources</p>
            <ul class="text-neutral-300 mt-4 space-y-3 text-sm">
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/nicolasleigh/NoteBooks"
                  class="cursor-newtab"
                  :class="linkStyle"
                  >Book Notes</a
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
      </p>
    </div>
  </footer>
</template>
