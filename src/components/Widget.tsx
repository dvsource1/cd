import React, { FC } from 'react'
import { cn } from '../lib/utils'
import { cva } from 'class-variance-authority'

interface Props {
  className?: string
  children: React.ReactNode
}

const widgetVariants = cva('h-full w-full flex', {
  variants: {
    variant: {},
  },
  defaultVariants: {},
})

const Widget: FC<Props> = ({ className, children }) => {
  return <div className={cn(widgetVariants({ className }))}>{children}</div>
}

export default Widget
