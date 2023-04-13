import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { productsApi, useGetAllProductsQuery } from '../../features/ProductApi'

const Home = () => { 
	const {data, error, isLoading} = useGetAllProductsQuery()
	const dispatch = useDispatch();

	const handleAddToCart = (product) => {
		dispatch(addToCart(product))
	};
	
	return (
		<div className="mt-8">
			{isLoading ? <p>Loading...</p> : error ? <p>An error occured...</p> : 
				<>
				<div>Home</div>
				<h1>Welcome to my home page top G</h1>
				<div>
					{data?.map(prod => 
						<div key={prod.id} className="product">
							<h3>{prod.name}</h3>
							<img src={prod.image} alt={prod.name} />
							<div className='span'>
								<span>{prod.desc}</span>
								<span className="price">${prod.price}</span>
							</div>
							<button onClick={() => handleAddToCart(prod)}>Add to cart</button>
						</div>
						)}
				</div>
				</>
			}
		</div>
	)
}

export default Home
