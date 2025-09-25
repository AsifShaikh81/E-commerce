import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

// FOR GEN TOKEN
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Route for  user login
const loginUser = async (req, res) => {
  try {
    // geting email and password from client/user
    const { email, password } = req.body;
    // searching email in user db
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "user not exist" });
    }
    // comparing password which user enter and which is saved in db
    const isMatch = await bcrypt.compare(password, user.password);
    // IF PASSWORD MATCHED
    if (isMatch) {
      const token = createToken(user._id);
      return res.json({ success: true, token });
    } else {
      return res.json({ success: false, message: "invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Route for user registration
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body; // geting this from user
    // checking user exist or not
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "user already exist" });
    }

    // validating email format and strong password
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "pls enter valid email" });
    }
    if (password.length < 8) {
      return res.json({ success: false, message: "pls enter strong password" });
    }
    // hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // creating user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });
    // saving user
    const user = await newUser.save();
    // generating token
    const token = createToken(user._id); //_id already in mongo db
    res.json({
      success: true,
      token,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//Route for admin login
const adminLogin = async (req, res) => {

  try {
    const {email,password} = req.body
    if(email=== process.env.ADMIN_EMAIL && password=== process.env.ADMIN_PASS){
      const token = jwt.sign(email+password,process.env.JWT_SECRET)
      res.json({ success: true, token});
      
    }else{
      res.json({ success: false, message:'invalid credentials' });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
    
  }
};

export { loginUser, registerUser, adminLogin };
