import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
	return (
		<div>
			<div className='link'>
			<Link to="/">Kenzshop</Link>
			</div>
			<nav>
				<Link to="/about">About</Link>
			</nav>
		</div>
	)
}

export default Navbar