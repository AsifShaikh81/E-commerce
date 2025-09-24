import express from 'express'
import cors from 'cors'
import dotenv from "dotenv";

dotenv.config({ path: "./config/.env" });
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoutes.js';
import productRouter from './routes/productRoute.js';

// App config
const app = express()
const port = process.env.PORT || 4000
connectDB() // calling db function 
connectCloudinary() // calling cloudinary storage

// middleware
app.use(express.json())
app.use(cors())

// api endpoints
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.get('/',(req,res)=>{
 res.send('api working')
})

app.listen(port,()=>{
    console.log(`server running on PORT:`+ port);
    
})