import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface IconWithTooltipProps {
    tooltip: string
    children: React.ReactNode
}

export default function IconWithTooltip({ tooltip, children }: IconWithTooltipProps) {
    return (
        <TooltipProvider delayDuration={0}>
            <Tooltip>
                <TooltipTrigger className="cursor-default" asChild>
                    {/* TooltipTrigger defaults to button, but asChild allows it to wrap children properly without nesting interactive elements potentially */}
                    <div className="flex items-center justify-center">
                        {children}
                    </div>
                </TooltipTrigger>
                <TooltipContent className="bg-neutral-900 py-1 px-2 border-none text-neutral-100">
                    <p className="text-xs font-semibold">{tooltip}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
