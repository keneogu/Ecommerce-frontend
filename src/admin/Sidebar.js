import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { FaTachometerAlt, FaShoppingBasket, FaUserAlt, FaTruck } from "react-icons/fa";

const Sidebar = () => {
	const [open, setOpen] = useState(false);
	return (
		<div className='p-5 mt-5'>
			<nav>
				<ul>
					<li className='my-2'>
						<Link to="/admin" className='flex'>
							<FaTachometerAlt className='mt-1'/>
							<p className='pl-2'>Dashboard</p> 
						</Link>
					</li>
					<li className='my-2 cursor-pointer'>
						<p onClick={() => setOpen(!open)} className="flex">
						<FaTruck className='mt-1'/>
						<span className='pl-2'>Product</span> </p>
						<ul className={open ? "block" : "hidden"}>
							<li><Link to="/admin/products" className='text-sm'>All Product</Link></li>
							<li><Link to="/admin/product" className='text-sm'>Create Product</Link></li>
						</ul>
					</li>
					<li className='my-2'>
						<Link to="/admin/orders" className='flex'>
							<FaShoppingBasket className='mt-1'/>
							<p className='pl-2'>Orders</p>	
						</Link>
					</li>
					<li className='my-2'>
						<Link to="/admin/users" className='flex'>
							<FaUserAlt className='mt-1'/>
							<p className='pl-2'>Users</p> 
						</Link>
					</li>
				</ul>
			</nav>
		</div>
	)
}

export default Sidebar;
