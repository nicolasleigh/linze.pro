import { createRouter, createWebHistory } from "vue-router"
import HomeView from "../views/HomeView.vue"
import LoginForm from "@/views/LoginForm"
import SignupForm from "@/views/SignupForm"
import MdPreview from "@/components/MdPreview.vue"
import Posts from "@/views/Posts"
import CreatePost from "@/views/CreatePost.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginForm,
    },
    {
      path: "/signup",
      name: "signup",
      component: SignupForm,
    },
    {
      path: "/editor",
      name: "editor",
      component: CreatePost,
    },
    {
      path: "/post/:postId",
      name: "post",
      component: MdPreview,
    },
    {
      path: "/posts",
      name: "posts",
      component: Posts,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
  ],
})

export default router
