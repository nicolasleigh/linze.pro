import { createRouter, createWebHistory, RouterView } from "vue-router"
import HomeView from "../views/HomeView.vue"
import Posts from "@/views/Posts.vue"
import Projects from "@/views/Projects.vue"
// import LoginForm from "@/views/LoginForm.vue"
// import SignupForm from "@/views/SignupForm.vue"
// import Post from "@/views/Post.vue"
// import Cabinfy from "@/views/project/cabin/Cabinfy.vue"
// import Moviefy from "@/views/project/movie/Moviefy.vue"
// import Musicfy from "@/views/project/music/Musicfy.vue"
// import Chatify from "@/views/project/chat/Chatify.vue"
// import Petify from "@/views/project/pet/Petify.vue"
// import Blog from "@/views/project/blog/Blog.vue"
// import AboutView from "@/views/AboutView.vue"
import { h } from "vue"

const activeLinkStyle = "text-accent"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
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
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/LoginForm.vue"),
    },
    {
      path: "/signup",
      name: "signup",
      component: () => import("@/views/SignupForm.vue"),
    },
    {
      path: "/editor",
      name: "editor",
      component: () => import("@/views/CreatePost.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/posts",
      component: { render: () => h(RouterView) },
      children: [
        {
          path: "",
          name: "posts",
          component: Posts,
        },
        {
          path: ":slug",
          name: "post",
          component: () => import("@/views/Post.vue"),
        },
      ],
    },
    {
      path: "/edit-post/:slug",
      name: "edit-post",
      component: () => import("@/views/EditPost.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/projects",
      component: { render: () => h(RouterView) },
      children: [
        {
          path: "",
          name: "projects",
          component: Projects,
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
      path: "/about",
      name: "about",
      component: () => import("@/views/AboutView.vue"),
    },
    {
      path: "/comments",
      name: "comments",
      component: () => import("@/views/CommentView.vue"),
    },
  ],
})

function isAuthenticated() {
  const token = localStorage.getItem("jwt-token")
  if (!token) {
    return false
  }
  const jwtPayload = JSON.parse(window.atob(token.split(".")[1]))
  const isExpired = Date.now() >= jwtPayload.exp * 1000
  if (isExpired) {
    return false
  }
  return true
}

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next("/login")
  } else {
    next()
  }
})

export default router
