import  express  from "express";
import { protect,admin } from "../Middleware/authMiddleware.js";
import {
    addNewOrderItems,
    myOrders,
    getOrderById,
    updateOrderToDelivered,
    updateOrderToPaid,
    getOrders
} from "../controllers/orderController.js"
const router = express.Router()


router.route('/').post(protect, addNewOrderItems).get(protect,admin,getOrders)
router.route('/myorders').get(protect,myOrders)
router.route("/:id").get(protect,getOrderById)
router.route("/:id/pay").put(protect,updateOrderToPaid)
router.route("/:id/deliver").put(protect,admin,updateOrderToDelivered)

export default router




