import { createRouter, createWebHistory, RouterView } from "vue-router"
import HomeView from "../views/HomeView.vue"
import LoginForm from "@/views/LoginForm.vue"
import SignupForm from "@/views/SignupForm.vue"
import MdPreview from "@/components/MdPreview.vue"
import Posts from "@/views/Posts.vue"
import CreatePost from "@/views/CreatePost.vue"
import Projects from "@/views/Projects.vue"
import Post from "@/views/Post.vue"
import EditPost from "@/views/EditPost.vue"
import Cabinfy from "@/views/project/cabin/Cabinfy.vue"
import Moviefy from "@/views/project/movie/Moviefy.vue"
import Musicfy from "@/views/project/music/Musicfy.vue"
import Chatify from "@/views/project/chat/Chatify.vue"
import Petify from "@/views/project/pet/Petify.vue"
import Blog from "@/views/project/blog/Blog.vue"
import { h } from "vue"
import AboutView from "@/views/AboutView.vue"

const activeLinkStyle = "!text-accent"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
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
      path: "/posts",
      component: { render: () => h(RouterView) },
      children: [
        {
          path: "",
          name: "posts",
          component: Posts,
        },
        {
          path: ":postId",
          name: "post",
          component: Post,
        },
      ],
    },
    {
      path: "/edit-post/:postId",
      name: "edit-post",
      component: EditPost,
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
          path: "cabinfy/en",
          name: "cabinfy",
          component: Cabinfy,
        },
        {
          path: "moviefy/en",
          name: "moviefy",
          component: Moviefy,
        },
        {
          path: "musicfy/en",
          name: "musicfy",
          component: Musicfy,
        },
        {
          path: "chatify/en",
          name: "chatify",
          component: Chatify,
        },
        {
          path: "petify/en",
          name: "petify",
          component: Petify,
        },
        {
          path: "blog/en",
          name: "blog",
          component: Blog,
        },
      ],
    },
    {
      path: "/about",
      name: "about",
      component: AboutView,
    },
  ],
})

export default router
