import React from 'react'
import { useUpdateProfileMutation } from '../slices/usersApiSlice'
import {Table, Form, Button, Row, Col, Alert } from 'react-bootstrap'
import { useSelector,useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaTimes } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { setCredentials } from '../slices/authSlice'
import Loader from '../components/Loader'
import { useGetMyOrdersQuery } from '../slices/ordersApiSlice'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'


const ProfileScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {userInfo} = useSelector((state) => state.auth)
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [UpdateuserProfile, {isLoading: LoadingUpdateProfile}] = useUpdateProfileMutation()
    const {data: myOrders, isLoading: loadingMyOrders, error: errorMyOrders} = useGetMyOrdersQuery()


    useEffect(() => {
        // filling details
        if(userInfo){
            setName(userInfo.name)
            setEmail(userInfo.email)
        }
    },[userInfo,userInfo.name,userInfo.email])

    const submitHandler = async (e) => {
        e.preventDefault()
        if(password !== confirmPassword){
            toast.error("Passwords do not match")
        }else{
            try {
                const res = await UpdateuserProfile({_id:userInfo._id,name,email,password}).unwrap()
                dispatch(setCredentials(res))
                toast.success("Profile Updated")
            } catch (err) {
                toast.error(err.message || err?.data?.message)
            }
            
        }
    }

  return (
    <Row>
        <Col md={3}>
            <h2>User Profile</h2>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="name" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId="confirmPassword">
                    <Form.Label>confirm password</Form.Label>
                    <Form.Control type="password" placeholder="Enter confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Button type="submit" variant="primary" className='my-2'>Update</Button>
                {LoadingUpdateProfile && <Loader/>}
            </Form>
        </Col>
        <Col md={9}>
            <h3>My Orders</h3>
            
            {loadingMyOrders ? <Loader/> : errorMyOrders ? <Alert variant='danger'>{errorMyOrders?.data?.message}</Alert> : (
                <Table striped hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            
                            <th>Total</th>
                            <th>Paid</th>
                            <th>Delivered</th>
                        </tr>
                    </thead>

                    <tbody>
                        {myOrders.map((order) => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.totalPrice}</td>
                                <td>{order.isPaid?(
                                    order.paidAt?.substring(0,10)
                                ) :(
                                    <FaTimes style={{color: 'red'}}/>
                                )}</td>

                                <td>{order.isDelivered?(
                                    order.Delivered?.substring(0,10)
                                ) :(
                                    <FaTimes style={{color: 'red'}}/>
                                )}</td>

                                <td>
                                    <LinkContainer to={`/orders/${order._id}`}>
                                    <Button className='btn-sm' variant='light'>Details</Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Col>
    </Row>
  )
}

export default ProfileScreen