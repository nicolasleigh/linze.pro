import IconAndroid from "@/components/icons/IconAndroid"
import IconApple from "@/components/icons/IconApple"
import IconMongo from "@/components/icons/IconMongo"
import IconNode from "@/components/icons/IconNode"
import IconReact from "@/components/icons/IconReact"
import IconRedux from "@/components/icons/IconRedux"
import IconReactQuery from "@/components/icons/IconReactQuery"
import IconWithTooltip from "@/components/IconWithTooltip"

export default function Musicfy() {
    return (
        <>
            <li className="flex items-center">
                <IconWithTooltip tooltip="Android">
                    <IconAndroid />
                </IconWithTooltip>
            </li>
            <li className="flex items-center">
                <IconWithTooltip tooltip="iOS">
                    <IconApple />
                </IconWithTooltip>
            </li>
            <li className="flex items-center">
                <IconWithTooltip tooltip="React Native">
                    <IconReact />
                </IconWithTooltip>
            </li>
            <li className="flex items-center">
                <IconWithTooltip tooltip="React Query">
                    <IconReactQuery />
                </IconWithTooltip>
            </li>
            <li className="flex items-center">
                <IconWithTooltip tooltip="Redux">
                    <IconRedux />
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
        </>
    )
}
