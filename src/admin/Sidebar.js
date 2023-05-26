import React, { useState } from 'react'
import { FaTachometerAlt, FaShoppingBasket, FaUserAlt } from "react-icons/fa";

const Sidebar = () => {
	const [open, setOpen] = useState(false);
	return (
		<div>
			<nav>
				<ul>
					<li>
						<Link to="/dashboard">
							<FaTachometerAlt />
							Dashboard
						</Link>
					</li>
					<li>	
						<label tabIndex={0} onClick={() => setOpen(!open)} className="btn m-1">Click</label>
						<ul tabIndex={0} className={open ? "block" : "hidden"}>
							<li><Link to="/admin/products">All Product</Link></li>
							<li><Link to="/admin/product">Create Product</Link></li>
						</ul>
					</li>
					<li>
						<Link to="/admin/orders">
							<FaShoppingBasket />
							Orders
						</Link>
					</li>
					<li>
						<Link to="/admin/users">
							<FaUserAlt />
							Users
						</Link>
					</li>
					<li>
						<Link to="/admin/reviews">
							<FaUserAlt />
							Reviews
						</Link>
					</li>
				</ul>
			</nav>
		</div>
	)
}

export default Sidebar;
