import React from 'react'
import { useState } from 'react';
import { Form,Button} from 'react-bootstrap';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress } from '../slices/cartSlice';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from './../components/CheckoutSteps';

const ShippingScreens = () => {
    const cart = useSelector((state) => state.cart)
    const {shippingAddress} = cart

    const [address,setAddress] = useState(shippingAddress?.address || "")
    const [city, setCity] = useState(shippingAddress?.city || "")
    const [pinCode, setPinCode] = useState(shippingAddress?.pinCode || "")
    const [country, setCountry] = useState(shippingAddress?.country || "")

    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handler = () => {
        dispatch(saveShippingAddress({address,city,pinCode,country}))
        navigate('/payment')
    }
    
  return (

    <FormContainer>

        <CheckoutSteps step1 step2/>

        <h2>Shipping</h2>
        <Form onSubmit={handler}>
            <Form.Group controlId='address' className='my-3'>
                <Form.Label>Address</Form.Label>
                <Form.Control type='text' placeholder='Enter your address' value={address} onChange={(e)=>setAddress(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='city' className='my-3'>
                <Form.Label>City</Form.Label>
                <Form.Control type='text' placeholder='your City' value={city} onChange={(e)=>setCity(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='pincode' className='my-3'>
                <Form.Label>PIN</Form.Label>
                <Form.Control type='text' placeholder='PIN' value={pinCode} onChange={(e)=>setPinCode(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='country' className='my-3'>
                <Form.Label>Country</Form.Label>
                <Form.Control type='text' placeholder='your country' value={country} onChange={(e)=>setCountry(e.target.value)}></Form.Control>
            </Form.Group>
            
            <Button type='submit' variant='primary' className='my-3'> Save address</Button>
        </Form>
    </FormContainer>
    

  )
}

export default ShippingScreens