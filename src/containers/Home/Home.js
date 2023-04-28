import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from "../../features/ProductSlice";
import ProductCard from './ProductCard';
import Head from '../../components/layout/Head'
import Loader from '../../components/layout/Loader';

const Home = () => {
	const { products } = useSelector(state => state.products.products)
	const { isLoading } = useSelector(state => state.products)
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchProducts())
	}, [dispatch])


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
					</div>
				</>
			)}
		</>
	)
}

export default Home
