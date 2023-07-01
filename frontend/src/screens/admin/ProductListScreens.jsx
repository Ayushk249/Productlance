import React from 'react'
import { Table, Row,Button, Col, Alert } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { FaTimes,FaEdit,FaTrash } from 'react-icons/fa'
import { useGetProductsQuery } from '../../slices/productsApiSlice'
import Loader from '../../components/Loader'


const ProductListScreens = () => {
    const {data: products, isLoading: loadingProducts, error: errorProducts} = useGetProductsQuery()

    const deleteHandler = (id) => {

    } 

  return (
    <>
    <Row>
        <Col>
            <h1>Products</h1>
        </Col>
        <Col className='text-right'>
            <Button className='btn-sm m-3 my-2'>
                <FaEdit/> Create Product
            </Button>
        </Col>
    </Row>

    {loadingProducts ? <Loader/> : errorProducts ? <Alert>{errorProducts}</Alert> : (
        <>
        <Table striped bordered hover responsive className='table-sm'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>PRICE</th>
                    <th>CATEGORY</th>
                    <th>BRAND</th>
                    <th></th>
                </tr>
            </thead>

            <tbody>
                {products.map((product) => (
                    <tr key={product._id}>

                        <td>{product._id}</td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.category}</td>
                        <td>{product.brand}</td>
                        <td>
                            <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                <Button variant='light' className='btn-sm mx-2'>
                                    <FaEdit/>
                                </Button>
                            </LinkContainer>
                        </td>
                        <td>
                        <Button className='btn-sm' variant='danger' onClick={() => deleteHandler(product._id)}>
                                <FaTrash/>
                        </Button>
                        </td>
                        </tr>
                        )
                    )}
            </tbody>
        </Table>
        </>

        )}
    </>
  )
}

export default ProductListScreens