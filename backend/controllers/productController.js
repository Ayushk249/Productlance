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



// @desc create a new review
// @route POST /api/products/:id/reviews
// @access private
const createProductReview = asyncHandler(async (request,response) => {
    const {rating,comment} = request.body

    const product = await Product.findById(request.params.id)

    if(product){
        // checking if user already reviewed
        const alreadyReviewed = product.reviews.find(
            (review) => {review.user.toString() === request.user._id.toString()}
        )

        console.log(alreadyReviewed)

        if(alreadyReviewed){
            response.status(400)
            throw new Error('Product already reviewed by you')
        }

        const review ={
            user:request.user._id,
            name:request.user.name,
            rating:Number(rating),
            comment : comment,
        }

        product.reviews.push(review)

        product.numReviews = product.reviews.length

        product.rating = product.reviews.reduce((accumulated,item) => accumulated + item.rating,0)/product.reviews.length

        await product.save()
        response.status(201).json({message: 'Review added'})
        
    }else{
        response.status(404)
        throw new Error('Product not found')
        }
    }
)




export {getProducts,getProductsById, createProduct , updateProduct, deleteProduct , createProductReview}

