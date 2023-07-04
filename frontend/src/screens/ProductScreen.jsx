import { useState } from 'react'
import React from 'react'
import { Link, useParams,useNavigate } from 'react-router-dom'
import {Form,Row,Col,Button, ListGroup,Card,Image} from 'react-bootstrap'
import Loader from '../components/Loader.jsx'
import Ratings from '../components/Ratings.jsx'
import { useGetProductDetailQuery, useCreateReviewMutation } from '../slices/productsApiSlice.js'
import { Alert } from 'react-bootstrap'
import { addToCart } from '../slices/cartSlice.js'
import { useDispatch,useSelector } from 'react-redux'
import {toast} from 'react-toastify'



const ProductScreen = () => {

    const {productID} =useParams()

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [qty,setqty] = useState(1);
    const [rating,setrating] = useState(0);
    const [comment,setcomment] = useState('');

    const {userInfo} = useSelector(state => state.auth)

    
    const {data: product,isLoading,refetch, error} = useGetProductDetailQuery(productID)
    const [createReview,{isLoading:loadingReview}] = useCreateReviewMutation()

    const addToCartHandler = () => {
        // for dispatching redux action
        dispatch(addToCart({...product,qty}))
        navigate('/cart')
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        
        try {
            const res = await createReview({
                user: userInfo,
                id :productID,
                rating,
                comment,
            }).unwrap()

            refetch()
            toast.success(res.message)
            setrating(0)
            setcomment('')


        } catch (err) {
            toast.error(err?.data?.message || err.error)
        }
    }
    
  return (
        <>
            <Link className='btn btn-light my-3' to="/">Go Back</Link>

            {isLoading ? (<div> <Loader/></div>) : error ? <Alert variant="danger">{error.data.message || error.error}</Alert> : (
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

            <Row className='review'>
                <Col md={8}>
                    <h2>Reviews</h2>
                    {product.reviews.length === 0 && <Alert variant='info'>No Reviews</Alert>}
                    <ListGroup variant='flush'>
                        {product.reviews.map((review)=>(
                            <ListGroup.Item key={review._id}>
                                <strong>{review.name}</strong>
                                <Ratings value={review.rating}></Ratings>
                                <p>{review.createdAt?.substring(0,10)}</p>
                                <p>{review.comment}</p>
                            </ListGroup.Item>
                        ))}

                        <ListGroup.Item>
                            <h2>Provide your Feedback</h2>
                            {loadingReview && <Loader/>}
                            {userInfo ? (
                                <Form onSubmit={submitHandler}>
                                    <Form.Group controlId='rating' className='my-3'>
                                        <Form.Label>Rating</Form.Label>
                                        <Form.Control as='select' value={rating} onChange={(x)=>setrating(Number(x.target.value))}>
                                            <option value=''>Select...</option>
                                            <option value='1'>1 - Poor</option>
                                            <option value='2'>2 - Fair</option>
                                            <option value='3'>3 - Good</option>
                                            <option value='4'>4 - Very Good</option>
                                            <option value='5'>5 - Excellent</option>
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId='comment' className='my-3'>
                                        <Form.Label>Comment</Form.Label>
                                        <Form.Control as='textarea' row='3' value={comment} onChange={(x)=>setcomment(x.target.value)}>
                                        </Form.Control>
                                    </Form.Group>

                                    <Button type='submit' variant='primary' disabled={loadingReview}>Submit</Button>
                                </Form>
                            ) : <Alert variant='info'>Please <Link to='/login'>Sign In</Link> to write a review</Alert>}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

            </Row>
            </>)}

        </>
  )
}

export default ProductScreen