import { Suspense } from "react"
import { Outlet } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { useHideHeader } from "./hooks/useHideHeader"
import { Toaster } from "sonner"

export default function Layout() {
    const { isHidden } = useHideHeader(300)

    return (
        <>
            <Toaster position="top-center" richColors />
            <div className={`transition-opacity duration-700 ease-out ${isHidden ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
                <Header />
            </div>

            <div>
                <main className="w-full pb-24">
                    <Suspense fallback={<div className="flex justify-center py-24 text-neutral-400">Loading...</div>}>
                        <Outlet />
                    </Suspense>
                </main>
            </div>
            <Footer />
        </>
    )
}
