import express from "express";
import {getProducts, getProductsById ,createProduct,updateProduct,deleteProduct} from "../controllers/productController.js";
import { protect,admin } from "../Middleware/authMiddleware.js";


const router =express.Router()
// File would link with /api/products

router.get('/',getProducts)
// or  router.route('/').get(getProducts)


router.get('/:id',getProductsById)
// or  router.route('/:id').get(getProductsById)

router.post('/',protect,admin,createProduct)
router.put('/:id',protect,admin,updateProduct)
router.delete('/:id',protect,admin,deleteProduct)



export default router