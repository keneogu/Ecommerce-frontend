import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loader from '../components/layout/Loader';
import { fetchProductDetails, getSelectedProduct } from '../features/ProductSlice';

const ProductDetail = () => {
	const {id} = useParams();
	const product = useSelector(getSelectedProduct)
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchProductDetails(id));
	}, [dispatch, id])
	
	return (
		<div className='container'>
			{Object.keys(product).length === 0 ?
				(<Loader />)
				: (
					<div className='flex'>
						<div className="image-div">
							<img src="https://res.cloudinary.com/keneogu/image/upload/v1681952506/Ecommerce/hisense_smart_tv_iky0yj.jpg" alt="img-pic" />
						</div>

						<div>
							<h3>{product.name}</h3>
							<p></p>

							<hr />
							
							<div className='rating-o'>
							<div class="flex items-center">
								<svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
								<svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Second star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
								<svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Third star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
								<svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fourth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
								<svg aria-hidden="true" class="w-5 h-5 text-gray-300 dark:text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fifth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
							</div>
							</div>
							<span>(3 Reviews)</span>

							<hr />

							<p>$100 $</p>
							<div>
								<span>-</span>
								<input type="number" value="1" readOnly />
								<span>+</span>
							</div>
							<button>Add to Cart</button>
							<hr />

							<p>Status: <span>In stock</span></p>

							<hr />

							<h4>Description</h4>
							<p>Ultra-fast cards (2) to take better pictures and Full HD videos 
								(1) with your compact to mid-range point-and-shoot cameras and camcorders. 
								With SanDisk Ultra SDXC UHS-I cards you’ll benefit from faster downloads, 
								high capacity, and better performance to capture and store 128GB (5) of 
								high quality pictures and Full HD video (1). Take advantage of ultra-fast read 
								speeds of up to 80MB/s (3) to save time moving photos and videos from the card to your computer. 
								From a leader in flash memory storage, SanDisk Ultra SDXC UHS-I cards are 
								compatible with SDHC and SDXC digital devices, and come with a 10-year limited warranty (6)</p>

								<hr />

								<p>Amazon</p>


								<label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
								<textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>


								<button>Submit your Review</button>
						</div>
					</div>
				)}
		</div>
	)
}

export default ProductDetail;
