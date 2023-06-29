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

export default {getProducts,getProductsById}

