import { cn } from '@src/lib/utils'
import React, { FC } from 'react'

interface Props {
  object: any
  className?: string
}

const Json: FC<Props> = ({ object, className }) => {
  return (
    <pre className={cn('border-2 border-blue-800 text-green-500', className)}>
      {JSON.stringify(object, null, 2)}
    </pre>
  )
}

export default Json
