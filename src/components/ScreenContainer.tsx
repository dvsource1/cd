import { cn } from '@src/lib/utils'
import React, { FC, useEffect, useState } from 'react'
import axios from 'axios'

interface Props {
  className?: string
  children: React.ReactNode
}

const UNSPLASH_API_KEY = 'VySRoJZK45eAWp2CbzrgRlEYaWO1hfS2MwZmMoiaR8g'

const ScreenContainer: FC<Props> = ({ className, children }) => {
  const [background, setBackground] = useState<string>()

  useEffect(() => {
    axios
      .get(
        `https://api.unsplash.com/photos/random/?orientation=landscape&client_id=${UNSPLASH_API_KEY}`,
      )
      .then(res => {
        setBackground(res.data.urls.small)
      })
      .catch(err => {
        console.error(err)
        setBackground('../../assets/img/default.jpeg')
      })
  }, [])

  return (
    <div
      style={
        background && {
          backgroundImage: `url(${background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }
      }
      className={cn('h-screen w-screen bg-stone-800 font-mono', className)}>
      {children}
    </div>
  )
}

export default ScreenContainer
