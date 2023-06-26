import React from 'react'
import { useState,useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Form,Button,Col } from 'react-bootstrap'
import CheckoutSteps from '../components/CheckoutSteps'
import FormContainer from '../components/FormContainer'
import { savePaymentMethod } from '../slices/cartSlice'



const PaymentScreens = () => {
    const [payment, setPaymentMethod] = useState("PayPal")

    const {paymentMethod} = useSelector((state) => state.cart)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {shippingAddress} = useSelector((state) => state.cart)

    const submitHandler = (e) => {
        dispatch(savePaymentMethod(payment))
        navigate('/placeorder')    
        
    }

    useEffect(() => {
        if(!shippingAddress){
            navigate('/shipping')
        }
    },[shippingAddress,navigate])


  return (
    
    <FormContainer>
        <CheckoutSteps step1 step2 step3/>
        <h1>Payment Method</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group>
                <Form.Label>Methods</Form.Label>
                <Form.Control as="legend">
                <Col>
                    <Form.Check type='radio' className='my-3' label='PayPal or credit card' id="PayPal" name= "paymentMethod" value="PayPal" checked onChange={(e) => setPaymentMethod(e.target.value)}/>
                </Col>
                </Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary' >Continue</Button>
        </Form>
    </FormContainer>
  )
}

export default PaymentScreens