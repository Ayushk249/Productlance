import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Ratings from './Ratings'

const Product = ({product}) => {
  return (
    <Card variant='top' className='my-3 p-3 rounded'>
        {/* replace <a> tag with <Link> */}
        <Link to={`/product/${product._id}`}>
            <Card.Img src={product.image} variant='top'/>
        </Link>

        <Card.Body>
            <Link to={`/product/${product._id}`}>
                <Card.Title as='div' className='product-title'>
                    <strong>{product.name}</strong>
                </Card.Title>
            </Link>

            <Card.Text>
            <Ratings value= {product.rating} text={`${product.numReviews} reviews`}></Ratings>
            </Card.Text>
            
            <Card.Text as='h3'>
                Rs {product.price}
            </Card.Text>

        </Card.Body>
    </Card>
  )
}

export default Product