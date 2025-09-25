import jwt from "jsonwebtoken"

const adminAuth = async (req,res,next) => {
 try {
    // adding token in header which we are getting from admin
    const authHeader =  req.headers["authorization"]
    // console.log(req.headers);
    
    if (!authHeader) return res.json({ success: false, message: "not authorized" });

    const token = authHeader.split(" ")[1]; // "Bearer token"

    if(!token){
        return res.json({ success: false, message:'not authorized login again' });
    }
    // DECODING TOKEN TO VERIFY admin
    const token_decode = jwt.verify(token,process.env.JWT_SECRET)
    // if decoded token does not match admins email and password
    if(token_decode !== process.env.ADMIN_EMAIL +process.env.ADMIN_PASS){
        res.json({ success: false, message: 'not authorized' });
    }
    next()
 } catch (error) {
    res.json({ success: false, message: error.message });
    
 }   
}
export default adminAuth