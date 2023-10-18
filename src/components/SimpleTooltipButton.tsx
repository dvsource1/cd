import React, { FC } from 'react'
import { Button } from './Button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './Tooltip'

interface Props extends React.ComponentProps<typeof Button> {
  className?: string
  tooltip: string
  children: React.ReactNode
}

const SimpleTooltipButton: FC<Props> = ({
  className,
  tooltip,
  children,
  ...props
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button className={className} {...props}>
            {children}
          </Button>
        </TooltipTrigger>
        <TooltipContent className="px-1 py-0.5 text-xs">
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default SimpleTooltipButton
