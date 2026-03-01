import { createBrowserRouter } from "react-router-dom"
import Layout from "./Layout"
import HomeView from "./views/HomeView"
import AboutView from "./views/AboutView"
import Posts from "./views/Posts"
import Post from "./views/Post"
import Projects from "./views/Projects"
import Comments from "./views/Comments"

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
                path: "comments",
                element: <Comments />
            },
            // Placeholder for specific project routes if needed, generally handled by Projects view or specific components
            {
                path: "projects/:slug",
                element: <div className="p-10 text-white">Project Detail Placeholder</div>
            }
        ],
    },
])

export default router
