import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ idd, imagee, namee, pricee }) => {
  const { currency } = useContext(ShopContext);
  return( 
  <Link className='text-gray-700 cursor-pointer' to={`/product/${idd}`}>
    <div className='overflow-hidden'>
        <img className='hover:scale-110 transition ease-in-out' src={imagee[0]} alt="" />

    </div>
    <p className='pt-3 pb-1 text-sm'>{namee}</p>
    <p className='text-sm font-medium'>{currency}{pricee}</p>

  </Link>
  )
};

export default ProductItem;
