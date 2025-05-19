import { Header, CardComponent, AvatarList, CustomTable } from '@/components'
import { Container } from '@mui/material'
import { currencyConverter } from '@/utils'

function Home() {
  const mockListData = [
    {
      avatar: '/dnc-avatar.svg',
      name: 'Nome Sobrenome 1',
      subtitle: currencyConverter(1234.54),
    },
    {
      avatar: '/dnc-avatar.svg',
      name: 'Nome Sobrenome 2',
      subtitle: currencyConverter(2234.54),
    },
    {
      avatar: '/dnc-avatar.svg',
      name: 'Nome Sobrenome 3',
      subtitle: currencyConverter(3334.54),
    },
  ]

  const mockTableData = {
    headers: ['Name', 'Email', 'Actions'],
    rows: [
      [
        <span>Nome 1</span>,
        <span>nome1@email.com</span>,
        <button>Action</button>,
      ],
      [
        <span>Nome 2</span>,
        <span>nome2@email.com</span>,
        <button>Action</button>,
      ],
      [
        <span>Nome 2</span>,
        <span>nome2@email.com</span>,
        <button>Action</button>,
      ],
    ],
  }

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <CardComponent>Card</CardComponent>
        <CardComponent>
          <AvatarList listData={mockListData} />
        </CardComponent>
        <CardComponent>
          <CustomTable
            headers={mockTableData.headers}
            rows={mockTableData.rows}
          />
        </CardComponent>
      </Container>
      <h1>Home</h1>
    </>
  )
}

export default Home
