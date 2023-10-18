import Card from '@src/components/Card'
import Container from '@src/components/Container'
import Grid from '@src/components/Grid'
import ScreenContainer from '@src/components/ScreenContainer'
import React from 'react'

const Options: React.FC = () => {
  return (
    <ScreenContainer>
      <Container>
        <Grid className="grid-cols-1 grid-rows-1">
          <Card className="col-span-1 row-span-1">
            <h1 className="text-6xl">Options</h1>
          </Card>
        </Grid>
      </Container>
    </ScreenContainer>
  )
}

export default Options
