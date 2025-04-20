<script setup lang="ts">
import { useLogin } from "@/hooks/useLogin"
import { ref } from "vue"
import { RouterLink } from "vue-router"

const email = ref("")
const password = ref("")

const { login, isPending } = useLogin()
const inputStyle =
  "w-full bg-neutral-950 border border-neutral-800 rounded-md p-2 transition-colors duration-200 focus:border-neutral-600 focus:outline-none"

const handleSubmit = async () => {
  if (!email.value || !password.value) {
    return
  }
  login({ email: email.value, password: password.value })
}
</script>

<template>
  <section>
    <div class="relative">
      <div
        class="layout text-center pb-12 pt-28 md:pb-12 md:pt-28 flex flex-col items-center justify-center"
      >
        <h1 class="mt-4 text-6xl">
          <span
            class="font-semibold transition-colors bg-gradient-to-br from-accent/30 via-accent/90 to-accent/30 bg-clip-text text-transparent"
            >Login</span
          >
        </h1>
        <p class="mt-3">
          <span
            class="transition-colors bg-gradient-to-r from-neutral-300/[35%] via-neutral-300/90 to-neutral-300/[35%] bg-clip-text text-transparent"
          >
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum, animi?
          </span>
        </p>
      </div>
    </div>

    <div
      class="border border-neutral-800 px-6 py-4 mb-24 rounded-md w-[350px] mx-auto shadow-lg text-neutral-200"
    >
      <h1 class="text-2xl font-semibold text-center mb-5">Welcome</h1>
      <form @submit.prevent="handleSubmit">
        <div class="mb-5">
          <label for="email" class="mb-0.5 font-medium"> Email </label>
          <input
            type="email"
            id="email"
            :class="inputStyle"
            v-model="email"
            :disabled="isPending"
            placeholder="Enter your email"
            autocomplete="email"
            required
          />
        </div>

        <div class="mb-5">
          <label for="password" class="mb-0.5 font-medium"> Password </label>
          <input
            type="password"
            id="password"
            :class="inputStyle"
            v-model="password"
            :disabled="isPending"
            placeholder="Enter your password"
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
            <span v-if="isPending" class="font-semibold">Logging in...</span>
            <span v-else class="font-semibold">Login</span>
          </button>
        </div>

        <div class="">
          <RouterLink
            to="/signup"
            class="hover:underline underline-offset-4 text-neutral-500 hover:text-neutral-300"
          >
            Create an account
          </RouterLink>
        </div>
      </form>
    </div>
  </section>
</template>
