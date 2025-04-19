import { createRouter, createWebHistory } from "vue-router"
import HomeView from "../views/HomeView.vue"
import LoginForm from "@/views/LoginForm.vue"
import SignupForm from "@/views/SignupForm.vue"
import MdPreview from "@/components/MdPreview.vue"
import Posts from "@/views/Posts.vue"
import CreatePost from "@/views/CreatePost.vue"
import Projects from "@/views/Projects.vue"
import Post from "@/views/Post.vue"
import EditPost from "@/views/EditPost.vue"

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
      path: "/preview/:postId",
      name: "preview",
      component: MdPreview,
    },
    {
      path: "/posts",
      name: "posts",
      component: Posts,
    },
    {
      path: "/post/:postId",
      name: "post",
      component: Post,
    },
    {
      path: "/edit-post/:postId",
      name: "edit-post",
      component: EditPost,
    },
    {
      path: "/projects",
      name: "projects",
      component: Projects,
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
