import { Link, useLocation } from "react-router-dom"
import { useTranslation } from "react-i18next"
import React from "react"

interface HeaderDropdownLinkProps {
    title: string
    subtitle: string
    to: string
    children: React.ReactNode
}

export function HeaderDropdownLink({ title, subtitle, to, children }: HeaderDropdownLinkProps) {
    const location = useLocation()
    const { t } = useTranslation()

    return (
        <Link to={to} className="flex w-full items-start gap-3">
            <div className="mt-0.5 p-3 bg-neutral-900 text-neutral-300 rounded-xl [&>svg]:size-4 [&>svg]:stroke-1">
                {children}
            </div>
            <div className="grow">
                <div className="flex items-center gap-2 justify-between">
                    <p className="text-base text-neutral-100 underline decoration-transparent transition-colors">
                        {title}
                    </p>
                    {location.pathname === to && (
                        <button
                            className="text-xs bg-neutral-800/70 font-medium text-neutral-400 px-1.5 py-0.5 rounded-md"
                            tabIndex={-1}
                        >
                            {t("header.dropdown.current")}
                        </button>
                    )}
                </div>
                <p className="text-neutral-400 mt-0.5">{subtitle}</p>
            </div>
        </Link>
    )
}
