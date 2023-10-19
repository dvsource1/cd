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

const cardVariants = cva('flex h-full w-full flex-col border shadow-md', {
  variants: {
    rounded: {
      '3xl': 'rounded-3xl',
      '2xl': 'rounded-2xl',
      xl: 'rounded-xl',
      lg: 'rounded-lg',
      md: 'rounded-md',
      sm: 'rounded-sm',
      none: 'rounded-none',
    },
    color: {
      stone: 'border-stone-400 shadow-stone-800 bg-stone-200/50',
      white: 'border-white shadow-white-800 bg-white/50',
      red: 'border-red-400 shadow-red-800 bg-red-200/50',
      yellow: 'border-orange-400 shadow-orange-800 bg-orange-200/50',
      green: 'border-green-400 shadow-green-800 bg-green-200/50',
      blue: 'border-blue-400 shadow-blue-800 bg-blue-200/50',
    },
    shadow: {
      none: 'shadow-none',
    },
  },
  defaultVariants: {
    rounded: 'md',
    color: 'stone',
  },
})

const cardHeaderVariants = cva(
  'flex h-6 flex-row items-center justify-between border px-2 py-1',
  {
    variants: {
      rounded: {
        '3xl': 'rounded-t-[calc(1.5rem-1px)]',
        '2xl': 'rounded-t-[calc(1rem-1px)]',
        xl: 'rounded-t-[calc(0.75rem-1px)]',
        lg: 'rounded-t-[calc(0.5rem-1px)]',
        md: 'rounded-t-[calc(0.375rem-1px)]',
        sm: 'rounded-t-[calc(0.25rem-1px)]',
        none: 'rounded-none',
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
      rounded: 'md',
    },
  },
)

const Card: FC<Props> = ({
  className,
  rounded,
  color,
  shadow,
  header,
  children,
}) => {
  return (
    <div className={cn(cardVariants({ rounded, color, shadow, className }))}>
      {header && (
        <div className={cn(cardHeaderVariants({ rounded, color }))}>
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
