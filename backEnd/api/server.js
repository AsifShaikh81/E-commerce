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

// Define the allowed origins dynamically
// 1. The main production URL (The one we previously hardcoded)
// 2. A regex pattern to allow all Vercel preview/development deployments 
const allowedOrigins = [
    'https://trendfrontend.vercel.app',
    // Regular expression to allow all preview domains (e.g., trendfrontend-xxx.vercel.app)
    /https:\/\/trendfrontend-([a-zA-Z0-9]+|-asifshaikh81s-projects)\.vercel\.app$/ 
];

connectDB() // calling db function 
connectCloudinary() // calling cloudinary storage

// middleware
app.use(express.json())
// app.use(cors())

// CORS Configuration: Use a function to check if the incoming origin is allowed
app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or postman)
        if (!origin) return callback(null, true); 

        // Check against the list of allowed origins
        const isAllowed = allowedOrigins.some(allowed => {
            if (typeof allowed === 'string') {
                return origin === allowed;
            } else if (allowed instanceof RegExp) {
                return allowed.test(origin);
            }
            return false;
        });

        if (isAllowed) {
            callback(null, true);
        } else {
            // Optional: log or handle unauthorized access
            console.log(`CORS blocked request from origin: ${origin}`);
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // OPTIONS is for preflight checks
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