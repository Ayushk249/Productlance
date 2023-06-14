import { Container,Row,Col } from 'react-bootstrap'
import React from 'react'

const Footer = () => {
    const year = new Date().getFullYear()

  return (
    <footer>
        <Container>
            <Row>
                <Col className='text-centre fw-bold'>
                    <p> ProductLance &copy; {year}</p>
                </Col>
            </Row>
        </Container>
    </footer>
  )
}

export default Footer