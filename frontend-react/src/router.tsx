import { createBrowserRouter } from "react-router-dom"
import Layout from "./Layout"
import HomeView from "./views/HomeView"
import Posts from "./views/Posts"
import Post from "./views/Post"

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
                element: <div className="p-10 text-white">About Page Placeholder</div>,
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
                element: <div className="p-10 text-white">Projects Page Placeholder</div>
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
