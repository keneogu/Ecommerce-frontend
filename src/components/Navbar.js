import React from 'react'
import { Link } from 'react-router-dom'
import { FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
	return (
		<div className='flex justify-between text-white bg-black h-20 items-center px-4'>
			<div className='link'>
				<Link to="/"><h3>KenzShop</h3></Link>
			</div>
			<nav className='flex flex-row items-center'>
				<Link to="/about"><p>About</p></Link>
				<Link to="/cart">
					<div className='flex'>
						<p><FaShoppingCart className='text-orange-700' /></p>
						<span>3</span>
					</div>
				</Link>
			</nav>
		</div>
	)
}

export default Navbar
