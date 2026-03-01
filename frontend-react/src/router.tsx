import { createBrowserRouter } from "react-router-dom"
import Layout from "./Layout"
import HomeView from "./views/HomeView"
import AboutView from "./views/AboutView"
import Posts from "./views/Posts"
import Post from "./views/Post"
import Projects from "./views/Projects"
import Comments from "./views/Comments"
import ProjectDetail from "./views/projects/ProjectDetail"

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
                element: <Posts />
            },
            {
                path: "posts/:slug",
                element: <Post />
            },
            {
                path: "projects",
                element: <Projects />
            },
            {
                path: "projects/:slug",
                element: <ProjectDetail />
            },
            {
                path: "comments",
                element: <Comments />
            }
        ],
    },
])

export default router
