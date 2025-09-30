import express from 'express'
import cors from 'cors'
import dotenv from "dotenv";

dotenv.config({ path: "./config/.env" });



import connectDB from '../config/mongodb.js'
import connectCloudinary from '../config/cloudinary.js';
import userRouter from '../routes/userRoutes.js';
import productRouter from '../routes/productRoute.js';
import cartRouter from '../routes/cartRoute.js';
import orderRouter from '../routes/orderRoute.js';

// App config
const app = express()
// const port = process.env.PORT || 4000

//Define the allowed frontend origin
const allowedOrigin = 'https://trendfrontend.vercel.app'; 

connectDB() // calling db function 
connectCloudinary() // calling cloudinary storage

// middleware
app.use(express.json())
// app.use(cors())

// CORS Configuration: Explicitly allow the deployed frontend origin
// This fixes the 'No Access-Control-Allow-Origin header' error
app.use(cors({
    origin: allowedOrigin,
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Explicitly allow common methods
    credentials: true // Crucial for sending cookies/auth headers across origins
}));

// api endpoints
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)


app.get('/',(req,res)=>{
 res.send('api working')
})

// app.listen(port,()=>{
//     console.log(`server running on PORT:`+ port);
    
// }) 

export default app;