import multer from "multer";

const storage = multer.diskStorage({
    filename:function(req,file,callback){
      callback(null,file.originalname)
    }
})
const upload = multer({storage})

export default upload 
// multer is used to upload img 
// we using this middleware in addproduct route