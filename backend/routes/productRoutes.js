import express from "express";
import productController from "../controllers/productController.js";
const router =express.Router()


// File would link with /api/products
router.get('/', productController.getProducts)

// or  router.route('/').get(productController.getProducts)

router.get('/:id',productController.getProductsById)

// or  router.route('/:id').get(productController.getProductsById)


export default router