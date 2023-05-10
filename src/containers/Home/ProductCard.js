import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="flex flex-wrap -mx-4">
      <div className="w-full sm:w-1/2 md:w-1/2 xl:w-1/4 p-4">
        <Link
          to={`/product/${product._id}`}
          className="block bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden"
        >
          <div className="relative pb-56 overflow-hidden">
            <img
              className="absolute inset-0 h-full w-full object-contain"
              src={product.images[0].url}
              alt=""
            />
          </div>
          <div className="p-2">
            <span className="inline-block px-2 py-1 leading-none bg-orange-200 text-orange-800 rounded-full font-semibold uppercase tracking-wide text-xs">
              {product.category}
            </span>
            <h2 className="mt-2 mb-2  font-bold">{product.name}</h2>
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
            <div className="ratings mt-auto">
              <div className="rating-outer">
                <div
                  className="rating-inner"
                  style={{ width: `${(product.ratings / 5) * 100}%` }}
                ></div>
              </div>
            </div>
            <p>{product.ratings}</p>
          </div>
          <span className="ml-2">{product.numOfReviews} Reviews</span>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
