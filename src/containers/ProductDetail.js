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
import { addToCart } from "../features/CartSlice";
import Rating from "../components/Rating";
import { toast } from "react-toastify";

const ProductDetail = () => {
  const { id } = useParams();
  const product = useSelector(getSelectedProduct);
  const { success } = useSelector(state => state.products);
  const dispatch = useDispatch();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
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

  const handleIncrease = () => {
    const count = document.querySelector(".count");
    if (count.valueAsNumber >= product.stock) return;
    const qty = count.valueAsNumber + 1;
    setQuantity(qty);
  };

  const handleDecrease = () => {
    const count = document.querySelector(".count");
    if (count.valueAsNumber <= 1) return;
    const qty = count.valueAsNumber - 1;
    setQuantity(qty);
  };

  const handleAddToCart = (id) => {
    dispatch(addToCart(id));
  };

  useEffect(() => {
    dispatch(fetchProductDetails(id));

    if (success) {
      toast.success('Review posted successfully', {
        position: "top-right",
      })
      dispatch(resetReview())
      setComment("");
    }
  }, [dispatch, id, success]);

	const submitHandler = (e) => {
		e.preventDefault();

		const formData = new FormData();

		formData.set('rating', rating);
		formData.set('comment', comment);
		formData.set('productId', id);

    for (var pair of formData.entries()) {
      console.log(pair[0] + " - " + pair[1]);
    }

		dispatch(review(formData));
	}

  return (
    <div className="container">
      {Object.keys(product).length === 0 ? (
        <Loader />
      ) : (
        <>
          <div className="md:flex lg:grid grid-cols-3 gap-14">
            <div className="col-span-1">
              <div className="max-w-[1400px] h-[400px] w-full m-auto py-8 px-4 relative group">
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

            <div className="col-span-2">
              <h3>{product.name}</h3>
              <p>Product # {product._id}</p>

              <hr />

              <Rating
                  value={product.ratings}
                />
              <span>{product.numOfReviews} Reviews</span>

              <hr />

              <p>{product.price}$</p>
              <div>
                <span onClick={handleDecrease} className="cursor-pointer">
                  -
                </span>
                <input
                  type="number"
                  className="count"
                  value={quantity}
                  readOnly
                />
                <span
                  disabled={product.stock === 1}
                  onClick={handleIncrease}
                  className={
                    product.stock === 1 || 0
                      ? "text-gray-400 cursor-pointer"
                      : "text-inherit"
                  }
                >
                  +
                </span>
              </div>
              <button
                disabled={product.stock === 0}
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
              <hr />

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

              <hr />

              <h4>Description</h4>
              <p>{product.desc}</p>

              <hr />
            </div>
          </div>
          {/* Reviews section */}
          <div>
            <form className="form" onSubmit={submitHandler}>
              <div>
                <h2>Write a customer review</h2>
              </div>
              <div>
                <label htmlFor="rating">Rating</label>
                <select
                  id="rating"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="1">1- Bad</option>
                  <option value="2">2- Fair</option>
                  <option value="3">3- Good</option>
                  <option value="4">4- Very good</option>
                  <option value="5">5- Excelent</option>
                </select>
              </div>
              <div>
                <label htmlFor="comment">Comment</label>
                <textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
              </div>

              <div>
                <label />
                <button className="primary" type="submit">
                  Submit
                </button>
              </div>
            </form>

						<h2>Reviews</h2>
            {product.reviews.length === 0 && <h4>No Reviews</h4>}
							{product.reviews.map((review) => (
								<div key={review._id}>
									<strong>{review.name}</strong>
									<Rating value={review.rating} />
									<p>{review.comment}</p>
                  <p>{review.createdAt.substring(0, 10)}</p>
								</div>
							))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetail;
