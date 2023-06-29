import {Link, useParams} from 'react-router-dom'
import React from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useGetOrderDetailsQuery, usePayOrderMutation,useGetPaypalClientIdQuery } from '../slices/ordersApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Alert } from "react-bootstrap";
import {PayPalButtons,usePayPalScriptReducer ,PayPalScriptProvider} from "@paypal/react-paypal-js"
import { toast } from 'react-toastify';
import { useEffect } from 'react';



const AfterOrderScreen = () => {
    const {id : orderId} = useParams()

    // to refresh new data
    const {data:order, refetch, isLoading, error} = useGetOrderDetailsQuery(orderId)

    const [payOrder, {isLoading:paymentLoading,error:paymentError}] = usePayOrderMutation();
    
    const [{isPending},paypalDispatch ] = usePayPalScriptReducer()

    const {userInfo} = useSelector((state) => state.auth)

    const {data: paypal, isLoading: paypalLoading, error: paypalError} = useGetPaypalClientIdQuery()

    // loading PayPal script

    useEffect(()=> {
        if(!paypalError && !paypalLoading && paypal.clientId){
            const payPalScript = async () => {
                paypalDispatch({
                    type: 'resetOptions',
                    value: {
                        'client-id': paypal.clientId,
                        currency: 'INR'
                    }
                })

                paypalDispatch({type: 'setLoadingStatus', value: 'pending'})
            }

            if(order && !order.isPaid){
                if(!window.paypal){
                    // if window is not loaded then
                    payPalScript()
                }else{
                    paypalDispatch({type: 'setLoadingStatus', value: 'idle'})
                }
            }
        }
    } , [paypal,order,paypalDispatch,paypalError,paypalLoading])


    // PayPal handlers

    function onApprove (data,actions) {
        return actions.order.capture().then(async function(details){
            try {
                // from usePayOrderMutation slice
                await payOrder({orderId,details})
                // to update isPaid
                refetch()
                toast.success('Payment Successfull')
            } catch (err) {
                toast.error(err?.data?.message || err.message)
            }
        })
    }
    // async function onApproveTest () {
    //     try {
    //         await payOrder({orderId,details:{ payer:{} }})
    //             refetch()
    //             toast.success('Payment Successfull')

    //     } catch (err) {
    //         toast.error(err?.data?.message || err.message)
    //     }
    // }


    function onError (err) {
            toast.error(err.message)
    }
    function createOrder (data,actions) {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: (order.totalPrice * 0.01369).toFixed(2)
                    }
                }
            ]
        }).then((orderId) => {
            return orderId
        })
    }

  return (
    isLoading ? <Loader/> : error ? <Message variant='danger' childern={error}/> : (
        <>  
            <h1>OrderID:{order._id}</h1>
            <Row>
                <Col>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Shipping to</h2>
                        <p>
                            <strong>Name: </strong> {order.user.name}
                        </p>
                        <p>
                            <strong>Email: </strong> {order.user.email}
                        </p>
                        <p>
                            <strong>Address</strong>
                            {order.shippingAddress.address}, {order.shippingAddress.city}{' '},
                            {order.shippingAddress.postalCode},{' '}, {order.shippingAddress.country}
                        </p>
                        {order.isDelivered ? (
                            <Alert variant='success'>Delivered on {order.deliveredAt}</Alert>
                        ) : (
                            <Alert variant='danger'>Not Delivered</Alert>
                        )}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <p>
                            <strong>Method </strong> {order.paymentMethod}
                        </p>
                        {order.isPaid ? (
                            <Alert variant='success'>Paid on {order.paidAt}</Alert>
                        ) : (
                            <Alert variant='danger'>Not Paid</Alert>
                        )}
                        
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Items ordered</h2>
                        {order.orderItems.map((item,index)=> (
                            <ListGroup.Item key={index}>
                                <Row>
                                    <Col md={1}>
                                        <Image src={item.image} alt={item.name} fluid rounded/>
                                    </Col>
                                    <Col>
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={4}> 
                                        {item.qty} x Rs. {item.price} = Rs. {item.qty * item.price}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup.Item>

                </ListGroup>
                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col> Rs.{order.itemsPrice}</Col>
                                </Row>
                                <Row>
                                    <Col>shipping</Col>
                                    <Col> Rs.{order.shippingPrice}</Col>
                                </Row>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col> Rs.{order.taxPrice}</Col>
                                </Row>
                                <Row>
                                    <Col>Total</Col>
                                    <Col> Rs.{order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            {/* Payment and delivered feature here */}
                            
                            {!order.isPaid && (
                                
                                <ListGroup.Item>
                                    {paymentLoading && <Loader/>}
                                    {isPending? <Loader/> : (
                                        <div>
                                            {/* <Button onClick={onApproveTest} style= {{marginBottom: '10px'}}>
                                            Test pay order
                                            </Button> */}
                                            <div>
                                                <PayPalScriptProvider >
                                                    <PayPalButtons createOrder={createOrder}
                                                     onApprove={onApprove}
                                                    onError={onError} />
                                                </PayPalScriptProvider>
                                            </div>
                                        </div>
                                    )}


                                </ListGroup.Item>
                            )}
                        </ListGroup>


                    </Card>
                </Col>
            </Row>

        </>
    )
  )
}

export default AfterOrderScreen