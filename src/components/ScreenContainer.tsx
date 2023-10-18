import { cn } from '@src/lib/utils'
import React, { FC } from 'react'

interface Props {
  className?: string
  children: React.ReactNode
}

const ScreenContainer: FC<Props> = ({ className, children }) => {
  return (
    <div className={cn('h-screen w-screen font-mono', className)}>
      {children}
    </div>
  )
}

export default ScreenContainer
