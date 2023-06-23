
import { useState,useEffect } from 'react'
import React from 'react'
import { Form,Row,Col,Button } from 'react-bootstrap'
import { Link , useLocation, useNavigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import { useSelector,useDispatch } from 'react-redux';
import Loader from './../components/Loader';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import {toast} from 'react-toastify'

const RegisterScreen = () => {

  const [name,setname] =useState('')
  const [email,setEmail] =useState('')
  const [password,setpassword] =useState('')
  const [confirmPassword, setConfirmPassword ] = useState('')


  const dispatch =useDispatch();
  const navigate = useNavigate();

  const [register, {isLoading}] = useRegisterMutation();

  const {userInfo} = useSelector((state)=> state.auth);

  const {search} = useLocation();
  const sp = new URLSearchParams(search)
  const redirect= sp.get('redirect') || '/';


  useEffect(() => {
      if(userInfo){
        navigate(redirect)
      }
  },[userInfo,redirect,navigate])


  const submitHandler = async (e) => {
    e.preventDefault()
    
    if(password!=confirmPassword){
        toast.error("passwords do not match")
    }else{
        try {
      
            const response = await register({name,email,password}).unwrap()
            dispatch(setCredentials({...response}))
            navigate(redirect)
          } catch (error) {
            console.log(error?.data?.message || error.error)
              toast.error(error?.data?.message || error.error)
          }
    }

    

  }

  return (
    <FormContainer>
      <h1>Register</h1>

      <Form onSubmit={submitHandler}>
      <Form.Group controlId='name' className='my-3'>
            <Form.Label>Name</Form.Label>
            <Form.Control type='text' placeholder='enter your name ' value={name} onChange={(e) => setname(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='email' className='my-3'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control type='email' placeholder='enter your email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='password' className='my-3'>
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' placeholder='enter your password' value={password} onChange={(e) => setpassword(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='Confirmpassword' className='my-3'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type='password' placeholder='enter your password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
        </Form.Group>

        <Button  type='submit' variant='primary' className='mt-2' disabled={isLoading} >
          Register
        </Button>

        {isLoading && <Loader/> }


      </Form>
      <Row className='py-3'>
        <Col>
        Already have an account? <Link to={redirect ? `/login?redirect =${redirect}` : '/login'}>Sign In</Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterScreen
