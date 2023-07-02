import asyncHandler from "../Middleware/asyncHandler.js";
import Product from "../models/productModel.js";



// @desc Fetch all products
// @route GET /api/products
const getProducts = asyncHandler(async (request,response) => {
        const products=await Product.find({})
        response.json(products)
})



// @desc Fetch a product
// @route GET /api/products/:id
const getProductsById = asyncHandler(async (request,response) => {
    const product = await Product.findById(request.params.id)
    // const product =products.find((product) => (product._id === request.params.id))

    if(product){
        response.json(product)
    }else{
        response.status(404)
        // can throw error because of errorhandler
        throw new Error ('Product not found')
    }
})


// @desc create a product
// @route POST /api/products/
// access private/admin
const createProduct = asyncHandler(async (request,response) => {
    const product = new Product({
        name:'Sample name',
        price:0,
        user:request.user._id,
        image:'/images/sample.jpg',
        brand:'Sample brand',
        category:'Sample category',
        countInStock:0,
        numReviews:0,
        description:'Sample description'

    })

    const createdProduct = await product.save()
    response.status(201).json(product)
})


// @desc update a product
// @route PUT /api/products/:id
// @access private/admin
const updateProduct = asyncHandler(async (request,response) => {
    const {name,price,description,image,brand,category,countInStock} = request.body

    const product = await Product.findById(request.params.id)

    if(product){
        product.name=name
        product.price=price
        product.description=description
        product.image=image
        product.brand=brand
        product.category=category
        product.countInStock=countInStock

        const updatedProduct = await product.save()
        response.json(product)

    }else{
        response.status(404)
        throw new Error('Product not found')
        }
    }
)


// @desc delete a product
// @route DELETE /api/products/:id
// @access private/admin
const deleteProduct = asyncHandler(async (request,response) => {
    const {name,price,description,image,brand,category,countInStock} = request.body

    const product = await Product.findById(request.params.id)

    if(product){
        await product.deleteOne({_id: product._id})
        response.status(200).json({message: 'Product removed'})
        
    }else{
        response.status(404)
        throw new Error('Product not found')
        }
    }
)




export {getProducts,getProductsById, createProduct , updateProduct, deleteProduct}

