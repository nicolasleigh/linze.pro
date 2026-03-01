import { useTranslation } from "react-i18next"
import IconWithTooltip from "@/components/IconWithTooltip"
import IconTS from "@/components/icons/IconTS"
import IconReact from "@/components/icons/IconReact"
import IconVue from "@/components/icons/IconVue"
import IconNextJs from "@/components/icons/IconNextJs"
import IconTailwind from "@/components/icons/IconTailwind"
import IconRedux from "@/components/icons/IconRedux"
import IconReactQuery from "@/components/icons/IconReactQuery"
import IconNode from "@/components/icons/IconNode"
import IconGo from "@/components/icons/IconGo"
import IconExpress from "@/components/icons/IconExpress"
import IconPrisma from "@/components/icons/IconPrisma"
import IconSocketIO from "@/components/icons/IconSocketIO"
import IconMongo from "@/components/icons/IconMongo"
import IconPostgres from "@/components/icons/IconPostgres"
import IconDocker from "@/components/icons/IconDocker"
import IconCaddy from "@/components/icons/IconCaddy"

const ulStyle = "flex gap-2"
const liStyle = "flex"
const iconStyle = "size-7 text-neutral-400 hover:text-accent"
const titleStyle = "text-lg text-neutral-100 font-semibold mt-4 mb-2 pointer-events-none"

export default function AboutTechStack() {
    const { t } = useTranslation()

    return (
        <>
            <h3 className={titleStyle}>{t("about.tech_languages")}</h3>
            <ul className={ulStyle}>
                <li className={liStyle}>
                    <IconWithTooltip tooltip="TypeScript">
                        <IconTS className={iconStyle} />
                    </IconWithTooltip>
                </li>
                <li className={liStyle}>
                    <IconWithTooltip tooltip="Golang">
                        <IconGo className={iconStyle} />
                    </IconWithTooltip>
                </li>
            </ul>
            <h3 className={titleStyle}>{t("about.tech_frontend")}</h3>
            <ul className={ulStyle}>
                <li className={liStyle}>
                    <IconWithTooltip tooltip="React">
                        <IconReact className={iconStyle} />
                    </IconWithTooltip>
                </li>
                <li className={liStyle}>
                    <IconWithTooltip tooltip="Vue">
                        <IconVue className={iconStyle} />
                    </IconWithTooltip>
                </li>
                <li className={liStyle}>
                    <IconWithTooltip tooltip="Next.js">
                        <IconNextJs className={iconStyle} />
                    </IconWithTooltip>
                </li>
                <li className={liStyle}>
                    <IconWithTooltip tooltip="Tailwind CSS">
                        <IconTailwind className={iconStyle} />
                    </IconWithTooltip>
                </li>
                <li className={liStyle}>
                    <IconWithTooltip tooltip="Redux">
                        <IconRedux className={iconStyle} />
                    </IconWithTooltip>
                </li>
                <li className={liStyle}>
                    <IconWithTooltip tooltip="React Query">
                        <IconReactQuery className={iconStyle} />
                    </IconWithTooltip>
                </li>
            </ul>
            <h3 className={titleStyle}>{t("about.tech_backend")}</h3>
            <ul className={ulStyle}>
                <li className={liStyle}>
                    <IconWithTooltip tooltip="Node.js">
                        <IconNode className={iconStyle} />
                    </IconWithTooltip>
                </li>
                <li className={liStyle}>
                    <IconWithTooltip tooltip="Golang">
                        <IconGo className={iconStyle} />
                    </IconWithTooltip>
                </li>
                <li className={liStyle}>
                    <IconWithTooltip tooltip="Express.js">
                        <IconExpress className={iconStyle} />
                    </IconWithTooltip>
                </li>
                <li className={liStyle}>
                    <IconWithTooltip tooltip="Prisma">
                        <IconPrisma className={iconStyle} />
                    </IconWithTooltip>
                </li>
                <li className={liStyle}>
                    <IconWithTooltip tooltip="Socket.IO">
                        <IconSocketIO className={iconStyle} />
                    </IconWithTooltip>
                </li>
            </ul>
            <h3 className={titleStyle}>{t("about.tech_database")}</h3>
            <ul className={ulStyle}>
                <li className={liStyle}>
                    <IconWithTooltip tooltip="MongoDB">
                        <IconMongo className={iconStyle} />
                    </IconWithTooltip>
                </li>
                <li className={liStyle}>
                    <IconWithTooltip tooltip="PostgreSQL">
                        <IconPostgres className={iconStyle} />
                    </IconWithTooltip>
                </li>
            </ul>
            <h3 className={titleStyle}>{t("about.tech_devops")}</h3>
            <ul className={ulStyle}>
                <li className={liStyle}>
                    <IconWithTooltip tooltip="Docker">
                        <IconDocker className={iconStyle} />
                    </IconWithTooltip>
                </li>
                <li className={liStyle}>
                    <IconWithTooltip tooltip="Caddy">
                        <IconCaddy className={iconStyle} />
                    </IconWithTooltip>
                </li>
            </ul>
        </>
    )
}
