<script setup lang="ts">
import { useSignup } from "@/hooks/useSignup"
import { useTranslation } from "i18next-vue"
import { ref } from "vue"
import { RouterLink } from "vue-router"

const email = ref("")
const password = ref("")
const username = ref("")

const { signup, isPending } = useSignup()
const { t } = useTranslation()
const inputStyle =
  "w-full bg-neutral-950 border border-neutral-800 rounded-md p-2 transition-colors duration-200 focus:border-neutral-600 focus:outline-none"

const handleSubmit = async () => {
  if (!email.value || !password.value || !username.value) {
    return
  }
  signup({ email: email.value, password: password.value, username: username.value })
}
</script>

<template>
  <section>
    <div class="relative">
      <div
        class="layout text-center pb-12 pt-28 md:pb-12 md:pt-36 flex flex-col items-center justify-center"
      >
        <h1 class="mt-4 text-6xl">
          <span
            class="font-semibold transition-colors bg-gradient-to-br from-accent/30 via-accent/90 to-accent/30 bg-clip-text text-transparent"
            >{{ t("auth.signup") }}</span
          >
        </h1>
      </div>
    </div>

    <div
      class="border border-neutral-800 px-6 py-4 mb-10 rounded-md w-[350px] mx-auto text-neutral-200"
    >
      <h1 class="text-2xl font-semibold text-center mb-5">{{ t("auth.welcome") }}</h1>
      <form @submit.prevent="handleSubmit">
        <div class="mb-5">
          <label for="username" class="mb-0.5 font-medium"> {{ t("auth.username") }} </label>
          <input
            type="text"
            id="username"
            :class="inputStyle"
            v-model="username"
            :disabled="isPending"
            :placeholder="t('auth.username_placeholder')"
            autocomplete="username"
            required
          />
        </div>
        <div class="mb-5">
          <label for="email" class="mb-0.5 font-medium"> {{ t("auth.email") }} </label>
          <input
            type="email"
            id="email"
            :class="inputStyle"
            v-model="email"
            :disabled="isPending"
            :placeholder="t('auth.email_placeholder')"
            autocomplete="email"
            required
          />
        </div>

        <div class="mb-5">
          <label for="password" class="mb-0.5 font-medium"> {{ t("auth.password") }} </label>
          <input
            type="password"
            id="password"
            :class="inputStyle"
            v-model="password"
            :disabled="isPending"
            :placeholder="t('auth.password_placeholder')"
            autocomplete="current-password"
            required
          />
        </div>

        <div class="mt-7 mb-4">
          <button
            type="submit"
            :disabled="isPending"
            class="w-full px-4 py-2 rounded-lg border items-center gap-3 cursor-pointer border-neutral-400 text-neutral-300 hover:bg-neutral-100 hover:text-neutral-800 transition-colors duration-300 disabled:cursor-not-allowed disabled:hover:text-neutral-100 disabled:hover:bg-neutral-950"
          >
            <span v-if="isPending" class="font-semibold">{{ t("auth.signup_loading") }}</span>
            <span v-else class="font-semibold">{{ t("auth.signup") }}</span>
          </button>
        </div>

        <div class="">
          <RouterLink
            to="/login"
            class="hover:underline underline-offset-4 text-neutral-500 hover:text-neutral-300"
          >
            {{ t("auth.login_link") }}
          </RouterLink>
        </div>
      </form>
    </div>
  </section>
</template>
