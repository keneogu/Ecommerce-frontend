import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { getTotals, removeCart, decreaseCart, clearCart, addToCart } from "../../features/CartSlice";

const Cart = () => {
	const cart = useSelector((state) => state.cart);
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getTotals())
	},[cart, dispatch])

	const handleRemoveCart = (cartItem) => {
		dispatch(removeCart(cartItem));
	};

	const handleDecreaseCart = (cartItem) => {
		dispatch(decreaseCart(cartItem));
	};

	const handleAddToCart = (cartItem) => {
		dispatch(addToCart(cartItem))
	};

	const handleClearCart = () => {
		dispatch(clearCart())
	}

	return (
		<div>
			<h2>Shopping Cart</h2>
			{cart.cartItems.length === 0 ? (
				<div>
					<p>Your cart is currently empty</p>
					<div>
						<Link to="/">
							<span>Start Shopping</span>
						</Link>
					</div>
				</div>
			) : (
				<div>
					<div>
						<h3>Product</h3>
						<h3>Price</h3>
						<h3>Quantity</h3>
						<h3>Total</h3>
					</div>
					<div className="cart-items">
						{cart.cartItems?.map(cartItem => (
							<div className="cart-item" key={cartItem._id}>
								<div className="cart-product">
									<img src={cartItem.image} alt={cartItem.name} />
									<div>
										<h3>{cartItem.name}</h3>
										<p>{cartItem.desc}</p>
										<button onClick={() => handleRemoveCart(cartItem)}>Remove</button>
									</div>
								</div>
								<div className="cart-product-price">${cartItem.price}</div>
								<div className="cart-product-quantity">
									<button onClick={() => handleDecreaseCart(cartItem)}>-</button>
									<div className="count">{cartItem.cartQuantity}</div>
									<button onClick={() => handleAddToCart(cartItem)}>+</button>
								</div>
								<div className="cart-product-total-price">
									${cartItem.price * cartItem.cartQuantity}
								</div>
							</div>
						))}
					</div>
					<div className="cart-summary">
						<button onClick={() => handleClearCart()}>Clear</button>
						<div className="cart-checkout">
							<div className="subtotal">
								<span>Subtotal</span>
								<span className="amount">${cart.cartTotalAmount}</span>
							</div>
							<p>Taxes and shipping calculated at checkout</p>
							<button>Check out</button>
						</div>
					</div>
				</div>)
			}
		</div>
	)
}

export default Cart
