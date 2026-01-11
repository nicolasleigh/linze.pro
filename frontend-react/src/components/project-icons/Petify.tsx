import IconMongo from "@/components/icons/IconMongo"
import IconNode from "@/components/icons/IconNode"
import IconReact from "@/components/icons/IconReact"
import IconRedux from "@/components/icons/IconRedux"
import IconTailwind from "@/components/icons/IconTailwind"
import IconSocketIO from "@/components/icons/IconSocketIO"
import IconWithTooltip from "@/components/IconWithTooltip"

export default function Petify() {
    return (
        <>
            <li className="flex items-center">
                <IconWithTooltip tooltip="React">
                    <IconReact />
                </IconWithTooltip>
            </li>
            <li className="flex items-center">
                <IconWithTooltip tooltip="Redux">
                    <IconRedux />
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
                <IconWithTooltip tooltip="MongoDB">
                    <IconMongo />
                </IconWithTooltip>
            </li>
            <li className="flex items-center">
                <IconWithTooltip tooltip="Socket.IO">
                    <IconSocketIO />
                </IconWithTooltip>
            </li>
        </>
    )
}
