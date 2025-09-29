import express from "express";

import {
  PlaceOrder,
  PlaceOrderStripe,
  PlaceOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
  verifyStripe,
  verifyRazorpay,
} from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/cartAuth.js";
const orderRouter = express.Router();

// Admin Features
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);

//payment Features
orderRouter.post("/place", authUser, PlaceOrder); // cod
orderRouter.post("/stripe", authUser, PlaceOrderStripe); // stripe
orderRouter.post("/razorpay", authUser, PlaceOrderRazorpay); // razorpay

// user Feature
orderRouter.post("/userorders", authUser, userOrders);

//verify payment 
orderRouter.post('/verifyStripe',authUser,verifyStripe)
orderRouter.post('/verifyRazorpay',authUser,verifyRazorpay)

export default orderRouter;
