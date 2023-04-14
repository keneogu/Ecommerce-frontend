import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useGetAllProductsQuery } from '../../features/ProductApi'
import { addToCart } from '../../features/CartSlice'

const Home = () => { 
	const {data, error, isLoading} = useGetAllProductsQuery()
	const dispatch = useDispatch();
	let navigate = useNavigate();

	const handleAddToCart = (product) => {
		dispatch(addToCart(product));
		navigate("/cart")
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
