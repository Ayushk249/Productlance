import React from 'react'
import {Link,useNavigate} from 'react-router-dom';
import { Row,Col,ListGroup,Image, Form, Button,Card } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import Message from '../components/Message';
import { useSelector,useDispatch } from 'react-redux';
import { addToCart,removeFromCart } from '../slices/cartSlice';

const CartScreen = () => {

    const Navigate = useNavigate()
    const dispatch = useDispatch()

    const cart = useSelector((state)=>(state.cart))
    const {cartItems} = cart

    const addToCartHandler = async(product,qty)=>{
            dispatch(addToCart({...product,qty}))
    }

    const removeFromCartHandler = async(id)=>{
        dispatch(removeFromCart(id))
}

  return (
    <Row>
        <Col md={9}>
            {cartItems.length === 0 ? (<Message>
                Your Cart is Empty, <Link to='/'>Go Back</Link>
            </Message>) : (
                <ListGroup variant='flush'>
                {cartItems.map((Item) => (
                    <ListGroup.Item key={Item._id}>
                        <Row>
                            <Col md={2}>
                                <Image src={Item.image} alt={Item.name} fluid rounded />
                            </Col>
                            <Col md={3}>
                                <Link to={`/product/${Item._id}`}>{Item.name}</Link>
                            </Col>
                            <Col md={2}>
                                <strong>Rs. {Item.price}</strong>
                            </Col>
                            <Col md={2}>
                                
                                    <Form.Control as="select" value={Item.qty} onChange = {(x)=>{addToCartHandler(Item,Number(x.target.value))}}>
                                        {[...Array(Item.countInStock).keys()].map((x)=>(
                                            <option key={x+1} value={x+1} > {x+1} </option>
                                        ))}
                                    </Form.Control>
                            </Col>
                            <Col md={2}>
                                <Button type='button' variant='light' onClick={() => removeFromCartHandler(Item._id)}>
                                    <FaTrash/>
                                </Button>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                ))}
            </ListGroup>
            )}
        </Col>
        <Col md={3}>
            <Card>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h3>
                            Subtotal: ({cartItems.reduce((acc,curr) => acc+ curr.qty , 0)}) items
                        </h3>
                        Rs. {cartItems.reduce((acc,curr) => acc +curr.price*curr.qty,0).toFixed(2)}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Button type='button' className='btn-block' disabled= {cartItems.length===0}> Checkout</Button>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </Col>
    </Row>
  )
}

export default CartScreen