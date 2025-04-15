<script setup lang="ts">
import { useLogin } from "@/hooks/useLogin"
import { ref } from "vue"
import { RouterLink } from "vue-router"

const email = ref("")
const password = ref("")
const error = ref("")

const { login, isPending } = useLogin()

const handleSubmit = async () => {
  if (!email.value || !password.value) {
    // TODO: Toast
    return
  }

  try {
    error.value = ""

    login({ email: email.value, password: password.value })

    console.log("Login attempted with:", {
      email: email.value,
      password: password.value,
    })
  } catch (err) {
    error.value = err.message || "Login failed. Please try again."
  } finally {
  }
}
</script>

<template>
  <div class="border px-6 py-4 rounded-md w-[350px] mx-auto shadow-lg mt-16">
    <h1 class="text-2xl font-semibold text-center mb-5">Login</h1>

    <form @submit.prevent="handleSubmit">
      <div class="mb-5">
        <label for="email" class="mb-0.5 font-medium"> Email </label>
        <input
          type="email"
          id="email"
          class="w-full border rounded-md p-2 transition-colors duration-200 focus:border-blue-500 focus:outline-none focus:shadow-sm"
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
          class="w-full border rounded-md p-2 transition-colors duration-200 focus:border-blue-500 focus:outline-none focus:shadow-sm"
          v-model="password"
          :disabled="isPending"
          placeholder="Enter your password"
          autocomplete="current-password"
          required
        />
      </div>

      <div class="mt-7 mb-2">
        <button
          type="submit"
          :disabled="isPending"
          class="w-full border bg-blue-500 text-blue-50 rounded-md font-medium text-lg cursor-pointer hover:bg-blue-600 transition-colors duration-200 p-1 disabled:bg-blue-300 disabled:cursor-not-allowed"
        >
          <span v-if="isPending">Logging in...</span>
          <span v-else>Login</span>
        </button>
      </div>

      <div class="mb-4">
        <RouterLink
          to="/signup"
          class="underline hover:no-underline underline-offset-4 hover:text-stone-600"
        >
          Create an account
        </RouterLink>
      </div>
    </form>
  </div>
</template>
