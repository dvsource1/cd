import Card from '@src/components/Card'
import Container from '@src/components/Container'
import WindowContainer from '@src/components/WindowContainer'

const Popup = () => {
  return (
    <WindowContainer>
      <Container className="p-2">
        <Card size="sm" color="white">
          Popup
        </Card>
      </Container>
    </WindowContainer>
  )
}

export default Popup
