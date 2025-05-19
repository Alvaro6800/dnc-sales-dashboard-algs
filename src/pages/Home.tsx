import { Header, CardComponent } from '@/components'
import { Card, Container } from '@mui/material'

function Home() {
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <CardComponent>Card</CardComponent>
      </Container>
      <h1>Home</h1>
    </>
  )
}

export default Home
