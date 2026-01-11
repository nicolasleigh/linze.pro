import IconNode from "@/components/icons/IconNode"
import IconPostgres from "@/components/icons/IconPostgres"
import IconPrisma from "@/components/icons/IconPrisma"
import IconReact from "@/components/icons/IconReact"
import IconTailwind from "@/components/icons/IconTailwind"
import IconReactQuery from "@/components/icons/IconReactQuery"
import IconWithTooltip from "@/components/IconWithTooltip"

export default function Cabinfy() {
    return (
        <>
            <li className="flex items-center">
                <IconWithTooltip tooltip="React">
                    <IconReact />
                </IconWithTooltip>
            </li>
            <li className="flex items-center">
                <IconWithTooltip tooltip="React Query">
                    <IconReactQuery />
                </IconWithTooltip>
            </li>
            <li className="flex items-center">
                <IconWithTooltip tooltip="Tailwind CSS">
                    <IconTailwind />
                </IconWithTooltip>
            </li>
            <li className="flex items-center">
                <IconWithTooltip tooltip="Node.js">
                    <IconNode />
                </IconWithTooltip>
            </li>
            <li className="flex items-center">
                <IconWithTooltip tooltip="PostgreSQL">
                    <IconPostgres />
                </IconWithTooltip>
            </li>
            <li className="flex items-center">
                <IconWithTooltip tooltip="Prisma">
                    <IconPrisma />
                </IconWithTooltip>
            </li>
        </>
    )
}
