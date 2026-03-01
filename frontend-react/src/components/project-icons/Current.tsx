import IconWithTooltip from "@/components/IconWithTooltip"
import IconVue from "@/components/icons/IconVue"
import IconGo from "@/components/icons/IconGo"
import IconTailwind from "@/components/icons/IconTailwind"
import IconPostgres from "@/components/icons/IconPostgres"
import IconI18next from "@/components/icons/IconI18next"

export default function Current() {
    return (
        <>
            <li className="flex items-center">
                <IconWithTooltip tooltip="Vue">
                    <IconVue className="size-7" />
                </IconWithTooltip>
            </li>
            <li className="flex items-center">
                <IconWithTooltip tooltip="Go">
                    <IconGo className="size-7" />
                </IconWithTooltip>
            </li>
            <li className="flex items-center">
                <IconWithTooltip tooltip="Tailwind CSS">
                    <IconTailwind className="size-7" />
                </IconWithTooltip>
            </li>
            <li className="flex items-center">
                <IconWithTooltip tooltip="PostgreSQL">
                    <IconPostgres className="size-7" />
                </IconWithTooltip>
            </li>
            <li className="flex items-center">
                <IconWithTooltip tooltip="I18Next">
                    <IconI18next className="size-7" />
                </IconWithTooltip>
            </li>
        </>
    )
}
