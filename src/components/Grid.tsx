// ./Grid.tsx

import React, { FC } from 'react'
import { cn } from '../lib/utils'

interface Props {
  className?: string
  children: React.ReactNode
}

const Grid: FC<Props> = ({ className, children }) => {
  return <div className={cn('grid h-full gap-4', className)}>{children}</div>
}

export default Grid
