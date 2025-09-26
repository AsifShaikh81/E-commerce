// middleware for auth user before adding any products to cart
import jwt from "jsonwebtoken"

const authUser = async (req,res,next) => {
    try {
    //geting token from header
    const authHeader =  req.headers["authorization"]
    // console.log(req.headers);
    
    if (!authHeader) return res.json({ success: false, message: "not authorized" });

    const token = authHeader.split(" ")[1]; // "Bearer token"
     // DECODING TOKEN TO VERIFY user
    const token_decode = jwt.verify(token,process.env.JWT_SECRET)
      req.body.userId = token_decode.id
      next()
    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message})
        
        
    }
}
export default authUser