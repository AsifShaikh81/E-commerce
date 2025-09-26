import express from 'express'

import {PlaceOrder,PlaceOrderStripe,PlaceOrderRazorpay,allOrders,userOrders,updateStatus} from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/cartAuth.js'
const orderRouter = express.Router() 

// Admin Features
orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,allOrders)

//payment Features
orderRouter.post('/place',authUser,PlaceOrder) // cod
orderRouter.post('/stripe',authUser,PlaceOrderStripe) // stripe
orderRouter.post('/razorpay',authUser,PlaceOrderRazorpay) // razorpay

// user Feature
orderRouter.post('/userorders',authUser,userOrders)

export default orderRouter