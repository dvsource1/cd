import Card from '@src/components/Card'
import Container from '@src/components/Container'
import Grid from '@src/components/Grid'
import ScreenContainer from '@src/components/ScreenContainer'

const Newtab = () => {
  return (
    <ScreenContainer>
      <Container>
        <Grid className="grid-cols-1 grid-rows-4 md:grid-cols-3">
          <Card className="col-span-2 row-span-3">
            <h1 className="text-6xl">New Tab</h1>
          </Card>
          <Card className="col-span-1 row-span-3">
            <h1 className="text-6xl">New Tab</h1>
          </Card>
          <Card className="col-span-3 row-span-1">
            <h1 className="text-6xl">New Tab</h1>
          </Card>
        </Grid>
      </Container>
    </ScreenContainer>
  )
}

export default Newtab
