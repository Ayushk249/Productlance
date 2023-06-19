import { useState } from 'react'
import React from 'react'
import { Link, useParams,useNavigate } from 'react-router-dom'
import {Form,Row,Col,Button, ListGroup,Card,Image} from 'react-bootstrap'
import Loader from '../components/Loader.jsx'
import Ratings from '../components/Ratings.jsx'
import { useGetProductDetailQuery } from '../slices/productsApiSlice.js'
import Message from '../components/Message.jsx'
import { addToCart } from '../slices/cartSlice.js'
import { useDispatch } from 'react-redux'



const ProductScreen = () => {

    const {productID} =useParams()

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [qty,setqty] = useState(1);

    
    const {data: product,isLoading, error} = useGetProductDetailQuery(productID)

    
    const addToCartHandler = () => {
        // for dispatching redux action
        dispatch(addToCart({...product,qty}))
        navigate('/cart')
    }

    
  return (
        <>
            <Link className='btn btn-light my-3' to="/">Go Back</Link>

            {isLoading ? (<div> <Loader/></div>) : error ? <Message variant="danger">{error.data.message || error.error}</Message> : (
            <>
            
            

            <Row>
                <Col md={5}>
                    <Image src={product.image} alt={product.name} fluid></Image>
                </Col>
                <Col md={4}>
                    <ListGroup>
                        <ListGroup.Item>
                            <h2>{product.name}</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Ratings value={product.rating} text={product.numReviews}></Ratings>
                        </ListGroup.Item>
                        <ListGroup.Item >
                            Description : {product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price:</Col>
                                        <Col>
                                            <strong>{product.price}</strong>
                                        </Col>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Status</Col>
                                        <Col>
                                            <strong>{product.countInStock >0 ? 'In Stock' : 'Out of Stock'}</strong>
                                        </Col>
                                </Row>
                            </ListGroup.Item>

                            {product.countInStock > 0 && (
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Quantity:</Col>
                                        <Col>
                                            <Form.Control as="select" value={qty} onChange = {(x)=>setqty(Number(x.target.value))}>
                                                {[...Array(product.countInStock).keys()].map((x)=>(
                                                    <option key={x+1} value={x+1} > {x+1} </option>
                                                ))}
                                            </Form.Control>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )}

                            <ListGroup.Item>
                                <Button className='btn-block'  type='button'  disabled={product.countInStock ===0} onClick={addToCartHandler}> Add to cart</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
            </>)}

            
        </>
  )
}

export default ProductScreen