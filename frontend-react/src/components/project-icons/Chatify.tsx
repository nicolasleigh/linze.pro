import IconWithTooltip from "@/components/IconWithTooltip"
import IconNextJs from "@/components/icons/IconNextJs"
import IconGo from "@/components/icons/IconGo"
import IconTailwind from "@/components/icons/IconTailwind"
import IconPostgres from "@/components/icons/IconPostgres"

export default function Chatify() {
    return (
        <>
            <li className="flex items-center">
                <IconWithTooltip tooltip="Next.js">
                    <IconNextJs className="size-7" />
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
        </>
    )
}
