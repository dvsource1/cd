import { useEffect } from 'react'

export default function App() {
  useEffect(() => {
    console.log('dv/cd content view loaded')
  }, [])

  return <div className="content-view">content view</div>
}
