import Card from '@src/components/Card'
import Container from '@src/components/Container'
import ScreenContainer from '@src/components/ScreenContainer'
import React from 'react'

const Panel: React.FC = () => {
  return (
    <ScreenContainer>
      <Container>
        <Card>Dev Tool</Card>
      </Container>
    </ScreenContainer>
  )
}

export default Panel
