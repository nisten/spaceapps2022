import type { User } from '../interfaces'
import Head from 'next/head'
import { Row, Container, Col, Button, Table } from 'react-bootstrap'
import useSwr from 'swr';
import Link from 'next/link'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function Home() {

  const { data, error } = useSwr<User[]>('/api/users', fetcher)

  if (error) return <div>Failed to load users</div>
  if (!data) return <div>Loading...</div>
  
  return (
    <Container>
      <Head>
        <title>Perfect Meow</title>
        <meta name="description" content="site built for spaceapps hackathon"></meta>
        <meta name="theme-color" content="#90cdf4"></meta>
        <meta name="apple-mobile-web-app-status-bar" content="#90cdf4" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/raco.png" />
      </Head>
      SpaceApps Hackathon
      <Row>
      Dynamic Cat buttons: 
      {data.map((user) => 
        <Col key={user.id}>
          <Link href="/user/[id]" as={`/user/${user.id}`}>
            <Button>{`Cat ${user.id}`}</Button>
          </Link>
        </Col>
        )}
      </Row>
      <></>
      
  
    </Container>
    )
}
