import {useEffect, useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { Form,Button,Col,Image,Card,ListGroup,Row} from "react-bootstrap";
import CheckoutSteps from "../components/CheckoutSteps";
import { useCreateOrderMutation } from "../slices/ordersApiSlice";
import React from 'react'
import { toast } from 'react-toastify';
import { clearCartItems } from "../slices/cartSlice";
import { LinkContainer } from 'react-router-bootstrap';
import Message from "../components/Message";
import Loader from "../components/Loader";

const OrderScreens = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const cart = useSelector((state) => state.cart)
    
    useEffect(() => {
        if(!cart.shippingAddress){
            navigate('/shipping')
        }else if(!cart.paymentMethod){
            navigate('/payment')
        }
    },[cart.paymentMethod,cart.shippingAddress,navigate])

    const [createOrder, {isLoading,error}] = useCreateOrderMutation();

    const orderHandler = async() => {
        try {
            //reducer is from API slice, so we call it like this
            console.log(cart.cartItems)
            const response = await createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                taxPrice: cart.taxprice,
                shippingPrice: cart.shippingPrice,
                totalPrice: cart.totalPrice
        }).unwrap()

            // reducer is from reguler slice , so dispatch it 
            dispatch(clearCartItems())
            navigate(`/order/${response._id}`)
        } catch (error) {
            toast.error(error?.data?.message || error.error)
        }
    }

  return (
    <>
        <CheckoutSteps step1 step2 step3 step4/>

        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Shipping Address</h2>
                        <p>
                            <strong>Address:</strong>
                            {cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.postalCode} , {cart.shippingAddress.country}
                        </p>
                    </ListGroup.Item>
                </ListGroup>

                <ListGroup variant='flush'>
                    <h2>Order Items</h2>
                    {cart.cartItems.length === 0? <h5>Your cart is empty</h5> : (
                        <ListGroup variant='flush'>
                            {cart.cartItems.map((item,index) => (
                                <ListGroup.Item key={index}>
                                    <Row>
                                        
                                        <Col md={2}>
                                        <Link to={`/product/${item._id}`}>
                                            <Image src={item.image} alt={item.name} fluid rounded></Image>
                                        </Link>
                                        </Col>
                                       
                                        <Col>
                                        <Link to={`/product/${item._id}`}>
                                        {item.name}
                                        </Link>
                                        </Col>

                                        <Col md={4}>
                                        {item.qty} x Rs. {item.price} = Rs. {item.qty * item.price}
                                        </Col>
                                        
                                        
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}

                </ListGroup>

            </Col>

            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>Order Summary</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Item Price</Col>
                                <Col>Rs {cart.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Tax price</Col>
                                <Col>Rs {cart.taxprice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping price</Col>
                                <Col>Rs {cart.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h6>{error? error.data?.message : ""}</h6>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button type="button" className="btn-block" disabled={cart.cartItems.length===0} onClick={orderHandler}>Place Order</Button>
                            {isLoading && <Loader></Loader>}
                        </ListGroup.Item>
                        
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </>
  )
}

export default OrderScreens