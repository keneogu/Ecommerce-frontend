import React from "react";
import { Link } from "react-router-dom";
import Rating from "../../components/Rating";

const ProductCard = ({ product }) => {
  return (
    <>
      <Link
        to={`/product/${product._id}`}
        className="block bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden"
      >
        <div>
        <div className="relative pb-56 overflow-hidden">
          <img
            className="absolute inset-0 h-full w-full object-contain p-2"
            src={product.images[0].url}
            alt=""
          />
        </div>
        <div>
          <div className="p-2">
            <span className="inline-block px-2 py-1 leading-none bg-orange-200 text-orange-800 rounded-full font-semibold uppercase tracking-wide text-xs">
              {product.category}
            </span>
            <h2 className="mt-2 mb-2 font-semibold">{product.name.length < 60 ? product.name : product.name.substr(0, 60) + "..."}</h2>
            <p className="text-sm">
              {product.desc.length < 60
                ? product.desc
                : product.desc.substr(0, 60) + "..."}
            </p>
            <div className="mt-3 flex items-center">
              <span className="text-sm font-semibold">ab</span>&nbsp;
              <span className="font-bold text-xl">{product.price}</span>&nbsp;
              <span className="text-sm font-semibold">€</span>
            </div>
          </div>
          <div className="p-2 flex items-center text-sm text-gray-600">
            <Rating value={product.ratings} />
            <p className="pl-2">{product.ratings}</p>
          </div>
          <span className="ml-2">{product.numOfReviews} Reviews</span>
        </div>
        </div>
      </Link>
    </>
  );
};

export default ProductCard;
