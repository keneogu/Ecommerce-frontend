import React from 'react'
import { Link } from 'react-router-dom'
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { useSelector } from 'react-redux';

const Navbar = () => {
	const {cartTotalQuantity} = useSelector(state => state.cart);

	return (
		<div className='flex justify-between text-white bg-kenz-400 h-14 items-center px-4'>
			<div className='link'>
				<Link to="/"><h3>KenzShop</h3></Link>
			</div>

			<div className='bg-white border-kenz-100 border-4 rounded-md px-2 py-2 my-3'>
				<input type='text' className='bg-lime-100' placeholder='Enter Product Name'/>
				<button><FaSearch className='text-black w-6 h-6 bg-gray-100' /></button>
			</div>
			
			<nav className='flex flex-row items-center px-2'>
				<Link to="/about"><p>Login</p></Link>
				<Link to="/cart">
					<div className='flex'>
						<p><FaShoppingCart className='text-orange-700' /></p>
						<span>
							<span>{cartTotalQuantity}</span>
						</span>
					</div>
				</Link>
			</nav>
		</div>
	)
}

export default Navbar
