import { cn } from '@src/lib/utils'
import React, { FC } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

interface Props extends VariantProps<typeof windowVariants> {
  className?: string
  children: React.ReactNode
}

const windowVariants = cva('w-40 h-60 font-mono bg-stone-800', {
  variants: {
    variant: {
      default: '',
    },
    border: {
      default: '',
    },
    background: {
      default: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    border: 'default',
    background: 'default',
  },
})

const WindowContainer: FC<Props> = ({
  variant,
  border,
  background,
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        windowVariants({ variant, border, background, className }),
      )}>
      {children}
    </div>
  )
}

export default WindowContainer
