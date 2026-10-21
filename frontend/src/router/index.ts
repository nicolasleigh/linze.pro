import { getPreferredLocale, localizePath } from "@/utils/locale"
import { h } from "vue"
import {
  createRouter,
  createWebHistory,
  RouterView,
  type RouteLocationGeneric,
} from "vue-router"

const activeLinkStyle = "text-accent"
const routerView = { render: () => h(RouterView) }

function redirectToLocalizedPath(to: RouteLocationGeneric) {
  return {
    path: localizePath(to.path, getPreferredLocale()),
    query: to.query,
    hash: to.hash,
    replace: true,
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      }
    }
    return { top: 0, behavior: "smooth" }
  },
  linkActiveClass: activeLinkStyle,
  routes: [
    {
      path: "/:locale(zh|en)",
      component: routerView,
      children: [
        {
          path: "",
          name: "home",
          component: () => import("@/views/HomeView.vue"),
        },
        {
          path: "login",
          name: "login",
          component: () => import("@/views/LoginForm.vue"),
        },
        {
          path: "signup",
          name: "signup",
          component: () => import("@/views/SignupForm.vue"),
        },
        {
          path: "editor",
          name: "editor",
          component: () => import("@/views/CreatePost.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "posts",
          component: routerView,
          children: [
            {
              path: "",
              name: "posts",
              component: () => import("@/views/Posts.vue"),
            },
            {
              path: ":slug",
              name: "post",
              component: () => import("@/views/Post.vue"),
            },
          ],
        },
        {
          path: "edit-post/:slug",
          name: "edit-post",
          component: () => import("@/views/EditPost.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "projects",
          component: routerView,
          children: [
            {
              path: "",
              name: "projects",
              component: () => import("@/views/Projects.vue"),
            },
            {
              path: "cabinfy",
              name: "cabinfy",
              component: () => import("@/views/project/cabin/Cabinfy.vue"),
            },
            {
              path: "moviefy",
              name: "moviefy",
              component: () => import("@/views/project/movie/Moviefy.vue"),
            },
            {
              path: "musicfy",
              name: "musicfy",
              component: () => import("@/views/project/music/Musicfy.vue"),
            },
            {
              path: "chatify",
              name: "chatify",
              component: () => import("@/views/project/chat/Chatify.vue"),
            },
            {
              path: "petify",
              name: "petify",
              component: () => import("@/views/project/pet/Petify.vue"),
            },
            {
              path: "blog",
              name: "blog",
              component: () => import("@/views/project/blog/Blog.vue"),
            },
          ],
        },
        {
          path: "about",
          name: "about",
          component: () => import("@/views/AboutView.vue"),
        },
        {
          path: "comments",
          name: "comments",
          component: () => import("@/views/CommentView.vue"),
        },
        {
          path: ":pathMatch(.*)*",
          redirect: (to) => ({ name: "home", params: { locale: to.params.locale } }),
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: redirectToLocalizedPath,
    },
  ],
})

function isAuthenticated() {
  const token = localStorage.getItem("jwt-token")
  if (!token) {
    return false
  }

  try {
    const payload = token.split(".")[1]
    if (!payload) {
      return false
    }

    const normalizedPayload = payload.replace(/-/g, "+").replace(/_/g, "/")
    const paddedPayload = normalizedPayload.padEnd(Math.ceil(normalizedPayload.length / 4) * 4, "=")
    const jwtPayload = JSON.parse(window.atob(paddedPayload)) as { exp?: number }
    if (!jwtPayload.exp || Date.now() >= jwtPayload.exp * 1000) {
      localStorage.removeItem("jwt-token")
      return false
    }
  } catch {
    localStorage.removeItem("jwt-token")
    return false
  }

  return true
}

router.beforeEach((to) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    return {
      name: "login",
      params: { locale: to.params.locale },
      query: { redirect: to.fullPath },
    }
  }
})

export default router
