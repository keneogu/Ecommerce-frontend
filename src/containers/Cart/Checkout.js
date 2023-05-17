import React from 'react'
import { Link } from "react-router-dom"

const Checkout = ({shipping, confirmOrder, payment}) => {
	return (
		<div>
			{shipping ? <Link to='/shipping'>
				<div></div>
				<div>Shipping</div>
				<div></div>
			</Link> : 
			<Link to='#' disabled>
				<div></div>
				<div>Shipping</div>
				<div></div>
			</Link>
			}

{confirmOrder ? <Link to='#'>
				<div></div>
				<div>Confirm Order</div>
				<div></div>
			</Link> : 
			<Link to='#' disabled>
				<div></div>
				<div>Confirm Order</div>
				<div></div>
			</Link>
			}

{payment ? <Link to='#'>
				<div></div>
				<div>Payment</div>
				<div></div>
			</Link> : 
			<Link to='#' disabled>
				<div></div>
				<div>Payment</div>
				<div></div>
			</Link>
			}
		</div>
	)
}

export default Checkout