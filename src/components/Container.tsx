import { cn } from '@src/lib/utils'
import React, { FC } from 'react'

interface Props {
  className?: string
  children: React.ReactNode
}

const Container: FC<Props> = ({ className, children }) => {
  return (
    <div
      className={cn(
        'h-full w-full bg-stone-800 p-4 text-stone-200',
        className,
      )}>
      {children}
    </div>
  )
}

export default Container
