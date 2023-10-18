// ./Card.tsx
import React, { FC } from 'react'

import { cn } from '../lib/utils'
import { ShieldQuestion } from 'lucide-react'
import SimpleTooltipButton from './SimpleTooltipButton'

interface HeaderConfig {
  title: string
  actions: string[]
}

interface Props {
  className?: string
  header?: HeaderConfig
  children: React.ReactNode
}

const Card: FC<Props> = ({ className, header, children }) => {
  return (
    <div
      className={cn(
        'flex h-full w-full flex-col rounded-xl border border-stone-600',
        className,
      )}>
      {header && (
        <div className="flex h-8 flex-row items-center justify-between rounded-t-xl bg-stone-600 px-2 py-1">
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
