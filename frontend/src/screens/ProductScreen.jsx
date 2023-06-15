import React from 'react'
import { Link, useParams } from 'react-router-dom'
import {Row,Col,Button, ListGroup,Card,Image} from 'react-bootstrap'
import products from '../products'
import Ratings from '../components/Ratings'

const ProductScreen = () => {
    const {productID} =useParams()
    const product= products.find((p) => p._id===productID)

  return (
        <>
            <Link className='btn btn-light my-3' to="/">Go Back</Link>

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
                        <ListGroup.Item>
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
                                            <strong>{product.countInStock>0 ? 'In Stock' : 'Out of Stock'}</strong>
                                        </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button className='btn-block'  type='button'  disabled={product.countInStock ===0}> Add to cart</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
  )
}

export default ProductScreen