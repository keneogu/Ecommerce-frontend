import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from 'react-redux';
import {SearchContext} from "./context/SearchContext";
import Search from './layout/Search';

const Navbar = () => {
	const {searchParams, setSearchParams, search, setSearch} = useContext(SearchContext);
	const {cartTotalQuantity} = useSelector(state => state.cart);
	const navigate = useNavigate()

	return (
		<div className='flex justify-between text-white bg-kenz-400 h-14 items-center px-4'>
			<div className='link'>
				<Link to="/"><h3>KenzShop</h3></Link>
			</div>

			<div className='bg-white border-kenz-100 border-4 rounded-md px-2 py-2 my-3'>
			 <Search 
				navigate={navigate} 
				searchParams={searchParams} 
				setSearchParams={setSearchParams}
				search={search}
				setSearch={setSearch}
			 />
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
