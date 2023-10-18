// ./Card.tsx
import React, { FC } from 'react'

import { cn } from '../lib/utils'

interface Props {
  className?: string
  children: React.ReactNode
}

const Card: FC<Props> = ({ className, children }) => {
  return (
    <div
      className={cn(
        'h-full w-full rounded-xl border border-stone-600 p-2',
        className,
      )}>
      {children}
    </div>
  )
}

export default Card
