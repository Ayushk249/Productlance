import React from 'react'
import { useState,useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {Form,Button,Row,Col} from 'react-bootstrap'
import Loader from './../../components/Loader'
import FormContainer from '../../components/FormContainer'
import {toast} from 'react-toastify'
import { useUpdateProductMutation,useGetProductDetailQuery, useUploadProductImageMutation } from '../../slices/productsApiSlice'



const UpdateProductScreens = () => {

    const {id: productId} = useParams()
   
    const [name,setName] = useState('')
    const [price,setPrice] = useState(0)
    const [image,setImage] = useState('')
    const [brand,setBrand] = useState('')
    const [category,setCategory] = useState('')
    const [countInStock,setCountInStock] = useState(0)
    const [description,setDescription] = useState('')

    const {data: product,refetch, isLoading: loadingProduct, error: errorProduct} = useGetProductDetailQuery(productId)
    const [updateProduct, {isLoading: loadingUpdateProduct, error: errorUpdateProduct}] = useUpdateProductMutation()
    const [uploadProductImage, {isLoading: loadingUploadProductImage, error: errorUploadProductImage}] = useUploadProductImageMutation()


    useEffect(() => {
        if(product){
            // if there is a product then default values would be its values
            setName(product.name)
            setPrice(product.price)
            setImage(product.image)
            setBrand(product.brand)
            setCategory(product.category)
            setCountInStock(product.countInStock)
            setDescription(product.description)

        }
    },[product])


    const navigate = useNavigate()


    const submitHandler = async(e) => {
        e.preventDefault()
        const updatedProduct = {
            productId,
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description
        }

        const result = await updateProduct(updatedProduct)

        if(result){
            toast.success('Product Updated Successfully')
            refetch()
            navigate('/admin/productslist')
        }else{
            toast.error(result.error)
        }
    }

    const uploadFileHandler = async(e) => {
        const formData = new FormData()
        formData.append('image',e.target.files[0])
        try {
            const res = await uploadProductImage(formData).unwrap()
            toast.success(res.message)
            setImage(res.image)
        } catch (err) {
            toast.error(err.error || err?.data?.message)
        }
    }


    
  return (
    <>
    <Link to='/admin/productslist' className='btn btn-light my-3'>Go Back</Link>
    <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdateProduct && <Loader/>}

        {loadingProduct ? <Loader/> : errorProduct ? toast.error(errorProduct) : (
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name' className='my-3'>
                    <Form.Label>Name</Form.Label>
                        <Form.Control type='text' placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)}>
                        </Form.Control>
                </Form.Group>
                
                <Form.Group controlId='image' className='my-3'>
                    <Form.Label>Image</Form.Label>
                        <Form.Control type='text' placeholder='Enter image url' value={image} onChange={(e) => setImage(e.target.value)}>
                        </Form.Control>

                        <Form.Control type='file' label='choose file' onChange={uploadFileHandler}></Form.Control>
                        {loadingUploadProductImage && <Loader />}
                </Form.Group>

                <Form.Group controlId='price' className='my-3'>
                    <Form.Label>Price</Form.Label>
                        <Form.Control type='number' placeholder='Enter price' value={price} onChange={(e) => setPrice(e.target.value)}>
                        </Form.Control>
                </Form.Group>

                <Form.Group controlId='brand' className='my-3'>
                    <Form.Label>Brand</Form.Label>
                        <Form.Control type='text' placeholder='Enter brand' value={brand} onChange={(e) => setBrand(e.target.value)}>
                        </Form.Control>
                </Form.Group>

                <Form.Group controlId='countInStock' className='my-3'>
                    <Form.Label>Count In Stock</Form.Label>
                        <Form.Control type='number' placeholder='Enter countInStock' value={countInStock} onChange={(e) => setCountInStock(e.target.value)}>
                        </Form.Control>
                </Form.Group>

                <Form.Group controlId='category' className='my-3'>
                    <Form.Label>Category</Form.Label>
                        <Form.Control type='text' placeholder='Enter category' value={category} onChange={(e) => setCategory(e.target.value)}>
                        </Form.Control>
                </Form.Group>

                <Form.Group controlId='description' className='my-3'>
                    <Form.Label>Description</Form.Label>
                        <Form.Control type='text' placeholder='Enter description' value={description} onChange={(e) => setDescription(e.target.value)}>
                        </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary' className='my-3'>
                    Update
                </Button>
            </Form>
            )}
    </FormContainer>
    </>
  )
}

export default UpdateProductScreens