import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loader from '../components/layout/Loader';
import { fetchProductDetails, getSelectedProduct } from '../features/ProductSlice';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';

const ProductDetail = () => {
	const { id } = useParams();
	const product = useSelector(getSelectedProduct)
	const dispatch = useDispatch();

	const [currentIndex, setCurrentIndex] = useState(0);
	const [quantity, setQuantity] = useState(1)

	const prevSlide = () => {
		const isFirstSlide = currentIndex === 0;
		const newIndex = isFirstSlide ? product.images.length - 1 : currentIndex - 1;
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
		const count = document.querySelector('.count')
		if(count.valueAsNumber >= product.stock) return;
		const qty = count.valueAsNumber + 1
		setQuantity(qty)
	}

	const handleDecrease = () => {
		const count = document.querySelector('.count')
		if(count.valueAsNumber <= 1) return;
		const qty = count.valueAsNumber - 1
		setQuantity(qty)
	}

	useEffect(() => {
		dispatch(fetchProductDetails(id));
	}, [dispatch, id])

	return (
		<div className='container'>
			{Object.keys(product).length === 0 ?
				(<Loader />)
				: (
					<div className='md:flex lg:grid grid-cols-3 gap-14'>
						<div className="col-span-1">
							<div className='max-w-[1400px] h-[400px] w-full m-auto py-8 px-4 relative group'>
								<div
									style={{ backgroundImage: `url(${product.images[currentIndex].url})` }}
									className='w-full h-full rounded-2xl bg-center bg-cover duration-500'
								></div>
								<div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
									<BsChevronCompactLeft onClick={prevSlide} size={30} />
								</div>
								<div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
									<BsChevronCompactRight onClick={nextSlide} size={30} />
								</div>
								<div className='flex top-4 justify-center py-2'>
									{product.images?.map((slide, slideIndex) => (
										<div
											key={slideIndex}
											onClick={() => goToSlide(slideIndex)}
											className='text-2xl cursor-pointer'
										>
											<RxDotFilled />
										</div>
									))}
								</div>
							</div>
						</div>

						<div className='col-span-2'>
							<h3>{product.name}</h3>
							<p></p>

							<hr />

							<div className="rating-outer">
								<div className="rating-inner" style={{ width: `${(product.ratings / 5) * 100}%` }}></div>
							</div>
							<span>{product.numOfReviews}</span>

							<hr />

							<p>{product.price}$</p>
							<div>
								<span onClick={handleDecrease}>-</span>
								<input type="number" className='count' value={quantity} readOnly />
								<span onClick={handleIncrease}>+</span>
							</div>
							<button>Add to Cart</button>
							<hr />

							<p>Status: <span className={product.stock > 0 ? "text-green-500" : "text-red-500"} > {product.stock > 0 ? 'In Stock' : 'Out of stock'}</span></p>

							<hr />

							<h4>Description</h4>
							<p>{product.desc}</p>

							<hr />

							<p>Amazon</p>


							<label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
							<textarea id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>


							<button>Submit your Review</button>
						</div>
					</div>
				)}
		</div>
	)
}

export default ProductDetail;
