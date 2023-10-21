import Card from '@src/components/Card'
import Container from '@src/components/Container'
import Grid from '@src/components/Grid'
import ScreenContainer from '@src/components/ScreenContainer'
import BookmarksWidget from '@src/widgets/BookmarksWidget'

const Newtab = () => {
  return (
    <ScreenContainer>
      <Container className="flex flex-col">
        <Grid className="flex-1 grid-cols-1 grid-rows-5 md:grid-cols-3">
          <Card color="blue" className="col-span-3 row-span-1">
            <h1 className="text-center text-4xl">New Tab</h1>
          </Card>
          <Card
            header={{ title: 'Bookmarks', actions: [] }}
            className="col-span-2 row-span-3">
            <BookmarksWidget />
          </Card>
          <Card
            color="red"
            header={{ title: 'Header 2', actions: ['Action 11', 'Action 22'] }}
            className="col-span-1 row-span-3">
            <h1 className="text-6xl"></h1>
          </Card>
          <Card rounded="none" shadow="none" className="col-span-3 row-span-1">
            <h1 className="text-6xl"></h1>
          </Card>
        </Grid>
      </Container>
    </ScreenContainer>
  )
}

export default Newtab
