import React, { FC } from 'react'

interface Props {
  object: any
}

const Json: FC<Props> = ({ object }) => {
  return (
    <pre className="border-2 border-blue-800 text-green-500">
      {JSON.stringify(object, null, 2)}
    </pre>
  )
}

export default Json
