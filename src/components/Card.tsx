// ./Card.tsx
import React, { FC } from 'react'

import { cn } from '../lib/utils'
import { ShieldQuestion } from 'lucide-react'
import SimpleTooltipButton from './SimpleTooltipButton'
import { VariantProps, cva } from 'class-variance-authority'

interface HeaderConfig {
  title: string
  actions: string[]
}

interface Props extends VariantProps<typeof cardVariants> {
  className?: string
  header?: HeaderConfig
  children: React.ReactNode
}

const cardVariants = cva('flex h-full w-full flex-col border', {
  variants: {
    size: {
      '3xl': 'rounded-3xl',
      '2xl': 'rounded-2xl',
      xl: 'rounded-xl',
      lg: 'rounded-lg',
      md: 'rounded-md',
      sm: 'rounded-sm',
    },
    color: {
      stone: 'border-stone-400',
      white: 'border-white',
      red: 'border-red-400',
      yellow: 'border-orange-400',
      green: 'border-green-400',
      blue: 'border-blue-400',
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'stone',
  },
})

const cardHeaderVariants = cva(
  'flex h-8 flex-row items-center justify-between border px-2 py-1',
  {
    variants: {
      size: {
        '3xl': 'rounded-t-[calc(1.5rem-1px)]',
        '2xl': 'rounded-t-[calc(1rem-1px)]',
        xl: 'rounded-t-[calc(0.75rem-1px)]',
        lg: 'rounded-t-[calc(0.5rem-1px)]',
        md: 'rounded-t-[calc(0.375rem-1px)]',
        sm: 'rounded-t-[calc(0.25rem-1px)]',
      },
      color: {
        stone: 'border-stone-400 bg-stone-400',
        white: 'border-white bg-white',
        red: 'border-red-400 bg-red-400',
        yellow: 'border-orange-400 bg-orange-400',
        green: 'border-green-400 bg-green-400',
        blue: 'border-blue-400 bg-blue-400',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

const Card: FC<Props> = ({ className, size, color, header, children }) => {
  return (
    <div className={cn(cardVariants({ size, color, className }))}>
      {header && (
        <div className={cn(cardHeaderVariants({ size, color }))}>
          <div className="text-center text-base">{header.title}</div>
          <div className="flex items-center gap-1">
            {header.actions?.map((action, i) => (
              <SimpleTooltipButton
                key={i}
                variant="none"
                size="none"
                tooltip={action}>
                <ShieldQuestion size={20} />
              </SimpleTooltipButton>
            ))}
          </div>
        </div>
      )}
      <div className="p-2">{children}</div>
    </div>
  )
}

export default Card
