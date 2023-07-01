import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import {Table,Button} from 'react-bootstrap'
import { useGetAllOrdersQuery } from '../../slices/ordersApiSlice'
import Loader from '../../components/Loader'
import { Alert } from 'react-bootstrap'
import { FaTimes } from 'react-icons/fa';

const OrderListScreens = () => {

  const {data: orders, isLoading: loadingOrders, error: errorOrders} = useGetAllOrdersQuery()

  return (
    <>
    <h1>Orders</h1>

    {loadingOrders ? <Loader/> : errorOrders ? <Alert variant='danger'>{errorOrders}</Alert> : (
        <Table striped bordered hover responsive className='table-sm'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>USER</th>
                    <th>TOTAL</th>
                    <th>PAID</th>
                    <th>DELIVERED</th>
                    <th></th>
                </tr>
            </thead>

            <tbody>
                {orders.map((order) => (
                    <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{order.user && order.user.name}</td>
                        
                        <td>{order.totalPrice}</td>
                        <td>{order.isPaid?(
                            order.paidAt.substring(0,10)
                        ) :(
                            <FaTimes style={{color: 'red'}}/>
                        )}</td>

                        <td>{order.isDelivered?(
                            order.deliveredAt.substring(0,10)
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
    </>
  )
}

export default OrderListScreens