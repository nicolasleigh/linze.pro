import { lazy } from "react"
import { createBrowserRouter } from "react-router-dom"
import Layout from "./Layout"
import RequireAuth from "./components/RequireAuth"

const HomeView = lazy(() => import("./views/HomeView"))
const AboutView = lazy(() => import("./views/AboutView"))
const Posts = lazy(() => import("./views/Posts"))
const Post = lazy(() => import("./views/Post"))
const Projects = lazy(() => import("./views/Projects"))
const Comments = lazy(() => import("./views/Comments"))
const ProjectDetail = lazy(() => import("./views/projects/ProjectDetail"))
const LoginView = lazy(() => import("./views/LoginView"))
const SignupView = lazy(() => import("./views/SignupView"))
const CreatePostView = lazy(() => import("./views/CreatePostView"))
const EditPostView = lazy(() => import("./views/EditPostView"))

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "",
                element: <HomeView />,
            },
            {
                path: "about",
                element: <AboutView />,
            },
            {
                path: "posts",
                element: <Posts />,
            },
            {
                path: "posts/:slug",
                element: <Post />,
            },
            {
                path: "projects",
                element: <Projects />,
            },
            {
                path: "projects/:slug",
                element: <ProjectDetail />,
            },
            {
                path: "comments",
                element: <Comments />,
            },
            {
                path: "login",
                element: <LoginView />,
            },
            {
                path: "signup",
                element: <SignupView />,
            },
            {
                path: "editor",
                element: (
                    <RequireAuth>
                        <CreatePostView />
                    </RequireAuth>
                ),
            },
            {
                path: "edit-post/:slug",
                element: (
                    <RequireAuth>
                        <EditPostView />
                    </RequireAuth>
                ),
            },
        ],
    },
])

export default router
