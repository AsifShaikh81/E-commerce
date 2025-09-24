import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// later we will add auth that only admin can add,delete product
// function for add product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;
    // from multer
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined // not undefined then only store image in 'images' variable
    );
    /* why using cloudinary ?
    we cannot store images directly to database so using clodunary.
     we will upload images to cloudinary and from there we will get url and we will store that url in db */
    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url; // returning secure url of images from cloudinary
      })
    );

    // now we saving all the modified data and cloudinary image url to database
    const productData = {
      name,
      description,
      price: Number(price), // form se price as string ayga toh converting to number before saving in db
      category,
      subCategory,
      sizes: JSON.parse(sizes), // form se sizes as string ayga toh converting to array before saving in db
      bestseller: bestseller === "true" ? true : false, // form se bestseller as string ayga toh converting to boolean before saving in db
      image: imagesUrl,
      date: Date.now(),
    };
    console.log(productData);

    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, message: "product added" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
//function for list product
const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({
      TotalProduct: products.length,
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);

    res.json({ success: false, message: error.message });
  }
};
//function for remove product
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({
      success: true,
      message: "prodcut removed",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
//function for single product
const singleProduct = async (req, res) => {
  try {
    const {productId} = req.body
    const product= await productModel.findById(productId);
    res.json({
      success: true,
      product   
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addProduct, listProduct, removeProduct, singleProduct };
