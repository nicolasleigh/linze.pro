import { useState } from "react"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useLogin } from "@/hooks/useLogin"

export default function LoginView() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { login, isPending } = useLogin()
    const { t } = useTranslation()

    const inputStyle =
        "w-full bg-neutral-950 border border-neutral-800 rounded-md p-2 transition-colors duration-200 focus:border-neutral-600 focus:outline-none text-neutral-100 disabled:opacity-50"

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!email || !password) return
        login({ email, password })
    }

    return (
        <section>
            <div className="relative">
                <div className="layout text-center pb-12 pt-28 md:pb-12 md:pt-36 flex flex-col items-center justify-center">
                    <h1 className="mt-4 text-6xl">
                        <span className="font-semibold transition-colors bg-gradient-to-br from-accent/30 via-accent/90 to-accent/30 bg-clip-text text-transparent">
                            {t("auth.login")}
                        </span>
                    </h1>
                </div>
            </div>

            <div className="border border-neutral-800 px-6 py-4 mb-24 rounded-md w-[350px] mx-auto shadow-lg text-neutral-200">
                <h1 className="text-2xl font-semibold text-center mb-5">{t("auth.welcome")}</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label htmlFor="email" className="mb-0.5 font-medium block">
                            {t("auth.email")}
                        </label>
                        <input
                            type="email"
                            id="email"
                            className={inputStyle}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isPending}
                            placeholder={t("auth.email_placeholder")}
                            autoComplete="email"
                            required
                        />
                    </div>

                    <div className="mb-5">
                        <label htmlFor="password" className="mb-0.5 font-medium block">
                            {t("auth.password")}
                        </label>
                        <input
                            type="password"
                            id="password"
                            className={inputStyle}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isPending}
                            placeholder={t("auth.password_placeholder")}
                            autoComplete="current-password"
                            required
                        />
                    </div>

                    <div className="mt-7 mb-4">
                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full px-4 py-2 rounded-lg border items-center gap-3 cursor-pointer border-neutral-400 text-neutral-300 hover:bg-neutral-100 hover:text-neutral-800 transition-colors duration-300 disabled:cursor-not-allowed disabled:hover:text-neutral-100 disabled:hover:bg-neutral-950"
                        >
                            <span className="font-semibold">
                                {isPending ? t("auth.login_loading") : t("auth.login")}
                            </span>
                        </button>
                    </div>

                    <div>
                        <Link
                            to="/signup"
                            className="hover:underline underline-offset-4 text-neutral-500 hover:text-neutral-300"
                        >
                            {t("auth.signup_link")}
                        </Link>
                    </div>
                </form>
            </div>
        </section>
    )
}
