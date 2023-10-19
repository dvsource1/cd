import Card from '@src/components/Card'
import Container from '@src/components/Container'
import Grid from '@src/components/Grid'
import ScreenContainer from '@src/components/ScreenContainer'

const Newtab = () => {
  return (
    <ScreenContainer>
      <Container>
        <Grid className="grid-cols-1 grid-rows-4 md:grid-cols-3">
          <Card
            color="red"
            header={{ title: 'Header 1', actions: ['Action 1', 'Action 2'] }}
            className="col-span-2 row-span-3">
            <h1 className="text-6xl">New Tab</h1>
          </Card>
          <Card
            color="yellow"
            header={{ title: 'Header 2', actions: ['Action 11', 'Action 22'] }}
            className="col-span-1 row-span-3">
            <h1 className="text-6xl">New Tab</h1>
          </Card>
          <Card color="green" className="col-span-3 row-span-1">
            <h1 className="text-6xl">New Tab</h1>
          </Card>
        </Grid>
      </Container>
    </ScreenContainer>
  )
}

export default Newtab
