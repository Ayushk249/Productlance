import React from 'react'
import { Row,Col } from 'react-bootstrap'
import { useEffect,useState } from 'react'
import Product from '../components/Product.jsx'

const axios = require('axios');

const HomeScreen = () => {
  const [products, setproducts] = useState([])

  useEffect(() => {

        const fetchProduct = async () => {
          const {data} = await axios.get('/api/products')
          setproducts(data)
        } 
      fetchProduct()

  },[])

  return (
    <>
    <h1>Latest Products</h1>

    <Row>
      {products.map((product) => (
        <Col sm={12} md={6} lg={4} xl={3}> 
        <Product product={product}></Product>
        </Col>
      ) )}
    </Row>
      </>
  )
}

export default HomeScreen