import React from 'react'
import { Row,Col } from 'react-bootstrap'
import Product from '../components/Product.jsx'
import { useGetProductsQuery } from '../slices/productsApiSlice.js'
import Loader from './../components/Loader';
import Message from '../components/Message.jsx';

const HomeScreen = () => {
  // const [products, setproducts] = useState([])

  // useEffect(() => {

  //       const fetchProduct = async () => {
  //         const {data} = await axios.get('/api/products')
  //         setproducts(data)
  //       } 
  //     fetchProduct()

  // },[])

const {data: products, isLoading, error} = useGetProductsQuery()

  return (
    <>
    {isLoading ? (<div> <Loader/></div>) : error ? (<Message variant="danger">{error.data?.message || error.error}</Message>) : (
      <>
          <h1>Latest Products</h1>
          <Row>
            {products.map((product) => (
              <Col sm={12} md={6} lg={4} xl={3}> 
                <Product product={product}></Product>
              </Col>
            ) )}
          </Row>
    </> )}
    
      </>
  )
}

export default HomeScreen