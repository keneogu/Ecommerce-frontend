import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom";
import { getTotals, removeCart, decreaseCart, clearCart, addToCart } from "../../features/CartSlice";

const Cart = () => {
	const { cartItems } = useSelector((state) => state.cart);
	const cart = useSelector((state) => state.cart);
	const navigate = useNavigate();

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getTotals())
	},[cartItems, dispatch])

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

	const handleCheckout = () => {
		navigate("/login?redirect=/shipping")
	}

	return (
		<div>
			<h2>Shopping Cart</h2>
			{cartItems.length === 0 ? (
				<div>
					<p>Your cart is currently empty</p>
					<div>
						<Link to="/">
							<span>Continue Shopping</span>
						</Link>
					</div>
				</div>
			) : (
				<div>
					<h2>{cartItems.length}</h2>
					<div>
						<h3>Product</h3>
						<h3>Price</h3>
						<h3>Quantity</h3>
						<h3>Total</h3>
					</div>
					<div className="cart-items">
						{cartItems?.map(cartItem => (
							<div className="cart-item" key={cartItem._id}>
								<div className="cart-product">
									<img src={cartItem.image} alt={cartItem.name} />
									<div>
										<Link to={`/product/${cartItem._id}`}>{cartItem.name}</Link>
										<p>{cartItem.desc}</p>
										<button onClick={() => handleRemoveCart(cartItem)}>Remove</button>
									</div>
								</div>
								<div className="cart-product-price">${cartItem.price}</div>
								<div className="cart-product-quantity">
									<button disabled={cartItem.cartQuantity === 1} onClick={() => handleDecreaseCart(cartItem)} className={cartItem.cartQuantity === 1 ? 'text-gray-400' : 'text-inherit'}>-</button>
									<div className="count">{cartItem.cartQuantity}</div>
									<button disabled={cartItem.stock === cartItem.cartQuantity} onClick={() => handleAddToCart(cartItem)} className={cartItem.stock === cartItem.cartQuantity ? 'text-gray-400' : 'text-inherit'}>+</button>
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
							<button onClick={handleCheckout}>Check out</button>
						</div>
					</div>
				</div>)
			}
		</div>
	)
}

export default Cart
