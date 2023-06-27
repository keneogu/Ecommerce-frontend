import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "../components/layout/Loader";
import {
  fetchProductDetails,
  getSelectedProduct,
  resetReview,
  review,
} from "../features/ProductSlice";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import { getTotals, addToCart } from "../features/CartSlice";
import Rating from "../components/Rating";
import { toast } from "react-toastify";

const ProductDetail = () => {
  const { id } = useParams();
  const product = useSelector(getSelectedProduct);
  const { user } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  const { success } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide
      ? product.images.length - 1
      : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === product.images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  const handleAddToCart = (id) => {
    dispatch(addToCart(id));
  };

  useEffect(() => {
    dispatch(fetchProductDetails(id));
    dispatch(getTotals());

    if (success) {
      toast.success("Review posted successfully", {
        position: "top-right",
      });
      dispatch(resetReview());
      setComment("");
    }
  }, [dispatch, id, success, cartItems]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.set("rating", rating);
    formData.set("comment", comment);
    formData.set("productId", id);

    for (var pair of formData.entries()) {
      console.log(pair[0] + " - " + pair[1]);
    }

    dispatch(review(formData));
  };

  return (
    <div className="container mx-auto">
      {Object.keys(product).length === 0 ? (
        <Loader />
      ) : (
        <>
          <div className="w-full">
            <div className="flex flex-col lg:grid grid-cols-3 mt-4">
              <div className="col-span-1 ml-6">
                <div className="h-[400px] w-full m-auto py-8 px-4 relative group">
                  <div
                    style={{
                      backgroundImage: `url(${product.images[currentIndex].url})`,
                    }}
                    className="w-full h-full rounded-2xl bg-center bg-cover duration-500"
                  ></div>
                  <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
                    <BsChevronCompactLeft onClick={prevSlide} size={30} />
                  </div>
                  <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
                    <BsChevronCompactRight onClick={nextSlide} size={30} />
                  </div>
                  <div className="flex top-4 justify-center py-2">
                    {product.images?.map((slide, slideIndex) => (
                      <div
                        key={slideIndex}
                        onClick={() => goToSlide(slideIndex)}
                        className="text-2xl cursor-pointer"
                      >
                        <RxDotFilled />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="col-span-2 ml-6 p-3">
                <h3 className="md:text-2xl font-bold">{product.name}</h3>
                <p className="text-md">Product # {product._id}</p>

                <hr className="my-3" />

                <Rating value={product.ratings} />
                <span className="pt-4">
                  {product.numOfReviews}{" "}
                  {product.numOfReviews.length > 1 ? "Reviews" : "Review"}
                </span>

                <hr className="my-3" />

                <p className="text-md">{product.price}$</p>

                <button
                  disabled={product.stock === 0}
                  onClick={() => handleAddToCart(product)}
                  className={product.stock === 0 ? "bg-slate-200 p-2 mt-1 rounded-full outline-0 text-white" : "text-white bg-slate-800 p-2 mt-1 rounded-full outline-0"}
                >
                  Add to Cart
                </button>
                <hr className="my-3" />

                <p>
                  Status:{" "}
                  <span
                    className={
                      product.stock > 0 ? "text-green-500" : "text-red-500"
                    }
                  >
                    {" "}
                    {product.stock > 0 ? "In Stock" : "Out of stock"}
                  </span>
                </p>

                <hr className="my-3" />

                <h4 className="text-2xl">Description</h4>
                <p className="">{product.desc}</p>

                <hr className="my-3" />
              </div>
            </div>

            <div className="border-t-2 w-full flex flex-col lg:grid grid-cols-2 justify-center">
              <div className="grid-span-1 mt-3">
                <form className="form" onSubmit={submitHandler}>
                  <div>
                    <h2>Write a customer review</h2>
                  </div>
                  <div>
                    <label htmlFor="rating" className="pr-2">
                      Rating:{" "}
                    </label>
                    <select
                      id="rating"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                      className="rounded-lg outline-0"
                    >
                      <option value="">Select</option>
                      <option value="1">1- Bad</option>
                      <option value="2">2- Fair</option>
                      <option value="3">3- Good</option>
                      <option value="4">4- Very good</option>
                      <option value="5">5- Excelent</option>
                    </select>
                  </div>
                  <div className="">
                    <label htmlFor="comment" className="block">
                      Comment:
                    </label>
                    <textarea
                      id="comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Please add a comment..."
                    ></textarea>
                  </div>

                  {user && (
                    <div>
                      <button
                        type="submit"
                        className="text-white bg-slate-800 py-1 px-3 mt-1 rounded-full"
                      >
                        Submit
                      </button>
                    </div>
                  )}
                </form>
              </div>
              <div className="mt-3">
                <h2>Reviews</h2>
                {product.reviews.length === 0 && <h4>No Reviews</h4>}
                {product.reviews.map((review) => (
                  <div key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetail;
