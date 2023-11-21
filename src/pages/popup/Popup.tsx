import { Button } from '@src/components/Button'
import Card from '@src/components/Card'
import Container from '@src/components/Container'
import WindowContainer from '@src/components/WindowContainer'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

function Home() {
  return (
    <WindowContainer className="h-24 w-72">
      <Container className="p-2">
        <Card rounded="sm" color="white">
          Home
        </Card>
      </Container>
    </WindowContainer>
  )
}

function About() {
  return (
    <WindowContainer className="h-96 w-72">
      <Container className="p-2">
        <Card rounded="sm" color="white">
          About
        </Card>
      </Container>
    </WindowContainer>
  )
}

const Popup = () => {
  const onClick1 = () => {
    console.log('onClick')
    window.history.pushState({}, undefined, '/about')
  }

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/" element={<Home />} />
        </Routes>

        <div className="flex h-12 w-full justify-start bg-slate-400">
          <Button className="flex w-12 items-center justify-center bg-slate-600 hover:bg-slate-800 hover:text-slate-200">
            <Link to="/">Home</Link>
          </Button>
          <Button className="flex w-12 items-center justify-center bg-slate-600 hover:bg-slate-800 hover:text-slate-200">
            <Link to="/about">About</Link>
          </Button>
          <Button
            onClick={onClick1}
            className="flex w-12 items-center justify-center bg-slate-600 hover:bg-slate-800 hover:text-slate-200">
            Click
          </Button>
        </div>
      </div>
    </Router>
  )
}

export default Popup
