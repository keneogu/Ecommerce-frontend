import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { FaTachometerAlt, FaShoppingBasket, FaUserAlt, FaCommentAlt, FaTruck } from "react-icons/fa";

const Sidebar = () => {
	const [open, setOpen] = useState(false);
	return (
		<div>
			<nav>
				<ul>
					<li>
						<Link to="/admin">
							<FaTachometerAlt />
							Dashboard
						</Link>
					</li>
					<li>
						<p onClick={() => setOpen(!open)} className="btn m-1"><FaTruck />Product</p>
						<ul className={open ? "block" : "hidden"}>
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
							<FaCommentAlt />
							Reviews
						</Link>
					</li>
				</ul>
			</nav>
		</div>
	)
}

export default Sidebar;
