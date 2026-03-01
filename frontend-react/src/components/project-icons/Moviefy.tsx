import IconWithTooltip from "@/components/IconWithTooltip"
import IconReact from "@/components/icons/IconReact"
import IconTailwind from "@/components/icons/IconTailwind"
import IconNode from "@/components/icons/IconNode"
import IconMongo from "@/components/icons/IconMongo"
import IconI18next from "@/components/icons/IconI18next"

export default function Moviefy() {
    return (
        <>
            <li className="flex items-center">
                <IconWithTooltip tooltip="React">
                    <IconReact className="size-7" />
                </IconWithTooltip>
            </li>
            <li className="flex items-center">
                <IconWithTooltip tooltip="Tailwind CSS">
                    <IconTailwind className="size-7" />
                </IconWithTooltip>
            </li>
            <li className="flex items-center">
                <IconWithTooltip tooltip="Node.js">
                    <IconNode className="size-7" />
                </IconWithTooltip>
            </li>
            <li className="flex items-center">
                <IconWithTooltip tooltip="MongoDB">
                    <IconMongo className="size-7" />
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
