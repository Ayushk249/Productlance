import asyncHandler from './../Middleware/asyncHandler.js';
import Order from '../models/orderModel.js';


// @desc create a new order
// @route POST /api/orders
// @ access private

const addNewOrderItems = asyncHandler(async (request,response) => {
    const {orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
                } = request.body

    if(orderItems && orderItems.length===0){
        response.status(400)
        throw new Error('no order items')
    }else{
        const order= new Order({
            
            orderItems : orderItems.map((x) => ({...x, 
                product : x._id,
                _id: undefined})),

            user : request.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        })

        const createdOrder = order.save();

        response.status(201).json(order)
    }

})


// @desc see all orders by on user profile
// @route GET/api/orders/myorders
// @ access private

const myOrders = asyncHandler(async (request,response) => {
    const orders = await Order.find({user : request.user._id})
    response.status(200).json(orders)
})


// @desc get order by id
// @route GET /api/orders/:id
// @ access private

const getOrderById = asyncHandler(async (request,response) => {
    const order = await Order.findById(request.params.id).populate('user','name email')

    if(order){
        response.status(200).json(order)
    }else{
        response.status(404)
        throw new Error('Order not found')
    }
})


// @desc update order to ispaid
// @route PUT /api/orders/:id/pay
// @ access private

const updateOrderToPaid = asyncHandler(async (request,response) => {
    const order = await Order.findById(request.params.id)

    if(order){
        order.isPaid=true
        order.paidAt = Date.now()
        // below information coming from paypal
        order.paymentResult = {
            id: request.body.id,
            status: request.body.status,
            update_time: request.body.update_time,
            email_address: request.body.payer.email_address
        }
        
        const updatedOrder = await order.save()

        response.status(200).json(order)
    }else{
        response.status(404)
        throw new Error('Order not found')
    }
})


// @desc update order to isDelivered
// @route PUT /api/orders/:id/deliver
// @ access private/admin
const updateOrderToDelivered = asyncHandler(async (request,response) => {
    const order = await Order.findById(request.params.id)

    if(order){
        order.isDelivered=true
        order.deliveredAt = Date.now()
        
        const updatedOrder = await order.save()

        response.status(200).json(order)
    }else{
        response.status(404)
        throw new Error('Order not found')
    }
})


// @desc All orders
// @route GET /api/orders
// @ access private/admin

const getOrders = asyncHandler(async (request,response) => {
    const orders = await Order.find({}).populate('user','id name')
    response.status(200).json(orders)
})



export {addNewOrderItems, myOrders,
    getOrderById,
    updateOrderToDelivered,
    updateOrderToPaid,
    getOrders}

