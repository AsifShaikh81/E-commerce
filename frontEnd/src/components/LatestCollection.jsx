import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

// import Collection from '../pages/Collection'

const LatestCollection = () => {
    //   assets.js ke andar object hai usme sare products hai waha se 10 product dispaly kar rahe hai dynamically use state ka use kar ke ,humne already shopcontext.jsx ke andar products(assest.js) ko import kiya hai
    // assest.js contain all the products
    const { products } = useContext(ShopContext);
  const [LatestProducts, setLatestProucts] = useState([]);
  //   console.log(products);
  useEffect(() => {
    // list 10 product from array
    setLatestProucts(products.slice(0, 10));
  }, []);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"LATEST"} text2={"COLLECTIONS"} />
        <p
          className="w-3/4 m-auto text-xs sm:text-sm md:text-base
text-gray-600"
        >
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure,
          doloremque!
        </p>
      </div>
      {/* rendering products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 ">
        {LatestProducts.map((item, index) => (
          <ProductItem
            key={index}
            idd={item._id}
            imagee={item.image}
            namee={item.name}
            pricee={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
