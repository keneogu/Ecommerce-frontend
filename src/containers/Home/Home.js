import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts} from "../../features/ProductSlice";
import ProductCard from './ProductCard';
import Head from '../../components/layout/Head'
import Loader from '../../components/layout/Loader';
import Pagination from 'react-js-pagination'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

const Home = () => {

	const search = useSelector(state =>  state.products.search)
	const { products, productCount, perPage, filteredProductsCount } = useSelector(state => state.products.products)
	const { isLoading } = useSelector(state => state.products)
	const [currentPage, setCurrentPage] = useState(1)
	const [price, setPrice] = useState([1, 1000])
	const [category, setCategory] = useState('')

	const categories = [
		"Electronics",
		"Accessories",
		"Beverages",
		'Food/Fruit',
		"Fashion",
		"Cosmetics",
		"Phones-tablets",
		"Computing",
		"Beauty",
		"Furniture",
		"Home-appliances",
		"Sports",
	]
	
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchProducts({search: search.replace(/^\s+|\s+$/gm,''), currentPage: currentPage, price: price, category: category}))
	}, [dispatch, search, currentPage, price, category]);

	function setCurrentPageNum(pageNumber){
		setCurrentPage(pageNumber)
	}

	let count = productCount;

	if(search) {
		count = filteredProductsCount
	}

	return (
		<>
			{isLoading ? <Loader /> : (
				<>
					<Head title={'Best Online Shoping platform'} />
					<div className="mt-8">

						<h4 className='text-gray-400 text-xl font-bold capitalize'>Latest Product</h4>
						<div className="container mx-auto">
							{ search ? (
								<>
									<div>
										<div>
											<Range marks={{
												1 : `$1`,
												1000 : `$1000`
											}}
											min={1}
											max={1000}
											defaultValue={[1, 1000]}
											tipFormatter={value => `$${value}`}
											tipProps={{
												placement: "top",
												visible: true
											}}
											value={price}
											onChange={price => setPrice(price)}
											/>

											<hr />

											<div className='mt-5'>
												<h4>
													Categories
												</h4>

												<ul className='pl-0'>
													{categories.map(category => (
														<li key={category} style={{cursor: 'pointer', listStyleType: "none"}} onClick={() => setCategory(category)}>{category}</li>
													))}
												</ul>
											</div>
										</div>
									</div>
									<div className="grid grid-rows-1">
										<div className="row">
										{products?.map(product => (
											<ProductCard key={product._id} product={product} />
										))}
										</div>
									</div>
								</>
							) : (
								products?.map(product => (
								<ProductCard key={product._id} product={product} />
							))
							)}
							
						</div>

						{perPage <= count && (
							<div className='flex justify-center mt-5'>
								<Pagination
									activePage={currentPage}
									itemsCountPerPage={perPage}
									totalItemsCount={count}
									pageRangeDisplayed={5}
									onChange={setCurrentPageNum}
								/>
							</div>
						)}
					</div>
				</>
			)}
		</>
	)
}

export default Home
