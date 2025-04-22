<script setup lang="ts">
defineProps({
  activeSection: String,
})
const activeStyle = "text-neutral-200"
</script>

<template>
  <aside class="py-4">
    <div class="sticky top-36">
      <div class="overflow-auto border border-neutral-900 px-6 rounded-xl py-5 hidden lg:block">
        <div class="flex flex-col space-y-2 text-sm text-neutral-600">
          <a :href="'#section1'" :class="activeSection === 'section1' ? activeStyle : ''"
            >Section 1
          </a>
          <a :href="'#section2'" :class="activeSection === 'section2' ? activeStyle : ''"
            >Section 2
          </a>
          <a :href="'#section3'" :class="activeSection === 'section3' ? activeStyle : ''"
            >Section 3
          </a>
        </div>
      </div>
    </div>
  </aside>
</template>
