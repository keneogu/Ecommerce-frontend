import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from "../../features/ProductSlice";
import ProductCard from './ProductCard';
import Head from '../../components/layout/Head'
import Loader from '../../components/layout/Loader';
import Pagination from 'react-js-pagination'

const Home = () => {
	const [currentPage, setCurrentPage] = useState(1)
	const { products, productCount, perPage } = useSelector(state => state.products.products)
	const { isLoading } = useSelector(state => state.products)
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchProducts(currentPage))
	}, [dispatch, currentPage])

	function setCurrentPageNum(pageNumber) {
		setCurrentPage(pageNumber)
	}

	return (
		<>
			{isLoading ? <Loader /> : (
				<>
					<Head title={'Best Online Shoping platform'} />
					<div className="mt-8">

						<h4 className='text-gray-400 text-xl font-bold capitalize'>Latest Product</h4>
						<div className="container mx-auto">
							{products?.map(product => (
											<ProductCard key={product._id} product={product} />
								))}
						</div>

						{perPage <= productCount && (
							<div className='flex justify-center mt-5'>
								<Pagination
									activePage={currentPage}
									itemsCountPerPage={perPage}
									totalItemsCount={productCount}
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
